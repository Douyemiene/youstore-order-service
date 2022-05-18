import express from "express";
import { connectDB } from "../../../infra/database/mongoose";
import { OrderRouter } from "./orders";
import container from "../../../di-setup";
import cors from "cors"

const app = express();

app.use(cors({ origin: '*'}))

app.use(express.json());
app.get('/', (req,res)=> {
  res.json({message: 'Make your orders with this API'})
})

app.use("/", cors(), OrderRouter);

const { messenger } = container.cradle;

messenger.createChannel().then(() => {
  //connect database
  connectDB();
  //consume events
  // messenger.consumePaymentSuccess();
  // messenger.consumePaymentFailure();
  //listen for requests
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
  });
});

//handle unhandled promise rejection
// process.on("unhandledRejection", (err, promise) => {
//   server.close(() => process.exit(1));
// });
