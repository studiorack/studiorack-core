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
const PLUGIN_ID: string = 'studiorack/studiorack-plugin-steinberg/adelay';
const PLUGIN_TEMPLATE: keyof PluginTemplate = 'dplug';
const PLUGIN: PluginInterface = {
  author: 'Steinberg Media Technologies',
  homepage: 'http://www.steinberg.net',
  name: 'ADelayTest Factory',
  description: 'Test Class',
  tags: [ 'Fx', 'Delay' ],
  version: '1.1.0',
  id: 'adelay',
  date: '2020-12-25T00:37:16.868Z',
  files: {
    audio: { name: 'adelay.wav', size: 352844 },
    image: { name: 'adelay.png', size: 9588 },
    linux: { name: 'adelay-linux.zip', size: 322192 },
    mac: { name: 'adelay-mac.zip', size: 322192 },
    win: { name: 'adelay-win.zip', size: 322192 }
  },
  release: 'v0.0.1',
  repo: 'studiorack/studiorack-plugin-steinberg'
};
const PLUGIN_LOCAL: PluginLocal = {
	"author": "Steinberg Media Technologies",
	"date": "2020-12-25T00:37:16.868Z",
	"description": "Test Class",
	"files": {
		"audio": {
			"name": "adelay.wav",
			"size": 352844
		},
		"image": {
			"name": "adelay.png",
			"size": 9588
		},
		"linux": {
			"name": "adelay-linux.zip",
			"size": 322192
		},
		"mac": {
			"name": "adelay-mac.zip",
			"size": 322192
		},
		"win": {
			"name": "adelay-win.zip",
			"size": 322192
		}
	},
	"homepage": "http://www.steinberg.net",
	"id": "adelay",
	"name": "ADelayTest Factory",
	"path": "./test/plugins/studiorack/studiorack-plugin-steinberg/adelay/1.1.0",
	"release": "v0.0.1",
	"repo": "studiorack/studiorack-plugin-steinberg",
	"status": "installed",
	"tags": ["Fx", "Delay"],
	"version": "1.1.0"
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
