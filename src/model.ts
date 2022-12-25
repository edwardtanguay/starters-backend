import { IStarter, IRawStarter } from './interfaces.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { backendUrl, onlineBackendUrl } from './config.js';
import * as tools from './tools.js';

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

const getOnlineImageUrl = (baseUrl: string, idCode: string, extension: string = 'png') => {
	return `${baseUrl}/images/starters/${idCode}.${extension}`;
}

const createReadmeText = (rawStarter: IRawStarter) => {
	return `
# ${rawStarter.title}

${rawStarter.description}

![grafik](${getOnlineImageUrl(onlineBackendUrl, rawStarter.idCode)})

## features

${rawStarter.featureList.split(';').map(m => `- ${m.trim()}\n`).join('')}

## install

${rawStarter.installText}

## more starters, templates and frameworks

https://starters.tanguay.eu
	`.trim();
}

const getAnimationUrl = (rawStarter: IRawStarter) => {
	const pathAndFileName = `public/images/starters/${rawStarter.idCode}.gif`;
	console.log(pathAndFileName);
	
	const fileExists = tools.fileExists(pathAndFileName);
	if (fileExists) {
		return getOnlineImageUrl(backendUrl, rawStarter.idCode, 'gif');
	} else {
		return '';
	}
}

export const getStarters = (): IStarter[] => {
	const rawStarters: IRawStarter[] = db.data.starters;
	const _starters: IStarter[] = [];
	rawStarters.forEach(rawStarter => {
		const _starter: IStarter = {
			...rawStarter,
			imageUrl: `${getOnlineImageUrl(backendUrl, rawStarter.idCode)}`,
			features: rawStarter.featureList.split(';').map(m => m.trim()),
			readmeText: createReadmeText(rawStarter),
			installLines: rawStarter.installList.split(';').map(m => m.trim()),
			installLines2: rawStarter.installList2.split(';').map(m => m.trim()),
			isFullStack: rawStarter.githubUrl2.trim() !== '',
			animationUrl: getAnimationUrl(rawStarter)
		};
		_starters.push(_starter);
	})
	return _starters;
}
