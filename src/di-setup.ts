import {
  createContainer,
  asValue,
  asClass,
  asFunction,
  InjectionMode,
  Lifetime,
} from "awilix";
import Orders from "./infra/database/models/Orders";
import { connectDB } from "./infra/database/mongoose";
import OrderController from "./interfaces/http/controllers/orderController";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  orderModel: asValue(Orders),
  orderController: asClass(OrderController),
  // Infrastructure layer
  connectDB: asFunction(connectDB),
});

//load repositories
container.loadModules(
  [
    [
      "infra/repositories/*.ts",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    // we want `TodoRepository` to be registered as `todoRepository`.
    formatName: "camelCase",
    resolverOptions: {},
    cwd: __dirname,
  }
);

// load all usecases
container.loadModules(
  [
    [
      "usecases/*.ts",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    // we want `GetATodo` to be registered as `getATodo`.
    formatName: "camelCase",
    resolverOptions: {},
    cwd: __dirname,
  }
);

export default container;
