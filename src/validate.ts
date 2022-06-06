import * as semver from 'semver';
import { execSync } from 'child_process';
import path from 'path';

import {
  dirAppData,
  dirExists,
  dirRead,
  fileAdd,
  fileCreate,
  fileDate,
  fileExec,
  fileJsonCreate,
  zipCreate,
  zipExtract,
} from './file';
import { getPlatform, log, pathGetDirectory, pathGetFilename, pathGetWithoutExt, safeSlug } from './utils';
import { getRaw } from './api';
import { PluginLocal } from './types/plugin';
import { configGet } from './config';

const map: { [property: string]: string } = {
  category: 'description',
  name: 'name',
  subCategories: 'tags',
  url: 'homepage',
  vendor: 'author',
  version: 'version',
};
const validatorFolder: string = path.join(dirAppData(), 'studiorack', 'bin');
const validatorPath: string = path.join(validatorFolder, 'validator' + (getPlatform() === 'win' ? '.exe' : ''));

function validateFiles(pathItem: string, json: any): any {
  const directory: string = pathGetDirectory(pathItem, path.sep);
  const slug: string = safeSlug(pathGetFilename(pathItem, path.sep));
  // Ensure files object exists
  if (!json.files) {
    json.files = {};
  }
  // Add audio, image and zip files
  json = fileAdd(path.join(directory, `${slug}.wav`), `${slug}.wav`, 'audio', json);
  json = fileAdd(path.join(directory, `${slug}.png`), `${slug}.png`, 'image', json);
  json = fileAdd(path.join(directory, `${slug}-linux.zip`), `${slug}-linux.zip`, 'linux', json);
  json = fileAdd(path.join(directory, `${slug}-mac.zip`), `${slug}-mac.zip`, 'mac', json);
  json = fileAdd(path.join(directory, `${slug}-win.zip`), `${slug}-win.zip`, 'win', json);
  return json;
}

async function validateFolder(pluginPath: string, options: any): Promise<PluginLocal[]> {
  if (!pluginPath) {
    throw Error(`Path does not exist: ${pluginPath}`);
  }
  const plugins: PluginLocal[] = [];
  await validateInstall();
  if (pluginPath.includes('*')) {
    const pathList = dirRead(pluginPath);
    pathList.forEach((pathItem: string) => {
      const plugin: any = validatePlugin(pathItem, options);
      if (plugin.version) {
        plugins.push(plugin);
      }
    });
  } else {
    const plugin: any = validatePlugin(pluginPath, options);
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

async function validateInstall(): Promise<boolean> {
  // If binary does not exist, download Steinberg VST3 SDK validator binary
  if (!dirExists(validatorPath)) {
    const data: Buffer = await getRaw(configGet('validatorUrl').replace('${platform}', getPlatform()));
    zipExtract(data, validatorFolder);
    fileExec(validatorPath);
    return true;
  }
  return false;
}

function validatePlugin(pathItem: string, options?: any): PluginLocal {
  if (!pathItem || !dirExists(pathItem)) {
    throw Error(`File does not exist: ${pathItem}`);
  }
  const outputText: string = validateRun(pathItem);
  let pluginJson: PluginLocal = validateProcess(pathItem, outputText);
  if (options && options.files) {
    pluginJson = validateFiles(pathItem, pluginJson);
  }
  const filepath: string = pathGetWithoutExt(pathItem);
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

function validatePluginField(obj: any, field: string, type: string): string {
  if (obj && !obj[field]) {
    return `- ${field} field missing\n`;
  }
  if (obj && typeof obj[field] !== type) {
    return `- ${field} field incorrect type ${typeof obj[field]}, expecting ${type}\n`;
  }
  return '';
}

function validatePluginSchema(plugin: PluginLocal): string | boolean {
  let error: string = '';
  error += validatePluginField(plugin, 'author', 'string');
  error += validatePluginField(plugin, 'homepage', 'string');
  error += validatePluginField(plugin, 'name', 'string');
  error += validatePluginField(plugin, 'description', 'string');
  error += validatePluginField(plugin, 'tags', 'object');
  error += validatePluginField(plugin, 'version', 'string');
  if (!semver.valid(plugin.version)) {
    error += `- version does not conform to semantic versioning ${plugin.version}\n`;
  }
  error += validatePluginField(plugin, 'id', 'string');
  error += validatePluginField(plugin, 'date', 'string');
  if (Number.isNaN(Date.parse(plugin.date))) {
    error += `- date not valid ${plugin.date}\n`;
  }
  error += validatePluginField(plugin, 'files', 'object');
  error += validatePluginField(plugin.files, 'audio', 'object');
  error += validatePluginField(plugin.files, 'image', 'object');

  return error.length === 0 ? false : error;
}

function validateProcess(pathItem: string, output: string): any {
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

function validateRun(filePath: string): string {
  // Run Steinberg VST3 SDK validator binary
  try {
    log('⎋', `${validatorPath} "${filePath}"`);
    const sdout: Buffer = execSync(`${validatorPath} "${filePath}"`);
    return sdout.toString();
  } catch (error: any) {
    return error.output ? error.output.toString() : error.toString();
  }
}

export {
  validateFiles,
  validateFolder,
  validateInstall,
  validatePlugin,
  validatePluginField,
  validatePluginSchema,
  validateProcess,
  validateRun,
};
