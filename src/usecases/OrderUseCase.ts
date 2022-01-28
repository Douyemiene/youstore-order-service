import { IOrderRepo } from "../repos/orders";
import { IOrderProps, Order } from "../domain/order";

export class OrderUsecase {
  private orderRepo: IOrderRepo;

  constructor(orderRepo: IOrderRepo) {
    this.orderRepo = orderRepo;
  }

  async createOrder(order: IOrderProps): Promise<string> {
    const orderToSave = Order.create(order).props;
    const id = this.orderRepo.save(orderToSave);
    return id;
  }

  async getOrdersfromCustomer(id: string): Promise<string> {
    const orders = await this.orderRepo.getOrdersByCustomerId(id);
    return orders;
  }
}
