import { Router, Request, Response } from "express";

import { createOrderController } from "../controllers/index";

const OrderRouter = Router();

OrderRouter.post("/createOrder/", (req: Request, res: Response) =>
  createOrderController.execute(req, res)
);

export { OrderRouter };
