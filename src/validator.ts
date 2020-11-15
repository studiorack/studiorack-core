import { dirExists, fileCreate, fileDate, fileExec, fileJsonCreate, fileSize, zipCreate, zipExtract } from './file';
import { execSync } from 'child_process';
import { getRaw } from './api';
import { Plugin } from './types';
import path from 'path';

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

async function validateInstall() {
  // If binary does not exist, download Steinberg VST3 SDK validator binary
  if (!dirExists(VALIDATOR_DIR)) {
    const data = await getRaw(
      `https://github.com/studiorack/studiorack-plugin/releases/latest/download/validator-${pathGetPlatform()}.zip`
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
  const outputJson = validateProcess(pathItem, outputText);
  const filepath = pathItem.substring(0, pathItem.lastIndexOf('.'));
  if (options.txt) {
    console.log(outputText);
    fileCreate(`${filepath}.txt`, outputText);
    console.log(`Generated: ${filepath}.txt`);
  }
  if (options.json) {
    console.log(outputJson);
    fileJsonCreate(`${filepath}.json`, outputJson);
    console.log(`Generated: ${filepath}.json`);
  }
  if (options.zip) {
    zipCreate(`${filepath}.*`, `${filepath}.zip`);
    console.log(`Generated: ${filepath}.zip`);
  }
  return outputJson;
}

function validatePluginSchema(plugin: Plugin) {
  let error: any = false;
  if (!plugin.author) {
    error = `author attribute missing`;
  }
  if (typeof plugin.author !== 'string') {
    error = `author incorrect type ${typeof plugin.author}`;
  }
  if (!plugin.homepage) {
    error = `homepage attribute missing`;
  }
  if (typeof plugin.homepage !== 'string') {
    error = `homepage incorrect type ${typeof plugin.homepage}`;
  }
  if (!plugin.name) {
    error = `name attribute missing`;
  }
  if (typeof plugin.name !== 'string') {
    error = `name incorrect type ${typeof plugin.name}`;
  }
  if (!plugin.description) {
    error = `description attribute missing`;
  }
  if (typeof plugin.description !== 'string') {
    error = `description incorrect type ${typeof plugin.description}`;
  }
  if (!plugin.tags) {
    error = `tags attribute missing`;
  }
  if (!Array.isArray(plugin.tags)) {
    error = `tags incorrect type ${typeof plugin.tags}`;
  }
  if (!plugin.version) {
    error = `version attribute missing`;
  }
  if (typeof plugin.version !== 'string') {
    error = `version incorrect type ${typeof plugin.version}`;
  }
  if (!plugin.size) {
    error = `size attribute missing`;
  }
  if (typeof plugin.size !== 'number') {
    error = `size incorrect type ${typeof plugin.size}`;
  }
  return error;
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
      let [key, val] = line.split(' = ');
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
  // get date then add to json
  const date = fileDate(pathItem);
  if (date) {
    json.date = date.toISOString();
  }
  // get filesize then add to json
  const size = fileSize(pathItem);
  if (size) {
    json.size = size;
  }
  // generate the id from the filename
  const id = path.basename(pathItem, path.extname(pathItem));
  if (id) {
    json.id = id;
  }
  // generate the id from the filename
  const filename = path.basename(pathItem);
  if (filename) {
    json.file = filename;
  }
  // if image exists add to json
  if (dirExists(`${folder}/${id}.png`)) {
    json.image = `${id}.png`;
  }
  // if audio exists add to json
  if (dirExists(`${folder}/${id}.wav`)) {
    json.audio = `${id}.wav`;
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

export { validateInstall, validatePlugin, validatePluginSchema, validateProcess, validateRun };
