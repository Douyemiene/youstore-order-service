import { Router, Request, Response } from "express";
import {
  validateCreateOrder,
  validateGetOrderById,
  sendBadRequestErrorResponse,
} from "../reqValidation";

// import { OrderController } from "../controllers/orderController";
import container from "../../../di-setup";

const { orderController } = container.cradle;

const OrderRouter = Router();

OrderRouter.post("/", validateCreateOrder, (req: Request, res: Response) =>
  orderController.createOrder(req, res)
);

OrderRouter.get("/:id", validateGetOrderById, (req: Request, res: Response) =>
  orderController.getOrderById(req, res)
);

OrderRouter.get(
  "/customer/:id",
  validateGetOrderById,
  (req: Request, res: Response) =>
    orderController.getOrdersfromCustomer(req, res)
);

OrderRouter.use(sendBadRequestErrorResponse);
// OrderRouter.get("/hey/:id", (req: Request, res: Response) =>
//   orderController.findByIdAndUpdate(req, res)
// );

export { OrderRouter };
