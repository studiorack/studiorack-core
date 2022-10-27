import { PluginCategory, PluginLicense, PluginTypes } from './plugin';
import { ProjectTypes } from './project';

interface ConfigInterface {
  appFolder: string;
  extAudio: string;
  extFile: string;
  extImage: string;
  extZip: string;
  ignoredFolders: string[];
  licenses: PluginLicense[];
  pluginEffectCategories: { [property: string]: PluginCategory };
  pluginInstrumentCategories: { [property: string]: PluginCategory };
  pluginFile: string;
  pluginFolder: string;
  pluginRegistry: string;
  pluginRelease: string;
  pluginTemplate: string;
  pluginTypes: PluginTypes;
  presetFolder: string;
  projectFile: string;
  projectFolder: string;
  projectRegistry: string;
  projectTypes: ProjectTypes;
  clapinfoUrl: string;
  pluginvalUrl: string;
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
