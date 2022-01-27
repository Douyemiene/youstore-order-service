import * as mongoose from "mongoose";

interface Order {
  id: string;
  orderStatus: boolean;
  total: number;
  products: string[];
  orderDate: string;
}

const OrderSchema = new mongoose.Schema<Order>({
  id: String,
  orderStatus: Boolean,
  total: Number,
  products: [String],
  orderDate: String,
});

export const Orders = mongoose.model<Order>("Order", OrderSchema);
