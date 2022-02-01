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
    const orders = await this.orders.find({ customerId: id }).exec();
    console.log("repo orders", orders);
    return orders;
  }

  async getOrderById(id: string) {
    const orders = await this.orders.find(id).exec();
    return orders;
  }
}
