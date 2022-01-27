import { Request, Response } from "express";
import { CreateOrderUsecase } from "../../../usecases/createOrder/CreateOrderUseCase";

export class CreateOrderController {
  private useCase: CreateOrderUsecase;

  constructor(useCase: CreateOrderUsecase) {
    this.useCase = useCase;
  }

  public async execute(req: Request, res: Response): Promise<void> {
    const createOrderRequest = req.body;

    try {
      const orderID = await this.useCase.execute(createOrderRequest);
      res.status(200).json({ success: true, data: { id: orderID } });
    } catch (err) {
      res.status(200).json({ success: false });
    }
  }
}
