import { execSync } from 'child_process';
import path from 'path';

import {
  dirAppData,
  dirExists,
  fileExec,
  zipExtract,
} from './file';
import { getPlatform, log } from './utils';
import { getRaw } from './api';
import { configGet } from './config';
import { ConfigInterface } from './types/config';
import { Tools } from './types/tool';

const toolFolder: string = path.join(dirAppData(), 'studiorack', 'bin');

async function toolInstall(type: keyof Tools): Promise<string> {
  if (!dirExists(toolGetPath(type))) {
    const toolUrl: string = configGet(`${type}Url` as keyof ConfigInterface).replace('${platform}', getPlatform());
    const data: Buffer = await getRaw(toolUrl);
    zipExtract(data, toolFolder);
    fileExec(toolGetPath(type));
  }
  return toolGetPath(type);
}

function toolGetPath(type: keyof Tools): string {
  const filename: string = (type === 'clapinfo' ? 'clap-info' : type);
  let fileext: string = '';
  if (getPlatform() === 'mac' && type === 'pluginval') { fileext = '.app/Contents/MacOS/pluginval'; }
  if (getPlatform() === 'win') { fileext = '.exe'; }
  return path.join(toolFolder, filename + fileext);
}

function toolRun(type: keyof Tools, command: string): string {
  try {
    log('⎋', `${toolGetPath(type)} "${command}"`);
    if (type === 'pluginval') {
      command = `--validate-in-process --validate "${command}"`;
    } else {
      command = `"${command}"`;
    }
    const sdout: Buffer = execSync(`${toolGetPath(type)} ${command}`);
    return sdout.toString();
  } catch (error: any) {
    return error.output ? error.output.toString() : error.toString();
  }
}

export {
  toolInstall,
  toolGetPath,
  toolRun
};
