import path from 'path';
import { ConfigInterface } from './types/config';
import { dirAppData, dirCreate, dirPlugins, dirProjects, fileDelete, fileJsonCreate, fileJsonLoad } from './file';
import { configDefaults } from './config-defaults';

const appDir: string = path.join(dirAppData(), 'studiorack');
const CONFIG_FILE_PATH = path.join(appDir, 'config.json');
dirCreate(appDir);
const config: ConfigInterface = fileJsonLoad(CONFIG_FILE_PATH) || configDefaults(appDir, dirPlugins(),  dirProjects());

function configDelete(): boolean | void {
  return fileDelete(CONFIG_FILE_PATH);
}

function configGet(key: keyof ConfigInterface): any {
  return config[key];
}

function configSet(key: keyof ConfigInterface, val: any): any {
  config[key] = val;
  fileJsonCreate(CONFIG_FILE_PATH, config);
  return configGet(key);
}

export { configDelete, configGet, configSet };
