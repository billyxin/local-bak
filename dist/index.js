"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const f = __importStar(require("billyxin-files"));
const db_json_1 = __importDefault(require("./db.json"));
const dirName = 'shortkeys';
let countFilesChanged = 0;
function copies() {
    let t = Date.now();
    db_json_1.default.toDirs0.forEach((dirRoot) => {
        let dir_dest = path_1.default.join(dirRoot, dirName);
        let n = f.copyFiles(db_json_1.default.fromFiles, dir_dest);
        countFilesChanged += n;
    });
    t = (Date.now() - t) / 1000;
    console.log('Copies Time Used: ' + t);
}
function backups() {
    let t = Date.now();
    db_json_1.default.toDirs.forEach((pathDest) => {
        db_json_1.default.fromDirs.forEach((pathFrom) => {
            f.copyDir({ src: pathFrom, dest: path_1.default.join(pathDest, path_1.default.basename(pathFrom)), ignores: db_json_1.default.ignores }, true, (n) => {
                countFilesChanged += n;
            });
        });
    });
    t = (Date.now() - t) / 1000;
    console.log('Backups Time Used: ' + t);
}
function backups2() {
    let t = Date.now();
    db_json_1.default.toDirs2.forEach((pathDest) => {
        f.copyDir({ src: db_json_1.default.toDirs[0], dest: pathDest, ignores: db_json_1.default.ignores }, true, (n) => {
            countFilesChanged += n;
        });
    });
    t = (Date.now() - t) / 1000;
    console.log('Backups Time Used: ' + t);
}
let t = Date.now();
console.log('-------------- Copies Start ---------------');
copies();
console.log('--------------- Copies End ----------------');
console.log('-------------- Backup1 Start --------------');
backups();
console.log('--------------- Backup1 End ---------------');
console.log('-------------- Backup2 Start --------------');
backups2();
console.log('--------------- Backup2 End ---------------');
t = (Date.now() - t) / 1000;
console.log('===========================================');
console.log(' ');
console.log('            All Time Used:  ' + t.toFixed(2) + 's');
console.log('         All Files Copied:  ' + countFilesChanged);
console.log('          Average Files/s:  ' + (countFilesChanged / t).toFixed(1));
console.log(' ');
console.log('===========================================');
//# sourceMappingURL=index.js.map