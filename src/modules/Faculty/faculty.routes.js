import express from "express";
const facultyRouter = express.Router();

import * as facultyController from "./faculty.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";


facultyRouter.get("/", facultyController.getAllFaculty);
facultyRouter.get("/:id",protectRoutes, facultyController.getFacultyById);
facultyRouter.put("/:id",protectRoutes, facultyController.updateFaculty);
facultyRouter.post("/", facultyController.createFaculty);
facultyRouter.delete("/:id",protectRoutes, facultyController.deleteFaculty);

export default facultyRouter;
