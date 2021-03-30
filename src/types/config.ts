import { PluginTypes } from './plugin';
import { ProjectTypes } from './project';

interface ConfigInterface {
  extAudio: string;
  extFile: string;
  extImage: string;
  extZip: string;
  ignoredFolders: string[];
  pluginFile: string;
  pluginFolder: string;
  pluginRegistry: string;
  pluginRelease: string;
  pluginTemplate: string;
  pluginTypes: PluginTypes;
  projectFile: string;
  projectFolder: string;
  projectRegistry: string;
  projectTypes: ProjectTypes;
  validatorUrl: string;
}

interface PlatformsSupported {
  aix: string;
  android: string;
  cygwin: string;
  darwin: string;
  freebsd: string;
  linux: string;
  netbsd: string;
  openbsd: string;
  sunos: string;
  win32: string;
  win64: string;
}

export { ConfigInterface, PlatformsSupported };
