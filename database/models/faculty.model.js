import mongoose from "mongoose";

const facultySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameAR: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const facultyModel = mongoose.model("faculty", facultySchema);
