import path from 'path';
import { toolInstall, toolInstalled, toolFolder, toolGetPath, toolRun } from '../src/tool';
import { dirAppData, dirDelete } from '../src/file';
import { configSet } from '../src/config';
import { pluginInstall } from '../src/plugin';
import { logEnable } from '../src/utils';

const APP_DIR: string = path.join(dirAppData(), 'studiorack');
const TEST_DIR: string = path.join('test', 'tool');
const PLUGIN_ID: string = 'studiorack/surge/surge';
const PLUGIN_PATH: string = path.join('test', 'plugins', 'VST3', 'studiorack', 'surge', 'surge', '1.9.0', 'Surge XT.vst3');
const PLUGIN_PATH_CLAP: string = path.join('test', 'plugins', 'CLAP', 'studiorack', 'surge', 'surge', '1.9.0', 'Surge XT.clap');
const SCRIPT_DIR: string = path.resolve(__dirname, '../');
const TOOL_FOLDER = path.join(dirAppData(), 'studiorack', 'bin');
let CLAPINFO_PATH: string = path.join(TOOL_FOLDER, 'clap-info');
let PLUGINVAL_PATH: string = path.join(TOOL_FOLDER, 'pluginval');
let VALIDATOR_PATH: string = path.join(TOOL_FOLDER, 'validator');

if (process.platform === 'darwin') {
  PLUGINVAL_PATH = PLUGINVAL_PATH + '.app/Contents/MacOS/pluginval';
} else if (process.platform === 'win32') {
  CLAPINFO_PATH = CLAPINFO_PATH + '.exe';
  PLUGINVAL_PATH = PLUGINVAL_PATH + '.exe';
  VALIDATOR_PATH = VALIDATOR_PATH + '.exe';
}

function cleanOutput(output: string): string {
  const regex: RegExp = new RegExp(APP_DIR, 'g');
  let output2: string = output.replace(regex, '${APP_DIR}');
  const regex2: RegExp = new RegExp(SCRIPT_DIR, 'g');
  return output2.replace(regex2, '${SCRIPT_DIR}');
}

beforeAll(async () => {
  configSet('pluginFolder', TEST_DIR);
  dirDelete(TEST_DIR);
  // Increase Jest timeout to allow large plugin to be installed
  jest.setTimeout(60 * 1000);
  await pluginInstall(PLUGIN_ID);
});

test('Install clapinfo', async () => {
  expect(await toolInstall('clapinfo')).toEqual(CLAPINFO_PATH);
  expect(await toolInstalled('clapinfo')).toEqual(true);
});

test('Install pluginval', async () => {
  expect(await toolInstall('pluginval')).toEqual(PLUGINVAL_PATH);
  expect(await toolInstalled('pluginval')).toEqual(true);
});

test('Install validator', async () => {
  expect(await toolInstall('validator')).toEqual(VALIDATOR_PATH);
  expect(await toolInstalled('validator')).toEqual(true);
});

test('Get path clapinfo', () => {
  expect(toolGetPath('clapinfo')).toEqual(CLAPINFO_PATH);
});

test('Get path pluginval', () => {
  expect(toolGetPath('pluginval')).toEqual(PLUGINVAL_PATH);
});

test('Get path validator', () => {
  expect(toolGetPath('validator')).toEqual(VALIDATOR_PATH);
});

// Command line tools do not produce same output every time

// test('Run clapinfo', () => {
//   expect(cleanOutput(toolRun('clapinfo', PLUGIN_PATH_CLAP))).toMatchSnapshot();
// });

// test('Run pluginval', () => {
//   expect(cleanOutput(toolRun('pluginval', PLUGIN_PATH))).toMatchSnapshot();
// });

// test('Run validator', () => {
//   expect(cleanOutput(toolRun('validator', PLUGIN_PATH))).toMatchSnapshot();
// });

// test('Folder clapinfo', () => {
//   expect(cleanOutput(toolFolder('clapinfo', path.join('test', 'plugins', '**', '*.clap')).join('\n'))).toMatchSnapshot();
// });

// test('Folder pluginval', () => {
//   expect(cleanOutput(toolFolder('pluginval', path.join('test', 'plugins', '**', '*.{component,vst,vst3}')).join('\n'))).toMatchSnapshot();
// });

// test('Folder validator', () => {
//   expect(cleanOutput(toolFolder('validator', path.join('test', 'plugins', '**', '*.vst3')).join('\n'))).toMatchSnapshot();
// });