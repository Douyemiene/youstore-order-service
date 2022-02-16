import { Router, Request, Response } from "express";

import container from "../../../di-setup";

const { orderController } = container.cradle;

const OrderRouter = Router();

OrderRouter.post("/", (req: Request, res: Response) =>
  orderController.createOrder(req, res)
);

OrderRouter.get("/:id", (req: Request, res: Response) =>
  orderController.getOrderById(req, res)
);

OrderRouter.get("/customer/:id", (req: Request, res: Response) =>
  orderController.getOrdersfromCustomer(req, res)
);

// OrderRouter.get("/hey/:id", (req: Request, res: Response) =>
//   orderController.findByIdAndUpdate(req, res)
// );

export { OrderRouter };
