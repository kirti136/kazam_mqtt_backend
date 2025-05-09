import mongoose from "mongoose";
import Task from "../models/Task";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI!, {
    dbName: "assignment",
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

export const saveTasks = async (tasks: string[]) => {
  await Task.insertMany(tasks.map((text) => ({ text })));
};

export const fetchMongoTasks = async (): Promise<{ text: string }[]> => {
  return Task.find().lean();
};
