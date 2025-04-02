import {  subjectModel } from "../../../database/models/subject.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const createSubject = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user._id;
    let newSubject = new subjectModel(req.body);
    let addedSubject = await newSubject.save({ context: { query: req.query } });
    res.status(201).json({
      message: "Subject has been created successfully!",
      addedSubject,
    });
  });
  

const getAllSubject = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(subjectModel.find(), req.query)

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });

});


const getSubjectById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let products = await productModel.find({ productVariations: { $elemMatch: { Subject: id } } });
  let Subject = await subjectModel.find({_id:id});
  let message_1 = " Subject not found!"
  if(req.query.lang == "ar"){
    message_1 = "الفرع غير موجود!"
  }
  if (!Subject || Subject.length === 0) {
    return res.status(404).json({ message: message_1 });
  }
  Subject = JSON.stringify(Subject);
  Subject = JSON.parse(Subject);
Subject=Subject[0]

Subject.products = products;
  res.status(200).json({ message: "Done", Subject });
});
const updateSubject = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let updatedSubject = await subjectModel.findByIdAndUpdate(id, req.body, {
    new: true,userId: req.userId, context: { query: req.query }
  });
  let message_1 = "Couldn't update!  not found!"
  let message_2 = "Subject updated successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر التحديث! غير موجود!"
    message_2 = "تم تحديث الفرع بنجاح!"
  }
  if (!updatedSubject) {
    return res.status(404).json({ message: message_1 });
  }

  res
    .status(200)
    .json({ message: message_2, updatedSubject });
});
const deleteSubject = catchAsync(async (req, res, next) => {
  let { id } = req.params;
if (id == process.env.WEBSITESubjectID || id == process.env.MAINSubject) {
    return res.status(400).json({ message: "You can't delete main Subject!" });
  }
  // Find the Subject first
  let Subject = await subjectModel.findById(id);
  let message_1 = "Couldn't delete! Not found!"
  let message_2 = "Subject deleted successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر الحذف! غير موجود!"
    message_2 = "تم حذف الفرع بنجاح!"
  }
  if (!Subject) {
    return res.status(404).json({ message: message_1 });
  }

  // ✅ Attach SubjectId before deleting
  Subject.userId = req.userId;
  await Subject.deleteOne();

  res.status(200).json({ message: message_2 });
});

export {
  createSubject,
  getAllSubject,
  getSubjectById,
  deleteSubject,
  updateSubject,
};
