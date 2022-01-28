import { Orders } from "../infra/database/models/Orders";
import { IOrderProps } from "../domain/order";

export interface IOrderRepo {
  save(order: IOrderProps): Promise<string>;
  getOrdersByCustomerId(id: string): any;
  //   getOrderByOrderId(id: string): Promise<Order>;
  //   exists(id: string): Promise<boolean>;
}

export class OrderRepo implements IOrderRepo {
  private orders: any;

  constructor(model: any) {
    this.orders = model;
  }

  async save(order: IOrderProps): Promise<string> {
    const { id } = await this.orders.create(order);
    return id;
  }

  async getOrdersByCustomerId(id: string) {
    const orders = await this.orders.findById(id).exec();
    return orders;
  }
}
