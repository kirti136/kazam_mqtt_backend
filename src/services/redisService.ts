import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

redisClient
  .connect()
  .then(() => {
    console.log("✅ Connected to Redis");
  })
  .catch((err) => {
    console.error("❌ Redis connection failed:", err);
  });

export const getTasks = async (): Promise<string[]> => {
  try {
    const data = await redisClient.get("FULLSTACK_TASK_kirti");
    const parsed = data ? JSON.parse(data) : [];
    return parsed;
  } catch (error) {
    throw new Error("Failed to retrieve tasks from Redis");
  }
};

export const addTask = async (task: string): Promise<void> => {
  try {
    const tasks = await getTasks();
    tasks.push(task);

    if (tasks.length >= 5) {
      const mongo = await import("./mongoService");
      await mongo.saveTasks(tasks);
      await redisClient.del("FULLSTACK_TASK_kirti");
    } else {
      await redisClient.set("FULLSTACK_TASK_kirti", JSON.stringify(tasks));
    }
  } catch (error) {
    throw new Error("Failed to add task");
  }
};
