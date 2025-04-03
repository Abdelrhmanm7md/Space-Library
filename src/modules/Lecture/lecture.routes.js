import express from "express";
const lectureRouter = express.Router();

import * as lectureController from "./lecture.controller.js";
import { allowTo, protectRoutes } from "../auth/auth.controller.js";


lectureRouter.get("/",protectRoutes, lectureController.getAllLecture);
lectureRouter.get("/:id",protectRoutes, lectureController.getLectureById);
lectureRouter.put("/:id",protectRoutes, lectureController.updateLecture);
lectureRouter.post("/",protectRoutes, lectureController.createLecture);
lectureRouter.delete("/:id",protectRoutes, lectureController.deleteLecture);

export default lectureRouter;
