import { Request, Response } from "express";
import { getTasks } from "../services/redisService";
import { fetchMongoTasks } from "../services/mongoService";

export const fetchAllTasks = async (req: Request, res: Response) => {
  const redisTasks = await getTasks();
  const mongoTasks = await fetchMongoTasks();

  console.log("MONFOGOGO::", mongoTasks);
  console.log("REDISSSS:::", redisTasks);

  const allTasks = [...redisTasks, ...mongoTasks.map((t) => t.text)];
  res.json(allTasks);
};
