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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const reviews_1 = __importDefault(require("../src/reviews"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => console.log("Mongoose Connected!"))
    .catch((err) => console.log("error from mongoose", err));
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/submit', (req, res) => {
    const ts = Date.now();
    const date_time = new Date(ts);
    const date = date_time.getDate();
    const month = date_time.getMonth() + 1;
    const year = date_time.getFullYear();
    const user = {
        username: req.body.username,
        description: req.body.description,
        time: year + "-" + month + "-" + date
    };
    new reviews_1.default(user).save();
    res.redirect('back');
});
app.get('/reviews', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviews_1.default.find({});
    const endLi = "</li>";
    let htmlList = "<ul>";
    for (let i = 0; i < reviews.length; i++) {
        let li = "<li>";
        let mame = String(reviews[i].username);
        li += mame;
        li += endLi;
        htmlList += li;
    }
    const htmlEndList = "</ul>";
    htmlList += htmlEndList;
    res.send(htmlList);
}));
app.get('*/:all', (req, res) => {
    const { all } = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});
app.listen(port, () => {
    console.log(`Working on port: ${port}!`);
});
