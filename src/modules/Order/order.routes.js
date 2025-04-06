import express from "express";
const orderRouter = express.Router();

import * as orderController from "./order.controller.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";

orderRouter.get("/", protectRoutes, orderController.getAllOrder);
orderRouter.get("/student/:id",protectRoutes,orderController.getAllOrderByStudent);
orderRouter.get("/:id", protectRoutes, orderController.getOrderById);
orderRouter.put("/:id", protectRoutes, orderController.updateOrder);
orderRouter.post("/", protectRoutes, orderController.createOrder);
orderRouter.delete("/:id", protectRoutes, orderController.deleteOrder);

export default orderRouter;
