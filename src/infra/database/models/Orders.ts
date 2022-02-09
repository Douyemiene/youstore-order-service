import * as mongoose from "mongoose";

interface Product {
  name: string;
  quantity: number;
}

export interface IOrder {
  id: string;
  orderStatus: boolean;
  total: number;
  customerId: string;
  products: Product[];
  orderDate: string;
}

const ProductSchema = new mongoose.Schema<Product>({
  name: String,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema<IOrder>({
  id: String,
  orderStatus: Boolean,
  total: Number,
  customerId: String,
  products: [ProductSchema],
  orderDate: String,
});

export const Orders = mongoose.model<IOrder>("Order", OrderSchema);
export default Orders;
