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
    return fs.mkdirSync(dirPath, { recursive: true });
  }
  return false;
}

function dirDelete(dirPath: string): void | boolean {
  if (fs.existsSync(dirPath)) {
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

function dirPlugins(): string {
  return pluginDirectories[process.platform];
}

function dirProjects(): string {
  return projectDirectories[process.platform];
}

function dirRead(dirPath: string, options?: any): string[] {
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
  return fs.writeFileSync(filePath, data);
}

function fileDate(filePath: string): Date {
  return fs.statSync(filePath).mtime;
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
    return JSON.parse(fs.readFileSync(filePath).toString());
  }
  return false;
}

function fileLoad(filePath: string): Buffer {
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
  return execSync(`${command} "${filePath}"`);
}

function fileSize(filePath: string): number {
  return fsUtils.fsizeSync(filePath);
}

function zipCreate(filesPath: string, zipPath: string): void {
  if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
  }
  const zip: AdmZip = new AdmZip();
  const pathList: string[] = dirRead(filesPath);
  pathList.forEach((pathItem) => {
    if (fs.lstatSync(pathItem).isDirectory()) {
      zip.addLocalFolder(pathItem, path.basename(pathItem));
    } else {
      zip.addLocalFile(pathItem);
    }
  });
  return zip.writeZip(zipPath);
}

function zipExtract(content: any, dirPath: string): void {
  const zip: AdmZip = new AdmZip(content);
  return zip.extractAllTo(dirPath);
}

export {
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
  dirPlugins,
  dirProjects,
  dirRead,
  dirRename,
  fileAdd,
  fileCreate,
  fileDate,
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
