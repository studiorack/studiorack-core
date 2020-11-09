import { dirExists, fileCreate, fileDate, fileExec, fileJsonCreate, fileSize, zipCreate, zipExtract } from './file';
import { pathGetPlatform } from './registry';
import { execSync } from 'child_process';
import { getRaw } from './api';
import path from 'path';

const VALIDATOR_DIR = path.join(__dirname.substring(0, __dirname.lastIndexOf('lib')), 'bin', 'validator');
const VALIDATOR_EXT = pathGetPlatform() === 'win' ? '.exe' : '';
const VALIDATOR_PATH = path.join(VALIDATOR_DIR, 'validator' + VALIDATOR_EXT);

const map: { [property: string]: string } = {
  category: 'description',
  name: 'name',
  subCategories: 'tags',
  url: 'homepage',
  vendor: 'author',
  version: 'version'
}

async function validateInstall() {
  // If binary does not exist, download Steinberg VST3 SDK validator binary
  if (!dirExists(VALIDATOR_DIR)) {
    const data = await getRaw(`https://github.com/studiorack/studiorack-plugin/releases/latest/download/validator-${pathGetPlatform()}.zip`);
    console.log('VALIDATOR_DIR', VALIDATOR_DIR);
    console.log('VALIDATOR_EXT', VALIDATOR_EXT);
    console.log('VALIDATOR_PATH', VALIDATOR_PATH);
    zipExtract(data, VALIDATOR_DIR);
    fileExec(VALIDATOR_PATH);
    return true;
  }
  return false;
}

function validatePlugin(pathItem: string, options: any) {
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
      let arr: Array<string> = [];
      // ignore keys with spaces
      if (!key.includes(' ')) {
        // turn bar delimited strings into arrays
        if (val.includes('|')) {
          arr = val.split('|');
        }
        // ensure tags is always an array
        if (map[key] === 'tags' && val.constructor !== Array) {
          arr = [val];
        }
        // rename and output only fields which exist in our map
        if (map[key]) {
          json[map[key]] = arr;
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
  const id = path.basename(pathItem, path.extname(pathItem))
  if (id) {
    json.id = id;
  }
  // generate the id from the filename
  const filename = path.basename(pathItem)
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

function validateRun(path: string) {
  // Run Steinberg VST3 SDK validator binary
  try {
    const sdout = execSync(`${VALIDATOR_PATH} "${path}"`);
    return sdout.toString();
  } catch (error) {
    return error.output ? error.output.toString() : error.toString();
  }
}

export {
  validateInstall,
  validatePlugin,
  validateProcess,
  validateRun
}
