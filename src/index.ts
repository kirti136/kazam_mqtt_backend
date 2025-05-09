import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import "./services/mqttService";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
