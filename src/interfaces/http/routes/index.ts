import express from "express";
import { connectDB } from "../../../infra/database/mongoose";
import { OrderRouter } from "./orders";
import container from "../../../di-setup";

const { messenger } = container.cradle;

const app = express();

app.use(express.json());
app.use(OrderRouter);

const PORT = process.env.PORT || 5000;

messenger.createChannel().then(async () => {
  console.log("channel created");
  await connectDB();
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
  });
});

//handle unhandled promise rejection
// process.on("unhandledRejection", (err, promise) => {
//   server.close(() => process.exit(1));
// });
