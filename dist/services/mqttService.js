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
const mqtt_1 = __importDefault(require("mqtt"));
const redisService_1 = require("./redisService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = mqtt_1.default.connect(process.env.MQTT_BROKER);
client.on("connect", () => {
    console.log("✅ MQTT connected");
    client.subscribe("/add/kirti");
});
client.on("message", (topic, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (topic === "/add/kirti") {
        yield (0, redisService_1.addTask)(message.toString());
    }
}));
