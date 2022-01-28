import { OrderUsecase } from "./OrderUseCase";
import { orderRepo } from "../repos/index";

export const OrderUseCase = new OrderUsecase(orderRepo);
