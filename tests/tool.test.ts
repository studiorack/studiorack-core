import path from 'path';
import { toolInstall, toolGetPath, toolRun } from '../src/tool';
import { dirAppData } from '../src/file';

const TOOL_FOLDER = path.join(dirAppData(), 'studiorack', 'bin');

test('Install clapinfo tool', async () => {
  let toolPath: string = path.join(TOOL_FOLDER, 'clap-info');
  if (process.platform === 'win32') {
    toolPath = toolPath + '.exe';
  }
  expect(await toolInstall('clapinfo')).toEqual(toolPath);
});

test('Install pluginval tool', async () => {
  let toolPath: string = path.join(TOOL_FOLDER, 'pluginval');
  if (process.platform === 'darwin') {
    toolPath = toolPath + '.app';
  }
  if (process.platform === 'win32') {
    toolPath = toolPath + '.exe';
  }
  expect(await toolInstall('pluginval')).toEqual(toolPath);
});

test('Install validator tool', async () => {
  let toolPath: string = path.join(TOOL_FOLDER, 'validator');
  if (process.platform === 'win32') {
    toolPath = toolPath + '.exe';
  }
  expect(await toolInstall('validator')).toEqual(toolPath);
});
