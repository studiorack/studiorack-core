import { dirExists, fileCreate, fileDate, fileExec, fileJsonCreate, fileSize, zipCreate, zipExtract } from './file';
import { execSync } from 'child_process';
import { getRaw } from './api';
import { Plugin } from './types';
import path from 'path';
import * as semver from 'semver';
import slugify from 'slugify';

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
  json = addFile(`${folder}/${id}.wav`, `${id}.wav`, 'audio', json);
  json = addFile(`${folder}/${id}.png`, `${id}.png`, 'image', json);
  json = addFile(pathItem, `${id}-linux.zip`, 'linux', json);
  json = addFile(pathItem, `${id}-mac.zip`, 'mac', json);
  json = addFile(pathItem, `${id}-win.zip`, 'win', json);
  return json;
}

function addFile(filePath: string, fileName: string, fileType: string, json: any) {
  if (dirExists(filePath)) {
    // Ensure file type object exists
    if (!json.files[fileType]) {
      json.files[fileType] = {};
    }
    // Add file name
    if (fileName) {
      json.files[fileType].name = fileName;
    }
    // Add file size
    const size = fileSize(filePath);
    if (size) {
      json.files[fileType].size = size;
    }
  }
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
  let outputJson:any = validateProcess(pathItem, outputText);
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

function validatePluginSchema(plugin: Plugin) {
  let error: string = '';
  if (!plugin.author) {
    error += `- author attribute missing\n`;
  }
  if (typeof plugin.author !== 'string') {
    error += `- author incorrect type ${typeof plugin.author}\n`;
  }
  if (!plugin.homepage) {
    error += `- homepage attribute missing\n`;
  }
  if (typeof plugin.homepage !== 'string') {
    error += `- homepage incorrect type ${typeof plugin.homepage}\n`;
  }
  if (!plugin.name) {
    error += `- name attribute missing\n`;
  }
  if (typeof plugin.name !== 'string') {
    error += `- name incorrect type ${typeof plugin.name}\n`;
  }
  if (!plugin.description) {
    error += `- description attribute missing\n`;
  }
  if (typeof plugin.description !== 'string') {
    error += `- description incorrect type ${typeof plugin.description}\n`;
  }
  if (!plugin.tags) {
    error += `- tags attribute missing\n`;
  }
  if (!Array.isArray(plugin.tags)) {
    error += `- tags incorrect type ${typeof plugin.tags}\n`;
  }
  if (!plugin.version) {
    error += `- version attribute missing\n`;
  }
  if (typeof plugin.version !== 'string') {
    error += `- version incorrect type ${typeof plugin.version}\n`;
  }
  if (!semver.valid(plugin.version)) {
    error += `- version does not conform to semantic versioning ${typeof plugin.version}\n`;
  }
  if (!plugin.id) {
    error += `- id attribute missing\n`;
  }
  if (typeof plugin.id !== 'string') {
    error += `- id incorrect type ${typeof plugin.id}\n`;
  }
  if (!plugin.date) {
    error += `- date attribute missing\n`;
  }
  if (typeof plugin.date !== 'string') {
    error += `- date incorrect type ${typeof plugin.date}\n`;
  }
  if (Date.parse(plugin.date) === NaN) {
    error += `- date not valid ${typeof plugin.date}\n`;
  }
  return error.length === 0 ? false : error;
}

function validateProcess(pathItem: string, log: string) {
  const folder = pathItem.substring(0, pathItem.lastIndexOf('/'));
  // console.log('processLog', pathItem);
  let json: { [property: string]: any } = {};
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
  const id = slugify(path.basename(pathItem, path.extname(pathItem)), { lower: true });
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

export { validateFiles, validateInstall, validatePlugin, validatePluginSchema, validateProcess, validateRun };
