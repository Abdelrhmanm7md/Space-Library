import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lecture",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zone:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"priceList",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
    },
    deliveryPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["processing", "done"],
      default: "processing",
    },
    paymentStatus: {
      type: String,
      enum: ["cash", "card"],
    },
  },
  { timestamps: true }
);


orderSchema.pre(/^find/, function () {
  this.populate("lecture");
  this.populate("student");
  this.populate("doctor");
});
export const orderModel = mongoose.model("order", orderSchema);
