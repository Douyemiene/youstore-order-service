import { Router, Request, Response, NextFunction } from "express";
import {
  validateCreateOrder,
  validateGetOrderById,
  sendBadRequestErrorResponse,
  validatefindByIdAndUpdateDelivery,
} from "../reqValidation";

// import { OrderController } from "../controllers/orderController";
import container from "../../../di-setup";
import { verifyCustomer } from "../../../middlewares";

const { orderController } = container.cradle;

const OrderRouter = Router();

// interface Req extends Request {
//   id: string | jwt.JwtPayload;
// }
OrderRouter.put("/delivery/:id", validatefindByIdAndUpdateDelivery, (req: Request, res: Response) =>
  orderController.findByIdAndUpdateDelivery(req,res)
);

OrderRouter.use(verifyCustomer);

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

export { OrderRouter };
