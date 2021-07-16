import { ConfigInterface } from './types/config';
import { dirPlugins, dirProjects, fileDelete, fileJsonCreate, fileJsonLoad } from './file';

const CONFIG_FILE_PATH = __dirname + '/config.json';
const config: ConfigInterface = fileJsonLoad(CONFIG_FILE_PATH) || configDefault();

function configDefault(): ConfigInterface {
  return {
    extAudio: '.wav',
    extFile: '.json',
    extImage: '.png',
    extZip: '.zip',
    ignoredFolders: ['Backup'],
    licenses: [
      {
        key: 'mit',
        name: 'MIT License',
        url: 'https://api.github.com/licenses/mit',
      },
      {
        key: 'lgpl-3.0',
        name: 'GNU Lesser General Public License v3.0',
        url: 'https://api.github.com/licenses/lgpl-3.0',
      },
      {
        key: 'mpl-2.0',
        name: 'Mozilla Public License 2.0',
        url: 'https://api.github.com/licenses/mpl-2.0',
      },
      {
        key: 'agpl-3.0',
        name: 'GNU Affero General Public License v3.0',
        url: 'https://api.github.com/licenses/agpl-3.0',
      },
      {
        key: 'unlicense',
        name: 'The Unlicense',
        url: 'https://api.github.com/licenses/unlicense',
      },
      {
        key: 'apache-2.0',
        name: 'Apache License 2.0',
        url: 'https://api.github.com/licenses/apache-2.0',
      },
      {
        key: 'gpl-3.0',
        name: 'GNU General Public License v3.0',
        url: 'https://api.github.com/licenses/gpl-3.0',
      },
    ],
    pluginFile: 'plugin.json',
    pluginFolder: dirPlugins(),
    pluginRegistry: 'https://studiorack.github.io/studiorack-registry/',
    pluginRelease: 'https://github.com/${repo}/releases/download',
    pluginTemplate: 'https://github.com/studiorack/studiorack-plugin-${template}/archive/main.zip',
    pluginTypes: {
      audioUnits: {
        name: 'Audio Units',
        ext: 'au',
      },
      avidAudioExtension: {
        name: 'Avid Audio Extension',
        ext: 'aax',
      },
      realtimeAudiosuite: {
        name: 'Real-Time AudioSuite',
        ext: 'rta',
      },
      timeDivisionMultiplexing: {
        name: 'Time-Division-Multiplexing',
        ext: 'tdm',
      },
      virtualStudioTechnology: {
        name: 'Virtual Studio Technology',
        ext: 'vst',
      },
      virtualStudioTechnology3: {
        name: 'Virtual Studio Technology 3',
        ext: 'vst3',
      },
    },
    projectFile: 'project.json',
    projectFolder: dirProjects(),
    projectRegistry: 'https://studiorack.github.io/studiorack-registry/',
    projectTypes: {
      ableton: {
        name: 'Ableton',
        ext: 'als',
      },
      cubase: {
        name: 'Cubase',
        ext: 'cpr',
      },
      flStudio: {
        name: 'FL Studio',
        ext: 'flp',
      },
      logic: {
        name: 'Logic',
        ext: 'logic',
      },
      proTools: {
        name: 'Pro Tools',
        ext: 'ptx',
      },
      reaper: {
        name: 'Reaper',
        ext: 'rpp',
      },
    },
    validatorUrl:
      'https://github.com/studiorack/studiorack-plugin-steinberg/releases/latest/download/validator-${platform}.zip',
  };
}

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

export { configDefault, configDelete, configGet, configSet };
