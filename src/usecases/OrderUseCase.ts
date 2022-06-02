import {Message } from "amqplib";
import { IOrderRepo } from "../infra/repositories/orders";
import { DeliveryStatus, IOrderProps, Order, Status } from "../domain/order";
import { IOrder } from "../infra/database/models/Orders";
import { IMessenger } from "../infra/messaging/messenger";
const axios = require("axios").default;

export class OrderUsecase {
  private orderRepo: IOrderRepo;
  private messenger: IMessenger;

  constructor({ orders,  messenger}: { orders: IOrderRepo, messenger: IMessenger }) {
    this.orderRepo = orders;
    this.messenger = messenger;
  }

  async getOrdersfromCustomer(id: string, limit:number,skip:number): Promise<IOrder[]> {
    const orders = await this.orderRepo.getOrdersByCustomerId(id,limit,skip);
    return orders;
  }

  async getOrders(orderStatus:Status,deliveryStatus:DeliveryStatus): Promise<IOrder[] | null> {
    const orders = await this.orderRepo.getOrders(orderStatus,deliveryStatus);
    return orders;
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    const order = await this.orderRepo.getOrderById(id);
    return order;
  }

  async findByIdAndUpdateStatus(
    id: string,
    orderStatus: Status
  ): Promise<void> {
    await this.orderRepo.findByIdAndUpdate(id, orderStatus);
  }

  async findByIdAndUpdateDelivery(
    id: string,
    deliveryStatus: DeliveryStatus
  ): Promise<void> {
    await this.orderRepo.findByIdAndUpdateDelivery(id, deliveryStatus);
  }

  async createOrder(order: IOrderProps): Promise<string> {
    const {
      name,
      customerId,
      customerEmail,
      total,
      products,
    }: {
      name:string;
      customerId: string;
      customerEmail: string;
      total: number;
      products: Array<{ name: string; id: string; quantity: number, price: number, size: string, merchantId: string,
        color: string,
        image: string}>;
    } = order

    let availableResponse = await axios.post(
      `https://youstore-products.herokuapp.com/v1/products/available`,
      {
        order: order
      },
      {
        headers: {
          authorization:
            "Bearer sk_test_55ceccf870fc585f49df71a6decd01ff457c583c",
          "content-type": "application/json",
          "cache-control": "no-cache",
        },
      }
    );

    if (availableResponse.data.outOfStock.length != 0) {
      const orderToSave = Order.create({
        name,
        customerId,
        customerEmail,
        total,
        products,
      }).props;

      const id: string = await this.orderRepo.save(orderToSave);

      this.messenger.publishToExchange('orderEvents', 'orders.status.created', {
        id,
        amount: total,
      })
      
      //set timeout for order
      setTimeout(async () => {
        const order = await this.getOrderById(id);
        if(order){
          if(order.orderStatus == Status.PENDING) {
          
            await this.findByIdAndUpdateStatus(id, Status.FAILURE)
            this.messenger.publishToExchange('orderEvents', 'orders.status.failed', {
              order
            })
          }
        }

      },3600000)

     return id
    } else {
      throw Error('Some products are not available')
    }
  }

  async consume(): Promise<void> {
    this.messenger.channel.consume("orders",async (msg: Message | null) => {
      if (msg) {
        const routingKey = msg.fields.routingKey
        console.log(`msg::: ${routingKey}`)
        const data = JSON.parse(msg.content.toString());

        if(routingKey == 'payments.status.success'){  
            await this.findByIdAndUpdateStatus(
              data.ref,
              Status.SUCCESS
            );

            const order = await this.getOrderById(data.ref);
            this.messenger.publishToExchange('orderEvents', 'orders.status.completed', {order})
        }
        else if(routingKey == 'payments.status.failed'){
              await this.findByIdAndUpdateStatus(
                data.ref,
                Status.FAILURE
              );
              const order = await this.getOrderById(data.ref);
              this.messenger.publishToExchange('orderEvents', 'orders.status.failed', {order})
        }
        
      }
      },
      { noAck: true }
    );
  }
}

export default OrderUsecase;
