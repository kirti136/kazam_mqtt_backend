import mqtt from "mqtt";
import { addTask } from "./redisService";
import dotenv from "dotenv";

dotenv.config();

const client = mqtt.connect(process.env.MQTT_BROKER!);

client.on("connect", () => {
  console.log("✅ MQTT connected");
  client.subscribe("/add/kirti");
});

client.on("message", async (topic, message) => {
  if (topic === "/add/kirti") {
    await addTask(message.toString());
  }
});
