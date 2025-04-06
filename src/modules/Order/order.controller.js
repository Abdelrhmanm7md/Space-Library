import { orderModel } from "../../../database/models/order.model.js";
import { priceListModel } from "../../../database/models/priceList.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const createOrder = catchAsync(async (req, res, next) => {
  let checkZone = await priceListModel.findById(req.body.zone);
  let message_1 = "Zone not found!";
  if (req.query.lang == "ar") {
    message_1 = "المنطقة غير موجودة!";
  }
  if (!checkZone) {
    return res.status(404).json({ message: message_1 });
  }
  req.body.deliveryPrice = checkZone.price;
  req.body.totalAmount = req.body.deliveryPrice + req.body.price;
  if (req.body.paymentStatus === "card") {
    req.body.status = "done";
  }
  let newOrder = new orderModel(req.body);
  let addedOrder = await newOrder.save({ context: { query: req.query } });
  res.status(201).json({
    message: "Order has been created successfully!",
    addedOrder,
  });
});

const getAllOrder = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(orderModel.find(), req.query);

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });
});
const getAllOrderByStudent = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(orderModel.find({ student: req.params.id }), req.query);

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });
});

const getOrderById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let results = await orderModel.find({ _id: id });
  let message_1 = " Order not found!";
  if (req.query.lang == "ar") {
    message_1 = "المحاضرة غير موجود!";
  }
  if (!results || results.length === 0) {
    return res.status(404).json({ message: message_1 });
  }
  results = JSON.stringify(results);
  results = JSON.parse(results);
  results = results[0];

  res.status(200).json({ message: "Done", results });
});
const updateOrder = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const existingOrder = await orderModel.findById(id);

  let notFoundMessage = "Order not found!";
  if (req.query.lang === "ar") {
    notFoundMessage = "الطلب غير موجود!";
  }
  if (!existingOrder) {
    return res.status(404).json({ message: notFoundMessage });
  }

  let shouldRecalculate = false;

  if (
    (req.body.zone &&
      req.body.zone.toString() !== existingOrder.zone.toString()) ||
    (typeof req.body.price === "number" &&
      req.body.price !== existingOrder.price)
  ) {
    shouldRecalculate = true;
  }

  if (shouldRecalculate) {
    const checkZone = await priceListModel.findById(
      req.body.zone || existingOrder.zone
    );
    let zoneNotFoundMessage = "Zone not found!";
    if (req.query.lang === "ar") {
      zoneNotFoundMessage = "المنطقة غير موجودة!";
    }
    if (!checkZone) {
      return res.status(404).json({ message: zoneNotFoundMessage });
    }

    const deliveryPrice = checkZone.price;
    req.body.deliveryPrice = deliveryPrice;
    const updatedPrice =
      typeof req.body.price === "number" ? req.body.price : existingOrder.price;
    req.body.totalAmount = deliveryPrice + updatedPrice;
  }

  let updatedOrder = await orderModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  let message_1 = "Couldn't update! Not found!";
  let message_2 = "Order updated successfully!";
  if (req.query.lang == "ar") {
    message_1 = "تعذر التحديث! غير موجود!";
    message_2 = "تم تحديث الاوردر بنجاح!";
  }

  if (!updatedOrder) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2, updatedOrder });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let Order = await orderModel.findByIdAndDelete(id);
  let message_1 = "Couldn't delete! Not found!";
  let message_2 = "Order deleted successfully!";
  if (req.query.lang == "ar") {
    message_1 = "تعذر الحذف! غير موجود!";
    message_2 = "تم حذف الاوردر بنجاح!";
  }
  if (!Order) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2 });
});

export { createOrder, getAllOrder, getAllOrderByStudent, getOrderById, deleteOrder, updateOrder };
