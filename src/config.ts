interface ConfigType {
  extAudio: string;
  extFile: string;
  extImage: string;
  extZip: string;
  ignoredFolders: Array<string>;
  pluginFile: string;
  pluginFolder: string;
  pluginRegistry: string;
  projectFile: string;
  projectFolder: string;
  projectRegistry: string;
}

const config: ConfigType = {
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

function configGet(key: keyof ConfigType) {
  return config[key];
}

function configSet(key: keyof ConfigType, val: any) {
  config[key] = val;
  return configGet(key);
}

export {
  configGet,
  configSet
};
