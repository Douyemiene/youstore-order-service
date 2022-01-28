import { Orders } from "../infra/database/models/Orders";
import { OrderRepo } from "./orders";

export const orderRepo = new OrderRepo(Orders);
