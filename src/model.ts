import { IStarter, IRawStarter, IUpdowngradeItem, ILearningMaterialItem } from './interfaces.js';
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

const getAnimationText = (animationUrl: string) => {
	if (animationUrl === '') {
		return '';
	} else {
		const text = `
		## how the site works

![grafik](${animationUrl})
`;
		return text.trim();
	}
}

const getReadmeText = (rawStarter: IRawStarter) => {
	return `
# ${rawStarter.title}

${rawStarter.description}

![grafik](${getOnlineImageUrl(onlineBackendUrl, rawStarter.idCode)})

## features

${rawStarter.featureList.split(';').map(m => `- ${m.trim()}\n`).join('')}
${rawStarter.installText}

## more starters, templates and frameworks

https://starters.tanguay.eu
	`.trim();
}

const getAnimationUrl = (rawStarter: IRawStarter) => {
	const pathAndFileName = `public/images/starters/${rawStarter.idCode}.gif`;
	const fileExists = tools.fileExists(pathAndFileName);
	if (fileExists) {
		return getOnlineImageUrl(backendUrl, rawStarter.idCode, 'gif');
	} else {
		return '';
	}
}

const getUpdowngradeItems = (rawStarter: IRawStarter) => {
	if (rawStarter.updowngradeList.trim() !== '') {
		const updowngradeItems: IUpdowngradeItem[] = [];
		// "remove dark color|plainSite; add React Router menu|darkViteSimpleMenu"
		const itemLines = rawStarter.updowngradeList.split(';').map(m => m.trim());
		itemLines.forEach(itemLine => {
			const parts = itemLine.split('|').map(m => m.trim());
			const updowngradeItem: IUpdowngradeItem = {
				text: parts[0],
				idCode: parts[1]
			}
			updowngradeItems.push(updowngradeItem);
		});
		return updowngradeItems;
	} else {
		return [];
	}
}

const getLearningMaterialItems = (rawStarter: IRawStarter) => {
	if (rawStarter.learningMaterialList.trim() !== '') {
		const learningMaterialItems: ILearningMaterialItem[] = [];
		// "HOWTO: Implement useContext in an app with multiple pages and data sources|https://edwardtanguay.vercel.app/howtos?id=636"
		const itemLines = rawStarter.learningMaterialList.split(';').map(m => m.trim());
		itemLines.forEach(itemLine => {
			const parts = itemLine.split('|').map(m => m.trim());
			const learningMaterialItem: ILearningMaterialItem = {
				title: parts[0],
				url: parts[1]
			}
			learningMaterialItems.push(learningMaterialItem);
		});
		return learningMaterialItems;
	} else {
		return [];
	}
}

const getTodoItems = (rawStarter: IRawStarter) => {
	if (rawStarter.todoList.trim() !== '') {
		// "put class names on each page;add 404 fixes"
		const todoItems = rawStarter.todoList.split(';').map(m => m.trim());
		return todoItems;
	} else {
		return [];
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
			isFullStack: rawStarter.githubUrl2.trim() !== '',
			animationUrl: getAnimationUrl(rawStarter),
			readmeText: getReadmeText(rawStarter),
			updowngradeItems: getUpdowngradeItems(rawStarter),
			learningMaterialItems: getLearningMaterialItems(rawStarter),
			todoItems: getTodoItems(rawStarter)
		};
		_starters.push(_starter);
	})
	return _starters;
}
