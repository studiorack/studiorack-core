import { execSync } from 'child_process';
import path from 'path';

import { dirAppData, dirExists, dirRead, fileExec, fileJsonCreate, zipExtract } from './file';
import { getPlatform, log } from './utils';
import { getRaw } from './api';
import { configGet } from './config';

const testerFolder: string = path.join(dirAppData(), 'studiorack', 'bin');
let testerExt: string = '';
if (getPlatform() === 'linux') testerExt = '';
else if (getPlatform() === 'mac') testerExt = '.app/Contents/MacOS/pluginval';
else if (getPlatform() === 'win') testerExt = '.exe';
const testerPath: string = path.join(testerFolder, `pluginval${testerExt}`);

async function testFolder(pluginPath: string, options: any): Promise<object[]> {
  if (!pluginPath) {
    throw Error(`Path does not exist: ${pluginPath}`);
  }
  const testResults: object[] = [];
  await testInstall();
  if (pluginPath.includes('*')) {
    const pathList = dirRead(pluginPath);
    pathList.forEach((pathItem: string) => {
      const testResult: any = testPlugin(pathItem, options);
      testResults.push(testResult);
    });
  } else {
    const testResult: any = testPlugin(pluginPath, options);
    testResults.push(testResult);
  }
  if (options && options.summary) {
    let rootPath = pluginPath.substring(0, pluginPath.lastIndexOf(path.sep)).replace('**', '');
    rootPath += rootPath.endsWith(path.sep) ? '' : path.sep;
    fileJsonCreate(`${rootPath}testResults.json`, { testResults });
  }
  return testResults;
}

async function testInstall(): Promise<boolean> {
  // If binary does not exist, download plugin tester binary
  if (!dirExists(testerPath)) {
    let platform: string = getPlatform();
    if (platform === 'linux') platform = 'Linux';
    else if (platform === 'mac') platform = 'macOS';
    else if (platform === 'win') platform = 'windows';
    const data: Buffer = await getRaw(configGet('pluginvalUrl').replace('${platform}', platform));
    zipExtract(data, testerFolder);
    fileExec(testerPath);
    return true;
  }
  return false;
}

function testPlugin(pathItem: string, options?: any): object {
  if (!pathItem || !dirExists(pathItem)) {
    throw Error(`File does not exist: ${pathItem}`);
  }
  const outputText: string = testRun(pathItem);
  log(outputText);
  return {
    path: pathItem,
    valid: outputText.includes('ALL TESTS PASSED'),
    result: outputText,
  };
}

function testRun(filePath: string): string {
  // Run plugin validator binary
  try {
    log('⎋', `${testerPath} --validate-in-process --validate "${filePath}"`);
    const sdout: Buffer = execSync(`${testerPath} --validate-in-process --validate "${filePath}"`);
    return sdout.toString();
  } catch (error: any) {
    return error.output ? error.output.toString() : error.toString();
  }
}

export { testFolder, testInstall, testPlugin, testRun };
