import path from 'path';
import { ConfigInterface } from './types/config.js';
import {
  dirAppData,
  dirCreate,
  dirPlugins,
  dirPresets,
  dirProjects,
  fileDelete,
  fileExists,
  fileJsonCreate,
  fileReadJson,
} from './file.js';
import { configDefaults } from './config-defaults.js';

const appDir: string = path.join(dirAppData(), 'studiorack');
const CONFIG_FILE_PATH = path.join(appDir, 'config.json');
dirCreate(appDir);

// If config file does not exist, then create it from defaults.
if (!fileExists(CONFIG_FILE_PATH)) {
  fileJsonCreate(CONFIG_FILE_PATH, configDefaults(appDir, dirPlugins(), dirPresets(), dirProjects()));
}
const config: ConfigInterface = fileReadJson(CONFIG_FILE_PATH);

function configDelete(): boolean | void {
  return fileDelete(CONFIG_FILE_PATH);
}

function configGet(key: keyof ConfigInterface): any {
  return config[key];
}

function configSet(key: keyof ConfigInterface, val: any) {
  config[key] = val;
  fileJsonCreate(CONFIG_FILE_PATH, config);
  return configGet(key);
}

export { configDelete, configGet, configSet };
