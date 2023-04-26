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
const bad_words_1 = __importDefault(require("bad-words"));
const bad_words_json_1 = __importDefault(require("../bad-words.json")); //https://www.cs.cmu.edu/~biglou/resources/
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const filter = new bad_words_1.default();
filter.addWords(...bad_words_json_1.default);
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => console.log("Mongoose Connected!"))
    .catch((err) => console.log("error from mongoose", err));
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index.html');
});
app.get('/merch', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviews_1.default.find({});
    // res.render('merch', {reviews});
    res.render('merch');
}));
app.post('/submit', (req, res) => {
    const ts = Date.now();
    const date_time = new Date(ts);
    const date = date_time.getDate();
    const month = date_time.getMonth() + 1;
    const year = date_time.getFullYear();
    const user = {
        username: filter.clean(req.body.username),
        description: filter.clean(req.body.description),
        time: year + "-" + month + "-" + date
    };
    new reviews_1.default(user).save();
    res.redirect('back');
});
app.get('*/:all', (req, res) => {
    const { all } = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});
app.listen(port, () => {
    console.log(`Working on port: ${port}!`);
});
