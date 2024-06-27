import { execSync } from 'child_process';
import path from 'path';

import { dirAppData, dirRead, fileExec, fileExists, zipExtract } from './file.js';
import { getPlatform, log } from './utils.js';
import { apiBuffer } from './api.js';
import { configGet } from './config.js';
import { ConfigInterface } from './types/config.js';
import { Tools } from './types/tool.js';

const toolBinDir: string = path.join(dirAppData(), 'studiorack', 'bin');

export function toolFolder(type: keyof Tools, pluginPath: string): string[] {
  const toolResults: string[] = [];
  if (pluginPath.includes('*')) {
    const pathList = dirRead(pluginPath);
    pathList.forEach((pathItem: string) => {
      const testResult: string = toolRun(type, pathItem);
      toolResults.push(testResult);
    });
  } else {
    const testResult: any = toolRun(type, pluginPath);
    toolResults.push(testResult);
  }
  return toolResults;
}

export function toolGetPath(type: keyof Tools): string {
  const filename: string = type === 'clapinfo' ? 'clap-info' : type;
  let fileext: string = '';
  if (getPlatform() === 'mac' && type === 'pluginval') {
    fileext = '.app/Contents/MacOS/pluginval';
  }
  if (getPlatform() === 'win') {
    fileext = '.exe';
  }
  return path.join(toolBinDir, filename + fileext);
}

export async function toolInstall(type: keyof Tools): Promise<string> {
  if (!toolInstalled(type)) {
    const toolUrl: string = configGet(`${type}Url` as keyof ConfigInterface).replace('${platform}', getPlatform());
    const data: Buffer = await apiBuffer(toolUrl);
    zipExtract(data, toolBinDir);
    fileExec(toolGetPath(type));
  }
  return toolGetPath(type);
}

export function toolInstalled(type: keyof Tools): boolean {
  return fileExists(toolGetPath(type));
}

export function toolRun(type: keyof Tools, command: string): string {
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
