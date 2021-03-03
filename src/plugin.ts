import { getJSON, getRaw } from './api';
import { configGet } from './config';
import { dirCreate, dirDelete, dirEmpty, dirExists, dirRead, dirRename, fileJsonLoad, zipExtract } from './file';
import { PlatformTypes, PluginEntry, PluginFiles, PluginInterface, PluginTemplate, PluginTypes, PluginVersion } from './types/plugin';

const platformTypes: PlatformTypes = {
  aix: 'linux',
  android: 'linux',
  cygwin: 'linux',
  darwin: 'mac',
  freebsd: 'linux',
  linux: 'linux',
  netbsd: 'linux',
  openbsd: 'linux',
  sunos: 'linux',
  win32: 'win',
  win64: 'win',
};

const pluginTypes: PluginTypes = {
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
};

const pluginExts: string[] = Object.keys(pluginTypes).map((pluginTypeKey: string) => {
  return pluginTypes[pluginTypeKey as keyof PluginTypes].ext;
});
const pluginFolderExts: string = `/**/*.{${pluginExts.join(',')}}`;


async function pluginCreate(path: string, template: keyof PluginTemplate = 'steinberg') {
  if (dirExists(path)) {
    console.error(`Directory already exists: ${path}`);
    return false;
  }
  const data: Buffer = await getRaw(`https://github.com/studiorack/studiorack-plugin-${template}/archive/main.zip`);
  zipExtract(data, './');
  dirRename(`studiorack-plugin-${template}-main`, path);
  return true;
}

async function pluginGet(id: string) {
  const plugins: { [id: string]: PluginEntry } = await pluginSearch();
  return plugins[id] || false;
}

async function pluginInstall(id: string, version: string) {
  const plugin: PluginEntry = await pluginGet(id);
  if (!plugin) {
    return console.error(`Plugin not found ${id}`);
  }
  if (!version) {
    version = plugin.version;
  }
  const platformName: keyof PluginFiles = platformTypes[process.platform];
  const pluginVersion: PluginVersion = plugin.versions[version];
  if (!pluginVersion) {
    return console.error(`Plugin version not found ${version}`);
  }
  if (!pluginVersion.files && !pluginVersion.files[platformName]) {
    return console.error(`Plugin not available for your system ${id}`);
  }
  const pluginUrl: string = `https://github.com/${pluginVersion.repo}/releases/download/${pluginVersion.release}/${pluginVersion.files[platformName].name}`;
  if (pluginUrl.slice(-4) !== '.zip') {
    return console.error(`Unsupported file type ${pluginUrl.slice(-4)}`);
  }
  const pluginPath = `${configGet('pluginFolder')}/${pluginVersion.repo}/${pluginVersion.id}/${pluginVersion.version}`;
  if (dirExists(pluginPath)) {
    console.error(`Plugin already installed ${pluginPath}`);
  } else {
    const data = await getRaw(pluginUrl);
    dirCreate(pluginPath);
    zipExtract(data, pluginPath);
  }
  pluginVersion.path = pluginPath;
  pluginVersion.status = 'installed';
  return pluginVersion;
}

function pluginInstalled(repoId: string, pluginId: string, version: string) {
  return dirExists(`${configGet('pluginFolder')}/${repoId}/${pluginId}/${version}`);
}

async function pluginList() {
}

async function pluginSearch(query?: string) {
  return await getJSON(configGet('pluginRegistry')).then((data) => {
    if (query) {
      return data.objects.filter((plugin: Plugin) => {
        return plugin.name === query;
      })[0];
    }
    return data.objects;
  });
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
  pluginInstalled,
  pluginList,
  pluginSearch,
  pluginUninstall,
  pluginValidate,
  pluginValidatorInstall
};
