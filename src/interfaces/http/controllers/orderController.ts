import { Request, Response } from "express";
import { OrderUseCase } from "../../../usecases/index";

export class OrderController {
  static async createOrder(req: Request, res: Response): Promise<void> {
    const createOrderRequest = req.body;
    try {
      const orderID = await OrderUseCase.createOrder(createOrderRequest);
      res.status(201).json({ success: true, data: { id: orderID } });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }

  static async getOrdersfromCustomer(
    req: Request,
    res: Response
  ): Promise<void> {
    const customerID = req.params.id;

    try {
      const order = await OrderUseCase.getOrdersfromCustomer(customerID);
      res.status(200).json({ success: true, data: order });
    } catch (err) {
      res.status(400).json({ success: false });
    }
  }
}
