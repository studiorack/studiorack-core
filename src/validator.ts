import { dirExists, fileCreate, fileDate, fileExec, fileJsonCreate, zipCreate, zipExtract } from './file';
import { execSync } from 'child_process';
import { getRaw } from './api';
import { Plugin } from './types';
import path from 'path';
import * as semver from 'semver';
import slugify from 'slugify';
import { fileAdd, pathGetId } from './utils';

const VALIDATOR_DIR = path.join(__dirname.substring(0, __dirname.lastIndexOf('dist')), 'bin');
const VALIDATOR_EXT = pathGetPlatform() === 'win' ? '.exe' : '';
const VALIDATOR_PATH = path.join(VALIDATOR_DIR, 'validator' + VALIDATOR_EXT);

const map: { [property: string]: string } = {
  category: 'description',
  name: 'name',
  subCategories: 'tags',
  url: 'homepage',
  vendor: 'author',
  version: 'version',
};

function pathGetPlatform() {
  switch (process.platform) {
    case 'darwin':
      return 'mac';
    case 'win32':
      return 'win';
    default:
      return 'linux';
  }
}

function validateFiles(pathItem: string, json: any) {
  const folder = pathItem.substring(0, pathItem.lastIndexOf('/'));
  const id = slugify(path.basename(pathItem, path.extname(pathItem)), { lower: true });

  // Ensure files object exists
  if (!json.files) {
    json.files = {};
  }
  // Add audio, image and zip files
  json = fileAdd(`${folder}/${id}.wav`, `${id}.wav`, 'audio', json);
  json = fileAdd(`${folder}/${id}.png`, `${id}.png`, 'image', json);
  json = fileAdd(pathItem, `${id}-linux.zip`, 'linux', json);
  json = fileAdd(pathItem, `${id}-mac.zip`, 'mac', json);
  json = fileAdd(pathItem, `${id}-win.zip`, 'win', json);
  return json;
}

async function validateInstall() {
  // If binary does not exist, download Steinberg VST3 SDK validator binary
  if (!dirExists(VALIDATOR_DIR)) {
    const data = await getRaw(
      `https://github.com/studiorack/studiorack-plugin-steinberg/releases/latest/download/validator-${pathGetPlatform()}.zip`
    );
    console.log(`Installed validator: ${VALIDATOR_PATH}`);
    zipExtract(data, VALIDATOR_DIR);
    fileExec(VALIDATOR_PATH);
    return true;
  }
  return false;
}

function validatePlugin(pathItem: string, options?: any) {
  if (!dirExists(pathItem)) {
    console.error(`File does not exist: ${pathItem}`);
    return false;
  }
  console.log(`Reading: ${pathItem}`);
  const outputText = validateRun(pathItem);
  let outputJson: any = validateProcess(pathItem, outputText);
  if (options && options.files) {
    outputJson = validateFiles(pathItem, outputJson);
  }
  const filepath = pathItem.substring(0, pathItem.lastIndexOf('.'));
  if (options && options.txt) {
    console.log(outputText);
    fileCreate(`${filepath}.txt`, outputText);
    console.log(`Generated: ${filepath}.txt`);
  }
  if (options && options.json) {
    console.log(outputJson);
    fileJsonCreate(`${filepath}.json`, outputJson);
    console.log(`Generated: ${filepath}.json`);
  }
  if (options && options.zip) {
    zipCreate(`${filepath}.*`, `${filepath}.zip`);
    console.log(`Generated: ${filepath}.zip`);
  }
  return outputJson;
}

function validatePluginField(obj: any, field: string, type: string) {
  if (obj && !obj[field]) {
    return `- ${field} field missing\n`;
  }
  if (obj && typeof obj[field] !== type) {
    return `- ${field} field incorrect type ${typeof obj[field]}, expecting ${type}\n`;
  }
  return '';
}

function validatePluginSchema(plugin: Plugin) {
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

function validateProcess(pathItem: string, log: string) {
  const folder = pathItem.substring(0, pathItem.lastIndexOf('/'));
  // console.log('processLog', pathItem);
  const json: { [property: string]: any } = {};
  // loop through validator output
  for (let line of log.split('\n')) {
    // remove whitespace at start and end of lines
    line = line.trim();
    // only process lines assigning values
    if (line.includes(' = ')) {
      const [key, val] = line.split(' = ');
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
  const id = pathGetId(pathItem);
  if (id) {
    json.id = id;
  }
  // Get date then add to json
  const date = fileDate(pathItem);
  if (date) {
    json.date = date.toISOString();
  }
  // Ensure version is always valid semantic version
  if (json.version) {
    json.version = semver.coerce(json.version)?.version || '0.0.0';
  }

  return json;
}

function validateRun(filePath: string) {
  // Run Steinberg VST3 SDK validator binary
  try {
    const sdout = execSync(`${VALIDATOR_PATH} "${filePath}"`);
    return sdout.toString();
  } catch (error) {
    return error.output ? error.output.toString() : error.toString();
  }
}

export {
  validateFiles,
  validateInstall,
  validatePlugin,
  validatePluginField,
  validatePluginSchema,
  validateProcess,
  validateRun,
};
