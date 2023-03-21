import express, {Express, Request, Response} from "express";
const app: Express = express();
const port = process.env.PORT || 8888;

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Working on port: ${port}!`);
})

app.get('/', function(req: Request, res: Response) {
    res.sendFile('index.html');
})
