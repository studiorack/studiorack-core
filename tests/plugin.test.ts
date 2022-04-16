import path from 'path';
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

const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_ID: string = 'studiorack/adlplug/adlplug';
const PLUGIN_TYPE: string = 'VST';
const PLUGIN_TEMPLATE: keyof PluginTemplate = 'dplug';
const PLUGIN: PluginInterface = {
  author: 'Jean Pierre Cimalando',
  homepage: 'https://github.com/jpcima/ADLplug',
  name: 'ADLplug',
  description: 'FM synthesizer based on OPL3 and OPN2 sound chip emulations. Synthesis of melodic and percussive instruments, support for dynamic parameterization and automation.',
  tags: [
    'Instrument',
    'Synth',
    'FM'
  ],
  version: '1.0.2',
  id: 'adlplug',
  date: '2020-08-05T08:00:00.000Z',
  files: {
    audio: {
      name: 'adlplug.flac',
      size: 60649
    },
    image: {
      name: 'adlplug.jpg',
      size: 140267
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
  repo: 'studiorack/adlplug'
};
const PLUGIN_LOCAL: PluginLocal = {
  "author": "Jean Pierre Cimalando",
  "homepage": "https://github.com/jpcima/ADLplug",
  "name": "ADLplug",
  "description": "FM synthesizer based on OPL3 and OPN2 sound chip emulations. Synthesis of melodic and percussive instruments, support for dynamic parameterization and automation.",
  "tags": [
    "Instrument",
    "Synth",
    "FM"
  ],
  "version": "1.0.2",
  "id": "adlplug",
  "date": "2020-08-05T08:00:00.000Z",
  "files": {
    "audio": {
      "name": "adlplug.flac",
      "size": 60649
    },
    "image": {
      "name": "adlplug.jpg",
      "size": 140267
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
  "paths": [
    "test/plugins/Components/studiorack/adlplug/adlplug/1.0.2/ADLplug.component",
    "test/plugins/LV2/studiorack/adlplug/adlplug/1.0.2/ADLplug.lv2",
    "test/plugins/VST/studiorack/adlplug/adlplug/1.0.2/ADLplug.vst",
    "test/plugins/VST3/studiorack/adlplug/adlplug/1.0.2/ADLplug.vst3",
  ],
  "release": "v1.0.2",
  "repo": "studiorack/adlplug",
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
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE)).toEqual(path.join(PLUGIN_DIR, PLUGIN_TYPE, PLUGIN.repo, PLUGIN.id, PLUGIN.version));
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 3)).toEqual(path.join(PLUGIN_DIR, PLUGIN_TYPE, PLUGIN.repo, PLUGIN.id));
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 2)).toEqual(path.join(PLUGIN_DIR, PLUGIN_TYPE, PLUGIN.repo));
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 1)).toEqual(path.join(PLUGIN_DIR, PLUGIN_TYPE));
});

test('Get valid plugin by id from registry', async () => {
  expect(await pluginGet(PLUGIN_ID)).toMatchObject(PLUGIN);
});

test('Get invalid PLUGIN by id from registry', async () => {
  await expect(pluginGet('example/plugin')).rejects.toThrow('Plugin not found example/plugin');
});

test('Install plugin by id', async () => {
  const PLUGIN_LOCAL_UPDATED: any = Object.assign({}, PLUGIN_LOCAL);
  if (process.env.CI) {
    PLUGIN_LOCAL_UPDATED.paths = [
      PLUGIN_LOCAL.paths[1]
    ];
  }
  expect(await pluginInstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL_UPDATED);
});

test('Check if plugin is installed locally', () => {
  expect(pluginInstalled(PLUGIN)).toEqual(true);
});

// test('Get plugin locally', async () => {
//   expect(await pluginGetLocal('vst3/studiorack/adlplug')).toMatchObject(PLUGIN_LOCAL);
// });

test('List plugins in registry', async () => {
  expect(await pluginsGet()).toBeDefined();
});

test('List plugins of type effects in registry', async () => {
  expect(await pluginsGet('effects')).toBeDefined();
});

test('List plugins of type instruments in registry', async () => {
  expect(await pluginsGet('instruments')).toBeDefined();
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

// test('Uninstall plugin by id', async () => {
//   const PLUGIN_LOCAL_UPDATED: any = Object.assign({}, PLUGIN_LOCAL);
//   delete PLUGIN_LOCAL_UPDATED.paths;
//   PLUGIN_LOCAL_UPDATED.status = 'available';
//   expect(await pluginUninstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL_UPDATED);
// });
