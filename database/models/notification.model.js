import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    lecture: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

notificationSchema.pre(/^find/, function () {
  this.populate("student");
});

export const notificationModel = mongoose.model("notification", notificationSchema);
