import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Req extends Request {
  user: string | jwt.JwtPayload;
}

export const verifyCustomer = (req: Req, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) throw new Error(`Access Denied!`);

  const secret = process.env.CUSTOMER_JWT_SECRET;

  try {
    // verify token and save customer Id to the verified variable
    const verified = jwt.verify(token, `${secret}`);
    req.user = verified;
    next();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    }
    throw error;
  }
};
