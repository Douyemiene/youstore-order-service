import * as mongoose from "mongoose";
import { Status } from "../../../domain/order";

interface Product {
  name: string;
  quantity: number;
  id: string;
}

export interface IOrder {
  id: string;
  orderStatus: Status;
  total: number;
  customerId: string;
  customerEmail: string;
  products: Product[];
  orderDate: string;
}

const ProductSchema = new mongoose.Schema<Product>({
  name: String,
  id: String,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema<IOrder>({
  id: String,
  orderStatus: String,
  total: Number,
  customerId: String,
  customerEmail: String,
  products: [ProductSchema],
  orderDate: String,
});

export const Orders = mongoose.model<IOrder>("Order", OrderSchema);
export default Orders;
