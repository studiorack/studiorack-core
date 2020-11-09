import { dirRead, fileJsonCreate, fileJsonLoad, fileLoad } from './file';
import { pathGetVersionId, pluginCreate, pluginInstall, pluginSearch, pluginUninstall } from './registry';

const readline = require('readline-sync');
const validator = require('./validator');

const PROJECT_CONFIG = `${process.cwd()}/project.json`;
const REGISTRY_PUBLISH = 'https://github.com/studiorack/studiorack-site/issues/new?title=Publish%20my%20plugin&body=Github%20repo%3A%20&labels=enhancement';

function askQuestion(label: string, input: string, fallback: string) {
  return readline.question(`${label}: ($<defaultInput>) `, { defaultInput: input || fallback });
}

async function projectCreate(folder: string) {
  const result = await pluginCreate(folder);
  if (result) {
    console.log(`Created new plugin at: ${folder}`);
  }
}

function projectInit() {
  const project = projectLoad();
  project.name = askQuestion('Name', project.name, 'My Project');
  project.version = askQuestion('Version', project.version, '0.0.1');
  project.description = askQuestion('Description', project.description, 'My project description');
  project.main = askQuestion('Main', project.main, 'Song.als');
  project.audio = askQuestion('Audio', project.audio, 'Song.wav');
  project.image = askQuestion('Image', project.image, 'Song.png');
  return projectSave(project);
}

async function projectInstall(input: string, options: any) {
  const project = projectLoad();
  if (input) {
    const [id, version] = pathGetVersionId(input);
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

function projectLoad() {
  const project = fileJsonLoad(PROJECT_CONFIG) || {};
  if (!project.plugins) {
    project.plugins = {};
  }
  return project;
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
  const project = await projectLoad();
  return fileLoad(path || project.main);
}

function projectUninstall(input: string, options: any) {
  const project = projectLoad();
  if (input) {
    let [id, version] = pathGetVersionId(input);
    if (!version) {
      version = project.plugins[id];
    }
    const success = pluginUninstall(id, version, options.global);
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
  const pluginRack = {
    plugins: <any> []
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
  projectCreate, projectInit, projectInstall,
  projectLoad, projectPublish, projectSave,
  projectSearch, projectStart, projectUninstall, projectValidate
};
