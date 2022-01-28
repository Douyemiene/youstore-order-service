import { Router, Request, Response } from "express";

import { OrderController } from "../controllers/orderController";

const OrderRouter = Router();

OrderRouter.post("/orders/", (req: Request, res: Response) =>
  OrderController.createOrder(req, res)
);

OrderRouter.get("/orders/:id", (req: Request, res: Response) =>
  OrderController.getOrdersfromCustomer(req, res)
);
export { OrderRouter };
