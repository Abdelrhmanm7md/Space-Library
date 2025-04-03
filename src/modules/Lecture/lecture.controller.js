import { lectureModel } from "../../../database/models/lecture.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const createLecture = catchAsync(async (req, res, next) => {
    let newLecture = new lectureModel(req.body);
    let addedLecture = await newLecture.save({ context: { query: req.query } });
    res.status(201).json({
      message: "Lecture has been created successfully!",
      addedLecture,
    });
  });
  

const getAllLecture = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(lectureModel.find(), req.query)

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });

});


const getLectureById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Lecture = await lectureModel.find({_id:id});
  let message_1 = " Lecture not found!"
  if(req.query.lang == "ar"){
    message_1 = "الفرع غير موجود!"
  }
  if (!Lecture || Lecture.length === 0) {
    return res.status(404).json({ message: message_1 });
  }
  Lecture = JSON.stringify(Lecture);
  Lecture = JSON.parse(Lecture);
Lecture=Lecture[0]

  res.status(200).json({ message: "Done", Lecture });
});
const updateLecture = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  if(req.body.term == "one"){
    req.body.isFirstTerm = true
  }else{
    req.body.isFirstTerm = false
  }
  let updatedLecture = await lectureModel.findByIdAndUpdate(id, req.body, {
    new: true,userId: req.userId, context: { query: req.query }
  });
  let message_1 = "Couldn't update!  not found!"
  let message_2 = "Lecture updated successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر التحديث! غير موجود!"
    message_2 = "تم تحديث الفرع بنجاح!"
  }
  if (!updatedLecture) {
    return res.status(404).json({ message: message_1 });
  }

  res
    .status(200)
    .json({ message: message_2, updatedLecture });
});
const deleteLecture = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  // Find the Lecture first
  let Lecture = await lectureModel.findById(id);
  let message_1 = "Couldn't delete! Not found!"
  let message_2 = "Lecture deleted successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر الحذف! غير موجود!"
    message_2 = "تم حذف الفرع بنجاح!"
  }
  if (!Lecture) {
    return res.status(404).json({ message: message_1 });
  }

  await Lecture.deleteOne();

  res.status(200).json({ message: message_2 });
});

export {
  createLecture,
  getAllLecture,
  getLectureById,
  deleteLecture,
  updateLecture,
};
