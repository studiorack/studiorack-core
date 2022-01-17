import { ConfigInterface } from './types/config';
import { dirPlugins, dirProjects, fileDelete, fileJsonCreate, fileJsonLoad } from './file';
import { configDefaults } from './config-defaults';

const CONFIG_FILE_PATH = __dirname + '/config.json';
const config: ConfigInterface = fileJsonLoad(CONFIG_FILE_PATH) || configDefaults();
config.pluginFolder = dirPlugins();
config.projectFolder = dirProjects();

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
