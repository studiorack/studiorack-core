import { ConfigInterface } from './types/config';

const config: ConfigInterface = {
  extAudio: '.wav',
  extFile: '.json',
  extImage: '.png',
  extZip: '.zip',
  ignoredFolders: ['Backup'],
  pluginFile: 'plugin.json',
  pluginFolder: '/Library/Audio/Plug-ins/VST3',
  pluginRegistry: 'https://studiorack.github.io/studiorack-registry/',
  projectFile: 'project.json',
  projectFolder: '/Users/username/Documents',
  projectRegistry: 'https://studiorack.github.io/studiorack-registry/'
};

function configGet(key: keyof ConfigInterface): any {
  return config[key];
}

function configSet(key: keyof ConfigInterface, val: any): any {
  config[key] = val;
  return configGet(key);
}

export {
  configGet,
  configSet
};
