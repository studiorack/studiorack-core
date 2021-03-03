import { dirDelete } from '../src/file';
import {
  pluginCreate,
  pluginGet,
  pluginInstall,
  pluginInstalled
} from '../src/plugin';
import { PluginEntry, PluginVersion } from '../src/types/plugin';

const PLUGIN_DIR = './test/plugins';
const PLUGIN_ID = 'studiorack/studiorack-plugin-steinberg/adelay';
const PLUGIN_TEMPLATE = 'dplug';
const PLUGIN_VERSION: PluginVersion = {
  author: 'Steinberg Media Technologies',
  date: '2020-12-25T00:37:16.868Z',
  description: 'Test Class',
  files: {
    audio: { name: 'adelay.wav', size: 352844 },
    image: { name: 'adelay.png', size: 9588 },
    linux: { name: 'adelay-linux.zip', size: 322192 },
    mac: { name: 'adelay-mac.zip', size: 322192 },
    win: { name: 'adelay-win.zip', size: 322192 },
  },
  homepage: 'http://www.steinberg.net',
  id: 'adelay',
  name: 'ADelayTest Factory',
  path: '/Library/Audio/Plug-ins/VST3/studiorack/studiorack-plugin-steinberg/adelay/1.1.0',
  release: 'v0.0.1',
  repo: 'studiorack/studiorack-plugin-steinberg',
  slug: 'studiorack_studiorack-plugin-steinberg',
  status: 'installed',
  type: {
    name: "Virtual Studio Technology 3",
    ext: "vst3"
  },
  tags: ['Fx', 'Delay'],
  version: '1.1.0',
};

const PLUGIN_ENTRY: PluginEntry = {
  id: 'studiorack/studiorack-plugin-steinberg/adelay',
  version: '1.1.0',
  versions: { '1.1.0': PLUGIN_VERSION },
};

beforeAll(() => {
  dirDelete(PLUGIN_DIR);
});

test('Create a plugin from a valid template', async () => {
  expect(await pluginCreate(PLUGIN_DIR, PLUGIN_TEMPLATE)).toBe(true);
});

test('Get valid plugin by id', async () => {
  expect(await pluginGet(PLUGIN_ID)).toMatchObject(PLUGIN_ENTRY);
});

test('Get invalid plugin by id', async () => {
  expect(await pluginGet('example/plugin')).toBeFalsy();
});

// test('Install plugin by id', async () => {
//   expect(await pluginInstall(PLUGIN_ID)).toBeFalsy();
// });

test('Check if plugin is installed', async () => {
  expect(pluginInstalled(PLUGIN_VERSION)).toBe(true);
});
