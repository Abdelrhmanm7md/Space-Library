import { priceListModel } from "../../../database/models/priceList.model.js";
import ApiFeature from "../../utils/apiFeature.js";
import catchAsync from "../../utils/middleWare/catchAsyncError.js";

const createPriceList = catchAsync(async (req, res, next) => {  
    let newPriceList = new priceListModel(req.body);
    let addedPriceList = await newPriceList.save({ context: { query: req.query } });
  
    res.status(201).json({
      message: "PriceList has been created successfully!",
      addedPriceList,
    });
  });
  

const getAllPriceList = catchAsync(async (req, res, next) => {
  let ApiFeat = new ApiFeature(priceListModel.find(), req.query)

  let results = await ApiFeat.mongooseQuery;
  res.json({ message: "Done", results });

});


const getPriceListById = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let results = await priceListModel.findById(id);
  let message_1 = "No PriceList was found!"
  if(req.query.lang == "ar"){
    message_1 = "لم يتم العثور على اللون!"
  }
  if (!results || results.length === 0) {
    return res.status(404).json({ message: message_1 });
  }


  res.status(200).json({ message: "Done", results });
});
const updatePriceList = catchAsync(async (req, res, next) => {
  let { id } = req.params;

  let updatedPriceList = await priceListModel.findByIdAndUpdate(id, req.body, {
    new: true,userId: req.userId, context: { query: req.query }
  });
  let message_1 = "Couldn't update!  not found!"
  let message_2 = "PriceList updated successfully!"
  if(req.query.lang == "ar"){
    message_1 = "تعذر التحديث! غير موجود!"
    message_2 = "تم تحديث بنجاح!"
  }
  if (!updatedPriceList) {
    return res.status(404).json({ message: message_1});
  }

  res
    .status(200)
    .json({ message: message_2, updatedPriceList });
});
const deletePriceList = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  
  let PriceList = await priceListModel.findByIdAndDelete(id);
  let message_1 = "Couldn't delete! Not found!"
  let message_2 = "PriceList deleted successfully!"
  if(req.query.lang == "ar"){
    message_1 = "لم يتم الحذف! غير موجود!"
    message_2 = "تم حذف بنجاح!"
  }
  if (!PriceList) {
    return res.status(404).json({ message: message_1 });
  }

  res.status(200).json({ message: message_2});
});

export {
  createPriceList,
  getAllPriceList,
  getPriceListById,
  deletePriceList,
  updatePriceList,
};
