import { CreateOrderController } from "./createOrder";
import { CreateOrderUsecase } from "../../../usecases/createOrder/CreateOrderUseCase";
import { OrderRepo } from "../../../repos/orders";
import { Orders } from "../../../infra/database/models/Orders";

const createOrderUseCase = new CreateOrderUsecase(new OrderRepo(Orders));
const createOrderController = new CreateOrderController(createOrderUseCase);
export { createOrderUseCase, createOrderController };
