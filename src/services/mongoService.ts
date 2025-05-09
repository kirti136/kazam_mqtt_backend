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
  try {
    const formattedTasks = tasks.map((text) => ({ text }));
    await Task.insertMany(formattedTasks);
  } catch (error) {
    throw new Error("Error saving tasks to MongoDB");
  }
};

export const fetchMongoTasks = async (): Promise<{ text: string }[]> => {
  try {
    const tasks = await Task.find().lean();
    return tasks;
  } catch (error) {
    throw new Error("Failed to fetch tasks from MongoDB");
  }
};
