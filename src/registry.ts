import os from 'os';
import { getJSON, getRaw } from './api';
import { dirCreate, dirDelete, dirEmpty, dirExists, dirRead, dirRename, fileJsonLoad, zipExtract } from './file';
import { validateInstall, validatePlugin } from './validator';
import { idToSlug, pathGetId, pathGetRepo, pathGetVersion } from './utils';
import { PluginEntry } from './types';

const PLUGIN_BRANCH = 'main';
const homedir = os.homedir();
const PLUGIN_DIR = './plugins';
const PLUGIN_LOCAL = `${pluginFolder(true)}/**/*.{vst,vst3}`;
const PLUGIN_PREFIX = 'studiorack-plugin';
const PLUGIN_TEMPLATE = 'https://github.com/studiorack/';
const REGISTRY_PATH = process.env.REGISTRY_PATH || 'https://studiorack.github.io/studiorack-registry/';

async function pluginCreate(dir: string, type?: string) {
  if (dirExists(dir)) {
    console.error(`Directory already exists: ${dir}`);
    return false;
  }
  if (!type) {
    type = 'steinberg';
  }
  const data = await getRaw(`${PLUGIN_TEMPLATE}${PLUGIN_PREFIX}-${type}/archive/${PLUGIN_BRANCH}.zip`);
  zipExtract(data, './');
  dirRename(`${PLUGIN_PREFIX}-${type}-${PLUGIN_BRANCH}`, dir);
  return true;
}

function pluginFolder(global: boolean) {
  const supported: { [property: string]: string } = {
    aix: homedir + '/.vst3',
    darwin: '/Library/Audio/Plug-ins/VST3',
    freebsd: homedir + '/.vst3',
    linux: homedir + '/.vst3',
    openbsd: homedir + '/.vst3',
    sunos: homedir + '/.vst3',
    win32: '/Program Files/Common Files/VST3',
    win64: '/Program Files/Common Files/VST3',
  };
  if (global) {
    return supported[process.platform];
  } else {
    return PLUGIN_DIR;
  }
}

async function pluginGet(id: string) {
  const plugins = await pluginsGet();
  return plugins[id] || false;
}

function pluginGetLocal(pluginPath: string) {
  const jsonPath = pluginPath.substring(0, pluginPath.lastIndexOf('.')) + '.json';
  let plugin = fileJsonLoad(jsonPath);
  if (!plugin) {
    plugin = validatePlugin(pluginPath, { files: true, json: true });
  }
  plugin.id = pathGetId(pluginPath);
  plugin.path = pluginPath;
  plugin.slug = idToSlug(plugin.id);
  plugin.status = 'installed';
  plugin.version = pathGetVersion(pluginPath);
  return plugin;
}

async function pluginsGet() {
  return await getJSON(REGISTRY_PATH).then((data) => {
    return data.objects;
  });
}

async function pluginsGetLocal() {
  await validateInstall();
  const list: any = [];
  const pluginPaths = dirRead(PLUGIN_LOCAL);
  pluginPaths.forEach((pluginPath: string) => {
    const jsonPath = pluginPath.substring(0, pluginPath.lastIndexOf('.')) + '.json';
    let plugin = fileJsonLoad(jsonPath);
    if (!plugin) {
      plugin = validatePlugin(pluginPath, { files: true, json: true });
    }
    plugin.id = pathGetId(pluginPath);
    plugin.path = pluginPath;
    plugin.slug = idToSlug(plugin.id);
    plugin.status = 'installed';
    plugin.version = pathGetVersion(pluginPath);
    list.push(plugin);
  });
  return list;
}

async function pluginInstall(id: string, version: string, global: boolean) {
  const plugin = await pluginGet(id);
  const pluginId = pathGetId(id);
  const repoId = pathGetRepo(id);
  if (!version) {
    version = plugin.version;
  }
  if (!plugin) {
    return console.error(`Plugin not found ${id}`);
  }
  if (!plugin.versions[version]) {
    return console.error(`Plugin version not found ${version}`);
  }
  const source = pluginSource(repoId, plugin.versions[version].files, plugin.versions[version].release);
  if (!source) {
    return console.error(`Plugin not available for your system ${id}`);
  }
  if (source.slice(-4) !== '.zip') {
    return console.error(`Unsupported file type ${source.slice(-4)}`);
  }
  if (pluginInstalled(repoId, pluginId, version, global)) {
    console.error(`Plugin already installed ${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  } else {
    const data = await getRaw(source);
    dirCreate(`${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
    zipExtract(data, `${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  }
  plugin.path = `${pluginFolder(true)}/${repoId}/${pluginId}/${plugin.version}`;
  plugin.status = 'installed';
  return plugin;
}

function pluginInstalled(repoId: string, pluginId: string, version: string, global: boolean) {
  return dirExists(`${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
}

function pluginLatest(plugin: PluginEntry) {
  const version = plugin.versions[plugin.version];
  version.id = plugin.id;
  version.slug = idToSlug(plugin.id);
  version.version = plugin.version;
  return version;
}

async function pluginUninstall(id: string, version: string, global: boolean) {
  const plugin = await pluginGet(id);
  const pluginId = pathGetId(id);
  const repoId = pathGetRepo(id);
  if (!pluginInstalled(repoId, pluginId, version, global)) {
    console.error(`Plugin not installed ${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  } else {
    dirDelete(`${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
    const pluginDir = `${pluginFolder(global)}/${repoId}/${pluginId}`;
    if (dirEmpty(pluginDir)) {
      dirDelete(pluginDir);
    }
    const parentDir = `${pluginFolder(global)}/${repoId}`;
    if (dirEmpty(parentDir)) {
      dirDelete(parentDir);
    }
    const grandparentDir = `${pluginFolder(global)}/${repoId.split('/')[0]}`;
    if (dirEmpty(grandparentDir)) {
      dirDelete(grandparentDir);
    }
  }
  delete plugin.path;
  plugin.status = 'available';
  return plugin;
}

async function pluginSearch(query: string) {
  query = query.toLowerCase();
  const plugins = await pluginsGet();
  const results = [];
  for (const pluginId in plugins) {
    const plugin = plugins[pluginId];
    const latest = plugin.versions[plugin.version];
    if (
      latest.name.toLowerCase().indexOf(query) !== -1 ||
      latest.description.toLowerCase().indexOf(query) !== -1 ||
      latest.tags.includes(query)
    ) {
      results.push(plugin);
    }
  }
  return results;
}

function pluginSource(repoId: string, pluginFiles: any, release: string) {
  const supported: { [property: string]: string } = {
    aix: 'linux',
    darwin: 'mac',
    freebsd: 'linux',
    linux: 'linux',
    openbsd: 'linux',
    sunos: 'linux',
    win32: 'win',
    win64: 'win',
  };
  const platformName = supported[process.platform];
  if (platformName && pluginFiles[platformName]) {
    return `https://github.com/${repoId}/releases/download/${release}/${pluginFiles[platformName].name}`;
  }
  return false;
}

export {
  pluginCreate,
  pluginGet,
  pluginGetLocal,
  pluginsGet,
  pluginsGetLocal,
  pluginInstall,
  pluginLatest,
  pluginSearch,
  pluginSource,
  pluginUninstall,
};
