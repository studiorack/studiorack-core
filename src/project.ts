import { dirRead, fileJsonCreate, fileJsonLoad, fileLoad } from './file';
import { pluginCreate, pluginInstall, pluginSearch, pluginUninstall } from './registry';
import { pathGetId, pathGetVersion } from './utils';
import { Project } from './types';

const readline = require('readline-sync');
const validator = require('./validator');

const PROJECT_CONFIG = `${process.cwd()}/project.json`;
const REGISTRY_PUBLISH =
  'https://github.com/studiorack/studiorack-site/issues/new?title=Publish%20my%20plugin&body=Github%20repo%3A%20&labels=enhancement';

function askQuestion(label: string, input: any, fallback: string) {
  return readline.question(`${label}: ($<defaultInput>) `, {
    defaultInput: input || fallback,
  });
}

async function projectCreate(folder: string) {
  const result = await pluginCreate(folder);
  if (result) {
    console.log(`Created new plugin at: ${folder}`);
  }
}

function projectInit() {
  const project: Project = projectLoad();
  project.name = askQuestion('Name', project.name, 'My Project');
  project.version = askQuestion('Version', project.version, '1.0.0');
  project.description = askQuestion('Description', project.description, 'My project description');
  project.files = {};
  project.files.audio = askQuestion('Audio', project.files.audio, 'Song.wav');
  project.files.image = askQuestion('Image', project.files.image, 'Song.png');
  project.files.project = askQuestion('Main', project.files.project, 'Song.als');
  return projectSave(project);
}

async function projectInstall(input: string, options: any) {
  const project: Project = projectLoad();
  if (input) {
    const id = pathGetId(input);
    const version = pathGetVersion(input);
    const installedVersion = await pluginInstall(id, version, options.global);
    if (installedVersion) {
      project.plugins[id] = installedVersion;
    }
  } else {
    for (const pluginId in project.plugins) {
      const installedVersion = await pluginInstall(pluginId, project.plugins[pluginId], options.global);
      if (installedVersion) {
        project.plugins[pluginId] = installedVersion;
      }
    }
  }
  return projectSave(project);
}

function projectLoad(): Project {
  const projectJson = fileJsonLoad(PROJECT_CONFIG) || {};
  if (!projectJson.plugins) {
    projectJson.plugins = {};
  }
  return projectJson;
}

async function projectPublish() {
  await open(REGISTRY_PUBLISH);
}

function projectSave(config: object) {
  return fileJsonCreate(PROJECT_CONFIG, config);
}

async function projectSearch(query: string) {
  const results = await pluginSearch(query);
  console.log(JSON.stringify(results, null, 2));
  console.log(`${results.length} results found.`);
}

async function projectStart(path: string) {
  const project: Project = await projectLoad();
  return fileLoad(path || project.files.project?.name || '');
}

function projectUninstall(input: string, options: any) {
  const project = projectLoad();
  if (input) {
    const id = pathGetId(input);
    const version = pathGetVersion(input);
    let result = version;
    if (!version) {
      result = project.plugins[id];
    }
    const success = pluginUninstall(id, result, options.global);
    if (success) {
      delete project.plugins[id];
    }
  } else {
    for (const pluginId in project.plugins) {
      const success = pluginUninstall(pluginId, project.plugins[pluginId], options.global);
      if (success) {
        delete project.plugins[pluginId];
      }
    }
  }
  return projectSave(project);
}

async function projectValidate(pluginPath: string, options: any) {
  const pluginRack: any = {
    plugins: [],
  };
  await validator.install();
  if (pluginPath.includes('*')) {
    const pathList = dirRead(pluginPath);
    pathList.forEach((pathItem) => {
      const plugin = validator.readPlugin(pathItem, options);
      pluginRack.plugins.push(plugin);
    });
  } else {
    const plugin = validator.readPlugin(pluginPath, options);
    pluginRack.plugins.push(plugin);
  }
  if (options.summary) {
    const rootPath = pluginPath.replace('**/*.{vst,vst3}', '').substring(0, pluginPath.lastIndexOf('/'));
    fileJsonCreate(`${rootPath}plugins.json`, pluginRack);
    console.log(`Generated: ${rootPath}plugins.json`);
  }
  return pluginRack;
}

export {
  projectCreate,
  projectInit,
  projectInstall,
  projectLoad,
  projectPublish,
  projectSave,
  projectSearch,
  projectStart,
  projectUninstall,
  projectValidate,
};
