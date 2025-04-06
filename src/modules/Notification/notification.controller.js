import { notificationModel } from "../../../database/models/notification.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const createNotification = catchAsync(async (req, res, next) => {
    let newNotification = new notificationModel(req.body);
    let addedNotification = await newNotification.save({ context: { query: req.query } });
    res.status(201).json({
      message: "Notification has been created successfully!",
      addedNotification,
    });
  });
  

const getAllNotification = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(notificationModel.find().sort({createdAt:-1}), req.query)

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });

});


const getNotificationById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Notification = await notificationModel.find({_id:id});
  let message_1 = " Notification not found!"
  if(req.query.lang == "ar"){
    message_1 = "الاشعار غير موجود!"
  }
  if (!Notification || Notification.length === 0) {
    return res.status(404).json({ message: message_1 });
  }
  Notification = JSON.stringify(Notification);
  Notification = JSON.parse(Notification);
Notification=Notification[0]

  res.status(200).json({ message: "Done", Notification });
});
const updateNotification = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let updatedNotification = await notificationModel.findByIdAndUpdate(id, req.body, {
    new: true,userId: req.userId, context: { query: req.query }
  });
  let message_1 = "Couldn't update!  not found!"
  let message_2 = "Notification updated successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر التحديث! غير موجود!"
    message_2 = "تم تحديث الاشعار بنجاح!"
  }
  if (!updatedNotification) {
    return res.status(404).json({ message: message_1 });
  }

  res
    .status(200)
    .json({ message: message_2, updatedNotification });
});
const deleteNotification = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Notification = await notificationModel.findByIdAndDelete(id)
  let message_1 = "Couldn't delete! Not found!"
  let message_2 = "Notification deleted successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر الحذف! غير موجود!"
    message_2 = "تم حذف الاشعار بنجاح!"
  }
  if (!Notification) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2 });
});

export {
  createNotification,
  getAllNotification,
  getNotificationById,
  deleteNotification,
  updateNotification,
};
