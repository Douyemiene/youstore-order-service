import { IOrderRepo } from "../infra/repositories/orders";
import { DeliveryStatus, IOrderProps, Order, Status } from "../domain/order";
import { IOrder } from "../infra/database/models/Orders";

export class OrderUsecase {
  private orderRepo: IOrderRepo;

  constructor({ orders }: { orders: IOrderRepo }) {
    this.orderRepo = orders;
  }

  async createOrder(order: IOrderProps): Promise<string> {
    const orderToSave = Order.create(order).props;
    const id = this.orderRepo.save(orderToSave);
    return id;
  }

  async getOrdersfromCustomer(id: string, limit:number,skip:number): Promise<IOrder[]> {
    const orders = await this.orderRepo.getOrdersByCustomerId(id,limit,skip);
    return orders;
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    const order = await this.orderRepo.getOrderById(id);
    return order;
  }

  async findByIdAndUpdateStatus(
    id: string,
    orderStatus: Status
  ): Promise<void> {
    await this.orderRepo.findByIdAndUpdate(id, orderStatus);
  }

  async findByIdAndUpdateDelivery(
    id: string,
    deliveryStatus: DeliveryStatus
  ): Promise<void> {
    await this.orderRepo.findByIdAndUpdateDelivery(id, deliveryStatus);
  }
}

export default OrderUsecase;
