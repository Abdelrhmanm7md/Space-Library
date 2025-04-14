import mongoose from "mongoose";
import { lectureModel } from "./lecture.model.js";
import { subjectModel } from "./subject.model.js";

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
    },
  },
  { timestamps: true }
);

doctorSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter()); // Get the document before deletion

  if (doc) {
    await lectureModel.deleteMany({
      doctor: doc._id,
    });
    await subjectModel.updateMany(
      { doctors: doc._id },
      { $pull: { doctors: doc._id } }
    );
  }

  next();
});

export const doctorModel = mongoose.model("doctor", doctorSchema);
