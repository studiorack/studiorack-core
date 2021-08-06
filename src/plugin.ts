import { configGet } from './config';
import {
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
  dirOpen,
  dirRead,
  dirRename,
  fileCreate,
  fileJsonCreate,
  fileJsonLoad,
  fileMove,
  zipExtract,
} from './file';
import { getJSON, getRaw } from './api';
import {
  getPlatform,
  pathGetDirectory,
  pathGetExt,
  pathGetId,
  pathGetRepo,
  pathGetVersion,
  pathGetWithoutExt,
} from './utils';
import {
  PluginEntry,
  PluginFile,
  PluginInterface,
  PluginLicense,
  PluginLocal,
  PluginPack,
  PluginTemplate,
  PluginTypes,
} from './types/plugin';
import { validateInstall, validatePlugin } from './validate';

const validPluginExt = ['deb', 'dmg', 'exe', 'msi', 'zip'];

async function pluginCreate(path: string, template: keyof PluginTemplate = 'steinberg'): Promise<boolean> {
  if (dirExists(path)) {
    throw Error(`Directory already exists: ${path}`);
  }
  const data: Buffer = await getRaw(configGet('pluginTemplate').replace('${template}', template));
  const tempDir: string = './temp-create';
  dirCreate(tempDir);
  zipExtract(data, tempDir);
  dirCreate(path);
  dirRename(`${tempDir}/studiorack-plugin-${template}-main`, path);
  dirDelete(tempDir);
  return true;
}

function pluginDirectory(plugin: PluginInterface, type = 'VST3', depth?: number): string {
  const pluginPaths: string[] = [`${configGet('pluginFolder')}/${type}`, plugin.repo, plugin.id, plugin.version];
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
  const pluginsFound: any = {};
  pluginPaths.forEach((pluginPath: string) => {
    const relativePath: string = pluginPath.replace(configGet('pluginFolder') + '/', '');
    const pluginId: string = pathGetId(relativePath);
    // Ignore plugins with the same id (plugin can have multiple formats)
    if (pluginsFound[pluginId]) return;
    pluginsFound[pluginId] = true;
    let plugin: any = fileJsonLoad(`${pathGetWithoutExt(pluginPath)}.json`);
    if (!plugin) {
      // If there is no metadata json file, attempt to auto create one
      plugin = validatePlugin(pluginPath, { files: true, json: true });
      // Use installed path for id, repo and version (instead of autogenerated json)
      plugin.id = pathGetId(relativePath);
      plugin.repo = pathGetRepo(relativePath);
      plugin.version = pathGetVersion(pluginPath);
    }
    plugin.path = pathGetDirectory(pluginPath);
    plugin.status = 'installed';
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
  const data: Buffer = await getRaw(pluginUrl);
  const tempDir: string = `./temp-install`;
  dirCreate(tempDir);
  if (pluginExt === 'zip') {
    zipExtract(data, tempDir);
    const pathsComponent: string[] = fileMove(`${tempDir}/**/*.component`, pluginDirectory(plugin, 'Components'));
    const pathsLv2: string[] = fileMove(`${tempDir}/**/*.lv2`, pluginDirectory(plugin, 'LV2'));
    const pathsVst: string[] = fileMove(`${tempDir}/**/*.vst`, pluginDirectory(plugin, 'VST'));
    const pathsVst3: string[] = fileMove(`${tempDir}/**/*.vst3`, pluginDirectory(plugin, 'VST3'));
    const pathsAll: string[] = pathsComponent.concat(pathsLv2, pathsVst, pathsVst3);
    // Save json metadata file alongside each plugin file/format
    pathsAll.forEach((pathPlugin: string) => {
      fileJsonCreate(`${pathGetWithoutExt(pathPlugin)}.json`, plugin);
    });
    dirDelete(tempDir);
  } else {
    const pluginPath: string = pluginDirectory(plugin);
    fileCreate(`${pluginPath}/${plugin.files[getPlatform()].name}`, data);
    dirOpen(pluginPath);
  }
  // TODO find better way to store paths
  // plugin.path = pluginPath;
  plugin.status = 'installed';
  return plugin;
}

function pluginInstalled(plugin: PluginInterface): boolean {
  if (
    dirExists(pluginDirectory(plugin, 'Components')) ||
    dirExists(pluginDirectory(plugin, 'LV2')) ||
    dirExists(pluginDirectory(plugin, 'VST')) ||
    dirExists(pluginDirectory(plugin, 'VST3'))
  ) {
    return true;
  }
  return false;
}

function pluginLatest(pluginEntry: PluginEntry): PluginInterface {
  const plugin: PluginInterface = pluginEntry.versions[pluginEntry.version];
  const licenses: PluginLicense[] = configGet('licenses');
  licenses.forEach((license: PluginLicense) => {
    if (pluginEntry.license === license.key) {
      plugin.license = license;
      return;
    }
  });
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
    throw Error(
      `Plugin not installed ${pluginDirectory(plugin, 'Components')} ${pluginDirectory(
        plugin,
        'LV2'
      )} ${pluginDirectory(plugin, 'VST')} ${pluginDirectory(plugin, 'VST3')}`
    );
  } else {
    // Move all plugin formats from folders
    // TODO remove app if it exists
    removeDirectory(plugin, 'Components');
    removeDirectory(plugin, 'LV2');
    removeDirectory(plugin, 'VST');
    removeDirectory(plugin, 'VST3');
  }
  plugin.path = '';
  plugin.status = 'available';
  return plugin;
}

function removeDirectory(plugin: PluginLocal, type: string) {
  // Always delete specific plugin version
  const versionDir: string = pluginDirectory(plugin, type);
  if (dirExists(versionDir)) {
    dirDelete(versionDir);
  }

  // If no other plugins versions by same id exist, then remove plugin id
  const idDir: string = pluginDirectory(plugin, type, 3);
  if (dirExists(idDir) && dirEmpty(idDir)) {
    dirDelete(idDir);
  }

  // If no other plugins by same repo exist, then remove plugin repo
  const repoDir: string = pluginDirectory(plugin, type, 2);
  if (dirExists(repoDir) && dirEmpty(repoDir)) {
    dirDelete(repoDir);
  }

  // If no other plugins by same repo root exist, then remove plugin repo root
  const repoRootDir: string = pluginDirectory(plugin, type, 1) + '/' + plugin.repo.split('/')[0];
  if (dirExists(repoRootDir) && dirEmpty(repoRootDir)) {
    dirDelete(repoRootDir);
  }
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
