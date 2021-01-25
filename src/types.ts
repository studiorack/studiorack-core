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
  path?: string;
  release?: string;
  files: PluginFiles;
  slug?: string;
  status?: string;
  tags: string[];
  version: string;
}

export interface PluginFiles {
  audio?: {
    name: string;
    size: number;
  };
  image?: {
    name: string;
    size: number;
  };
  project?: {
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

interface Project {
  author: string;
  date: string;
  description: string;
  homepage: string;
  id?: string;
  name: string;
  path?: string;
  files: PluginFiles;
  plugins: { [property: string]: string };
  slug?: string;
  tags: string[];
  type: string;
  version: string;
}

export { Plugin, PluginEntry, PluginPack, PluginVersion, Project };
