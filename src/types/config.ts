import { PluginTypes } from "./plugin";

interface ConfigInterface {
  extAudio: string;
  extFile: string;
  extImage: string;
  extZip: string;
  ignoredFolders: string[];
  pluginFile: string;
  pluginFolder: string;
  pluginRegistry: string;
  pluginTypes: PluginTypes;
  projectFile: string;
  projectFolder: string;
  projectRegistry: string;
}

export {
  ConfigInterface
}
