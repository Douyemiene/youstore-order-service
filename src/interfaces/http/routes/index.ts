import express from "express";
import container from "../../../di-setup";
//const { setup, container } = require("../../../di-setup");
//Persistence
import { connectDB } from "../../../infra/database/mongoose";

//routers
import { OrderRouter } from "./orders";

// console.log("myC", container.cradle.orderModel);
// console.log("myC", container.cradle.orderUseCase);
//const myController = container.resolve("myController");
connectDB();
const app = express();

app.use(express.json());
app.use(OrderRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

//handle unhandled promise rejection
// process.on("unhandledRejection", (err, promise) => {
//   server.close(() => process.exit(1));
// });
