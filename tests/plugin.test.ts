import { beforeAll, expect, test } from 'vitest';
// import { Convert } from '../src/convert';
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
  pluginLicense,
} from '../src/plugin';
import { PluginVersion, PluginVersionLocal, PluginTemplate, PluginLicense } from '../src/types/plugin';

// const PLUGIN_REGISTRY: PluginRegistry = {
//   name: 'StudioRack Registry - index',
//   url: 'https://studiorack.github.io/studiorack-registry/v2/index.json',
//   version: '2.0.0',
//   objects: {},
// };

// const PLUGIN_ENTRY: PluginEntry = {
//   version: '1.3.1',
//   versions: {},
// };

const PLUGIN_DIR: string = path.join('test', 'plugins');
const PLUGIN_ID: string = 'studiorack/mda';
const PLUGIN_TYPE: string = 'VST';
const PLUGIN_TEMPLATE: keyof PluginTemplate = 'dplug';
const PLUGIN_LICENSE: PluginLicense = {
  key: 'gpl-3.0',
  name: 'GNU General Public License v3.0',
  url: 'https://choosealicense.com/licenses/gpl-3.0',
  same: true,
};
const PLUGIN: PluginVersion = {
  author: 'Paul Kellett',
  homepage: 'http://mda.smartelectronix.com',
  name: 'MDA',
  description: 'Collection of effect plug-ins, from delay to an overdrive and a vocoder.',
  tags: ['Effect', 'Delay', 'Vocoder'],
  date: '2020-12-20T08:00:00.000Z',
  files: {
    linux: {
      name: 'mda-linux.zip',
      size: 70938,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-linux.zip',
    },
    mac: {
      name: 'mda-mac.zip',
      size: 5122516,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-mac.zip',
    },
    win: {
      name: 'mda-win.zip',
      size: 1247768,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-win.zip',
    },
    audio: {
      name: 'mda.flac',
      size: 127392,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda.flac',
    },
    image: {
      name: 'mda.jpg',
      size: 104156,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda.jpg',
    },
  },
  license: 'gpl-3.0',
  id: 'studiorack/mda',
  version: '1.0.4',
};
const PLUGIN_LOCAL: PluginVersionLocal = {
  author: 'Paul Kellett',
  homepage: 'http://mda.smartelectronix.com',
  name: 'MDA',
  description: 'Collection of effect plug-ins, from delay to an overdrive and a vocoder.',
  tags: ['Effect', 'Delay', 'Vocoder'],
  date: '2020-12-20T08:00:00.000Z',
  files: {
    linux: {
      name: 'mda-linux.zip',
      size: 70938,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-linux.zip',
    },
    mac: {
      name: 'mda-mac.zip',
      size: 5122516,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-mac.zip',
    },
    win: {
      name: 'mda-win.zip',
      size: 1247768,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda-win.zip',
    },
    audio: {
      name: 'mda.flac',
      size: 127392,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda.flac',
    },
    image: {
      name: 'mda.jpg',
      size: 104156,
      url: 'https://github.com/studiorack/mda/releases/download/v1.0.4/mda.jpg',
    },
  },
  license: 'gpl-3.0',
  id: 'studiorack/mda',
  version: '1.0.4',
  paths: [],
  status: 'installed',
};

if (process.platform === 'win32') {
  PLUGIN_LOCAL.paths = [
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Bandisto.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda BeatBox.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Combo.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda De-ess.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Degrade.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Delay.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Detune.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Dither.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda DubDelay.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Dynamics.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Envelope.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Image.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Leslie.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Limiter.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Loudness.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda MultiBand.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Overdrive.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RePsycho!.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RezFilter.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RingMod.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda RoundPan.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Shepard.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Splitter.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Stereo.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda SubSynth.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Talkbox.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda TestTone.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda ThruZero.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Tracker.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda VocInput.dll'),
    path.join('test', 'plugins', 'DLL', 'studiorack', 'mda', '1.0.4', 'mda Vocoder.dll'),
  ];
} else if (process.platform === 'darwin') {
  PLUGIN_LOCAL.paths = [
    path.join('test', 'plugins', 'Components', 'studiorack', 'mda', '1.0.4', 'mda.component'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Ambience.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Bandisto.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda BeatBox.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Combo.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda DX10.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda De-ess.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Degrade.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Delay.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Detune.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Dither.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda DubDelay.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Dynamics.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Image.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda JX10.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Leslie.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Limiter.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Looplex.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Loudness.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda MultiBand.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Overdrive.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Piano.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RePsycho!.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RezFilter.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RingMod.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda RoundPan.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Shepard.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Splitter.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Stereo.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda SubBass.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Talkbox.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda TestTone.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda ThruZero.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Tracker.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda VocInput.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda Vocoder.vst'),
    path.join('test', 'plugins', 'VST', 'studiorack', 'mda', '1.0.4', 'mda ePiano.vst'),
  ];
} else {
  PLUGIN_LOCAL.paths = [path.join('test', 'plugins', 'LV2', 'studiorack', 'mda', '1.0.4', 'mda.lv2')];
}
// PLUGIN_LOCAL.paths.sort();

beforeAll(() => {
  configSet('pluginFolder', PLUGIN_DIR);
  dirDelete(PLUGIN_DIR);
});

// test('Plugin Registry', () => {
//   expect(Convert.toPluginRegistry(JSON.stringify(PLUGIN_REGISTRY))).toStrictEqual(PLUGIN_REGISTRY);
// });

// test('Plugin Entry', () => {
//   expect(Convert.toPluginEntry(JSON.stringify(PLUGIN_ENTRY))).toStrictEqual(PLUGIN_ENTRY);
// });

// test('Plugin Version', () => {
//   expect(Convert.toPluginVersion(JSON.stringify(PLUGIN_VERSION))).toStrictEqual(PLUGIN_VERSION);
// });

test('Create a plugin from a valid template', async () => {
  expect(await pluginCreate(path.join(PLUGIN_DIR, 'dplug-template'), PLUGIN_TEMPLATE)).toEqual(true);
});

test('Get plugin directory', () => {
  expect(pluginDirectory(PLUGIN, PLUGIN_TYPE)).toEqual(
    path.join(PLUGIN_DIR, PLUGIN_TYPE, PLUGIN.id || '', PLUGIN.version || ''),
  );
  expect(pluginDirectory({ id: 'studiorack/plugin' } as any, PLUGIN_TYPE)).toEqual(
    path.join(PLUGIN_DIR, PLUGIN_TYPE, 'studiorack', 'plugin', '0.0.0'),
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
  expect(await pluginGetLocal('studiorack/mda')).toMatchObject(PLUGIN_LOCAL);
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

test('Get full plugin license information from config', async () => {
  expect(pluginLicense('gpl-3.0')).toEqual(PLUGIN_LICENSE);
  expect(PLUGIN_LICENSE).toEqual(PLUGIN_LICENSE);
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
