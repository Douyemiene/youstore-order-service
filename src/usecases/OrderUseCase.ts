import { IOrderRepo } from "../infra/repositories/orders";
import { IOrderProps, Order } from "../domain/order";
import { IOrder } from "../infra/database/models/Orders";
// export interface IOrderUsecase {
//   orderRepo: IOrderRepo;
//   createOrder(order: IOrderProps): Promise<string>;
//   getOrdersfromCustomer(id: string): Promise<string>;
//   getOrderById(id: string): Promise<string>;
// }

export class OrderUsecase {
  private orderRepo: IOrderRepo;

  constructor({ orders }: { orders: IOrderRepo }) {
    this.orderRepo = orders;
  }

  async createOrder(order: IOrderProps): Promise<string> {
    if (!order.customerId) {
      throw new Error();
    }
    const orderToSave = Order.create(order).props;
    const id = this.orderRepo.save(orderToSave);
    return id;
  }

  async getOrdersfromCustomer(id: string): Promise<string> {
    const orders = await this.orderRepo.getOrdersByCustomerId(id);
    return orders;
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    const order = await this.orderRepo.getOrderById(id);
    return order;
  }
}

export default OrderUsecase;
