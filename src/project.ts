import path from 'path';
import { configGet } from './config';
import { dirCreate, dirRead, fileAdd, fileDate, fileJsonCreate, fileJsonLoad, fileOpen } from './file';
import {
  pathGetDirectory,
  pathGetExt,
  pathGetFilename,
  pathGetId,
  pathGetRepo,
  pathGetWithoutExt,
  safeSlug,
} from './utils';
import { pluginInstall, pluginUninstall } from './plugin';
import { PluginLocal } from './types/plugin';
import { ProjectInterface, ProjectLocal, ProjectType, ProjectTypes } from './types/project';
const readline = require('readline-sync');

function askQuestion(label: string, input: any, fallback: string) {
  return readline.question(`${label}: ($<defaultInput>) `, {
    defaultInput: input || fallback,
  });
}

function projectCreate(id: string, prompt: boolean = true): ProjectLocal {
  const project: ProjectLocal = projectDefault() as ProjectLocal;
  const projectId = pathGetFilename(id);
  if (prompt) {
    project.name = askQuestion('Name', project.name, projectId);
    project.version = askQuestion('Version', project.version, '1.0.0');
    project.description = askQuestion('Description', project.description, `${projectId} description`);
    project.files.audio.name = askQuestion('Audio', project.files.audio.name, `${projectId}.wav`);
    project.files.image.name = askQuestion('Image', project.files.image.name, `${projectId}.png`);
    project.files.project.name = askQuestion('Main', project.files.project.name, `${projectId}.als`);
  }
  project.id = safeSlug(pathGetFilename(id));
  project.path = pathGetDirectory(id);
  project.repo = pathGetRepo(id);
  project.status = 'installed';
  const projectJsonPath: string = path.join(configGet('projectFolder'), `${id}.json`);
  dirCreate(pathGetDirectory(projectJsonPath, path.sep));
  return projectSave(projectJsonPath, project);
}

function projectDefault(): ProjectInterface {
  return {
    id: 'studiorack-project',
    author: 'studiorack-user',
    homepage: 'https://studiorack.github.io/studiorack-site/',
    name: 'StudioRack Project',
    description: 'Created using StudioRack',
    repo: 'studiorack/studiorack-project',
    tags: ['StudioRack'],
    version: '1.0.0',
    date: new Date().toISOString(),
    type: {
      name: 'Ableton',
      ext: 'als',
    },
    files: {
      audio: {
        name: '',
        size: 0,
      },
      image: {
        name: '',
        size: 0,
      },
      project: {
        name: '',
        size: 0,
      },
    },
    plugins: {},
  };
}

function projectDirectory(project: ProjectInterface, depth?: number): string {
  const projectPaths: string[] = [configGet('projectFolder'), project.id, project.version];
  if (depth) {
    return projectPaths.slice(0, depth).join(path.sep);
  }
  return projectPaths.join(path.sep);
}

async function projectGetLocal(id: string, version?: string): Promise<ProjectLocal> {
  const projects: ProjectLocal[] = await projectsGetLocal();
  return projects.filter((project: ProjectLocal) => {
    return id === `${project.repo}/${project.id}`;
  })[0];
}

async function projectsGetLocal(): Promise<ProjectLocal[]> {
  const projectTypes: ProjectTypes = configGet('projectTypes');
  const projectExts: string[] = Object.keys(projectTypes).map((projectTypeKey: string) => {
    return projectTypes[projectTypeKey as keyof ProjectTypes].ext;
  });
  const projectSearchPath: string = path.join(configGet('projectFolder'), '**', `*.{${projectExts.join(',')}}`);
  const projectPaths: string[] = dirRead(projectSearchPath);
  const projects: ProjectLocal[] = [];
  projectPaths.forEach((projectPath: string) => {
    if (projectPath.includes('/Backup/')) return;
    const relativePath: string = projectPath.replace(configGet('projectFolder') + path.sep, '');
    let project: any = fileJsonLoad(`${pathGetWithoutExt(projectPath)}.json`);
    if (!project) {
      project = projectValidate(projectPath, { files: true, json: true });
    }
    // Use installed path for id, repo and version (instead of autogenerated json)
    project.id = safeSlug(pathGetFilename(relativePath, path.sep));
    project.path = pathGetDirectory(projectPath, path.sep);
    project.repo = pathGetRepo(relativePath, path.sep);
    project.status = 'installed';
    // project.version = pathGetVersion(projectPath);
    projects.push(project);
  });
  return projects;
}

