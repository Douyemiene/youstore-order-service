import { Request, Response } from "express";
import { IMessenger } from "../../../infra/messaging/messenger";
import OrderUseCase from "../../../usecases/OrderUseCase";
import {Status} from "../../../domain/order"
const axios = require("axios").default;


export class OrderController {
  orderUseCase: OrderUseCase;
  messenger: IMessenger;

  constructor({
    orderUseCase,
    messenger,
  }: {
    orderUseCase: OrderUseCase;
    messenger: IMessenger;
  }) {
    this.orderUseCase = orderUseCase;
    this.messenger = messenger;
  }


  async getOrderById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const order = await this.orderUseCase.getOrderById(id);
      res.status(200).json({ success: true, data: order });
    } catch ({ name, message }) {
      res.status(404).json({ success: false, data: null });
    }
  }

  async findByIdAndUpdateStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { orderStatus } = req.body;
    try {
      const order = await this.orderUseCase.findByIdAndUpdateStatus(
        id,
        orderStatus
      );
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      res.status(400).json({ success: false, err: err });
    }
  }

  async findByIdAndUpdateDelivery(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { deliveryStatus } = req.body;
    try {
      const orders = await this.orderUseCase.findByIdAndUpdateDelivery(
        id,
        deliveryStatus
      );
      res.status(200).json({ success: true, data: orders });
    } catch (err) {
      res.status(400).json({ success: false, err: err });
    }
  }

  async createOrder(req: Request, res: Response): Promise<void> {
    const {
      customerId,
      customerEmail,
      total,
      products,
    }: {
      customerId: string;
      customerEmail: string;
      total: number;
      products: Array<{ name: string; id: string; quantity: number, price: number, size: string,
        color: string,
        image: string}>;
    } = req.body;
    let availableResponse = null;
    try {
      availableResponse = await axios.post(
        `https://youstore-products.herokuapp.com/v1/products/available`,
        {
          order: req.body,
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

      if (availableResponse.data.outOfStock.length == 0) {
        const orderID = await this.orderUseCase.createOrder({
          customerId,
          customerEmail,
          total,
          products,
        });

        this.messenger.publishToExchange('orderEvents', 'orders.status.created', {
          orderID,
          amount: total,
        })
        
        //set timeout for order
      setTimeout(async () => {
        const order = await this.orderUseCase.getOrderById(orderID);
        if(order){
          if(order.orderStatus == Status.PENDING) {
           
            await this.orderUseCase.findByIdAndUpdateStatus(orderID, Status.FAILURE)
            this.messenger.publishToExchange('orderEvents', 'orders.status.failed', {
              order
            })
          }
        }

      },3600000)

      //response
        res.status(201).json({
          success: true,
          message: "Order created successfully",
          data: { id: orderID },
        });
      } else {
        res.status(200).json({
          success: true,
          message: "some of the products are not available",
          data: { unavailable: availableResponse.data.outOfStock },
        });
      }

      
    } catch (err) {
      res.status(400).json({ success: false, data: [] });
    }
    
  }

  async getOrdersfromCustomer(req: Request, res: Response): Promise<void> {
    const customerID = req.params.id;
    //should be in done in model
    let page ='1'
    let size = '10'
     if(req.query.page){
      page = req.query.page.toString();
    }
    if(req.query.size){
      size = req.query.size.toString();
    }
    try {
      let pageInt = parseInt(page)
      let sizeInt = parseInt(size)
      const limit = parseInt(size)

      const skip = (pageInt - 1) * sizeInt
      const order = await this.orderUseCase.getOrdersfromCustomer(customerID,limit,skip);
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      res.status(200).json({ success: false, data: [] });
    }
  }


}

export default OrderController;
