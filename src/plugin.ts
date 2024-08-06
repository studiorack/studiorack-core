import * as semver from 'semver';
import path from 'path';
import { configGet } from './config.js';
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
  fileAdd,
  fileCreate,
  fileDate,
  fileExists,
  fileJsonCreate,
  fileReadJson,
  fileMove,
  isAdmin,
  runCliAsAdmin,
  zipCreate,
  zipExtract,
} from './file.js';
import { apiBuffer, apiJson } from './api.js';
import {
  getPlatform,
  isTests,
  log,
  pathGetDirectory,
  pathGetExt,
  pathGetFilename,
  pathGetId,
  pathGetVersion,
  pathGetWithoutExt,
  safeSlug,
} from './utils.js';
import {
  PluginEntry,
  PluginFile,
  PluginVersion,
  PluginLicense,
  PluginVersionLocal,
  PluginPack,
  PluginTemplate,
  PluginTypes,
  PluginValidationOptions,
} from './types/plugin.js';
import { toolInstall, toolRun } from './tool.js';

const map: { [property: string]: string } = {
  category: 'description',
  name: 'name',
  subCategories: 'tags',
  url: 'homepage',
  vendor: 'author',
  version: 'version',
};
const validPluginExt = ['deb', 'dmg', 'exe', 'msi', 'zip'];

export async function pluginCreate(dir: string, template: keyof PluginTemplate = 'steinberg'): Promise<boolean> {
  if (dirExists(dir)) {
    throw Error(`Directory already exists: ${dir}`);
  }
  const data: Buffer = await apiBuffer(configGet('pluginTemplate').replace('${template}', template));
  const tempDir: string = path.join(dirAppData(), 'studiorack', 'temp', template);
  dirCreate(tempDir);
  zipExtract(data, tempDir);
  dirCreate(dir);
  dirRename(path.join(tempDir, `studiorack-template-${template}-main`), dir);
  dirDelete(tempDir);
  return true;
}

