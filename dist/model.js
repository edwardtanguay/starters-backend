import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { backendUrl, onlineBackendUrl } from './config.js';
import * as tools from './tools.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);
await db.read();
export const getApiInstructionsHtml = () => {
    return `
<style>
a, h1 {
	background-color: #ddd;
	font-family: courier;
}
</style>
<h1>STARTERS BACKEND/API</h1>	
<ul>
	<li><a href="starters">/starters</a> - array of starter sites</li>
</ul>
	`;
};
const getOnlineImageUrl = (baseUrl, idCode, extension = 'png') => {
    return `${baseUrl}/images/starters/${idCode}.${extension}`;
};
const getAnimationText = (animationUrl) => {
    if (animationUrl === '') {
        return '';
    }
    else {
        const text = `
		## how the site works

![grafik](${animationUrl})
`;
        return text.trim();
    }
};
const getReadmeText = (rawStarter) => {
    return `
# ${rawStarter.title}

${rawStarter.description}

![grafik](${getOnlineImageUrl(onlineBackendUrl, rawStarter.idCode)})

## features

${rawStarter.featureMarkdown}

${rawStarter.installMarkdown}

## more starters, templates and frameworks

https://starters.tanguay.eu
	`.trim();
};
const getAnimationUrl = (rawStarter) => {
    const pathAndFileName = `public/images/starters/${rawStarter.idCode}.gif`;
    const fileExists = tools.fileExists(pathAndFileName);
    if (fileExists) {
        return getOnlineImageUrl(backendUrl, rawStarter.idCode, 'gif');
    }
    else {
        return '';
    }
};
const getUpdowngradeItems = (rawStarter) => {
    if (rawStarter.updowngradeList.trim() !== '') {
        const updowngradeItems = [];
        // "remove dark color|plainSite; add React Router menu|darkViteSimpleMenu"
        const itemLines = rawStarter.updowngradeList.split(';').map(m => m.trim());
        itemLines.forEach(itemLine => {
            const parts = itemLine.split('|').map(m => m.trim());
            const updowngradeItem = {
                text: parts[0],
                idCode: parts[1]
            };
            updowngradeItems.push(updowngradeItem);
        });
        return updowngradeItems;
    }
    else {
        return [];
    }
};
const getLearningMaterialItems = (rawStarter) => {
    if (rawStarter.learningMaterialList.trim() !== '') {
        const learningMaterialItems = [];
        // "HOWTO: Implement useContext in an app with multiple pages and data sources|https://edwardtanguay.vercel.app/howtos?id=636"
        const itemLines = rawStarter.learningMaterialList.split(';').map(m => m.trim());
        itemLines.forEach(itemLine => {
            const parts = itemLine.split('|').map(m => m.trim());
            const learningMaterialItem = {
                title: parts[0],
                url: parts[1]
            };
            learningMaterialItems.push(learningMaterialItem);
        });
        return learningMaterialItems;
    }
    else {
        return [];
    }
};
const getExternalForkItems = (rawStarter) => {
    if (rawStarter.externalForkList.trim() !== '') {
        const externalForkItems = [];
        // "externalForkList": "Add bcrypt and cryptr to protect admin and MongoDB passwords|https://github.com/edwardtanguay/merncrud022-backend",
        const itemLines = rawStarter.externalForkList.split(';').map(m => m.trim());
        itemLines.forEach(itemLine => {
            const parts = itemLine.split('|').map(m => m.trim());
            const externalForkItem = {
                title: parts[0],
                url: parts[1]
            };
            externalForkItems.push(externalForkItem);
        });
        return externalForkItems;
    }
    else {
        return [];
    }
};
const getTodoItems = (rawStarter) => {
    if (rawStarter.todoList.trim() !== '') {
        // "put class names on each page;add 404 fixes"
        const todoItems = rawStarter.todoList.split(';').map(m => m.trim());
        return todoItems;
    }
    else {
        return [];
    }
};
export const getStarters = () => {
    const rawStarters = db.data.starters;
    const _starters = [];
    rawStarters.forEach(rawStarter => {
        const _starter = {
            ...rawStarter,
            imageUrl: `${getOnlineImageUrl(backendUrl, rawStarter.idCode)}`,
            isFullStack: rawStarter.githubUrl2.trim() !== '',
            readmeText: getReadmeText(rawStarter),
            updowngradeItems: getUpdowngradeItems(rawStarter),
            learningMaterialItems: getLearningMaterialItems(rawStarter),
            todoItems: getTodoItems(rawStarter),
            externalForkItems: getExternalForkItems(rawStarter)
        };
        _starters.push(_starter);
    });
    return _starters;
};
//# sourceMappingURL=model.js.map