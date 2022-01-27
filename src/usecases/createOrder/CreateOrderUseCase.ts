import { IOrderRepo } from "../../repos/orders";
import { IOrderProps, Order } from "../../domain/order";

export class CreateOrderUsecase {
  private orderRepo: IOrderRepo;

  constructor(orderRepo: IOrderRepo) {
    this.orderRepo = orderRepo;
  }

  async execute(order: IOrderProps): Promise<string> {
    const orderToSave = Order.create(order).props;
    const id = this.orderRepo.save(orderToSave);
    return id;
  }
}
