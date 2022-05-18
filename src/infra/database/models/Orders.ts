import * as mongoose from "mongoose";
import { DeliveryStatus, Status } from "../../../domain/order";

interface Product {
  name: string;
  quantity: number;
  id: string;
  price: number;
  size: string;
  color: string;
  image: string;
  merchantId: string
}

export interface IOrder {
  id: string;
  orderStatus: Status;
  total: number;
  customerId: string;
  customerEmail: string;
  products: Product[];
  orderDate: string;
  deliveryStatus: DeliveryStatus;
}

const ProductSchema = new mongoose.Schema<Product>({
  name: String,
  id: String,
  quantity: Number,
  price: Number,
  size: String,
  color: String,
  image: String,
  merchantId: String
});

const OrderSchema = new mongoose.Schema<IOrder>({
  id: String,
  orderStatus: String,
  deliveryStatus: String,
  total: Number,
  customerId: String,
  customerEmail: String,
  products: [ProductSchema],
  orderDate: String,
},
{timestamps: true});

export const Orders = mongoose.model<IOrder>("Order", OrderSchema);
export default Orders;
