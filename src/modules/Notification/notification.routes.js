import express from "express";
const notificationRouter = express.Router();

import * as notificationController from "./notification.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";


notificationRouter.get("/",protectRoutes, notificationController.getAllNotification);
notificationRouter.get("/:id",protectRoutes, notificationController.getNotificationById);
notificationRouter.put("/:id",protectRoutes, notificationController.updateNotification);
notificationRouter.post("/",protectRoutes, notificationController.createNotification);
notificationRouter.delete("/:id",protectRoutes, notificationController.deleteNotification);

export default notificationRouter;
