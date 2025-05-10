"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.addTask = exports.getTasks = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)({
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
const getTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield redisClient.get("FULLSTACK_TASK_kirti");
        const parsed = data ? JSON.parse(data) : [];
        if (!Array.isArray(parsed)) {
            console.error("Redis data is not an array:", parsed);
            return [];
        }
        return parsed;
    }
    catch (error) {
        console.error("Failed to parse Redis tasks:", error);
        return [];
    }
});
exports.getTasks = getTasks;
const addTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, exports.getTasks)();
    tasks.push(task);
    if (tasks.length >= 50) {
        const mongo = yield Promise.resolve().then(() => __importStar(require("./mongoService")));
        yield mongo.saveTasks(tasks);
        yield redisClient.del("FULLSTACK_TASK_kirti");
    }
    else {
        yield redisClient.set("FULLSTACK_TASK_kirti", JSON.stringify(tasks));
    }
});
exports.addTask = addTask;
