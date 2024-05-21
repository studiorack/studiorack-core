export interface PluginCategory {
  name: string;
  tags: string[];
}

export interface PluginEntry {
  version: string;
  versions: PluginVersions;
}

export interface PluginFile {
  url: string;
  size: number;
}

export interface PluginFiles {
  audio: PluginFile;
  image: PluginFile;
  linux: PluginFile;
  mac: PluginFile;
  win: PluginFile;
}

export interface PluginLicense {
  key: string;
  name: string;
  url: string;
  same: boolean;
}

export interface PluginPack {
  [id: string]: PluginEntry;
}

export interface PluginRegistry {
  name: string;
  url: string;
  version: string;
  objects: PluginPack;
}

export interface PluginTemplate {
  clap: string;
  dpf: string;
  dplug: string;
  iplug: string;
  juce: string;
  sf2: string;
  sfz: string;
  steinberg: string;
}

export interface PluginType {
  name: string;
  ext: string;
}

export interface PluginTypes {
  audioUnits: PluginType;
  avidAudioExtension: PluginType;
  cleverAudioPlugin: PluginType;
  dynamicLinkLibrary: PluginType;
  ladspaVersion2: PluginType;
  realtimeAudiosuite: PluginType;
  sf2: PluginType;
  sfz: PluginType;
  timeDivisionMultiplexing: PluginType;
  virtualStudioTechnology: PluginType;
  virtualStudioTechnology3: PluginType;
}

export interface PluginValidationOptions {
  files?: boolean;
  json?: boolean;
  summary?: boolean;
  txt?: boolean;
  zip?: boolean;
}

export interface PluginVersion {
  author: string;
  date: string;
  description: string;
  homepage: string;
  id?: string;
  name: string;
  files: PluginFiles;
  license: string;
  tags: string[];
  version?: string;
}

export interface PluginVersions {
  [version: string]: PluginVersion;
}

export interface PluginVersionLocal extends PluginVersion {
  paths: string[];
  status: string;
}
