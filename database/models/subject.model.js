import mongoose from "mongoose";

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "too short subject name"],
    },
    studyYear: {
      type: String,
      enum: ["one", "two", "three", "four", "five"],
      required: true,
    },
    term: {
      type: String,
      enum: ["first", "second",],
      required: true,
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "faculty",
      required: true,
    },
    doctors: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "doctor",
      required: true,
    },
    isFirstTerm: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


export const subjectModel = mongoose.model("subject", subjectSchema);
