import { getRaw } from './api';
import { PluginTemplate } from './types/plugin';
import { dirExists, dirRename, zipExtract } from './file';

async function pluginCreate(path: string, template: keyof PluginTemplate = 'steinberg') {
  if (dirExists(path)) {
    console.error(`Directory already exists: ${path}`);
    return false;
  }
  const data = await getRaw(`https://github.com/studiorack/studiorack-plugin-${template}/archive/main.zip`);
  zipExtract(data, './');
  dirRename(`studiorack-plugin-${template}-main`, path);
  return true;
}

async function pluginGet(id: string) {
}

function pluginInstall(id: string) {
}

async function pluginList() {
}

async function pluginSearch(query?: string) {
}

function pluginUninstall(id: string) {
}

function pluginValidate(path: string) {
}

async function pluginValidatorInstall() {
}

export {
  pluginCreate,
  pluginGet,
  pluginInstall,
  pluginList,
  pluginSearch,
  pluginUninstall,
  pluginValidate,
  pluginValidatorInstall
};
