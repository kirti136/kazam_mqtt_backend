import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Task = mongoose.model("assignment_kirti", taskSchema);

export default Task;
