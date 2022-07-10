import path from 'path';
import { configSet } from '../src/config';
import { dirCreate, dirDelete, fileCreate } from '../src/file';
import { pluginInstall } from '../src/plugin';
import { PluginLocal } from '../src/types/plugin';
import {
  validateFiles,
  validateFolder,
  validatePlugin,
  validatePluginField,
  validatePluginSchema,
  validateProcess,
  validateRun
} from '../src/validate';

const PLUGIN_ID: string = 'studiorack/adlplug/opnplug';
const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_PATH_INVALID: string = path.join('test', 'plugins', 'VST3', 'studiorack', 'invalid', 'invalid', '0.0.1', 'invalid.vst3');

let PLUGIN_PATH: string;
let PLUGIN_METADATA: any;

if (process.platform === 'win32') {
  PLUGIN_PATH = path.join('test', 'plugins', 'DLL', 'studiorack', 'adlplug', 'opnplug', '1.0.2', 'OPNplug.dll');
  PLUGIN_METADATA = {
    "date": "2022-05-15T22:41:44.112Z",
    "id": "opnplug",
  };
} else if (process.platform === 'darwin') {
  PLUGIN_PATH = path.join('test', 'plugins', 'VST3', 'studiorack', 'adlplug', 'opnplug', '1.0.2', 'OPNplug.vst3');
  PLUGIN_METADATA = {
    "author": "Jean Pierre Cimalando",
    "date": "2022-05-15T22:41:44.112Z",
    "description": "Component Controller Class",
    "id": "opnplug",
    "name": "OPNplug",
    "tags": [
      "Instrument",
      "Synth",
    ],
    "version": "1.0.2",
  };
} else {
  PLUGIN_PATH = path.join('test', 'plugins', 'LV2', 'studiorack', 'adlplug', 'opnplug', '1.0.2', 'OPNplug.lv2');
  PLUGIN_METADATA = {
    "date": "2022-05-15T22:41:44.112Z",
    "id": "opnplug",
  };
}

beforeAll(async () => {
  configSet('pluginFolder', PLUGIN_DIR);
  dirDelete(PLUGIN_DIR);
  // Add a valid plugin
  await pluginInstall(PLUGIN_ID);
  // Add an invalid plugin
  dirCreate(path.dirname(PLUGIN_PATH_INVALID));
  fileCreate(PLUGIN_PATH_INVALID, 'broken');
});

test('Validate files', () => {
  expect(validateFiles(PLUGIN_DIR, {})).toEqual({ files: {} });
});

test('Validate valid plugin', () => {
  const result = validatePlugin(PLUGIN_PATH);
  result.date = PLUGIN_METADATA.date;
  expect(result).toEqual(PLUGIN_METADATA);
});

test('Validate invalid plugin', () => {
  const result = validatePlugin(PLUGIN_PATH_INVALID);
  expect(result).toEqual({
    "date": result.date,
    "id": "invalid",
  });
});
