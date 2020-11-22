import { getJSON, getRaw } from './api';
import { dirCreate, dirDelete, dirEmpty, dirExists, dirRead, dirRename, fileJsonLoad, zipExtract } from './file';
import os from 'os';
import path from 'path';
import { validatePlugin } from './validator';
import { PluginEntry } from './types';

const homedir = os.homedir();
const PLUGIN_LOCAL = `${pluginFolder(true)}/**/*.{vst,vst3}`;
const PLUGIN_DIR = './plugins';
const PLUGIN_TEMPLATE = 'https://github.com/studiorack/studiorack-plugin/archive/master.zip';
const REGISTRY_PATH = process.env.REGISTRY_PATH || 'https://studiorack.github.io/studiorack-registry/';

function pathGetPluginId(id: string) {
  return id.slice(id.lastIndexOf('/') + 1);
}

function pathGetRepoId(id: string) {
  return id.slice(0, id.lastIndexOf('/'));
}

function pathGetVersionId(id: string) {
  return id.split('@');
}

function pathFromSlashes(input: string) {
  return input ? input.replace(/\//g, '_') : input;
}

function pathToSlashes(input: string) {
  return input ? input.replace(/_/g, '/') : input;
}

function pathTruncate(str: string, max: number) {
  return (str.length > max) ? str.substr(0, max - 1) + '...' : str;
}

async function pluginCreate(dir: string) {
  if (dirExists(dir)) {
    console.error(`Directory already exists: ${dir}`);
    return false;
  }
  const data = await getRaw(PLUGIN_TEMPLATE);
  zipExtract(data, './');
  dirRename('studiorack-plugin-master', dir);
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

function pluginGetLocal(filePath: string) {
  const jsonPath = `${pluginFolder(true)}/${pathFromSlashes(filePath)}.json`;
  const versionId = filePath.match(/([0-9]+)\.([0-9]+)\.([0-9]+)/);
  console.log('jsonPath', jsonPath);
  const plugin = fileJsonLoad(jsonPath);
  plugin.id = pathFromSlashes(filePath);
  plugin.path = `${pluginFolder(true)}/${pathFromSlashes(filePath)}.vst3`;
  plugin.slug = path;
  plugin.status = 'installed';
  plugin.version = versionId ? versionId[0] : plugin.version;
  return plugin;
}

async function pluginsGet() {
  return await getJSON(REGISTRY_PATH).then((data) => {
    return data.objects;
  });
}

function pluginsGetLocal() {
  const list: any = [];
  const pluginPaths = dirRead(PLUGIN_LOCAL);
  pluginPaths.forEach((pluginPath: string) => {
    const folderPath = path.dirname(PLUGIN_LOCAL).replace('**', '');
    const relativePath = pluginPath.substring(folderPath.length);
    const pluginId = pathGetPluginId(pluginPath.substring(folderPath.length, pluginPath.lastIndexOf('.')));
    const repoId = relativePath.split('/', 2).join('/');
    const versionId = pluginPath.match(/([0-9]+)\.([0-9]+)\.([0-9]+)/);
    const jsonPath = pluginPath.substring(0, pluginPath.lastIndexOf('.')) + '.json';
    let plugin = fileJsonLoad(jsonPath);
    if (!plugin) {
      plugin = validatePlugin(pluginPath, { json: true });
    }
    plugin.id = `${repoId}/${pluginId}`;
    plugin.path = pluginPath;
    plugin.slug = pathFromSlashes(plugin.id);
    plugin.status = 'installed';
    plugin.version = versionId ? versionId[0] : plugin.version;
    list.push(plugin);
  });
  return list;
}

async function pluginInstall(id: string, version: string, global: boolean) {
  const plugin = await pluginGet(id);
  const pluginId = pathGetPluginId(id);
  const repoId = pathGetRepoId(id);
  if (!version) {
    version = plugin.version;
  }
  if (!plugin) {
    return console.error(`Plugin not found ${id}`);
  }
  if (!plugin.versions[version]) {
    return console.error(`Plugin version not found ${version}`);
  }
  const source = pluginSource(repoId, pluginId, version);
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
  version.slug = pathFromSlashes(plugin.id);
  version.version = plugin.version;
  return version;
}

async function pluginUninstall(id: string, version: string, global: boolean) {
  const plugin = await pluginGet(id);
  const pluginId = pathGetPluginId(id);
  const repoId = pathGetRepoId(id);
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

function pluginSource(repoId: string, pluginId: string, version: string) {
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
  if (supported[process.platform]) {
    return `https://github.com/${repoId}/releases/download/v${version}/${pluginId}-${supported[process.platform]}.zip`;
  }
  return false;
}

export {
  pathGetPluginId,
  pathGetRepoId,
  pathGetVersionId,
  pathFromSlashes,
  pathToSlashes,
  pathTruncate,
  pluginCreate,
  pluginFolder,
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
