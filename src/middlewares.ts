import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import HTTP_STATUS from 'http-status-codes'
import dotenv from "dotenv"
dotenv.config()

export const verifyCustomer = (req: Request , res: Response , next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(HTTP_STATUS.UNAUTHORIZED).json({success: false , message:`Access Denied`})
        return
    } 
    
    const token = authHeader.split(' ')[1]
const secret = process.env.CUSTOMER_JWT_SECRET

try {
 // verify token and save customer Id to the verified variable
 const verified = jwt.verify(token, `${secret}` )
 //req.body.user = verified;

 next()
} catch (error) {
  res.status(401).json({ message: "Access Denied" });
}

}

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// // interface Req extends Request {
// //   id: string | jwt.JwtPayload;
// // }

// export const verifyCustomer = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token: string | undefined = req.header("auth-token");
//   if (!token) res.status(401).json({ message: "unauthorised" });
//   else {
//     const secret = process.env.CUSTOMER_JWT_SECRET;

//     try {
//       // verify token and save customer Id to the verified variable
//       const payload = jwt.verify(token, `${secret}`);
//       next();
//     } catch (error) {
//       res.status(401).json({ message: "unauthorised" });
//     }
//   }
// };
