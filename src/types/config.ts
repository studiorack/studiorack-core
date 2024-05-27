import { PluginCategory, PluginFiles, PluginLicense, PluginTypes } from './plugin.js';
import { ProjectTypes } from './project.js';

export interface ConfigInterface {
  version: string;
  appFolder: string;
  extAudio: string;
  extFile: string;
  extImage: string;
  extZip: string;
  ignoredFolders: string[];
  licenses: PluginLicense[];
  pluginEffectCategories: ConfigList;
  pluginInstrumentCategories: ConfigList;
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

export interface ConfigList {
  [property: string]: PluginCategory;
}

export interface PlatformTypes {
  aix: keyof PluginFiles;
  android: keyof PluginFiles;
  cygwin: keyof PluginFiles;
  darwin: keyof PluginFiles;
  freebsd: keyof PluginFiles;
  linux: keyof PluginFiles;
  netbsd: keyof PluginFiles;
  openbsd: keyof PluginFiles;
  sunos: keyof PluginFiles;
  win32: keyof PluginFiles;
  win64: keyof PluginFiles;
}

export interface PlatformsSupported {
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
}
