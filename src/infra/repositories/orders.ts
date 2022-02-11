import { Model } from "mongoose";
import { IOrderProps } from "../../domain/order";
import { IOrder } from "../database/models/Orders";

export interface IOrderRepo {
  save(order: IOrderProps): Promise<string>;
  getOrdersByCustomerId(id: string): Promise<Array<IOrder>>;
  getOrderById(id: string): Promise<IOrder | null>;
  findByIdAndUpdate(id: string): Promise<void>;
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

  async getOrdersByCustomerId(id: string): Promise<Array<IOrder>> {
    const orders = await this.orders.find({ customerId: id }).exec();
    return orders;
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    const order = await this.orders.findById(id).exec();
    return order;
  }

  async findByIdAndUpdate(id: string): Promise<void> {
    const order = await this.orders.findByIdAndUpdate(
      id,
      {
        orderStatus: true,
      },
      { new: true }
    );
    console.log("findUpd", order);
  }
}

export default OrderRepo;
