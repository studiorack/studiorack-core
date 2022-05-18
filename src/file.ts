import AdmZip from 'adm-zip';
import { execFileSync, execSync } from 'child_process';
import fs from 'fs';
import glob from 'glob';
import os from 'os';
import path from 'path';
import { PlatformsSupported } from './types/config';

const fsUtils: any = require('nodejs-fs-utils');

const pluginDirectories: PlatformsSupported = {
  aix: '/usr/local/lib',
  android: '/usr/local/lib',
  cygwin: '/usr/local/lib',
  darwin: `${os.homedir()}/Library/Audio/Plug-ins`,
  freebsd: '/usr/local/lib',
  linux: '/usr/local/lib',
  netbsd: '/usr/local/lib',
  openbsd: '/usr/local/lib',
  sunos: '/usr/local/lib',
  win32: '/Program Files (x86)/Common Files',
  win64: '/Program Files/Common Files',
};

function dirAppData(): string {
  if (process.env.APPDATA) {
    return process.env.APPDATA;
  } else if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Preferences');
  }
  return path.join(os.homedir(), '.local', 'share');
}

function dirContains(dirParent: string, dirChild: string): boolean {
  const relative = path.relative(dirParent, dirChild);
  return relative && !relative.startsWith('..') && !path.isAbsolute(relative) ? true : false;
}

function dirCreate(dirPath: string): string | boolean {
  if (!dirExists(dirPath)) {
    console.log('+', dirPath);
    fs.mkdirSync(dirPath, { recursive: true });
    return dirPath;
  }
  return false;
}

function dirDelete(dirPath: string): void | boolean {
  if (dirExists(dirPath)) {
    console.log('-', dirPath);
    return fs.rmSync(dirPath, { recursive: true });
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

function dirMove(dirPath: string, newPath: string): void | boolean {
  if (dirExists(dirPath)) {
    console.log('-', dirPath);
    console.log('+', newPath);
    return fsUtils.moveSync(dirPath, newPath);
  }
  return false;
}

function dirOpen(dirPath: string): Buffer {
  if (process.env.CI) return new Buffer('');
  let command: string = '';
  switch (process.platform) {
    case 'darwin':
      command = 'open';
      break;
    case 'win32':
      command = 'start ""';
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
  // Windows throws permissions errors if you scan hidden folders
  // Therefore setting Windows to a more specific path
  if (process.platform === 'win32') {
    return path.join(os.homedir(), 'Documents', 'Audio');
  }
  return path.join(os.homedir(), 'Documents');
}

function dirRead(dirPath: string, options?: any): string[] {
  console.log('⌕', dirPath);
  // Glob returns relative paths with forward slashes on Windows
  // Convert every path to a Windows compatible path
  // https://github.com/isaacs/node-glob/issues/419
  if (process.platform === 'win32') {
    return glob.sync(dirPath, options).map((subDirPath: string) => {
      return subDirPath.split('/').join(path.sep);
    });
  }
  return glob.sync(dirPath, options);
}

function dirRename(oldPath: string, newPath: string): void | boolean {
  if (dirExists(oldPath)) {
    return fsUtils.moveSync(oldPath, newPath);
  }
  return false;
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

function fileCreate(filePath: string, data: string | Buffer): void {
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
  if (fileExists(filePath)) {
    console.log('⎋', filePath);
    return JSON.parse(fs.readFileSync(filePath).toString());
  }
  return false;
}

function fileLoad(filePath: string): Buffer {
  console.log('⎋', filePath);
  return fs.readFileSync(filePath);
}

function fileMove(dirPath: string, newPath: string): void | boolean {
  if (fileExists(dirPath)) {
    console.log('-', dirPath);
    console.log('+', newPath);
    return fsUtils.moveSync(dirPath, newPath);
  }
  return false;
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

function isAdmin(): boolean {
  if (process.platform === 'win32') {
    try {
      execFileSync('net', ['session'], { stdio: 'ignore' });
      return true;
    } catch (error) {
      return false;
    }
  } else {
    return process.getuid() === 0;
  }
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
  dirAppData,
  dirContains,
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
  dirIs,
  dirMove,
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
  fileMove,
  fileOpen,
  fileSize,
  isAdmin,
  zipCreate,
  zipExtract,
};
