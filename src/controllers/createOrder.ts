import { BaseController } from "../core/Infra/BaseController";
import { Request, Response } from "express";

export class CreateOrder extends BaseController<CreateOrderResponseDto> {
  constructor() {
    super();
  }

  public async execute(
    req: Request,
    res: Response
  ): Promise<CreateOrderResponseDto> {
    console.log("Order created");
    return { id: "", orderStatus: true };
  }
}

interface CreateOrderRequestDto {
  id?: string;
  orderStatus: boolean;
  total: number;
  products: string[];
  orderDate: string;
}

interface CreateOrderResponseDto {
  id: string;
  orderStatus: boolean;
}
