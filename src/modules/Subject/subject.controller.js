import { lectureModel } from "../../../database/models/lecture.model.js";
import { subjectModel } from "../../../database/models/subject.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const createSubject = catchAsync(async (req, res, next) => {
  let newSubject = new subjectModel(req.body);
  if (req.body.term == "one") {
    req.body.isFirstTerm = true;
  } else {
    req.body.isFirstTerm = false;
  }
  let addedSubject = await newSubject.save({ context: { query: req.query } });
  res.status(201).json({
    message: "Subject has been created successfully!",
    addedSubject,
  });
});

const getAllSubject = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(subjectModel.find(), req.query);

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });
});

const getSubjectById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let results = await subjectModel.find({ _id: id });
  let message_1 = " Subject not found!";
  if (req.query.lang == "ar") {
    message_1 = "المادة غير موجود!";
  }
  if (!results || results.length === 0) {
    return res.status(404).json({ message: message_1 });
  }
  results = JSON.stringify(results);
  results = JSON.parse(results);
  results = results[0];

  res.status(200).json({ message: "Done", results });
});
const getSubjectByYear = catchAsync(async (req, res, next) => {
  let { facultyId, year } = req.params;

  let results = await subjectModel.find({
    faculty: facultyId,
    studyYear: year,
  });

  let message_1 = " Subject not found!";
  if (req.query.lang == "ar") {
    message_1 = "المادة غير موجود!";
  }
  if (!results) {
    return res.status(404).json({ message: message_1 });
  }
  results = JSON.parse(JSON.stringify(results));

  res.status(200).json({ message: "Done", results });
});
const getSubjectByFaculty = catchAsync(async (req, res, next) => {
  let { facultyId } = req.params;

  let results = await subjectModel.find({
    faculty: facultyId,
  });

  let message_1 = " Subject not found!";
  if (req.query.lang == "ar") {
    message_1 = "المادة غير موجود!";
  }
  if (!results) {
    return res.status(404).json({ message: message_1 });
  }
  results = JSON.parse(JSON.stringify(results));

  res.status(200).json({ message: "Done", results });
});
const getSubjectsByDoctorAndSubject = catchAsync(async (req, res, next) => {
  let { doctorId, subjectId } = req.params;

  let results = await lectureModel.find({
    subject: subjectId,
    doctor: doctorId,
  });

  let message_1 = " Subject not found!";
  if (req.query.lang == "ar") {
    message_1 = "المادة غير موجود!";
  }
  if (!results) {
    return res.status(404).json({ message: message_1 });
  }
  results = JSON.parse(JSON.stringify(results));

  res.status(200).json({ message: "Done", results });
});
const getSubjectsByDoctor = catchAsync(async (req, res, next) => {
  try {
    let { id } = req.params;

    const results = await subjectModel.find({ doctors: id });

    res.json({ message: "success", results });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subjects", error: error.message });
  }
});
const getDoctorsBySubjectId = catchAsync(async (req, res, next) => {
  try {
    let { id } = req.params;

    const results = await subjectModel
      .findById(id)
      .select("doctors")
      .populate("doctors", "_id name");

    if (!results) {
      return res.status(404).json({ message: "Subject not found!" });
    }

    res.json({ message: "success", results: results.doctors });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subjects", error: error.message });
  }
});

const updateSubject = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  req.body.isFirstTerm = req.body.term === "one";

  if (req.body.pushDoctors && Array.isArray(req.body.pushDoctors)) {
    await subjectModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { doctors: { $each: req.body.pushDoctors } },
      },
      { new: true }
    );
  }

  if (req.body.pullDoctors && Array.isArray(req.body.pullDoctors)) {
    req.body.pullDoctors.forEach((doctorId) => {
      updatedSubject = subjectModel.findByIdAndUpdate(
        id,
        {
          $pull: { doctors: doctorId },
        },
        { new: true }
      );
    });
  }

  let updatedSubject = await subjectModel.findByIdAndUpdate(id, req.body, {
    new: true,
    userId: req.userId,
    context: { query: req.query },
  });

  let message_1 = "Couldn't update! Not found!";
  let message_2 = "Subject updated successfully!";
  if (req.query.lang == "ar") {
    message_1 = "تعذر التحديث! غير موجود!";
    message_2 = "تم تحديث المادة بنجاح!";
  }

  if (!updatedSubject) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2, updatedSubject });
});

const deleteSubject = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Subject = await subjectModel.findByIdAndDelete(id);
  let message_1 = "Couldn't delete! Not found!";
  let message_2 = "Subject deleted successfully!";
  if (req.query.lang == "ar") {
    message_1 = "تعذر الحذف! غير موجود!";
    message_2 = "تم حذف المادة بنجاح!";
  }
  if (!Subject) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2 });
});

export {
  createSubject,
  getAllSubject,
  getSubjectById,
  getSubjectByYear,
  getSubjectByFaculty,
  getSubjectsByDoctorAndSubject,
  getDoctorsBySubjectId,
  deleteSubject,
  updateSubject,
  getSubjectsByDoctor,
};
