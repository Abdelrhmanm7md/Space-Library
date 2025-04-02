import express from "express";
const priceListRouter = express.Router();

import * as priceListController from "./priceList.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";


priceListRouter.get("/",protectRoutes, priceListController.getAllPriceList);
priceListRouter.get("/:id",protectRoutes, priceListController.getPriceListById);
priceListRouter.put("/:id",protectRoutes, priceListController.updatePriceList);
priceListRouter.post("/",protectRoutes, priceListController.createPriceList);
priceListRouter.delete("/:id",protectRoutes, priceListController.deletePriceList);

export default priceListRouter;
