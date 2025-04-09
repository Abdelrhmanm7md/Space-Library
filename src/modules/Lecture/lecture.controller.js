import { lectureModel } from "../../../database/models/lecture.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";
import { photoUpload } from "../../utils/removeFiles.js";
import * as dotenv from "dotenv";
dotenv.config();

const createLecture = catchAsync(async (req, res, next) => {
  let gallery = photoUpload(req, "gallery", "gallery");
  
  gallery = gallery.map(file => file.replace(`${process.env.HOST}`, ""));
  req.body.gallery = gallery || []
  let message_1 = " max 5 images"
  if(req.query.lang == "ar"){
    message_1 = "الحد الأقصى 5 صور"
  }
  if(req.body.gallery.length > 5) {
    return res.status(400).json({ message: message_1 });
  }
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

  let results = await lectureModel.find({_id:id});
  let message_1 = " Lecture not found!"
  if(req.query.lang == "ar"){
    message_1 = "المحاضرة غير موجود!"
  }
  if (!results || results.length === 0) {
    return res.status(404).json({ message: message_1 });
  }
  results = JSON.stringify(results);
  results = JSON.parse(results);
results=results[0]

  res.status(200).json({ message: "Done", results });
});
const getLecturesBySubject = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let results = await lectureModel.find({subject:id});
  let message_1 = " Lecture not found!"
  if(req.query.lang == "ar"){
    message_1 = "المحاضرة غير موجود!"
  }
  if (!results) {
    return res.status(404).json({ message: message_1 });
  }
  results = JSON.parse(JSON.stringify(results));
  res.status(200).json({ message: "Done", results });
});
const updateLecture = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  if (req.body.gallery) {
    let newImages = photoUpload(req, "gallery", "gallery"); // Upload new images
    newImages = newImages.map(file => file.replace(`${process.env.HOST}`, ""));
    let err_1 = " max 5 images";
    let err_2 =  "Lecture not found!";
    if (req.query.lang == "ar") {
      err_1 = "الحد الأقصى 5 صور";
      err_2 = "المحاضرة غير موجودة!";
    }

    // Fetch the existing lecture
    let existingLecture = await lectureModel.findById(id);
    if (!existingLecture) {
      return res.status(404).json({ message: err_2 });
    }

    let updatedGallery = [...existingLecture.gallery, ...newImages];

    if (updatedGallery.length > 5) {
      return res.status(400).json({ message: err_1 });
    }

    req.body.gallery = updatedGallery; 
  }

  let updatedLecture = await lectureModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  let message_1 = "Couldn't update! Not found!";
  let message_2 = "Lecture updated successfully!";
  if (req.query.lang == "ar") {
    message_1 = "تعذر التحديث! غير موجود!";
    message_2 = "تم تحديث المحاضرة بنجاح!";
  }

  if (!updatedLecture) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2, updatedLecture });
});

const deleteLecture = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Lecture = await lectureModel.findByIdAndDelete(id);
  let message_1 = "Couldn't delete! Not found!"
  let message_2 = "Lecture deleted successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر الحذف! غير موجود!"
    message_2 = "تم حذف المحاضرة بنجاح!"
  }
  if (!Lecture) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2 });
});

export {
  createLecture,
  getAllLecture,
  getLectureById,
  getLecturesBySubject,
  deleteLecture,
  updateLecture,
};
