import { Request, Response } from "express";
import { getTasks } from "../services/redisService";
import { fetchMongoTasks } from "../services/mongoService";

export const fetchAllTasks = async (req: Request, res: Response) => {
  try {
    const redisTasks = await getTasks();
    const mongoTasks = await fetchMongoTasks();

    const allTasks = [...redisTasks, ...mongoTasks.map((t) => t.text)];
    res.status(200).json({ success: true, data: allTasks });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};
