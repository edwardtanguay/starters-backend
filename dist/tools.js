import fs from 'fs';
import path from 'path';
import os from 'os';
import * as tools from './tools.js';
const __dirname = path.resolve(path.dirname(''));
const absolutifyPathAndFileName = (pathAndFileName) => {
    if (tools.operatingSystemIsLinux()) {
        return __dirname + '/' + pathAndFileName;
    }
    else {
        return __dirname + '\\' + pathAndFileName.replace(/\//g, '\\');
    }
};
export const operatingSystemIsLinux = () => {
    return os.platform() === 'linux';
};
// datapod: qtools
/**
 * Takes an area of (database) items and returns the next id for an add item.
 */
export const getNextId = (items) => {
    const highestId = items.reduce((acc, item) => {
        if (item.id > acc) {
            acc = item.id;
        }
        return acc;
    }, 0);
    return highestId + 1;
};
export const fileExists = (pathAndFileName) => {
    const absolutePathAndFileName = absolutifyPathAndFileName(pathAndFileName);
    return fs.existsSync(absolutePathAndFileName);
};
//# sourceMappingURL=tools.js.map