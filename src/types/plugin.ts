interface PluginInterface {
  author: string;
  date: string;
  description: string;
  homepage: string;
  id?: string;
  name: string;
  path?: string;
  release?: string;
  files: PluginFiles;
  slug?: string;
  status?: string;
  tags: string[];
  type: PluginType;
  version: string;
}

interface PluginEntry {
  id: string;
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
  PluginInterface,
  PluginEntry,
  PluginFile,
  PluginFiles,
  PluginPack,
  PluginTemplate,
  PluginType,
  PluginTypes
};
