import { Router, Request, Response, NextFunction } from "express";
import {
  validateCreateOrder,
  validateGetOrderById,
  sendBadRequestErrorResponse,
} from "../reqValidation";

// import { OrderController } from "../controllers/orderController";
import container from "../../../di-setup";
import { verifyCustomer } from "../../../middlewares";

const { orderController } = container.cradle;

const OrderRouter = Router();

// interface Req extends Request {
//   id: string | jwt.JwtPayload;
// }

OrderRouter.use(verifyCustomer);

OrderRouter.post("/", validateCreateOrder, (req: Request, res: Response) => {
  console.log("here", req);
  orderController.createOrder(req, res);
});

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