async function projectInstall(dir: string, id?: string, version?: string): Promise<ProjectLocal> {
  const project: ProjectLocal = projectLoad(dir);
  if (id) {
    const pluginLocal: PluginLocal = await pluginInstall(id, version);
    if (pluginLocal) {
      project.plugins[id] = pluginLocal.version;
    }
  } else {
    for (const pluginId in project.plugins) {
      await pluginInstall(pluginId, project.plugins[pluginId]);
    }
  }
  return projectSave(dir, project);
}

function projectLoad(dir: string): ProjectLocal {
  const projectJson: ProjectLocal = fileJsonLoad(dir);
  if (projectJson && !projectJson.plugins) {
    projectJson.plugins = {};
  }
  return projectJson;
}

function projectSave(dir: string, config: ProjectLocal): ProjectLocal {
  fileJsonCreate(dir, config);
  return config;
}

async function projectStart(dir: string): Promise<Buffer> {
  const project: ProjectLocal = projectLoad(dir);
  const projectFilePath: string = path.join(pathGetDirectory(dir, path.sep), project.files.project?.name);
  return fileOpen(projectFilePath);
}

function projectType(ext: string): ProjectType {
  const projectTypes: ProjectTypes = configGet('projectTypes');
  let type: ProjectType = {
    name: 'Ableton',
    ext: 'als',
  };
  Object.keys(projectTypes).forEach((key: string) => {
    const currentType: ProjectType = projectTypes[key as keyof ProjectTypes];
    if (currentType.ext === ext) {
      type = currentType;
    }
  });
  return type;
}

async function projectUninstall(dir: string, id?: string, version?: string): Promise<ProjectLocal> {
  const project = projectLoad(dir);
  if (id) {
    let result = version;
    if (!version) {
      result = project.plugins[id];
    }
    const pluginLocal: PluginLocal = await pluginUninstall(id, result);
    if (pluginLocal) {
      delete project.plugins[id];
    }
  } else {
    for (const pluginId in project.plugins) {
      await pluginUninstall(pluginId, project.plugins[pluginId]);
    }
  }
  return projectSave(dir, project);
}

function projectValidate(dir: string, options?: any): ProjectInterface {
  const relativePath: string = dir.replace(configGet('projectFolder') + path.sep, '');
  const type: ProjectType = projectType(pathGetExt(dir));
  let project: ProjectLocal = projectDefault() as ProjectLocal;
  project.date = fileDate(dir).toISOString();
  project.id = safeSlug(pathGetFilename(relativePath, path.sep));
  project.name = pathGetFilename(relativePath, path.sep);
  project.path = pathGetDirectory(dir, path.sep);
  project.repo = pathGetRepo(relativePath, path.sep);
  project.status = 'installed';
  project.tags = [type.name];
  project.type = type;
  if (options && options.files) {
    project = projectValidateFiles(dir, project);
  }
  if (options && options.json) {
    const projectJsonPath: string = path.join(
      pathGetDirectory(dir, path.sep),
      `${pathGetFilename(dir, path.sep)}.json`
    );
    fileJsonCreate(projectJsonPath, project);
  }
  return project;
}

function projectValidateFiles(pathItem: string, json: any): any {
  const ext: string = pathGetExt(pathItem);
  const directory: string = pathGetDirectory(pathItem, path.sep);
  const filename: string = pathGetFilename(pathItem, path.sep);
  // Ensure files object exists
  if (!json.files) {
    json.files = {};
  }
  // Add audio, image and zip files
  json = fileAdd(path.join(directory, `${filename}.wav`), `${filename}.wav`, 'audio', json);
  json = fileAdd(path.join(directory, `${filename}.png`), `${filename}.png`, 'image', json);
  json = fileAdd(path.join(directory, `${filename}.${ext}`), `${filename}.${ext}`, 'project', json);
  return json;
}

export {
  projectCreate,
  projectDefault,
  projectDirectory,
  projectGetLocal,
  projectsGetLocal,
  projectInstall,
  projectLoad,
  projectSave,
  projectStart,
  projectType,
  projectUninstall,
  projectValidate,
  projectValidateFiles,
};
