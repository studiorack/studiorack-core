import { beforeAll, expect, test } from 'vitest';
import { Convert } from '../src/convert';
import path from 'path';
import { configSet } from '../src/config';
import { dirDelete } from '../src/file';
import {
  pluginCreate,
  pluginDirectory,
  pluginGet,
  pluginGetLocal,
  pluginsGet,
  pluginsGetLocal,
  pluginInstall,
  pluginInstalled,
  pluginSearch,
  pluginUninstall,
} from '../src/plugin';
import { PluginEntry, PluginRegistry, PluginVersion, PluginVersionLocal, PluginTemplate } from '../src/types/plugin';

const PLUGIN_REGISTRY: PluginRegistry = {
  name: 'StudioRack Registry - index',
  url: 'https://studiorack.github.io/studiorack-registry/v2/index.json',
  version: '2.0.0',
  objects: {},
};

const PLUGIN_ENTRY: PluginEntry = {
  version: '1.3.1',
  versions: {},
};

const PLUGIN_VERSION: PluginVersion = {
  name: 'Surge XT',
  author: 'Surge Synth Team',
  homepage: 'https://github.com/surge-synthesizer/surge',
  description:
    'Hybrid synthesizer featuring many synthesis techniques, a great selection of filters, a flexible modulation engine, a smorgasbord of effects, and modern features like MPE and microtuning.',
  date: '2024-02-06T00:00:00.000Z',
  license: 'gpl-3.0',
  tags: ['Instrument', 'Synth', 'Modulation'],
  files: {
    audio: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/surge-synthesizer/surge/surge.flac',
      size: 141339,
    },
    image: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/surge-synthesizer/surge/surge.jpg',
      size: 159518,
    },
    linux: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-linux-1.3.1-pluginsonly.tar.gz',
      size: 94448096,
    },
    mac: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-macos-1.3.1-pluginsonly.zip',
      size: 180726292,
    },
    win: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-win64-1.3.1-pluginsonly.zip',
      size: 48165645,
    },
  },
};

const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_ID: string = 'surge-synthesizer/surge';
const PLUGIN_TYPE: string = 'VST';
const PLUGIN_TEMPLATE: keyof PluginTemplate = 'dplug';
const PLUGIN: PluginVersion = {
  name: 'Surge XT',
  author: 'Surge Synth Team',
  homepage: 'https://github.com/surge-synthesizer/surge',
  description:
    'Hybrid synthesizer featuring many synthesis techniques, a great selection of filters, a flexible modulation engine, a smorgasbord of effects, and modern features like MPE and microtuning.',
  date: '2024-02-06T00:00:00.000Z',
  license: 'gpl-3.0',
  tags: ['Instrument', 'Synth', 'Modulation'],
  files: {
    audio: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/surge-synthesizer/surge/surge.flac',
      size: 141339,
    },
    image: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/surge-synthesizer/surge/surge.jpg',
      size: 159518,
    },
    linux: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-linux-1.3.1-pluginsonly.tar.gz',
      size: 94448096,
    },
    mac: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-macos-1.3.1-pluginsonly.zip',
      size: 180726292,
    },
    win: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-win64-1.3.1-pluginsonly.zip',
      size: 48165645,
    },
  },
  id: 'surge-synthesizer/surge',
  version: '1.3.1',
};
const PLUGIN_LOCAL: PluginVersionLocal = {
  name: 'Surge XT',
  author: 'Surge Synth Team',
  homepage: 'https://github.com/surge-synthesizer/surge',
  description:
    'Hybrid synthesizer featuring many synthesis techniques, a great selection of filters, a flexible modulation engine, a smorgasbord of effects, and modern features like MPE and microtuning.',
  date: '2024-02-06T00:00:00.000Z',
  license: 'gpl-3.0',
  tags: ['Instrument', 'Synth', 'Modulation'],
  files: {
    audio: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/surge-synthesizer/surge/surge.flac',
      size: 141339,
    },
    image: {
      url: 'https://studiorack.github.io/studiorack-registry/plugins/surge-synthesizer/surge/surge.jpg',
      size: 159518,
    },
    linux: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-linux-1.3.1-pluginsonly.tar.gz',
      size: 94448096,
    },
    mac: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-macos-1.3.1-pluginsonly.zip',
      size: 180726292,
    },
    win: {
      url: 'https://github.com/surge-synthesizer/releases-xt/releases/download/1.3.1/surge-xt-win64-1.3.1-pluginsonly.zip',
      size: 48165645,
    },
  },
  id: 'surge-synthesizer/surge',
  version: '1.3.1',
  paths: [],
  status: 'installed',
};

