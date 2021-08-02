import { configSet } from '../src/config';
import { dirDelete } from '../src/file';
import {
  pluginCreate,
  pluginDirectory,
  pluginGet,
  pluginsGetLocal,
  pluginInstall,
  pluginInstalled,
  pluginSearch,
  pluginUninstall,
  pluginGetLocal,
  pluginsGet
} from '../src/plugin';
import { PluginInterface, PluginLocal, PluginTemplate } from '../src/types/plugin';

const PLUGIN_DIR: string = './test/plugins';
const PLUGIN_ID: string = 'studiorack/plugin-adlplug/adlplug';
const PLUGIN_TYPE: string = 'VST';
const PLUGIN_TEMPLATE: keyof PluginTemplate = 'dplug';
const PLUGIN: PluginInterface = {
  author: 'Jean Pierre Cimalando',
  homepage: 'https://github.com/jpcima/ADLplug',
  name: 'ADLplug',
  description: 'FM synthesizer based on OPL3 and OPN2 sound chip emulations. Synthesis of melodic and percussive instruments, support for dynamic parameterization and automation.',
  tags: [
    'Synth',
    'FM'
  ],
  version: '1.0.2',
  id: 'adlplug',
  date: '2020-08-05T08:00:00.000Z',
  files: {
    audio: {
      name: 'adlplug.wav',
      size: 352844
    },
    image: {
      name: 'adlplug.png',
      size: 601168
    },
    linux: {
      name: 'adlplug-linux.zip',
      size: 11068718
    },
    mac: {
      name: 'adlplug-mac.zip',
      size: 33551714
    },
    win: {
      name: 'adlplug-win.zip',
      size: 24833093
    }
  },
  release: 'v1.0.2',
  repo: 'studiorack/plugin-adlplug'
};
const PLUGIN_LOCAL: PluginLocal = {
  "author": "Jean Pierre Cimalando",
  "homepage": "https://github.com/jpcima/ADLplug",
  "name": "ADLplug",
  "description": "FM synthesizer based on OPL3 and OPN2 sound chip emulations. Synthesis of melodic and percussive instruments, support for dynamic parameterization and automation.",
  "tags": [
    "Synth",
    "FM"
  ],
  "version": "1.0.2",
  "id": "adlplug",
  "date": "2020-08-05T08:00:00.000Z",
  "files": {
    "audio": {
      "name": "adlplug.wav",
      "size": 352844
    },
    "image": {
      "name": "adlplug.png",
      "size": 601168
    },
    "linux": {
      "name": "adlplug-linux.zip",
      "size": 11068718
    },
    "mac": {
      "name": "adlplug-mac.zip",
      "size": 33551714
    },
    "win": {
      "name": "adlplug-win.zip",
      "size": 24833093
    }
  },
  "release": "v1.0.2",
  "repo": "studiorack/plugin-adlplug",
  "status": "installed"
};

beforeAll(() => {
  configSet('pluginFolder', PLUGIN_DIR);
  dirDelete(PLUGIN_DIR);
});

test('Create a plugin from a valid template', async () => {
  expect(await pluginCreate(`${PLUGIN_DIR}/dplug-template`, PLUGIN_TEMPLATE)).toEqual(true);
});

test('Get plugin directory', () => {
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE)).toEqual(`${PLUGIN_DIR}/${PLUGIN_TYPE}/${PLUGIN.repo}/${PLUGIN.id}/${PLUGIN.version}`);
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 3)).toEqual(`${PLUGIN_DIR}/${PLUGIN_TYPE}/${PLUGIN.repo}/${PLUGIN.id}`);
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 2)).toEqual(`${PLUGIN_DIR}/${PLUGIN_TYPE}/${PLUGIN.repo}`);
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 1)).toEqual(`${PLUGIN_DIR}/${PLUGIN_TYPE}`);
});

test('Get valid plugin by id from registry', async () => {
  expect(await pluginGet(PLUGIN_ID)).toMatchObject(PLUGIN);
});

test('Get invalid plugin by id from registry', async () => {
  await expect(pluginGet('example/plugin')).rejects.toThrow('Plugin not found example/plugin');
});

test('Install plugin by id', async () => {
  expect(await pluginInstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL);
});

test('Check if plugin is installed locally', () => {
  expect(pluginInstalled(PLUGIN)).toEqual(true);
});

// test('Get plugin locally', async () => {
//   expect(await pluginGetLocal('vst3/studiorack/plugin-adlplug')).toMatchObject(PLUGIN_LOCAL);
// });

test('List plugins in registry', async () => {
  expect(await pluginsGet()).toBeDefined();
});

test('List plugins locally', async () => {
  expect(await pluginsGetLocal()).toBeDefined();
});

test('Search plugin registry', async () => {
  expect(await pluginSearch('delay')).toBeDefined();
});

test('Search plugin registry', async () => {
  expect(await pluginSearch('delay')).toBeDefined();
});

test('Uninstall plugin by id', async () => {
  const PLUGIN_LOCAL_UPDATED: any = Object.assign({}, PLUGIN_LOCAL);
  delete PLUGIN_LOCAL_UPDATED.path;
  PLUGIN_LOCAL_UPDATED.status = 'available';
  expect(await pluginUninstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL_UPDATED);
});
