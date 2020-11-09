import AdmZip from 'adm-zip';
import { exec } from 'child_process';
import fs from 'fs';
import glob from 'glob';
import path from 'path';

const fsUtils = require('nodejs-fs-utils');

function dirCreate(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    return fs.mkdirSync(dirPath, { recursive: true });
  }
  return false;
}

function dirDelete(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    return fs.rmdirSync(dirPath, { recursive: true });
  }
  return false;
}

function dirEmpty(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  return files.length === 0 || (files.length === 1 && files[0] === '.DS_Store');
}

function dirExists(dirPath: string) {
  return fs.existsSync(dirPath);
}

function dirRead(dirPath: string) {
  return glob.sync(dirPath);
}

function dirRename(oldPath: string, newPath:string) {
  return fs.renameSync(oldPath, newPath);
}

function fileCreate(filePath: string, data: any) {
  return fs.writeFileSync(filePath, data);
}

function fileDate(filePath: string) {
  return fs.statSync(filePath).mtime;
}

function fileExec(filePath: string) {
  return fs.chmodSync(filePath, '755');
}

function fileExists(filePath: string) {
  return fs.existsSync(filePath);
}

function fileJsonCreate(filePath: string, data: object) {
  return fileCreate(filePath, JSON.stringify(data, null, 2))
}

function fileJsonLoad(filePath: string) {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath).toString());
  }
  return false;
}

function fileLoad(filePath: string) {
  return fs.readFileSync(filePath);
}

function fileOpen(filePath: string) {
  let command = '';
  switch (process.platform) { 
    case 'darwin' : command = 'open'; break;
    case 'win32' : command = 'start'; break;
    default : command = 'xdg-open'; break;
  }
  return exec(`${command} ${filePath}`);
}

function fileSize(filePath: string) {
  return fsUtils.fsizeSync(filePath);
}

function zipCreate(filesPath:string, zipPath: string) {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  const zip = new AdmZip();
  const pathList = dirRead(filesPath);
  pathList.forEach(pathItem => {
    if (fs.lstatSync(pathItem).isDirectory()) {
      zip.addLocalFolder(pathItem, path.basename(pathItem));
    } else {
      zip.addLocalFile(pathItem);
    }
  });
  return zip.writeZip(zipPath);
}

function zipExtract(content: any, dirPath: string) {
  const zip = new AdmZip(content);
  return zip.extractAllTo(dirPath);
}

export {
  dirCreate, dirDelete, dirEmpty, dirExists, dirRead, dirRename,
  fileCreate, fileDate, fileExec, fileExists, fileJsonCreate, fileJsonLoad, fileLoad, fileOpen, fileSize,
  zipCreate, zipExtract
};
