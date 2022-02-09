import { Model } from "mongoose";
import { IOrderProps } from "../../domain/order";
import { IOrder } from "../database/models/Orders";

export interface IOrderRepo {
  save(order: IOrderProps): Promise<string>;
  getOrdersByCustomerId(id: string): any;
  getOrderById(id: string): Promise<IOrder | null>;
}

export class OrderRepo implements IOrderRepo {
  private orders: Model<IOrder>;

  constructor({ orderModel }: { orderModel: Model<IOrder> }) {
    this.orders = orderModel;
  }

  async save(order: IOrderProps): Promise<string> {
    const { _id } = await this.orders.create(order);
    return _id.toString();
  }

  async getOrdersByCustomerId(id: string) {
    const orders = await this.orders.find({ customerId: id }).exec();
    return orders;
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    const order = await this.orders.findById(id).exec();
    return order;
  }
}

export default OrderRepo;
