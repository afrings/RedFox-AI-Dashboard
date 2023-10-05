import express from 'express';
import cors from 'cors';
import { DBController } from '../utils/utilities';
const app = express();
const corsOptions = {
    origin: 'http://localhost:4000',
    credentials: true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));

const port = 3000;

app.get("/", async(req, res) => {
    try {
        const sessionattr = await DBController.get('testData');
        return res.status(200).send()
    } catch(err) {
        if (err) return res.status(400).send('error');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});