import { IStarter, IRawStarter } from './interfaces.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import {fullBackendUrl} from './config.js';

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
	const rawStarters: IRawStarter[] = db.data.starters;
	const _starters: IStarter[] = [];
	rawStarters.forEach(rawStarter => {
		const _starter:IStarter = {
			...rawStarter,
			imageUrl: `${fullBackendUrl}/images/starters/${rawStarter.idCode}.png`  
		};
		_starters.push(_starter);
	})
	return _starters;
}
