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
      enum: ["1", "2", "3", "4", "5"],
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
    },
  },
  { timestamps: true }
);

subjectSchema.pre(/^find/, function () {
  this.populate("faculty");
  this.populate("doctors");
});

export const subjectModel = mongoose.model("subject", subjectSchema);
