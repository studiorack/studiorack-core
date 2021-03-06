interface PlatformTypes {
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

interface PluginEntry {
  id: string;
  license: string;
  version: string;
  versions: { [version: string]: PluginInterface };
}

interface PluginFile {
  name: string;
  size: number;
}

interface PluginFiles {
  audio: PluginFile;
  image: PluginFile;
  linux: PluginFile;
  mac: PluginFile;
  win: PluginFile;
}

interface PluginInterface {
  author: string;
  date: string;
  description: string;
  homepage: string;
  id: string;
  name: string;
  files: PluginFiles;
  license?: PluginLicense;
  release: string;
  repo: string;
  tags: string[];
  type?: PluginType;
  version: string;
}

interface PluginLicense {
  key: string;
  name: string;
  url: string;
}

interface PluginLocal extends PluginInterface {
  path: string;
  status: string;
}

interface PluginPack {
  [property: string]: PluginEntry;
}

interface PluginTemplate {
  dplug: string;
  iplug: string;
  juce: string;
  steinberg: string;
}

interface PluginType {
  name: string;
  ext: string;
}

interface PluginTypes {
  audioUnits: PluginType;
  avidAudioExtension: PluginType;
  realtimeAudiosuite: PluginType;
  timeDivisionMultiplexing: PluginType;
  virtualStudioTechnology: PluginType;
  virtualStudioTechnology3: PluginType;
}

export {
  PlatformTypes,
  PluginEntry,
  PluginFile,
  PluginFiles,
  PluginInterface,
  PluginLicense,
  PluginLocal,
  PluginPack,
  PluginTemplate,
  PluginType,
  PluginTypes,
};
