import path from 'path';
import { toolInstall, toolInstalled, toolFolder, toolGetPath, toolRun } from '../src/tool';
import { dirAppData, dirDelete } from '../src/file';
import { configSet } from '../src/config';
import { pluginInstall } from '../src/plugin';
import { logEnable } from '../src/utils';

const APP_DIR: string = path.join(dirAppData(), 'studiorack');
const TEST_DIR: string = path.join('test', 'tool');
const PLUGIN_ID: string = 'studiorack/surge/surge';
const PLUGIN_PATH: string = path.join('test', 'tool', 'VST3', 'studiorack', 'surge', 'surge', '1.9.0', 'Surge XT.vst3');
const PLUGIN_PATH_CLAP: string = path.join(
  'test',
  'tool',
  'CLAP',
  'studiorack',
  'surge',
  'surge',
  '1.9.0',
  'Surge XT.clap'
);
const SCRIPT_DIR: string = path.resolve(__dirname, '../');
const TOOL_FOLDER = path.join(dirAppData(), 'studiorack', 'bin');
let CLAPINFO_PATH: string = path.join(TOOL_FOLDER, 'clap-info');
let PLUGINVAL_PATH: string = path.join(TOOL_FOLDER, 'pluginval');
let VALIDATOR_PATH: string = path.join(TOOL_FOLDER, 'validator');

if (process.platform === 'win32') {
  CLAPINFO_PATH = CLAPINFO_PATH + '.exe';
  PLUGINVAL_PATH = PLUGINVAL_PATH + '.exe';
  VALIDATOR_PATH = VALIDATOR_PATH + '.exe';
} else if (process.platform === 'darwin') {
  PLUGINVAL_PATH = PLUGINVAL_PATH + '.app/Contents/MacOS/pluginval';
}

function cleanOutput(output: string): string {
  // Replace app path with variable
  const regex: RegExp = new RegExp(APP_DIR, 'g');
  const output2: string = output.replace(regex, '${APP_DIR}');
  // Replace script path with variable
  const regex2: RegExp = new RegExp(SCRIPT_DIR, 'g');
  const output3: string = output2.replace(regex2, '${SCRIPT_DIR}');
  // Replace random seed with variable
  const regex3: RegExp = new RegExp('Random seed: (.+)', 'g');
  const output4: string = output3.replace(regex3, '${RANDOM_SEED}');
  // Replace inconsistent line
  const regex4: RegExp = new RegExp(
    'Info:  The component reported a wrong silent flag for its output buffer! : output is silent but silenceFlags not set !\n',
    'g'
  );
  const output5: string = output4.replace(regex4, '');
  // Replace inconsistent line 2
  const regex5: RegExp = new RegExp('Info:     Not all points have been read via IParameterChanges\n', 'g');
  return output5.replace(regex5, '');
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

// Output is not consistent across versions yet
// Using cleanOutput() method to workaround inconsistencies in test output
// Working with binary owners to see if that can be improved

// test('Run clapinfo', () => {
//   expect(cleanOutput(toolRun('clapinfo', PLUGIN_PATH_CLAP))).toMatchSnapshot();
// });

// test('Run pluginval', () => {
//   expect(cleanOutput(toolRun('pluginval', PLUGIN_PATH))).toMatchSnapshot();
// });

test('Run validator', () => {
  expect(cleanOutput(toolRun('validator', PLUGIN_PATH))).toMatchSnapshot();
});

// test('Folder clapinfo', () => {
//   expect(cleanOutput(toolFolder('clapinfo', path.join('test', 'tool', '**', '*.clap')).join('\n'))).toMatchSnapshot();
// });

// test('Folder pluginval', () => {
//   expect(cleanOutput(toolFolder('pluginval', path.join('test', 'tool', '**', '*.{component,vst,vst3}')).join('\n'))).toMatchSnapshot();
// });

test('Folder validator', () => {
  expect(cleanOutput(toolFolder('validator', path.join('test', 'tool', '**', '*.vst3')).join('\n'))).toMatchSnapshot();
});
