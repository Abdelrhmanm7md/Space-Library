import mongoose from "mongoose";

const lectureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "too short lecture name"],
    },
    studyYear: {
      type: String,
      enum: ["one", "two", "three", "four", "five"],
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faculty",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
    gallery: [String],
  },
  { timestamps: true }
);


export const lectureModel = mongoose.model("lecture", lectureSchema);