if (process.platform === 'win32') {
  PLUGIN_LOCAL.paths = [
    path.join('test', 'plugins', 'DLL', 'surge-synthesizer', 'surge', '1.3.1', 'Surge-vst3.dll'),
    path.join('test', 'plugins', 'DLL', 'surge-synthesizer', 'surge', '1.3.1', 'Surge.dll'),
    path.join('test', 'plugins', 'LV2', 'surge-synthesizer', 'surge', '1.3.1', 'Surge.lv2'),
  ];
} else if (process.platform === 'darwin') {
  PLUGIN_LOCAL.paths = [
    path.join('test', 'plugins', 'Components', 'surge-synthesizer', 'surge', '1.3.1', 'Surge.component'),
    path.join('test', 'plugins', 'LV2', 'surge-synthesizer', 'surge', '1.3.1', 'Surge.lv2'),
    path.join('test', 'plugins', 'VST', 'surge-synthesizer', 'surge', '1.3.1', 'Surge.vst'),
    path.join('test', 'plugins', 'VST3', 'surge-synthesizer', 'surge', '1.3.1', 'Surge.vst3'),
  ];
} else {
  PLUGIN_LOCAL.paths = [path.join('test', 'plugins', 'LV2', 'surge-synthesizer', 'surge', '1.3.1', 'Surge.lv2')];
}
PLUGIN_LOCAL.paths.sort();

beforeAll(() => {
  configSet('pluginFolder', PLUGIN_DIR);
  dirDelete(PLUGIN_DIR);
});

test('Plugin Registry', () => {
  expect(Convert.toPluginRegistry(JSON.stringify(PLUGIN_REGISTRY))).toStrictEqual(PLUGIN_REGISTRY);
});

test('Plugin Entry', () => {
  expect(Convert.toPluginEntry(JSON.stringify(PLUGIN_ENTRY))).toStrictEqual(PLUGIN_ENTRY);
});

test('Plugin Version', () => {
  expect(Convert.toPluginVersion(JSON.stringify(PLUGIN_VERSION))).toStrictEqual(PLUGIN_VERSION);
});

test('Create a plugin from a valid template', async () => {
  expect(await pluginCreate(path.join(PLUGIN_DIR, 'dplug-template'), PLUGIN_TEMPLATE)).toEqual(true);
});

test('Get plugin directory', () => {
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE)).toEqual(
    path.join(PLUGIN_DIR, PLUGIN_TYPE, PLUGIN.id || '', PLUGIN.version || ''),
  );
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 2)).toEqual(path.join(PLUGIN_DIR, PLUGIN_TYPE, PLUGIN.id || ''));
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE, 1)).toEqual(path.join(PLUGIN_DIR, PLUGIN_TYPE));
});

test('Get valid plugin by id from registry', async () => {
  expect(await pluginGet(PLUGIN_ID)).toMatchObject(PLUGIN);
});

test('Get invalid PLUGIN by id from registry', async () => {
  await expect(pluginGet('example/plugin')).rejects.toThrow('Plugin not found example/plugin');
});

test('Install plugin by id', async () => {
  expect(await pluginInstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL);
});

test('Check if plugin is installed locally', () => {
  expect(pluginInstalled(PLUGIN)).toEqual(true);
});

test('Get plugin locally', async () => {
  expect(await pluginGetLocal('surge-synthesizer/surge')).toMatchObject(PLUGIN_LOCAL);
});

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

test('Uninstall plugin by id', async () => {
  const PLUGIN_LOCAL_UPDATED: any = Object.assign({}, PLUGIN_LOCAL);
  delete PLUGIN_LOCAL_UPDATED.paths;
  PLUGIN_LOCAL_UPDATED.status = 'available';
  expect(await pluginUninstall(PLUGIN_ID)).toMatchObject(PLUGIN_LOCAL_UPDATED);
});
