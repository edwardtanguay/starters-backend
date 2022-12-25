import fs from 'fs';
import path from 'path';
import os from 'os';
import * as tools from './tools.js';

const __dirname = path.resolve(path.dirname(''));

const absolutifyPathAndFileName = (pathAndFileName: string) => {
	if (tools.operationSystemIsLinux()) {
		return __dirname + '/' + pathAndFileName;
	} else {
		return __dirname + '\\' + pathAndFileName.replace(/\//g, '\\');
	}
}

export const operationSystemIsLinux = () => {
	return os.platform() === 'linux';
}

// datapod: qtools
/**
 * Takes an area of (database) items and returns the next id for an add item.
 */
export const getNextId = (items: any[]) => {
	const highestId = items.reduce((acc: number, item: any) => {
		if (item.id > acc) {
			acc = item.id;
		}
		return acc;
	}, 0);
	return highestId + 1;
}

export const fileExists = (pathAndFileName: string) => {
	const absolutePathAndFileName = absolutifyPathAndFileName(pathAndFileName);

	console.log(absolutePathAndFileName);

	return fs.existsSync(absolutePathAndFileName);
}
