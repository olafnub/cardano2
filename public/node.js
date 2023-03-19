"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const host = 8888;
app.get('/', (req, res) => {
    res.send('Got it!');
});
app.listen(host, () => {
    console.log(`Working response from ${host}`);
});
