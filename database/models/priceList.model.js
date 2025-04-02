import mongoose from "mongoose";

const priceListSchema = mongoose.Schema(
  {
    area: {
      type: String,
      required: [true, "area is a required field."],
    },
    price: {
      type: Number,
      required: [true, "price is a required field."],
    },
  },
  { timestamps: true }
);

export const priceListModel = mongoose.model("priceList", priceListSchema);
