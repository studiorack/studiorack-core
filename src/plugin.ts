import { configGet } from './config';
import { dirCreate, dirDelete, dirEmpty, dirExists, dirRead, dirRename, fileCreate, fileJsonLoad, zipExtract } from './file';
import { getJSON, getRaw } from './api';
import { getPlatform, pathGetDirectory, pathGetExt, pathGetId, pathGetRepo, pathGetVersion, pathGetWithoutExt } from './utils';
import {
  PluginEntry,
  PluginFile,
  PluginInterface,
  PluginLocal,
  PluginPack,
  PluginTemplate,
  PluginTypes,
} from './types/plugin';
import { validateInstall, validatePlugin } from './validate';

const validPluginExt = ['deb', 'dmg', 'exe', 'zip'];

async function pluginCreate(path: string, template: keyof PluginTemplate = 'steinberg'): Promise<boolean> {
  if (dirExists(path)) {
    throw Error(`Directory already exists: ${path}`);
  }
  const data: Buffer = await getRaw(configGet('pluginTemplate').replace('${template}', template));
  zipExtract(data, './');
  dirRename(`studiorack-plugin-${template}-main`, path);
  return true;
}

function pluginDirectory(plugin: PluginInterface, depth?: number): string {
  const pluginPaths: string[] = [configGet('pluginFolder'), plugin.repo, plugin.id, plugin.version];
  if (depth) {
    return pluginPaths.slice(0, depth).join('/');
  }
  return pluginPaths.join('/');
}

async function pluginGet(id: string, version?: string): Promise<PluginInterface> {
  const pluginPack: PluginPack = await pluginsGet();
  if (!pluginPack[id]) {
    throw Error(`Plugin not found ${id}`);
  }
  if (!version) {
    version = pluginPack[id].version;
  }
  const plugin: PluginInterface = pluginLatest(pluginPack[id]);
  if (!plugin) {
    throw Error(`Plugin version not found ${version}`);
  }
  plugin.repo = pathGetRepo(id);
  return plugin;
}

async function pluginGetLocal(id: string, version?: string): Promise<PluginLocal> {
  const plugins: PluginLocal[] = await pluginsGetLocal();
  return plugins.filter((plugin: PluginLocal) => {
    return id === `${plugin.repo}/${plugin.id}`;
  })[0];
}

async function pluginsGet(): Promise<PluginPack> {
  return await getJSON(configGet('pluginRegistry')).then((data) => {
    return data.objects;
  });
}

async function pluginsGetLocal(): Promise<PluginLocal[]> {
  await validateInstall();
  const pluginTypes: PluginTypes = configGet('pluginTypes');
  const pluginExts: string[] = Object.keys(pluginTypes).map((pluginTypeKey: string) => {
    return pluginTypes[pluginTypeKey as keyof PluginTypes].ext;
  });
  const pluginFolderExts: string = `/**/*.{${pluginExts.join(',')}}`;
  const pluginPaths: string[] = dirRead(`${configGet('pluginFolder')}${pluginFolderExts}`);
  const plugins: PluginLocal[] = [];
  pluginPaths.forEach((pluginPath: string) => {
    const relativePath: string = pluginPath.replace(configGet('pluginFolder') + '/', '');
    let plugin: any = fileJsonLoad(`${pathGetWithoutExt(pluginPath)}.json`);
    if (!plugin) {
      plugin = validatePlugin(pluginPath, { files: true, json: true });
    }
    // Use installed path for id, repo and version (instead of autogenerated json)
    plugin.id = pathGetId(relativePath);
    plugin.path = pathGetDirectory(pluginPath);
    plugin.repo = pathGetRepo(relativePath);
    plugin.status = 'installed';
    plugin.version = pathGetVersion(pluginPath);
    plugins.push(plugin);
  });
  return plugins;
}

async function pluginInstall(id: string, version?: string): Promise<PluginLocal> {
  const plugin: PluginLocal = (await pluginGet(id, version)) as PluginLocal;
  const pluginUrl: string = pluginSource(plugin);
  const pluginExt = pathGetExt(pluginUrl);
  if (!validPluginExt.includes(pluginExt)) {
    throw Error(`Unsupported file type ${pluginExt}`);
  }
  const pluginPath: string = pluginDirectory(plugin);
  if (!dirExists(pluginPath)) {
    dirCreate(pluginPath);
  }
  const data: Buffer = await getRaw(pluginUrl);
  if (pluginExt === 'zip') {
    zipExtract(data, pluginPath);
  } else {
    fileCreate(pluginPath, data);
  }
  plugin.path = pluginPath;
  plugin.status = 'installed';
  return plugin;
}

function pluginInstalled(plugin: PluginInterface): boolean {
  return dirExists(pluginDirectory(plugin));
}

function pluginLatest(pluginEntry: PluginEntry): PluginInterface {
  const plugin: PluginInterface = pluginEntry.versions[pluginEntry.version];
  plugin.repo = pathGetRepo(pluginEntry.id);
  return plugin;
}

async function pluginSearch(query?: string): Promise<PluginInterface[]> {
  return await pluginsGet().then((pluginPack: PluginPack) => {
    const plugins: PluginInterface[] = [];
    if (query) {
      Object.keys(pluginPack).filter((id: string) => {
        const plugin: PluginInterface = pluginLatest(pluginPack[id]);
        if (
          plugin.name.toLowerCase().indexOf(query) !== -1 ||
          plugin.description.toLowerCase().indexOf(query) !== -1 ||
          plugin.tags.includes(query)
        ) {
          plugins.push(plugin);
        }
      });
    }
    return plugins;
  });
}

function pluginSource(plugin: PluginInterface): string {
  const pluginFile: PluginFile = plugin.files[getPlatform()];
  const pluginRoot: string = configGet('pluginRelease').replace('${repo}', plugin.repo);
  if (pluginFile) {
    return `${pluginRoot}/${plugin.release}/${plugin.files[getPlatform()].name}`;
  } else {
    throw Error(`Plugin not available for your system ${plugin.id}`);
  }
}

async function pluginUninstall(id: string, version?: string): Promise<PluginLocal> {
  const plugin: PluginLocal = (await pluginGet(id, version)) as PluginLocal;
  if (!pluginInstalled(plugin)) {
    throw Error(`Plugin not installed ${pluginDirectory(plugin)}`);
  } else {
    // Always delete specific plugin version
    const versionDir: string = pluginDirectory(plugin);
    dirDelete(versionDir);

    // If no other plugins versions by same id exist, then remove plugin id
    const idDir: string = pluginDirectory(plugin, 3);
    if (dirEmpty(idDir)) {
      dirDelete(idDir);
    }

    // If no other plugins by same repo exist, then remove plugin repo
    const repoDir: string = pluginDirectory(plugin, 2);
    if (dirEmpty(repoDir)) {
      dirDelete(repoDir);
    }

    // If no other plugins by same repo root exist, then remove plugin repo root
    const repoRootDir: string = pluginDirectory(plugin, 1) + '/' + plugin.repo.split('/')[0];
    if (dirEmpty(repoRootDir)) {
      dirDelete(repoRootDir);
    }
  }
  plugin.path = '';
  plugin.status = 'available';
  return plugin;
}

export {
  pluginCreate,
  pluginDirectory,
  pluginGet,
  pluginGetLocal,
  pluginsGet,
  pluginsGetLocal,
  pluginInstall,
  pluginInstalled,
  pluginLatest,
  pluginSearch,
  pluginSource,
  pluginUninstall,
};
