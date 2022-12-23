import express from 'express';
import cors from 'cors';
import * as model from './model.js';
import path from 'path';
import {port} from './config.js';

const __dirname = path.resolve(path.dirname(''));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructionsHtml());
});

app.get('/starters', (req: express.Request, res: express.Response) => {
	res.json(model.getStarters());
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});