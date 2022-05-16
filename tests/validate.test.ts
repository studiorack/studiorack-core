import path from 'path';
import { configSet } from '../src/config';
import { dirCreate, dirDelete, fileCreate } from '../src/file';
import { pluginInstall } from '../src/plugin';
import { PluginLocal } from '../src/types/plugin';
import {
  validateFiles,
  validateFolder,
  validateInstall,
  validatePlugin,
  validatePluginField,
  validatePluginSchema,
  validateProcess,
  validateRun
} from '../src/validate';

const PLUGIN_ID: string = 'studiorack/adlplug/adlplug';
const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_PATH: string = path.join('test', 'plugins', 'VST3', 'studiorack', 'adlplug', 'adlplug', '1.0.2', 'ADLplug.vst3');
const PLUGIN_PATH_INVALID: string = path.join('test', 'plugins', 'VST3', 'studiorack', 'invalid', 'invalid', '0.0.1', 'invalid.vst3');
const PLUGIN_METADATA: any = {
  "author": "Jean Pierre Cimalando",
  "date": "2022-05-15T22:41:44.112Z",
  "description": "Component Controller Class",
  "id": "adlplug",
  "name": "ADLplug",
  "tags": [
    "Instrument",
    "Synth",
  ],
  "version": "1.0.2",
};

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
