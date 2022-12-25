import fs from 'fs';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

const absolutifyPathAndFileName = (pathAndFileName: string) => {
	return __dirname + '\\' + pathAndFileName.replace(/\//g, '\\');
}

// datapod: qtools
/**
 * Takes an area of (database) items and returns the next id for an add item.
 */
export const getNextId = (items:any[]) => {
	const highestId = items.reduce((acc: number, item: any) => {
		if (item.id > acc) {
			acc = item.id;
		}
		return acc;
	}, 0);
	return highestId + 1;
}

export const fileExists = (pathAndFileName: string) => {
	const absolutePathAndFileName =  absolutifyPathAndFileName(pathAndFileName);
	return fs.existsSync(absolutePathAndFileName);
}
