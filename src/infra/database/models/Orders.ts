import * as mongoose from "mongoose";

interface Product {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  orderStatus: boolean;
  total: number;
  customerId: string;
  products: string[];
  orderDate: string;
}

const ProductSchema = new mongoose.Schema<Product>({
  name: String,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema<Order>({
  id: String,
  orderStatus: Boolean,
  total: Number,
  customerId: String,
  products: [ProductSchema],
  orderDate: String,
});

export const Orders = mongoose.model<Order>("Order", OrderSchema);
export default Orders;
