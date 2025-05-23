import express from "express";
const subjectRouter = express.Router();

import * as subjectController from "./subject.controller.js";
import { protectRoutes } from "../auth/auth.controller.js";

subjectRouter.get("/", protectRoutes, subjectController.getAllSubject);
subjectRouter.get("/:id", protectRoutes, subjectController.getSubjectById);
subjectRouter.get(
  "/year/:facultyId/:year",
  protectRoutes,
  subjectController.getSubjectByYear
);
subjectRouter.get(
  "/faculty/:facultyId",
  protectRoutes,
  subjectController.getSubjectByFaculty
);
subjectRouter.get(
  "/lecture/:doctorId/:subjectId",
  protectRoutes,
  subjectController.getSubjectsByDoctorAndSubject
);
subjectRouter.get(
  "/doctor/:id",
  protectRoutes,
  subjectController.getSubjectsByDoctor
);
subjectRouter.get(
  "/doctors/:id",
  protectRoutes,
  subjectController.getDoctorsBySubjectId
);
subjectRouter.put("/:id", protectRoutes, subjectController.updateSubject);
subjectRouter.post("/", protectRoutes, subjectController.createSubject);
subjectRouter.delete("/:id", protectRoutes, subjectController.deleteSubject);

export default subjectRouter;
