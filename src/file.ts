import AdmZip from 'adm-zip';
import { execFileSync, execSync } from 'child_process';
import {
  chmodSync,
  existsSync,
  mkdirSync,
  moveSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'fs-extra';
import { globSync } from 'glob';
import os from 'os';
import path from 'path';
import { PlatformsSupported } from './types/config.js';
import sudoPrompt from '@vscode/sudo-prompt';
import { log } from './utils.js';

const fsUtils: any = require('nodejs-fs-utils');

// Plugin directories
// https://steinbergmedia.github.io/vst3_dev_portal/pages/Technical+Documentation/Locations+Format/Plugin+Locations.html

const pluginDirectories: PlatformsSupported = {
  aix: path.join('usr', 'local', 'lib'),
  android: path.join('usr', 'local', 'lib'),
  cygwin: path.join('usr', 'local', 'lib'),
  darwin: path.join(os.homedir(), 'Library', 'Audio', 'Plug-ins'),
  freebsd: path.join('usr', 'local', 'lib'),
  linux: path.join('usr', 'local', 'lib'),
  netbsd: path.join('usr', 'local', 'lib'),
  openbsd: path.join('usr', 'local', 'lib'),
  sunos: path.join('usr', 'local', 'lib'),
  win32: path.join('Program Files', 'Common Files'),
};

// Preset directories
// https://steinbergmedia.github.io/vst3_dev_portal/pages/Technical+Documentation/Locations+Format/Preset+Locations.html

const presetDirectories: PlatformsSupported = {
  aix: path.join(os.homedir(), '.vst3', 'presets'),
  android: path.join(os.homedir(), '.vst3', 'presets'),
  cygwin: path.join(os.homedir(), '.vst3', 'presets'),
  darwin: path.join(os.homedir(), 'Library', 'Audio', 'Presets'),
  freebsd: path.join(os.homedir(), '.vst3', 'presets'),
  linux: path.join(os.homedir(), '.vst3', 'presets'),
  netbsd: path.join(os.homedir(), '.vst3', 'presets'),
  openbsd: path.join(os.homedir(), '.vst3', 'presets'),
  sunos: path.join(os.homedir(), '.vst3', 'presets'),
  win32: path.join(os.homedir(), 'Documents', 'VST3 Presets'),
};

function dirAppData(): string {
  if (process.platform === 'win32') {
    return process.env.APPDATA || os.homedir();
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
    log('+', dirPath);
    mkdirSync(dirPath, { recursive: true });
    return dirPath;
  }
  return false;
}

function dirDelete(dirPath: string): void | boolean {
  if (dirExists(dirPath)) {
    log('-', dirPath);
    return rmSync(dirPath, { recursive: true });
  }
  return false;
}

function dirEmpty(dirPath: string): boolean {
  const files: string[] = readdirSync(dirPath);
  return files.length === 0 || (files.length === 1 && files[0] === '.DS_Store');
}

function dirExists(dirPath: string): boolean {
  return existsSync(dirPath);
}

function dirIs(dirPath: string): boolean {
  return statSync(dirPath).isDirectory();
}

function dirMove(dirPath: string, newPath: string): void | boolean {
  if (dirExists(dirPath)) {
    log('-', dirPath);
    log('+', newPath);
    return moveSync(dirPath, newPath, { overwrite: true });
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
  log('⎋', `${command} "${dirPath}"`);
  return execSync(`${command} "${dirPath}"`);
}

function dirPlugins(): string {
  return pluginDirectories[process.platform as keyof PlatformsSupported];
}

function dirPresets(): string {
  return presetDirectories[process.platform as keyof PlatformsSupported];
}

function dirProjects(): string {
  // Windows throws permissions errors if you scan hidden folders
  // Therefore set to a more specific path than Documents
  return path.join(os.homedir(), 'Documents', 'Audio');
}

function dirRead(dirPath: string, options?: any): string[] {
  log('⌕', dirPath);
  // Glob now expects forward slashes on Windows
  // Convert backslashes from path.join() to forwardslashes
  if (process.platform === 'win32') {
    dirPath = dirPath.replace(/\\/g, '/');
  }
  return globSync(dirPath, options);
}

function dirRename(oldPath: string, newPath: string): void | boolean {
  if (dirExists(oldPath)) {
    return moveSync(oldPath, newPath, { overwrite: true });
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
  log('+', filePath);
  return writeFileSync(filePath, data);
}

function fileDate(filePath: string): Date {
  return statSync(filePath).mtime;
}

function fileDelete(filePath: string): boolean | void {
  if (fileExists(filePath)) {
    log('-', filePath);
    return unlinkSync(filePath);
  }
  return false;
}

function fileExec(filePath: string): void {
  return chmodSync(filePath, '755');
}

function fileExists(filePath: string): boolean {
  return existsSync(filePath);
}

function fileJsonCreate(filePath: string, data: object): void {
  return fileCreate(filePath, JSON.stringify(data, null, 2));
}

function fileMove(dirPath: string, newPath: string): void | boolean {
  if (fileExists(dirPath)) {
    log('-', dirPath);
    log('+', newPath);
    return moveSync(dirPath, newPath, { overwrite: true });
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
  log('⎋', `${command} "${filePath}"`);
  return execSync(`${command} "${filePath}"`);
}

function fileRead(filePath: string): Buffer {
  log('⎋', filePath);
  return readFileSync(filePath);
}

function fileReadJson(filePath: string): any {
  if (fileExists(filePath)) {
    log('⎋', filePath);
    return JSON.parse(readFileSync(filePath).toString());
  }
  return false;
}

function fileReadString(filePath: string): string {
  log('⎋', filePath);
  return readFileSync(filePath).toString();
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
    return process && process.getuid ? process.getuid() === 0 : false;
  }
}

function runCliAsAdmin(args: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const dirPathClean: string = __dirname.replace('app.asar', 'app.asar.unpacked');
    log(`node "${dirPathClean}${path.sep}admin.js" ${args}`);
    sudoPrompt.exec(
      `node "${dirPathClean}${path.sep}admin.js" ${args}`,
      { name: 'StudioRack' },
      (error, stdout, stderr) => {
        if (stdout) {
          log('runCliAsAdmin', stdout);
        }
        if (stderr) {
          log('runCliAsAdmin', stderr);
        }
        if (error) {
          reject(error);
        } else {
          resolve(stdout?.toString() || '');
        }
      },
    );
  });
}

function zipCreate(filesPath: string, zipPath: string): void {
  if (fileExists(zipPath)) {
    unlinkSync(zipPath);
  }
  const zip: AdmZip = new AdmZip();
  const pathList: string[] = dirRead(filesPath);
  pathList.forEach(pathItem => {
    log('⎋', pathItem);
    try {
      if (dirIs(pathItem)) {
        zip.addLocalFolder(pathItem, path.basename(pathItem));
      } else {
        zip.addLocalFile(pathItem);
      }
    } catch (error) {
      log(error);
    }
  });
  log('+', zipPath);
  return zip.writeZip(zipPath);
}

function zipExtract(content: any, dirPath: string): void {
  log('⎋', dirPath);
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
  dirPresets,
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
  fileMove,
  fileOpen,
  fileRead,
  fileReadJson,
  fileReadString,
  fileSize,
  isAdmin,
  runCliAsAdmin,
  zipCreate,
  zipExtract,
};
