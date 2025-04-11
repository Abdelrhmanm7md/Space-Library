import { doctorModel } from "../../../database/models/doctor.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const createDoctor = catchAsync(async (req, res, next) => {
    let newDoctor = new doctorModel(req.body);
    let addedDoctor = await newDoctor.save({ context: { query: req.query } });
    res.status(201).json({
      message: "Doctor has been created successfully!",
      addedDoctor,
    });
  });
  

const getAllDoctor = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(doctorModel.find(), req.query)

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });

});

const getDoctorsByfacultyId = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(doctorModel.find({faculty: req.params.id}), req.query);

  let results = await ApiFeat.mongooseQuery;

  res.json({ message: "Done", results });
});

const getDoctorById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Doctor = await doctorModel.find({_id:id});
  let message_1 = " Doctor not found!"
  if(req.query.lang == "ar"){
    message_1 = "الفرع غير موجود!"
  }
  if (!Doctor || Doctor.length === 0) {
    return res.status(404).json({ message: message_1 });
  }
  Doctor = JSON.stringify(Doctor);
  Doctor = JSON.parse(Doctor);
Doctor=Doctor[0]

  res.status(200).json({ message: "Done", Doctor });
});
const updateDoctor = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let updatedDoctor = await doctorModel.findByIdAndUpdate(id, req.body, {
    new: true,userId: req.userId, context: { query: req.query }
  });
  let message_1 = "Couldn't update!  not found!"
  let message_2 = "Doctor updated successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر التحديث! غير موجود!"
    message_2 = "تم تحديث الفرع بنجاح!"
  }
  if (!updatedDoctor) {
    return res.status(404).json({ message: message_1 });
  }

  res
    .status(200)
    .json({ message: message_2, updatedDoctor });
});
const deleteDoctor = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Doctor = await doctorModel.findByIdAndDelete(id)
  let message_1 = "Couldn't delete! Not found!"
  let message_2 = "Doctor deleted successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر الحذف! غير موجود!"
    message_2 = "تم حذف الفرع بنجاح!"
  }
  if (!Doctor) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2 });
});

export {
  createDoctor,
  getAllDoctor,
  getDoctorById,
  getDoctorsByfacultyId,
  deleteDoctor,
  updateDoctor,
};
