import express from 'express';
import cors from 'cors';
import * as model from './model.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructionsHtml());
});

app.get('/starters', (req: express.Request, res: express.Response) => {
	res.json(model.getStarters());
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});