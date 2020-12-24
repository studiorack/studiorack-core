interface PluginPack {
  [property: string]: PluginEntry;
}

interface PluginEntry {
  id: string;
  version: string;
  versions: PluginVersion;
}

interface PluginVersion {
  [version: string]: Plugin;
}

interface Plugin {
  author: string;
  date: string;
  description: string;
  homepage: string;
  id?: string;
  name: string;
  release?: string;
  files: PluginFiles;
  slug?: string;
  status?: string;
  tags: string[];
  version: string;
}

interface PluginFiles {
  audio: {
    name: string;
    size: number;
  };
  image: {
    name: string;
    size: number;
  };
  linux?: {
    name: string;
    size: number;
  };
  mac?: {
    name: string;
    size: number;
  };
  win?: {
    name: string;
    size: number;
  };
}

export { Plugin, PluginEntry, PluginPack, PluginVersion };
