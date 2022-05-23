import { Model } from "mongoose";
import { DeliveryStatus, IOrderProps, Status } from "../../domain/order";
import { IOrder } from "../database/models/Orders";

export interface IOrderRepo {
  save(order: IOrderProps): Promise<string>;
  getOrdersByCustomerId(id: string, limit: number, skip:number): Promise<Array<IOrder>>;
  getOrderById(id: string): Promise<IOrder | null>;
  getOrders(): Promise<IOrder[] | null>
  findByIdAndUpdate(id: string, orderStatus: Status): Promise<void>;
  findByIdAndUpdateDelivery(id: string, deliveryStatus: DeliveryStatus): Promise<void>
}

export class OrderRepo implements IOrderRepo {
  private orders: Model<IOrder>;

  constructor({ orderModel }: { orderModel: Model<IOrder> }) {
    this.orders = orderModel;
  }

  async save(order: IOrderProps): Promise<string> {
    order.orderStatus = Status.PENDING;
    order.deliveryStatus = DeliveryStatus.NOT_INITIATED
    const { _id } = await this.orders.create(order);
    return _id.toString();
  }

  async getOrdersByCustomerId(id: string, limit: number, skip:number): Promise<Array<IOrder>> {
    const orders = await this.orders.find({ customerId: id }).sort({createdAt:-1}).limit(limit).skip(skip);
    return orders;
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    const order = await this.orders.findById(id).exec();
    return order;
  }

  async getOrders(): Promise<IOrder[] | null> {
    const orders = await this.orders.find({}).exec();
    return orders;
  }

  

  async findByIdAndUpdate(id: string, orderStatus: Status): Promise<void> {
    const order = await this.orders.findByIdAndUpdate(
      id,
      {
        orderStatus,
      },
      { new: true }
    );
  }

  async findByIdAndUpdateDelivery(id: string, deliveryStatus: DeliveryStatus): Promise<void> {
     await this.orders.findByIdAndUpdate(
      id,
      {
        deliveryStatus,
      },
      { new: true }
    );
  }
}

export default OrderRepo;
