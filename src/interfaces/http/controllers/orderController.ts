import { Request, Response } from "express";
import { IMessenger } from "../../../infra/messaging/messenger";
import OrderUseCase from "../../../usecases/OrderUseCase";


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

  async getOrdersfromCustomer(req: Request, res: Response): Promise<void> {
    const customerID = req.params.id;
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

  async getOrders(req: Request, res: Response): Promise<void> {
    const orderStatus: any = req.query.orderStatus
    const deliveryStatus: any = req.query.deliveryStatus
    try {
      const orders = await this.orderUseCase.getOrders(orderStatus,deliveryStatus);
      res.status(200).json({ success: true, data: orders});
    } catch ({ name, message }) {
      res.status(404).json({ success: false, data: null });
    }
  }


  async createOrder(req: Request, res: Response): Promise<void> {  
    try {
      const orderId =  await this.orderUseCase.createOrder(req.body)
      res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: { id: orderId },
      });
      
    } catch (err) {
      res.status(403).json({ success: false, message: err.message, data: null });
    }
    
  }


  

}

export default OrderController;
