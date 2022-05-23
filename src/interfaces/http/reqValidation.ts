import joi from "joi";
import { ExpressJoiError } from "express-joi-validation";
import { Request, Response, NextFunction } from "express";

const validator = require("express-joi-validation").createValidator({
  passError: true,
});



export const validateCreateOrder = validator.body(
  joi.object({
    customerId: joi.string().required(),
    customerEmail: joi.string().required(),
    total: joi.number().required(),
    products: joi.array().items(
      joi.object({
        name: joi.string().required(),
        id: joi.string().required(),
        quantity: joi.number().required(),
        price: joi.number().required(),
        size: joi.string().required(),
        color: joi.string().required(),
        image: joi.string().required(),
        merchantId: joi.string().required()
      }).required()
    ),
  })
);

export const validateGetOrders = validator.params(
  joi.object({ id: joi.string()})
);

export const validateGetOrderById = validator.params(
  joi.object({ orderStatus: joi.string().required() }),
  joi.object({ deliveryStatus: joi.string().required() })
);

export const validatefindByIdAndUpdateDelivery = validator.params(
  joi.object({ id: joi.string().required() })
);

export const sendBadRequestErrorResponse = (
  err: any | ExpressJoiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    const e: ExpressJoiError = err;
    let msg = "";
    if (e.error) {
      e.error.details.forEach((d, idx) => {
        //let formatedMsg = "";
        let formattedMsg = d.message;
        if (idx == e.error.details.length - 1 && idx != 0) {
          msg += ` and ${formattedMsg}`;
        } else {
          msg += `${formattedMsg},`;
        }
      });
    }

    res.status(400).json({
      success: false,
      error: `bad request ${e.type}`,
      msg,
    });
  } else {
    res.status(500).end("internal server error");
  }
};
