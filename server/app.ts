import dotenv from 'dotenv';
import express, {Express, Request, Response} from "express";
import mongoose, {connect} from "mongoose";
import reviewsExport from '../src/reviews';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL!)
.then(() => console.log("Mongoose Connected!"))
.catch((err) => console.log("error from mongoose", err));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function(req: Request, res: Response) {
    res.render('index');
});

app.post('/submit', (req: Request, res: Response) => {
    const ts = Date.now(); 
    const date_time = new Date(ts);
    const date = date_time.getDate();
    const month = date_time.getMonth() + 1;
    const year = date_time.getFullYear();

    const user = {
        username: req.body.username,
        description: req.body.description,
        time: year + "-" + month + "-" + date
    }
    new reviewsExport(user).save();
    res.redirect('back');
});

app.get('/reviews', async (req, res) => {
    const reviews = await reviewsExport.find({});
    const endLi = "</li>";
    let htmlList = "<ul>"

    for (let i = 0; i < reviews.length; i++) {
        let li = "<li>";
        let mame = String(reviews[i].username);
        li+=mame;
        li+=endLi;
        htmlList+=li;
    }

    const htmlEndList = "</ul>"
    htmlList+=htmlEndList;
    res.send(htmlList);
});

app.get('*/:all', (req, res) => {
    const {all} = req.params;
    res.send(`<h1>Sorry can't find ${all}</h1>`);
});

app.listen(port, () => {
    console.log(`Working on port: ${port}!`);
});