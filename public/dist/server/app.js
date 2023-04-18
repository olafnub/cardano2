"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const reviews_1 = __importDefault(require("../src/reviews"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
mongoose_1.default.connect(process.env.DATABASE_URL).then(() => console.log('Mongoose running!')).catch((err) => console.log('error from mongoose ', err));
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/reviews', (req, res) => {
    const user = {
        username: req.body.username,
        description: req.body.description
    };
    new reviews_1.default(user).save();
});
app.get('*/:all', (req, res) => {
    const { all } = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});
app.listen(port, () => {
    console.log(`Working on port: ${port}!`);
});
