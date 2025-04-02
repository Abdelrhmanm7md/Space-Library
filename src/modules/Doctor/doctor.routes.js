import express from "express";
const doctorRouter = express.Router();

import * as doctorController from "./doctor.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";


doctorRouter.get("/",protectRoutes, doctorController.getAllDoctor);
doctorRouter.get("/:id",protectRoutes, doctorController.getDoctorById);
doctorRouter.put("/:id",protectRoutes, doctorController.updateDoctor);
doctorRouter.post("/",protectRoutes, doctorController.createDoctor);
doctorRouter.delete("/:id",protectRoutes, doctorController.deleteDoctor);

export default doctorRouter;
