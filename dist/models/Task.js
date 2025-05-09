"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
const Task = mongoose_1.default.model("assignment_kirti", taskSchema);
exports.default = Task;
