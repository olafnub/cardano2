import dotenv from 'dotenv';
import express, {Express, Request, Response} from "express";
import mongoose, {connect} from "mongoose";
import reviewsExport from '../src/reviews';
import adminExport from '../src/admin';
import cors from 'cors';
import bcrypt from 'bcrypt';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8888;
const saltRounds = 7;

mongoose.set('strictQuery', false)
const connectDB = async ()=> {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL!); // not undefined & is a string
        console.log(`Mongo Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

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
        username: req.body.username,
        description: req.body.description,
        time: year + "-" + month + "-" + date
    }
    new reviewsExport(user).save();
    res.redirect('back');
});

app.post('/admin', async (req: Request, res: Response) => {
    // Create a new username plus password
    // bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    //     const loginInfo = {
    //         username: req.body.username,
    //         password: hash
    //     }
    //     new adminExport(loginInfo).save();
    // })
    // Compare user login to correct login
    let obj = {
        renderSwitch: "false", 
    }
    try {
        const pass = await adminExport.findOne({username: req.body.username});
        if (pass != null) {
            bcrypt.compare(req.body.password, pass.password,(err, result) => {
                if (result == true) {
                    obj.renderSwitch = "true";
                    res.render('adminhome');
                }
            });
        }
        else {
            res.send("Try again");
        }
    }
    catch {
        return console.log("wrong username or password")
    }
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
});
