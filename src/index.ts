import express, {Request, Response} from 'express'
import {videosRouter} from "./router/videos-router";
const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});
app.use('/videos', videosRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});