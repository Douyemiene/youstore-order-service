import { Router, Request, Response, NextFunction } from "express";
import {
  validateCreateOrder,
  validateGetOrderById,
  sendBadRequestErrorResponse,
  validatefindByIdAndUpdateDelivery,
  validateGetOrders
} from "../reqValidation";


import container from "../../../di-setup";
import { verifyCustomer, verifyAdminPermission } from "../../../middlewares";

const { orderController } = container.cradle;

const OrderRouter = Router();


OrderRouter.get("/", validateGetOrders, verifyAdminPermission('view-orders'), (req: Request, res: Response) =>
  orderController.getOrders(req,res)
);

OrderRouter.put("/delivery/:id", validatefindByIdAndUpdateDelivery, verifyAdminPermission('mark-delivery-status'), (req: Request, res: Response) =>
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
