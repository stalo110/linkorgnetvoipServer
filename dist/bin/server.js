"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("../app"));
const http_1 = require("http");
const port = parseInt(process.env.PORT || "4000", 10);
const server = (0, http_1.createServer)(app_1.default);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
