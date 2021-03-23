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
  pluginTypes: {
    audioUnits: {
      name: "Audio Units",
      ext: "au"
    },
    avidAudioExtension: {
      name: "Avid Audio Extension",
      ext: "aax"
    },
    realtimeAudiosuite: {
      name: "Real-Time AudioSuite",
      ext: "rta"
    },
    timeDivisionMultiplexing: {
      name: "Time-Division-Multiplexing",
      ext: "tdm"
    },
    virtualStudioTechnology: {
      name: "Virtual Studio Technology",
      ext: "vst"
    },
    virtualStudioTechnology3: {
      name: "Virtual Studio Technology 3",
      ext: "vst3"
    }
  },
  projectFile: 'project.json',
  projectFolder: '/Users/username/Documents',
  projectRegistry: 'https://studiorack.github.io/studiorack-registry/',
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
