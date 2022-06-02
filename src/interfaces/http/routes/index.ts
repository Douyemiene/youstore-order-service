import express from "express";
import { connectDB } from "../../../infra/database/mongoose";
import { OrderRouter } from "./orders";
import container from "../../../di-setup";
import cors from "cors"

const app = express();

app.use(cors({ origin: '*'}))

app.use(express.json());


app.use("/", cors(), OrderRouter);

const { messenger, orderUseCase } = container.cradle;

messenger.createChannel().then(async () => {
  //connect database
  await connectDB();
  //consume events
  await orderUseCase.consume()

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
  });
});


