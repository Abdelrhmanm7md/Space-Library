import express from "express";
const subjectRouter = express.Router();

import * as subjectController from "./subject.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";


subjectRouter.get("/",protectRoutes, subjectController.getAllSubject);
subjectRouter.get("/:id",protectRoutes, subjectController.getSubjectById);
subjectRouter.get("/year/:facultyId/:year",protectRoutes, subjectController.getSubjectByYear );
subjectRouter.get("/doctor/:id",protectRoutes, subjectController.getSubjectsByDoctor );
subjectRouter.put("/:id",protectRoutes, subjectController.updateSubject);
subjectRouter.post("/",protectRoutes, subjectController.createSubject);
subjectRouter.delete("/:id",protectRoutes, subjectController.deleteSubject);

export default subjectRouter;
