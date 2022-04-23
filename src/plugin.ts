import path from 'path';
import { configGet } from './config';
import {
  dirAppData,
  dirContains,
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
  dirMove,
  dirRead,
  dirRename,
  fileCreate,
  fileExists,
  fileJsonCreate,
  fileJsonLoad,
  fileMove,
  isAdmin,
  zipExtract,
} from './file';
import { getJSON, getRaw } from './api';
import { getPlatform, isTests, pathGetExt, pathGetId, pathGetRepo, pathGetVersion, pathGetWithoutExt } from './utils';
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
import { runCliAsAdmin } from './admin';

const validPluginExt = ['deb', 'dmg', 'exe', 'msi', 'zip'];

async function pluginCreate(dir: string, template: keyof PluginTemplate = 'steinberg'): Promise<boolean> {
  if (dirExists(dir)) {
    throw Error(`Directory already exists: ${dir}`);
  }
  const data: Buffer = await getRaw(configGet('pluginTemplate').replace('${template}', template));
  const tempDir: string = path.join(dirAppData(), 'studiorack', 'temp', template);
  dirCreate(tempDir);
  zipExtract(data, tempDir);
  dirCreate(dir);
  dirRename(path.join(tempDir, `studiorack-template-${template}-main`), dir);
  dirDelete(tempDir);
  return true;
}

