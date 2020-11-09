import { getJSON, getRaw } from './api';
import { dirCreate, dirDelete, dirEmpty, dirExists, dirRename, zipExtract } from './file';
import os from 'os';

const homedir = os.homedir();
const PLUGIN_DIR = './plugins';
const PLUGIN_TEMPLATE = 'https://github.com/studiorack/studiorack-plugin/archive/master.zip';
const REGISTRY_PATH = process.env.REGISTRY_PATH || 'https://studiorack.github.io/studiorack-registry/';

function pathGetPluginId(id: string) {
  return id.slice(id.lastIndexOf('/') + 1)
}

function pathGetRepoId(id: string) {
  return id.slice(0, id.lastIndexOf('/'))
}

function pathGetVersionId(id: string) {
  return id.split('@');
}

function pathGetPlatform() {
  switch (process.platform) { 
    case 'darwin' : return 'mac';
    case 'win32' : return 'win';
    default : return 'linux';
  }
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
    'aix': homedir + '/.vst3',
    'darwin': '/Library/Audio/Plug-ins/VST3',
    'freebsd': homedir + '/.vst3',
    'linux': homedir + '/.vst3',
    'openbsd': homedir + '/.vst3',
    'sunos': homedir + '/.vst3',
    'win32': '/Program Files/Common Files/VST3',
    'win64': '/Program Files/Common Files/VST3'
  }
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

async function pluginsGet() {
  return await getJSON(REGISTRY_PATH).then((data) => {
    return data.objects;
  })
}

async function pluginInstall(id: string, version: string, global: boolean) {
  const plugin = await pluginGet(id);
  const pluginId = pathGetPluginId(id);
  const repoId = pathGetRepoId(id);
  if (!version) {
    version = plugin.version;
  }
  if (pluginInstalled(repoId, pluginId, version, global)) {
    console.error(`Plugin already installed ${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
    return version;
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
  const data = await getRaw(source);
  dirCreate(`${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  zipExtract(data, `${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  return version;
}

function pluginInstalled(repoId: string, pluginId: string, version: string, global: boolean) {
  return dirExists(`${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
}

function pluginUninstall(id: string, version: string, global: boolean) {
  const pluginId = pathGetPluginId(id);
  const repoId = pathGetRepoId(id);
  if (!pluginInstalled(repoId, pluginId, version, global)) {
    return console.error(`Plugin not installed ${pluginFolder(global)}/${repoId}/${pluginId}/${version}`);
  }
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
  return true;
}

async function pluginSearch(query: string) {
  query = query.toLowerCase();
  const plugins = await pluginsGet();
  const results = [];
  for (let pluginId in plugins) {
    const plugin = plugins[pluginId];
    const latest = plugin.versions[plugin.version];
    if (
      latest.name.toLowerCase().indexOf(query) != -1 ||
      latest.description.toLowerCase().indexOf(query) != -1 ||
      latest.tags.includes(query)) {
        results.push(plugin);
    }
  }
  return results;
}

function pluginSource(repoId: string, pluginId: string, version: string) {
  var supported: { [property: string]: string } = {
    'aix': 'linux',
    'darwin': 'mac',
    'freebsd': 'linux',
    'linux': 'linux',
    'openbsd': 'linux',
    'sunos': 'linux',
    'win32': 'win',
    'win64': 'win'
  }
  if (supported[process.platform]) {
    return `https://github.com/${repoId}/releases/download/v${version}/${pluginId}-${supported[process.platform]}.zip`;
  }
  return false;
}

export {
  pathGetPlatform, pathGetPluginId, pathGetRepoId, pathGetVersionId,
  pluginCreate, pluginFolder, pluginGet, pluginsGet, pluginInstall, pluginSearch, pluginSource, pluginUninstall
};