export function pluginDirectory(plugin: PluginVersion, type = 'VST3', depth?: number): string {
  const pluginPath: string = (plugin.id || '').replace(/\//g, path.sep);
  const pluginPaths: string[] = [path.join(configGet('pluginFolder'), type), pluginPath, plugin.version || '0.0.0'];
  if (depth) {
    return pluginPaths.slice(0, depth).join(path.sep);
  }
  return pluginPaths.join(path.sep);
}

export async function pluginGet(id: string, version?: string): Promise<PluginVersion> {
  const pluginPack: PluginPack = await pluginsGet();
  if (!pluginPack[id]) {
    throw Error(`Plugin not found ${id}`);
  }
  if (!version) {
    version = pluginPack[id].version;
  }
  const plugin: PluginVersion = pluginLatest(pluginPack[id]);
  if (!plugin) {
    throw Error(`Plugin version not found ${version}`);
  }
  plugin.id = id;
  plugin.version = version;
  return plugin;
}

export async function pluginGetLocal(id: string, version?: string): Promise<PluginVersionLocal> {
  const plugins: PluginVersionLocal[] = await pluginsGetLocal();
  return plugins.filter((plugin: PluginVersionLocal) => {
    const matchVersion: boolean = version ? version === plugin.version : true;
    return id === plugin.id && matchVersion;
  })[0];
}

export async function pluginsGet(type: string = 'index'): Promise<PluginPack> {
  const url: string = configGet('pluginRegistry').replace('${type}', type);
  return await apiJson(url).then(data => {
    return data.objects;
  });
}

export async function pluginsGetLocal(): Promise<PluginVersionLocal[]> {
  await toolInstall('validator');
  const pluginTypes: PluginTypes = configGet('pluginTypes');
  const pluginExts: string[] = Object.keys(pluginTypes).map((pluginTypeKey: string) => {
    return pluginTypes[pluginTypeKey as keyof PluginTypes].ext;
  });
  const pluginSearchPath: string = path.join(configGet('pluginFolder'), '**', `*.{${pluginExts.join(',')}}`);
  const pluginPaths: string[] = dirRead(pluginSearchPath);
  const pluginsFound: { [property: string]: PluginVersionLocal } = {};
  pluginPaths.forEach((pluginPath: string) => {
    const relativePath: string = pluginPath.replace(configGet('pluginFolder') + path.sep, '');
    let plugin: PluginVersionLocal = fileReadJson(`${pathGetWithoutExt(pluginPath)}.json`);
    if (!plugin) {
      // If there is no metadata json file, attempt to auto create one using validator
      if (pathGetExt(pluginPath) === 'vst3') {
        plugin = pluginValidate(pluginPath, { files: true, json: true }) as PluginVersionLocal;
      } else {
        plugin = {} as any;
      }
      // Use installed path for id, repo and version (instead of autogenerated json)
      plugin.id = pathGetId(relativePath, path.sep);
      plugin.version = pathGetVersion(pluginPath);
    }
    if (!plugin.paths) {
      plugin.paths = [pluginPath];
    }
    plugin.status = 'installed';
    // Aggregate multiple plugin formats paths together into a single entry
    const pluginId: string = plugin.id || '';
    if (pluginsFound[pluginId]) {
      pluginsFound[pluginId].paths.push(pluginPath);
      pluginsFound[pluginId].paths.sort();
    } else {
      pluginsFound[pluginId] = plugin;
    }
  });
  // Return as an array
  return Object.keys(pluginsFound).map((pluginKey: string) => pluginsFound[pluginKey]);
}

export function pluginOrganize(
  dirSource: string,
  ext: string,
  dirTarget: string,
  plugin: PluginVersionLocal,
): string[] {
  const paths: string[] = [];
  const files: string[] = dirRead(`${dirSource}/**/*.${ext}`);
  // Do not create directory unless there are plugins to copy
  if (files.length === 0) {
    return [];
  }
  // Create a sub directory folder for files of that type
  dirCreate(dirTarget);
  files.forEach((file: string) => {
    if (file.includes('__MACOSX')) return;
    const fileSourceExt: string = path.join(dirTarget, path.basename(file));
    if (fileExists(fileSourceExt)) return;
    fileMove(file, fileSourceExt);
    // Create a copy of the plugin json so paths are unique
    const pluginCopy: PluginVersionLocal = JSON.parse(JSON.stringify(plugin));
    pluginCopy.paths.push(fileSourceExt);
    fileJsonCreate(`${pathGetWithoutExt(fileSourceExt)}.json`, pluginCopy);
    paths.push(fileSourceExt);
  });
  return paths;
}

// This is a prototype
export async function pluginInstall(id: string, version?: string): Promise<PluginVersionLocal> {
  const plugin: PluginVersionLocal = (await pluginGet(id, version)) as PluginVersionLocal;
  plugin.paths = [];

  // If plugin is already installed then abort
  if (pluginInstalled(plugin)) return await pluginGetLocal(id, version);

  // If plugin installation path is outside dirAppData(), and program is not running as Admin,
  // then trigger a pop-up to ask for elevated privileges, and run installation using cli.
  if (!isAdmin() && !isTests() && !dirContains(dirAppData(), pluginDirectory(plugin))) {
    let command: string = `--operation install`;
    if (id) command += ` --id ${id}`;
    if (version) command += ` --ver ${version}`;
    await runCliAsAdmin(command);
    return await pluginGetLocal(plugin.id || '', plugin.version);
  }

  // Check file extension is supported
  const pluginUrl: string = pluginSource(plugin);
  const pluginExt = pathGetExt(pluginUrl);
  if (!validPluginExt.includes(pluginExt)) {
    throw Error(`Unsupported file type ${pluginExt}`);
  }

  // Download plugin data
  const pluginData: Buffer = await apiBuffer(pluginUrl);
  const dirTemp: string = path.join(dirAppData(), 'studiorack', 'downloads', plugin.id || '');
  dirCreate(dirTemp);

  // If the file is compressed
  if (pluginExt === 'zip') {
    let pathsAll: string[] = [];
    zipExtract(pluginData, dirTemp);

    // If plugin is a sample pack
    if (plugin.tags.includes('sfz') || plugin.tags.includes('sf2')) {
      const samplePackType: string = plugin.tags.includes('sfz') ? 'SFZ' : 'SF2';
      dirCreate(pluginDirectory(plugin, samplePackType));
      dirMove(dirTemp, pluginDirectory(plugin, samplePackType));
      const samplePackPath: string = path.join(
        pluginDirectory(plugin, samplePackType),
        '**',
        `*.${samplePackType.toLowerCase()}`,
      );
      pathsAll = dirRead(samplePackPath);
    } else {
      // Plugin is an instrument/effect
      const pathsClap: string[] = pluginOrganize(dirTemp, 'clap', pluginDirectory(plugin, 'CLAP'), plugin);
      const pathsCom: string[] = pluginOrganize(dirTemp, 'component', pluginDirectory(plugin, 'Components'), plugin);
      const pathsDll: string[] = pluginOrganize(dirTemp, 'dll', pluginDirectory(plugin, 'DLL'), plugin);
      const pathsLv2: string[] = pluginOrganize(dirTemp, 'lv2', pluginDirectory(plugin, 'LV2'), plugin);
      const pathsVst: string[] = pluginOrganize(dirTemp, 'vst', pluginDirectory(plugin, 'VST'), plugin);
      const pathsVst3: string[] = pluginOrganize(dirTemp, 'vst3', pluginDirectory(plugin, 'VST3'), plugin);
      pathsAll = pathsClap.concat(pathsCom, pathsDll, pathsLv2, pathsVst, pathsVst3);

      // If a preset directory exists
      const dirTempPresets: string = path.join(dirTemp, 'Presets');
      log('dirTempPresets', dirTempPresets);
      if (dirExists(dirTempPresets)) {
        const dirTarget: string = configGet('presetFolder');
        const files: string[] = dirRead(`${dirTempPresets}/**/*`);
        log('dirTarget', dirTarget);
        files.forEach((file: string) => {
          if (file.includes('__MACOSX')) return;
          const fileSourceExt: string = path.join(dirTarget, path.basename(file));
          if (fileExists(fileSourceExt)) return;
          fileMove(file, fileSourceExt);
          log('fileMove', file, fileSourceExt);
        });
      }
    }
    // Save json metadata file alongside each plugin file/format
    pathsAll.forEach((pluginPath: string) => {
      plugin.paths.push(pluginPath);
    });
    dirDelete(dirTemp);
  } else {
    // Plugin is an installer
    const pluginPath: string = path.join(dirTemp, plugin.files[getPlatform()].url);
    fileCreate(pluginPath, pluginData);
    plugin.paths.push(pluginPath);
  }
  plugin.paths.sort();
  plugin.status = 'installed';
  return plugin;
}

export async function pluginInstallAll(): Promise<PluginVersionLocal[]> {
  return await pluginsGet().then(async (pluginPack: PluginPack) => {
    const plugins: PluginVersionLocal[] = [];
    for (const pluginId in pluginPack) {
      const pluginItem: PluginVersion = pluginLatest(pluginPack[pluginId]);
      if (!pluginInstalled(pluginItem)) {
        const PluginVersionLocal: PluginVersionLocal = await pluginInstall(pluginId, pluginPack[pluginId].version);
        plugins.push(PluginVersionLocal);
      }
    }
    return plugins;
  });
}

export function pluginInstalled(plugin: PluginVersion): boolean {
  if (
    dirExists(pluginDirectory(plugin, 'CLAP')) ||
    dirExists(pluginDirectory(plugin, 'Components')) ||
    dirExists(pluginDirectory(plugin, 'DLL')) ||
    dirExists(pluginDirectory(plugin, 'LV2')) ||
    dirExists(pluginDirectory(plugin, 'SF2')) ||
    dirExists(pluginDirectory(plugin, 'SFZ')) ||
    dirExists(pluginDirectory(plugin, 'VST')) ||
    dirExists(pluginDirectory(plugin, 'VST3'))
  ) {
    return true;
  }
  return false;
}

export function pluginLatest(pluginEntry: PluginEntry): PluginVersion {
  return pluginEntry.versions[pluginEntry.version];
}

export function pluginLicense(key: string | PluginLicense) {
  if (typeof key !== 'string') return key;
  const licenses: PluginLicense[] = configGet('licenses');
  let licenseMatch: PluginLicense = licenses[licenses.length - 1];
  licenses.forEach((license: PluginLicense) => {
    if (key === license.key) {
      licenseMatch = license;
      return;
    }
  });
  return licenseMatch;
}

export async function pluginSearch(query?: string): Promise<PluginVersion[]> {
  return await pluginsGet().then((pluginPack: PluginPack) => {
    const plugins: PluginVersion[] = [];
    if (query) {
      const queryLower: string = query.toLowerCase();
      Object.keys(pluginPack).filter((id: string) => {
        const plugin: PluginVersion = pluginLatest(pluginPack[id]);
        plugin.id = id;
        plugin.version = pluginPack[id].version;
        const pluginTags: string[] = plugin.tags.map((str: string) => str.toLowerCase());
        if (
          plugin.name.toLowerCase().indexOf(queryLower) !== -1 ||
          plugin.description.toLowerCase().indexOf(queryLower) !== -1 ||
          pluginTags.includes(queryLower)
        ) {
          plugins.push(plugin);
        }
      });
    }
    return plugins;
  });
}

export function pluginSource(plugin: PluginVersion): string {
  const pluginFile: PluginFile = plugin.files[getPlatform()];
  if (pluginFile.url) return pluginFile.url;
  const pluginRoot: string = configGet('pluginRelease').replace('${repo}');
  if (pluginFile) {
    return path.join(pluginRoot, plugin.id || '', plugin.files[getPlatform()].url);
  } else {
    throw Error(`Plugin not available for your system ${plugin.id}`);
  }
}

export async function pluginUninstall(id: string, version?: string): Promise<PluginVersionLocal> {
  const plugin: PluginVersionLocal = (await pluginGetLocal(id, version)) as PluginVersionLocal;
  if (!plugin) {
    throw Error(`Plugin not found locally ${id}, ${version}`);
  }
  // If plugin installation path is outside dirAppData(), and program is not running as Admin,
  // then trigger a pop-up to ask for elevated privileges, and run installation using cli.
  if (!isAdmin() && !isTests() && !dirContains(dirAppData(), pluginDirectory(plugin))) {
    let command: string = `--operation uninstall`;
    if (id) command += ` --id ${id}`;
    if (version) command += ` --ver ${version}`;
    await runCliAsAdmin(command);
    plugin.paths = [];
    plugin.status = 'available';
    return plugin;
  } else {
    if (!pluginInstalled(plugin)) {
      throw Error(
        `Plugin not installed locally 
        ${pluginDirectory(plugin, 'CLAP')} 
        ${pluginDirectory(plugin, 'Components')} 
        ${pluginDirectory(plugin, 'DLL')} 
        ${pluginDirectory(plugin, 'LV2')} 
        ${pluginDirectory(plugin, 'SF2')} 
        ${pluginDirectory(plugin, 'SFZ')} 
        ${pluginDirectory(plugin, 'VST')} 
        ${pluginDirectory(plugin, 'VST3')}`,
      );
    } else {
      // Move all plugin formats from folders
      // TODO remove app if it exists
      removeDirectory(plugin, 'CLAP');
      removeDirectory(plugin, 'Components');
      removeDirectory(plugin, 'DLL');
      removeDirectory(plugin, 'LV2');
      removeDirectory(plugin, 'SF2');
      removeDirectory(plugin, 'SFZ');
      removeDirectory(plugin, 'VST');
      removeDirectory(plugin, 'VST3');

      // If a preset directory exists
      const dirPresets: string = path.join(configGet('presetFolder'), plugin.id || '');
      if (dirExists(dirPresets)) {
        log('delete', dirPresets);
        dirDelete(dirPresets);
      }
    }
  }
  plugin.paths = [];
  plugin.status = 'available';
  return plugin;
}

export async function pluginUninstallAll(): Promise<PluginVersionLocal[]> {
  return await pluginsGetLocal().then(async (pluginsLocal: PluginVersionLocal[]) => {
    const plugins: PluginVersionLocal[] = [];
    for (const PluginVersionLocal of pluginsLocal) {
      if (pluginInstalled(PluginVersionLocal)) {
        const plugin: PluginVersionLocal = await pluginUninstall(
          PluginVersionLocal.id || '',
          PluginVersionLocal.version,
        );
        plugins.push(plugin);
      }
    }
    return plugins;
  });
}

export function pluginValidate(dir: string, options?: PluginValidationOptions): PluginVersion {
  if (!dir || !dirExists(dir)) {
    throw Error(`File does not exist: ${dir}`);
  }
  let outputText: string;
  let pluginJson: PluginVersionLocal;
  if (pathGetExt(dir) === 'clap') {
    outputText = toolRun('clapinfo', dir);
    pluginJson = parseClapOutput(dir, outputText) as any;
  } else {
    outputText = toolRun('validator', dir);
    pluginJson = parseValidatorOutput(dir, outputText);
  }
  if (options && options.files) {
    pluginJson = pluginValidateFiles(dir, pluginJson);
  }
  const filepath: string = pathGetWithoutExt(dir);
  if (options && options.txt && outputText) {
    log(outputText);
    fileCreate(`${filepath}.txt`, outputText);
  }
  if (options && options.json && pluginJson.tags) {
    log(pluginJson);
    fileJsonCreate(`${filepath}.json`, pluginJson);
  }
  if (options && options.zip && filepath) {
    zipCreate(`${filepath}.*`, `${filepath}.zip`);
  }
  return pluginJson;
}

export function pluginValidateFiles(pathItem: string, json: any): any {
  const directory: string = pathGetDirectory(pathItem, path.sep);
  const slug: string = safeSlug(pathGetFilename(pathItem, path.sep));
  // Ensure files object exists
  if (!json.files) {
    json.files = {};
  }
  // Add audio, image and zip files
  json = fileAdd(path.join(directory, `${slug}.flac`), `${slug}.flac`, 'audio', json);
  json = fileAdd(path.join(directory, `${slug}.wav`), `${slug}.wav`, 'audio', json);
  json = fileAdd(path.join(directory, `${slug}.jpg`), `${slug}.jpg`, 'image', json);
  json = fileAdd(path.join(directory, `${slug}.png`), `${slug}.png`, 'image', json);
  json = fileAdd(path.join(directory, `${slug}-linux.zip`), `${slug}-linux.zip`, 'linux', json);
  json = fileAdd(path.join(directory, `${slug}-mac.zip`), `${slug}-mac.zip`, 'mac', json);
  json = fileAdd(path.join(directory, `${slug}-win.zip`), `${slug}-win.zip`, 'win', json);
  return json;
}

export async function pluginValidateFolder(
  pluginPath: string,
  options: PluginValidationOptions,
): Promise<PluginVersionLocal[]> {
  if (!pluginPath) {
    throw Error(`Path does not exist: ${pluginPath}`);
  }
  const plugins: PluginVersionLocal[] = [];
  if (pluginPath.includes('clap')) {
    await toolInstall('clapinfo');
  } else {
    await toolInstall('validator');
  }
  if (pluginPath.includes('*')) {
    const pathList = dirRead(pluginPath);
    pathList.forEach((pathItem: string) => {
      const plugin: any = pluginValidate(pathItem, options);
      if (plugin.version) {
        plugins.push(plugin);
      }
    });
  } else {
    const plugin: any = pluginValidate(pluginPath, options);
    if (plugin.version) {
      plugins.push(plugin);
    }
  }
  if (options.summary) {
    let rootPath = pluginPath.substring(0, pluginPath.lastIndexOf(path.sep)).replace('**', '');
    rootPath += rootPath.endsWith(path.sep) ? '' : path.sep;
    fileJsonCreate(`${rootPath}plugins.json`, { plugins });
  }
  return plugins;
}

export function pluginValidateField(obj: any, field: string, type: string): string {
  if (obj && !obj[field]) {
    return `- ${field} field missing\n`;
  }
  if (obj && typeof obj[field] !== type) {
    return `- ${field} field incorrect type ${typeof obj[field]}, expecting ${type}\n`;
  }
  return '';
}

export function pluginValidateSchema(plugin: PluginVersionLocal): string | boolean {
  let error: string = '';
  error += pluginValidateField(plugin, 'author', 'string');
  error += pluginValidateField(plugin, 'date', 'string');
  error += pluginValidateField(plugin, 'description', 'string');
  error += pluginValidateField(plugin, 'homepage', 'string');
  error += pluginValidateField(plugin, 'name', 'string');
  error += pluginValidateField(plugin, 'files', 'object');

  error += pluginValidateField(plugin, 'tags', 'object');
  if (Number.isNaN(Date.parse(plugin.date))) {
    error += `- date not valid ${plugin.date}\n`;
  }

  error += pluginValidateField(plugin.files, 'audio', 'object');
  error += pluginValidateField(plugin.files, 'image', 'object');

  return error.length === 0 ? false : error;
}

export function parseClapOutput(pathItem: string, output: string) {
  const outputJson: any = JSON.parse(output);
  const pluginHeader: any = outputJson['clap.plugin-factory'][0];
  const pluginJson: any = {
    author: '',
    homepage: '',
    name: pluginHeader.name,
    description: pluginHeader.description,
    tags: pluginHeader.features,
    version: pluginHeader.version,
    id: safeSlug(pluginHeader.name),
    date: new Date().toISOString(),
  };
  log('parseClapOutput', pathItem, output);
  return pluginJson;
}

export function parseValidatorOutput(pathItem: string, output: string): any {
  const json: { [property: string]: any } = {};
  // loop through validator output
  for (let line of output.split('\n')) {
    // remove whitespace at start and end of lines
    line = line.trim();
    // only process lines assigning values
    if (line.includes(' = ')) {
      const [key, val]: string[] = line.split(' = ');
      let result: any = val;
      // ignore keys with spaces
      if (!key.includes(' ')) {
        // turn bar delimited strings into arrays
        if (result.includes('|')) {
          result = result.split('|');
        }
        // ensure tags is always an array
        if (key === 'subCategories' && !Array.isArray(result)) {
          result = [result];
        }
        // rename and output only fields which exist in our map
        if (map[key]) {
          json[map[key]] = result;
        }
      }
    }
  }
  // Generate the id from the filename
  const id: string = safeSlug(pathGetFilename(pathItem, path.sep));
  if (id) {
    json.id = id;
  }
  // Get date then add to json
  const date: Date = fileDate(pathItem);
  if (date) {
    json.date = date.toISOString();
  }
  // Ensure version is always valid semantic version
  if (json.version) {
    json.version = semver.coerce(json.version)?.version || '0.0.0';
  }
  return json;
}

export function removeDirectory(plugin: PluginVersionLocal, type: string) {
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
  const repoRootDir: string = path.join(pluginDirectory(plugin, type, 1));
  if (dirExists(repoRootDir) && dirEmpty(repoRootDir)) {
    dirDelete(repoRootDir);
  }
}
