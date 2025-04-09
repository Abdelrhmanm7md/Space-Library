import mongoose from "mongoose";
import { removeFiles } from "../../src/utils/removeFiles.js";

const lectureSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "too short lecture name"],
    },
    studyYear: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
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
    price: {
      type: Number,
      required: true,
    },
    gallery: [String],
  },
  { timestamps: true }
);

lectureSchema.post("find", async function (docs) {
  if (!docs.length) return;
  for (const doc of docs) {
    if (!doc.isAvailable) {
      delete doc._doc.gallery;
    }
  }
});

lectureSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter()); // Get the document before deletion

  if (doc && doc.gallery && doc.gallery.length) {
    removeFiles("gallery", doc.gallery); // Ensure this function works correctly
  }

  next(); 
});

lectureSchema.pre(/^find/, function () {
  this.populate("faculty");
  this.populate("subject");
  this.populate("doctor");
});
export const lectureModel = mongoose.model("lecture", lectureSchema);
