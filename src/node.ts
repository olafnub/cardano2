import express, {Express, Request, Response} from "express";

const app: Express = express();
const host = 8888;

app.get('/', (req: Request, res: Response) => {
    res.send('Got it!')
});

app.listen(host, () => {
    console.log(`Working response from ${host}`);
})