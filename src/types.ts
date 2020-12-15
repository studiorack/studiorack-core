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
  size: number;
  slug?: string;
  status?: string;
  tags: string[];
  version: string;
}

export { Plugin, PluginEntry, PluginPack, PluginVersion };
