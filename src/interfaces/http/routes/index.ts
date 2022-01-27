import express from "express";
//Persistence
import { connectDB } from "../../../infra/database/mongoose";

//Subdomains
import { OrderRouter } from "./orders";

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
