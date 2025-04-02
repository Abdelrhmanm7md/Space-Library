import mongoose from "mongoose";

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "too short doctor name"],
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faculty",
      required: true,
    },
    subjects: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "subject",
      required: true,
    },
  },
  { timestamps: true }
);


export const doctorModel = mongoose.model("doctor", doctorSchema);
