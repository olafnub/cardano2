"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const reviews_1 = __importDefault(require("../src/reviews"));
const bad_words_1 = __importDefault(require("bad-words"));
// const badWordsFilter = require('../public/dist/src/badwords');
const bad_words_json_1 = __importDefault(require("../bad-words.json")); //https://www.cs.cmu.edu/~biglou/resources/
const cors_1 = __importDefault(require("cors"));
const filter = new bad_words_1.default();
filter.addWords(...bad_words_json_1.default);
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => console.log("Mongoose Connected!"))
    .catch((err) => console.log("error from mongoose", err));
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.set('view engine', 'ejs');
app.use("/", require("../../../routes/route.js"));
// Enable cors
app.use((0, cors_1.default)());
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
