"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const FS = require("fs");
function getFiles(dir, onlyCurrent = false) {
    let apiDir = getApiDir();
    if (!Path.isAbsolute(dir)) {
        dir = Path.join(apiDir, dir);
    }
    if (!FS.existsSync(dir)) {
        console.error(`dir ${dir} is not a valid path`);
        return;
    }
    let files = FS.readdirSync(dir);
    if (onlyCurrent) {
        return files.filter(value => value.endsWith('.js') && FS.lstatSync(value).isFile);
    }
    let results = new Array();
    files.forEach(file => {
        let filePath = Path.join(dir, file);
        let stat = FS.lstatSync(filePath);
        if (stat.isDirectory()) {
            results = [...results, ...getFiles(filePath)];
        }
        else if (stat.isFile() && file.endsWith('.js')) {
            results.push(filePath);
        }
    });
    return results;
}
exports.getFiles = getFiles;
;
function getApiDir() {
    return Path.resolve(__dirname, "../");
}
exports.getApiDir = getApiDir;
//# sourceMappingURL=fileUtil.js.map