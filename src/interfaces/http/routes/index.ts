import express from "express";
//Persistence
import { connectDB } from "../../database/mongoose";

//Subdomains
import { createOrderRouter } from "./orders";

connectDB();
const app = express();

app.use(express.json());
app.use(createOrderRouter);

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  server.close(() => process.exit(1));
});
