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
  pluginUninstall
} from '../src/plugin';
import { PluginInterface, PluginLocal, PluginTemplate } from '../src/types/plugin';

const PLUGIN_DIR: string = './test/plugins';
const PLUGIN_ID: string = 'studiorack/plugin-oxe/oxe';
const PLUGIN_TEMPLATE: keyof PluginTemplate = 'dplug';
const PLUGIN: PluginInterface = {
  author: 'Oxe Software',
  homepage: 'https://github.com/oxesoft/oxefmsynth',
  name: 'Oxe',
  description: '8 operator frequency modulation synthesizer.',
  tags: [
    'FM',
    'Synth',
    'LFO'
  ],
  version: '1.3.5',
  id: 'oxe',
  date: '2016-04-19T08:00:00.000Z',
  files: {
    audio: {
      name: 'oxe.wav',
      size: 352844
    },
    image: {
      name: 'oxe.png',
      size: 98712
    },
    linux: {
      name: 'oxe-linux.zip',
      size: 411823
    },
    mac: {
      name: 'oxe-mac.zip',
      size: 188225
    },
    win: {
      name: 'oxe-win.zip',
      size: 232072
    }
  },
  release: 'v1.3.5',
  repo: 'studiorack/plugin-oxe'
};
const PLUGIN_LOCAL: PluginLocal = {
  "author": "Oxe Software",
  "homepage": "https://github.com/oxesoft/oxefmsynth",
  "name": "Oxe",
  "description": "8 operator frequency modulation synthesizer.",
  "tags": [
    "FM",
    "Synth",
    "LFO"
  ],
  "version": "1.3.5",
  "id": "oxe",
  "date": "2016-04-19T08:00:00.000Z",
  "files": {
    "audio": {
      "name": "oxe.wav",
      "size": 352844
    },
    "image": {
      "name": "oxe.png",
      "size": 98712
    },
    "linux": {
      "name": "oxe-linux.zip",
      "size": 411823
    },
    "mac": {
      "name": "oxe-mac.zip",
      "size": 188225
    },
    "win": {
      "name": "oxe-win.zip",
      "size": 232072
    }
  },
  "path": "./test/plugins/studiorack/plugin-oxe/oxe/1.3.5",
  "release": "v1.3.5",
  "repo": "studiorack/plugin-oxe",
  "status": "installed",
};

beforeAll(() => {
  configSet('pluginFolder', PLUGIN_DIR);
  dirDelete(PLUGIN_DIR);
});

test('Create a plugin from a valid template', async () => {
  expect(await pluginCreate(PLUGIN_DIR, PLUGIN_TEMPLATE)).toEqual(true);
});

test('Get plugin directory', () => {
  expect(pluginDirectory(PLUGIN)).toEqual(`${PLUGIN_DIR}/${PLUGIN.repo}/${PLUGIN.id}/${PLUGIN.version}`);
  expect(pluginDirectory(PLUGIN, 3)).toEqual(`${PLUGIN_DIR}/${PLUGIN.repo}/${PLUGIN.id}`);
  expect(pluginDirectory(PLUGIN, 2)).toEqual(`${PLUGIN_DIR}/${PLUGIN.repo}`);
  expect(pluginDirectory(PLUGIN, 1)).toEqual(`${PLUGIN_DIR}`);
});

test('Get valid plugin by id', async () => {
  expect(await pluginGet(PLUGIN_ID)).toMatchObject(PLUGIN);
});

test('Get invalid plugin by id', async () => {
  await expect(pluginGet('example/plugin')).rejects.toThrow('Plugin not found example/plugin');
});

test('Install plugin by id', async () => {
  expect(await pluginInstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL);
});

test('Check if plugin is installed', async () => {
  expect(pluginInstalled(PLUGIN)).toEqual(true);
});

test('List plugins locally', async () => {
  expect(pluginsGetLocal()).toBeDefined();
});

test('Search plugin registry', async () => {
  expect(pluginSearch('delay')).toBeDefined();
});

test('Search plugin registry', async () => {
  expect(pluginSearch('delay')).toBeDefined();
});

test('Uninstall plugin by id', async () => {
  const PLUGIN_LOCAL_UPDATED: any = Object.assign({}, PLUGIN_LOCAL);
  delete PLUGIN_LOCAL_UPDATED.path;
  PLUGIN_LOCAL_UPDATED.status = 'available';
  expect(await pluginUninstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL_UPDATED);
});
