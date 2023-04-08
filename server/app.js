"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// import reviewsExport from '../public/src/reviews'
console.log('hiw');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// var __dirname = 'public';
mongoose_1.default.connect(process.env.DATABASE_URL).then(() => console.log('Mongoose running!')).catch((err) => console.log('error from mongoose ', err));
// app.set('views', './views')
// app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/index.html', (req, res) => {
    const user = {
        username: req.body.username,
        description: req.body.description
    };
    // new reviewsExport(user).save();
    // res.redirect('/merch.html');
    //    res.send(user);
});
app.post('/nodejs', (req, res) => {
    // console.dir("express");
    // res.send(express);
});
// app.get('*/:all', (req, res) => {
//     const {all} = req.params;
//     // const all = 'hi';
//     res.send(`<h1>Sorry can't find ${all}</h1>`);
// })
app.listen(port, () => {
    console.log(`Working on port: ${port}!`);
});
