import {  facultyModel } from "../../../database/models/faculty.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import * as dotenv from "dotenv";
dotenv.config();

const createFaculty = catchAsync(async (req, res, next) => {
  let newFaculty = new facultyModel(req.body);
  let addedFaculty = await newFaculty.save({ context: { query: req.query } });

  res.status(201).json({
    message: "Faculty has been created successfully!",
    addedFaculty,
  });
});

const getAllFaculty = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(facultyModel.find(), req.query);

  let results = await ApiFeat.mongooseQuery;
  results = {
    en: results.map(faculty => ({ _id: faculty._id, name: faculty.name })),
    ar: results.map(faculty => ({ _id: faculty._id, nameAR: faculty.nameAR }))
  };
  res.json({ message: "Done", results });
});


const getFacultyById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Faculty = await facultyModel.find({ _id: id });
  let message_1 = " Faculty not found!";
  if (req.query.lang == "ar") {
    message_1 = "العلامة التجارية غير موجودة!";
  }
  if (!Faculty || Faculty.length === 0) {
    return res.status(404).json({ message: message_1 });
  }

  Faculty = Faculty[0];

  res.status(200).json({ message: "Done", Faculty });
});
const updateFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedFaculty = await facultyModel.findByIdAndUpdate(id, req.body, {
    new: true,
    userId: req.userId,
    context: { query: req.query },
  });
  let message_1 = "Couldn't update! Not found!";
  let message_2 = "Faculty updated successfully!";
  if (req.query.lang == "ar") {
    message_1 = "تعذر التحديث! غير موجود!";
    message_2 = "تم تحديث العلامة التجارية بنجاح!";
  }

  if (!updatedFaculty) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2, updatedFaculty });
});

const deleteFaculty = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Faculty = await facultyModel.findById(id);
  let message_1 = "Couldn't delete! Not found!";
  let message_2 = "Faculty deleted successfully!";
  if (req.query.lang == "ar") {
    message_1 = "تعذر الحذف! غير موجود!";
    message_2 = "تم حذف العلامة التجارية بنجاح!";
  }
  if (!Faculty) {
    return res.status(404).json({ message: message_1 });
  }

  Faculty.userId = req.userId;
  await Faculty.deleteOne();

  res.status(200).json({ message: message_2 });
});






export {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  deleteFaculty,
  updateFaculty,
};
