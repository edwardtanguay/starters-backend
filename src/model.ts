import { IStarter} from './interfaces.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db: any = new Low(adapter);
await db.read();

export const getApiInstructionsHtml = () => {
	return `
<style>
a, h1 {
	background-color: #ddd;
	font-family: courier;
}
</style>
<h1>STARTERS API</h1>	
<ul>
	<li><a href="starters">/starters</a> - array of starter sites</li>
</ul>
	`;
}

export const getStarters = (): IStarter[] => {
	const _starters: IStarter[] = db.data.starters;
	return _starters;
}
