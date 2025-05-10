"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMongoTasks = exports.saveTasks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Task_1 = __importDefault(require("../models/Task"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default
    .connect(process.env.MONGO_URI, {
    dbName: "assignment",
})
    .then(() => {
    console.log("✅ Connected to MongoDB");
})
    .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});
const saveTasks = (tasks) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formattedTasks = tasks.map((text) => ({ text }));
        yield Task_1.default.insertMany(formattedTasks);
    }
    catch (error) {
        throw new Error("Error saving tasks to MongoDB");
    }
});
exports.saveTasks = saveTasks;
const fetchMongoTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find().lean();
        return tasks;
    }
    catch (error) {
        throw new Error("Failed to fetch tasks from MongoDB");
    }
});
exports.fetchMongoTasks = fetchMongoTasks;
