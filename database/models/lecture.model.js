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

lectureSchema.post("find", async function (docs) {
  if (!docs.length) return;
  for (const doc of docs) {
    if (!doc.isAvailable) {
      delete doc._doc.gallery;
    }
  }
});

lectureSchema.pre(
  /^delete/,
  { document: false, query: true },
  async function () {
    const doc = await this.model.findOne(this.getFilter());
    if (doc) {
        if(doc.gallery){
          removeFiles("gallery", doc.gallery);
        }
    }
  }
);

lectureSchema.pre(/^find/, function () {
  this.populate("faculty");
  this.populate("subject");
  this.populate("doctor");
});
export const lectureModel = mongoose.model("lecture", lectureSchema);
