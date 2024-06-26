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
let config: ConfigInterface = fileReadJson(CONFIG_FILE_PATH);
// If using config v1, then overwrite with v2 defaults.
if (!config.version) {
  fileJsonCreate(CONFIG_FILE_PATH, configDefaults(appDir, dirPlugins(), dirPresets(), dirProjects()));
  config = fileReadJson(CONFIG_FILE_PATH);
}

export function configDelete(): boolean | void {
  return fileDelete(CONFIG_FILE_PATH);
}

export function configGet(key: keyof ConfigInterface): any {
  return config[key];
}

export function configSet(key: keyof ConfigInterface, val: any) {
  config[key] = val;
  fileJsonCreate(CONFIG_FILE_PATH, config);
  return configGet(key);
}
