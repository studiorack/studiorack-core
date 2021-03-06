import AdmZip from 'adm-zip';
import { execSync } from 'child_process';
import fs from 'fs';
import glob from 'glob';
import os from 'os';
import path from 'path';
import { PlatformsSupported } from './types/config';

const fsUtils: any = require('nodejs-fs-utils');
const homeDir: string = os.homedir();

const pluginDirectories: PlatformsSupported = {
  aix: homeDir + '/.vst3',
  android: homeDir + '/.vst3',
  cygwin: homeDir + '/.vst3',
  darwin: '/Library/Audio/Plug-ins/VST3',
  freebsd: homeDir + '/.vst3',
  linux: homeDir + '/.vst3',
  netbsd: homeDir + '/.vst3',
  openbsd: homeDir + '/.vst3',
  sunos: homeDir + '/.vst3',
  win32: '/Program Files/Common Files/VST3',
  win64: '/Program Files/Common Files/VST3',
};

const projectDirectories: PlatformsSupported = {
  aix: homeDir,
  android: homeDir,
  cygwin: homeDir,
  darwin: homeDir,
  freebsd: homeDir,
  linux: homeDir,
  netbsd: homeDir,
  openbsd: homeDir,
  sunos: homeDir,
  win32: homeDir,
  win64: homeDir,
};

function dirCreate(dirPath: string): string | boolean {
  if (!fs.existsSync(dirPath)) {
    console.log('+', dirPath);
    return fs.mkdirSync(dirPath, { recursive: true });
  }
  return false;
}

function dirDelete(dirPath: string): void | boolean {
  if (fs.existsSync(dirPath)) {
    console.log('-', dirPath);
    return fs.rmdirSync(dirPath, { recursive: true });
  }
  return false;
}

function dirEmpty(dirPath: string): boolean {
  const files: string[] = fs.readdirSync(dirPath);
  return files.length === 0 || (files.length === 1 && files[0] === '.DS_Store');
}

function dirExists(dirPath: string): boolean {
  return fs.existsSync(dirPath);
}

function dirIs(dirPath: string): boolean {
  return fs.statSync(dirPath).isDirectory();
}

function dirOpen(dirPath: string): Buffer {
  let command: string = '';
  switch (process.platform) {
    case 'darwin':
      command = 'open';
      break;
    case 'win32':
      command = 'explore';
      break;
    default:
      command = 'xdg-open';
      break;
  }
  console.log('⎋', `${command} "${dirPath}"`);
  return execSync(`${command} "${dirPath}"`);
}

function dirPlugins(): string {
  return pluginDirectories[process.platform];
}

function dirProjects(): string {
  return projectDirectories[process.platform];
}

function dirRead(dirPath: string, options?: any): string[] {
  console.log('⌕', dirPath);
  return glob.sync(dirPath, options);
}

function dirRename(oldPath: string, newPath: string): void {
  return fs.renameSync(oldPath, newPath);
}

function fileAdd(filePath: string, fileName: string, fileType: string, json: any): any {
  if (dirExists(filePath)) {
    // Ensure file type object exists
    if (!json.files[fileType]) {
      json.files[fileType] = {};
    }
    // Add file name
    if (fileName) {
      json.files[fileType].name = fileName;
    }
    // Add file size
    const size: number = fileSize(filePath);
    if (size) {
      json.files[fileType].size = size;
    }
  }
  return json;
}

function fileCreate(filePath: string, data: any): void {
  console.log('+', filePath);
  return fs.writeFileSync(filePath, data);
}

function fileDate(filePath: string): Date {
  return fs.statSync(filePath).mtime;
}

function fileDelete(filePath: string): boolean | void {
  if (fileExists(filePath)) {
    console.log('-', filePath);
    return fs.unlinkSync(filePath);
  }
  return false;
}

function fileExec(filePath: string): void {
  return fs.chmodSync(filePath, '755');
}

function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function fileJsonCreate(filePath: string, data: object): void {
  return fileCreate(filePath, JSON.stringify(data, null, 2));
}

function fileJsonLoad(filePath: string): any {
  if (fs.existsSync(filePath)) {
    console.log('⎋', filePath);
    return JSON.parse(fs.readFileSync(filePath).toString());
  }
  return false;
}

function fileLoad(filePath: string): Buffer {
  console.log('⎋', filePath);
  return fs.readFileSync(filePath);
}

function fileOpen(filePath: string): Buffer {
  let command: string = '';
  switch (process.platform) {
    case 'darwin':
      command = 'open';
      break;
    case 'win32':
      command = 'start';
      break;
    default:
      command = 'xdg-open';
      break;
  }
  console.log('⎋', `${command} "${filePath}"`);
  return execSync(`${command} "${filePath}"`);
}

function fileSize(filePath: string): number {
  return fsUtils.fsizeSync(filePath);
}

function zipCreate(filesPath: string, zipPath: string): void {
  if (fileExists(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  const zip: AdmZip = new AdmZip();
  const pathList: string[] = dirRead(filesPath);
  pathList.forEach((pathItem) => {
    console.log('⎋', pathItem);
    try {
      if (dirIs(pathItem)) {
        zip.addLocalFolder(pathItem, path.basename(pathItem));
      } else {
        zip.addLocalFile(pathItem);
      }
    } catch (error) {
      console.log(error);
    }
  });
  console.log('+', zipPath);
  return zip.writeZip(zipPath);
}

function zipExtract(content: any, dirPath: string): void {
  console.log('⎋', dirPath);
  const zip: AdmZip = new AdmZip(content);
  return zip.extractAllTo(dirPath);
}

export {
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
  dirIs,
  dirOpen,
  dirPlugins,
  dirProjects,
  dirRead,
  dirRename,
  fileAdd,
  fileCreate,
  fileDate,
  fileDelete,
  fileExec,
  fileExists,
  fileJsonCreate,
  fileJsonLoad,
  fileLoad,
  fileOpen,
  fileSize,
  zipCreate,
  zipExtract,
};
