import dotenv from 'dotenv';
import express, {Express, Request, Response} from "express";
import mongoose, {connect} from "mongoose";
import reviewsExport from '../src/reviews';
import Filter from "bad-words";
// const badWordsFilter = require('../public/dist/src/badwords');
import words from "../bad-words.json" //https://www.cs.cmu.edu/~biglou/resources/
import cors from 'cors';

const filter = new Filter();

filter.addWords(...words);
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL!)
.then(() => console.log("Mongoose Connected!"))
.catch((err) => console.log("error from mongoose", err));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use("/", require("../../../routes/route.js"));

// Enable cors
app.use(cors());

app.post('/submit', (req: Request, res: Response) => {

    const ts = Date.now(); 
    const date_time = new Date(ts);
    const date = date_time.getDate();
    const month = date_time.getMonth() + 1;
    const year = date_time.getFullYear();

    const user = {
        username: filter.clean(req.body.username),
        description: filter.clean(req.body.description),
        time: year + "-" + month + "-" + date
    }
    new reviewsExport(user).save();
    res.redirect('back');
});

app.listen(port, () => {
    console.log(`Working on port: ${port}!`);
});