function pluginDirectory(plugin: PluginInterface, type = 'VST3', depth?: number): string {
  const [pluginOwner, pluginRepo] = plugin.repo.split('/');
  const pluginPaths: string[] = [
    path.join(configGet('pluginFolder'), type),
    path.join(pluginOwner, pluginRepo),
    plugin.id,
    plugin.version,
  ];
  if (depth) {
    return pluginPaths.slice(0, depth).join(path.sep);
  }
  return pluginPaths.join(path.sep);
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

async function pluginsGet(type: string = 'index'): Promise<PluginPack> {
  const url: string = configGet('pluginRegistry').replace('${type}', type);
  return await getJSON(url).then((data) => {
    return data.objects;
  });
}

async function pluginsGetLocal(): Promise<PluginLocal[]> {
  await validateInstall();
  const pluginTypes: PluginTypes = configGet('pluginTypes');
  const pluginExts: string[] = Object.keys(pluginTypes).map((pluginTypeKey: string) => {
    return pluginTypes[pluginTypeKey as keyof PluginTypes].ext;
  });
  const pluginSearchPath: string = path.join(configGet('pluginFolder'), '**', `*.{${pluginExts.join(',')}}`);
  const pluginPaths: string[] = dirRead(pluginSearchPath);
  const pluginsFound: { [property: string]: PluginLocal } = {};
  pluginPaths.forEach((pluginPath: string) => {
    const relativePath: string = pluginPath.replace(configGet('pluginFolder') + path.sep, '');
    let plugin: PluginLocal = fileJsonLoad(`${pathGetWithoutExt(pluginPath)}.json`);
    if (!plugin) {
      // If there is no metadata json file, attempt to auto create one
      plugin = validatePlugin(pluginPath, { files: true, json: true });
      // Use installed path for id, repo and version (instead of autogenerated json)
      plugin.id = pathGetId(relativePath, path.sep);
      plugin.repo = pathGetRepo(relativePath, path.sep);
      plugin.version = pathGetVersion(pluginPath);
    }
    if (!plugin.paths) {
      plugin.paths = [pluginPath];
    }
    plugin.status = 'installed';
    // Aggregate multiple plugin formats paths together into a single entry
    const pluginId: string = `${plugin.repo}/${plugin.id}`;
    if (pluginsFound[pluginId]) {
      pluginsFound[pluginId].paths.push(pluginPath);
    } else {
      pluginsFound[pluginId] = plugin;
    }
  });
  // Return as an array
  return Object.keys(pluginsFound).map((pluginKey: string) => pluginsFound[pluginKey]);
}

function pluginOrganizeByType(dirSource: string, ext: string, dirTarget: string, plugin: PluginLocal): string[] {
  const paths: string[] = [];
  const files: string[] = dirRead(`${dirSource}/**/*.${ext}`);
  // Create a sub directory folder for files of that type
  dirCreate(dirTarget);
  files.forEach((file: string) => {
    if (file.includes('__MACOSX')) return;
    const fileSourceExt: string = path.join(dirTarget, path.basename(file));
    if (fileExists(fileSourceExt)) return;
    fileMove(file, fileSourceExt);
    fileJsonCreate(`${pathGetWithoutExt(fileSourceExt)}.json`, plugin);
    paths.push(fileSourceExt);
  });
  return paths;
}

// This is a prototype
async function pluginInstall(id: string, version?: string): Promise<PluginLocal> {
  const plugin: PluginLocal = (await pluginGet(id, version)) as PluginLocal;
  // If plugin installation path is outside dirAppData(), and program is not running as Admin,
  // then trigger a pop-up to ask for elevated privileges, and run installation using cli.
  if (!isAdmin() && !isTests() && !dirContains(dirAppData(), pluginDirectory(plugin))) {
    const pluginId: string = version ? `${id}@${version}` : id;
    await runCliAsAdmin(`plugin install ${pluginId}`);
  } else {
    plugin.paths = [];
    const pluginUrl: string = pluginSource(plugin);
    const pluginExt = pathGetExt(pluginUrl);
    if (!validPluginExt.includes(pluginExt)) {
      throw Error(`Unsupported file type ${pluginExt}`);
    }
    // Download the plugin data
    const pluginData: Buffer = await getRaw(pluginUrl);
    // If the file is compressed
    if (pluginExt === 'zip') {
      let pathsAll: string[] = [];
      const [pluginOwner, pluginRepo] = plugin.repo.split('/');
      const dirDownloads: string = path.join(
        dirAppData(),
        'studiorack',
        'downloads',
        pluginOwner,
        pluginRepo,
        plugin.id
      );
      dirCreate(dirDownloads);
      zipExtract(pluginData, dirDownloads);
      if (plugin.tags.includes('sfz')) {
        // Plugin is a sample pack
        dirCreate(pluginDirectory(plugin, 'SFZ'));
        dirMove(dirDownloads, pluginDirectory(plugin, 'SFZ'));
        const pluginSFZPath: string = path.join(pluginDirectory(plugin, 'SFZ'), '**', '*.sfz');
        pathsAll = dirRead(pluginSFZPath);
      } else {
        // Plugin is an instrument/effect
        const pathsCom: string[] = pluginOrganizeByType(
          dirDownloads,
          'component',
          pluginDirectory(plugin, 'Components'),
          plugin
        );
        const pathsLv2: string[] = pluginOrganizeByType(dirDownloads, 'lv2', pluginDirectory(plugin, 'LV2'), plugin);
        const pathsVst: string[] = pluginOrganizeByType(dirDownloads, 'vst', pluginDirectory(plugin, 'VST'), plugin);
        const pathsVst3: string[] = pluginOrganizeByType(dirDownloads, 'vst3', pluginDirectory(plugin, 'VST3'), plugin);
        pathsAll = pathsCom.concat(pathsLv2, pathsVst, pathsVst3);
      }
      // Save json metadata file alongside each plugin file/format
      pathsAll.forEach((pluginPath: string) => {
        plugin.paths.push(pluginPath);
      });
      dirDelete(dirDownloads);
    } else {
      const pluginPath: string = path.join(pluginDirectory(plugin), plugin.files[getPlatform()].name);
      fileCreate(pluginPath, pluginData);
      plugin.paths.push(pluginPath);
    }
  }
  plugin.status = 'installed';
  return plugin;
}

async function pluginInstallAll(): Promise<PluginLocal[]> {
  return await pluginsGet().then(async (pluginPack: PluginPack) => {
    const plugins: PluginLocal[] = [];
    for (const pluginId in pluginPack) {
      const pluginItem: PluginInterface = pluginLatest(pluginPack[pluginId]);
      if (!pluginInstalled(pluginItem)) {
        const pluginLocal: PluginLocal = await pluginInstall(pluginPack[pluginId].id, pluginPack[pluginId].version);
        plugins.push(pluginLocal);
      }
    }
    return plugins;
  });
}

function pluginInstalled(plugin: PluginInterface): boolean {
  if (
    dirExists(pluginDirectory(plugin, 'Components')) ||
    dirExists(pluginDirectory(plugin, 'LV2')) ||
    dirExists(pluginDirectory(plugin, 'SFZ')) ||
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
    return path.join(pluginRoot, plugin.release, plugin.files[getPlatform()].name);
  } else {
    throw Error(`Plugin not available for your system ${plugin.id}`);
  }
}

async function pluginUninstall(id: string, version?: string): Promise<PluginLocal> {
  const plugin: PluginLocal = (await pluginGetLocal(id, version)) as PluginLocal;
  if (!plugin) {
    throw Error(`Plugin not found locally ${id}, ${version}`);
  }
  if (!plugin.repo) {
    throw Error(`Plugin is missing repo metadata ${id}, ${version}`);
  }
  // If plugin installation path is outside dirAppData(), and program is not running as Admin,
  // then trigger a pop-up to ask for elevated privileges, and run installation using cli.
  if (!isAdmin() && !isTests() && !dirContains(dirAppData(), pluginDirectory(plugin))) {
    const pluginId: string = version ? `${id}@${version}` : id;
    await runCliAsAdmin(`plugin uninstall ${pluginId}`);
  } else {
    if (!pluginInstalled(plugin)) {
      throw Error(
        `Plugin not installed locally 
        ${pluginDirectory(plugin, 'Components')} 
        ${pluginDirectory(plugin, 'LV2')} 
        ${pluginDirectory(plugin, 'SFZ')} 
        ${pluginDirectory(plugin, 'VST')} 
        ${pluginDirectory(plugin, 'VST3')}`
      );
    } else {
      // Move all plugin formats from folders
      // TODO remove app if it exists
      removeDirectory(plugin, 'Components');
      removeDirectory(plugin, 'LV2');
      removeDirectory(plugin, 'SFZ');
      removeDirectory(plugin, 'VST');
      removeDirectory(plugin, 'VST3');
    }
  }
  plugin.paths = [];
  plugin.status = 'available';
  return plugin;
}

async function pluginUninstallAll(): Promise<PluginLocal[]> {
  return await pluginsGetLocal().then(async (pluginsLocal: PluginLocal[]) => {
    const plugins: PluginLocal[] = [];
    for (const pluginLocal of pluginsLocal) {
      if (pluginInstalled(pluginLocal)) {
        const plugin: PluginLocal = await pluginUninstall(`${pluginLocal.repo}/${pluginLocal.id}`, pluginLocal.version);
        plugins.push(plugin);
      }
    }
    return plugins;
  });
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
  const [pluginOwner] = plugin.repo.split('/');
  const repoRootDir: string = path.join(pluginDirectory(plugin, type, 1), pluginOwner);
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
  pluginInstallAll,
  pluginInstalled,
  pluginLatest,
  pluginSearch,
  pluginSource,
  pluginUninstall,
  pluginUninstallAll,
};
