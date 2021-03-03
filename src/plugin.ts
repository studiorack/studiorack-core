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


async function pluginCreate(path: string, template: keyof PluginTemplate = 'steinberg'): Promise<Boolean> {
  if (dirExists(path)) {
    console.error(`Directory already exists: ${path}`);
    return false;
  }
  const data: Buffer = await getRaw(`https://github.com/studiorack/studiorack-plugin-${template}/archive/main.zip`);
  zipExtract(data, './');
  dirRename(`studiorack-plugin-${template}-main`, path);
  return true;
}

async function pluginGet(id: string, version?: string): Promise<PluginVersion> {
  const plugins: { [id: string]: PluginEntry } = await pluginSearch();
  if (!plugins[id]) {
    throw Error(`Plugin not found ${id}`);
  }
  if (!version) {
    version = plugins[id].version;
  }
  const pluginVersion: PluginVersion = plugins[id].versions[version];
  if (!pluginVersion) {
    throw Error(`Plugin version not found ${version}`);
  }
  return pluginVersion;
}

async function pluginInstall(id: string, version?: string): Promise<PluginVersion> {
  const platformName: keyof PluginFiles = platformTypes[process.platform];
  const pluginVersion: PluginVersion = await pluginGet(id);
  if (!pluginVersion.files && !pluginVersion.files[platformName]) {
    throw Error(`Plugin not available for your system ${id}`);
  }
  const pluginUrl: string = `https://github.com/${pluginVersion.repo}/releases/download/${pluginVersion.release}/${pluginVersion.files[platformName].name}`;
  if (pluginUrl.slice(-4) !== '.zip') {
    throw Error(`Unsupported file type ${pluginUrl.slice(-4)}`);
  }
  const pluginPath = `${configGet('pluginFolder')}/${pluginVersion.repo}/${pluginVersion.id}/${pluginVersion.version}`;
  if (dirExists(pluginPath)) {
    throw Error(`Plugin already installed ${pluginPath}`);
  } else {
    const data = await getRaw(pluginUrl);
    dirCreate(pluginPath);
    zipExtract(data, pluginPath);
  }
  pluginVersion.path = pluginPath;
  pluginVersion.status = 'installed';
  return pluginVersion;
}

function pluginInstalled(pluginVersion: PluginVersion): Boolean {
  return dirExists(`${configGet('pluginFolder')}/${pluginVersion.repo}/${pluginVersion.id}/${pluginVersion.version}`);
}

async function pluginList() {
  // await pluginValidatorInstall();
  // const list: any = [];
  // const pluginPaths = dirRead(`${configGet('pluginFolder')}${pluginFolderExts}`);
  // pluginPaths.forEach((pluginPath: string) => {
  //   const jsonPath = pluginPath.substring(0, pluginPath.lastIndexOf('.')) + '.json';
  //   const relativePath = pluginPath.replace(PLUGIN_ROOT + '/', '');
  //   let plugin = fileJsonLoad(jsonPath);
  //   if (!plugin) {
  //     plugin = validatePlugin(pluginPath, { files: true, json: true });
  //   }
  //   plugin.id = `${pathGetRepo(relativePath)}/${pathGetId(relativePath)}`;
  //   plugin.path = pluginPath;
  //   plugin.slug = idToSlug(plugin.id);
  //   plugin.status = 'installed';
  //   plugin.version = pathGetVersion(pluginPath);
  //   list.push(plugin);
  // });
  // return list;
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
  // // If binary does not exist, download Steinberg VST3 SDK validator binary
  // if (!dirExists(VALIDATOR_DIR)) {
  //   const data = await getRaw(
  //     `https://github.com/studiorack/studiorack-plugin-steinberg/releases/latest/download/validator-${pathGetPlatform()}.zip`
  //   );
  //   console.log(`Installed validator: ${VALIDATOR_PATH}`);
  //   zipExtract(data, VALIDATOR_DIR);
  //   fileExec(VALIDATOR_PATH);
  //   return true;
  // }
  // return false;
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
