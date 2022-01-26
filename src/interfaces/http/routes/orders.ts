import * as express from "express";

import { createOrder } from "../../../Controllers/index";

const createOrderRouter = express.Router();

createOrderRouter.post("/createOrder/", createOrder.execute);

export { createOrderRouter };
