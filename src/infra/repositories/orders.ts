import { Model } from "mongoose";
import { IOrderProps, Status } from "../../domain/order";
import { IOrder } from "../database/models/Orders";

export interface IOrderRepo {
  save(order: IOrderProps): Promise<string>;
  getOrdersByCustomerId(id: string, limit: number, skip:number): Promise<Array<IOrder>>;
  getOrderById(id: string): Promise<IOrder | null>;
  findByIdAndUpdate(id: string, orderStatus: Status): Promise<void>;
}

export class OrderRepo implements IOrderRepo {
  private orders: Model<IOrder>;

  constructor({ orderModel }: { orderModel: Model<IOrder> }) {
    this.orders = orderModel;
  }

  async save(order: IOrderProps): Promise<string> {
    order.orderStatus = Status.PENDING;
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

  async findByIdAndUpdate(id: string, orderStatus: Status): Promise<void> {
    const order = await this.orders.findByIdAndUpdate(
      id,
      {
        orderStatus,
      },
      { new: true }
    );
  }
}

export default OrderRepo;
