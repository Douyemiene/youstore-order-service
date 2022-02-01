import * as mongoose from "mongoose";

interface Order {
  id: string;
  orderStatus: boolean;
  total: number;
  customerId: string;
  products: string[];
  orderDate: string;
}

const OrderSchema = new mongoose.Schema<Order>({
  id: String,
  orderStatus: Boolean,
  total: Number,
  customerId: String,
  products: [String],
  orderDate: String,
});

export const Orders = mongoose.model<Order>("Order", OrderSchema);
