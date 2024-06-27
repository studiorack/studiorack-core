import path from 'path';
import { configGet } from './config.js';
import { dirCreate, dirRead, fileAdd, fileDate, fileJsonCreate, fileReadJson, fileOpen } from './file.js';
import { pathGetDirectory, pathGetExt, pathGetFilename, pathGetWithoutExt, safeSlug } from './utils.js';
import { pluginInstall, pluginUninstall } from './plugin.js';
import { PluginVersionLocal, PluginValidationOptions } from './types/plugin.js';
import { ProjectType, ProjectTypes, ProjectVersion, ProjectVersionLocal } from './types/project.js';
import { question } from 'readline-sync';

function askQuestion(label: string, input: any, fallback: string) {
  return question(`${label}: ($<defaultInput>) `, {
    defaultInput: input || fallback,
  });
}

export function projectCreate(projectPath: string, prompt: boolean = true): ProjectVersionLocal {
  const project: ProjectVersionLocal = projectDefault() as ProjectVersionLocal;
  const projectName: string = pathGetFilename(projectPath);
  if (prompt) {
    project.name = askQuestion('Name', project.name, projectName);
    project.version = askQuestion('Version', project.version, '1.0.0');
    project.description = askQuestion('Description', project.description, `${projectName} description`);
    project.files.audio.name = askQuestion('Audio', project.files.audio.name, `${projectName}.wav`);
    project.files.audio.url = path.join(projectPath, project.files.audio.name);
    project.files.image.name = askQuestion('Image', project.files.image.name, `${projectName}.png`);
    project.files.image.url = path.join(projectPath, project.files.image.name);
    project.files.project.name = askQuestion('Main', project.files.project.name, `${projectName}.als`);
    project.files.project.url = path.join(projectPath, project.files.project.name);
  }
  project.id = safeSlug(projectPath.split(path.sep).join('/'));
  project.path = projectPath;
  project.status = 'installed';
  const projectJsonPath: string = path.join(configGet('projectFolder'), `${projectName}.json`);
  dirCreate(pathGetDirectory(projectJsonPath, path.sep));
  return projectSave(projectJsonPath, project);
}

export function projectDefault(): ProjectVersion {
  return {
    id: 'studiorack-project',
    author: 'studiorack-user',
    homepage: 'https://studiorack.github.io/studiorack-site/',
    name: 'StudioRack Project',
    description: 'Created using StudioRack',
    tags: ['StudioRack'],
    version: '1.0.0',
    license: 'cc0-1.0',
    date: new Date().toISOString(),
    type: {
      name: 'Ableton',
      ext: 'als',
    },
    files: {
      audio: {
        url: '',
        size: 0,
      },
      image: {
        url: '',
        size: 0,
      },
      project: {
        url: '',
        size: 0,
      },
    },
    plugins: {},
  };
}

export function projectDirectory(project: ProjectVersion, depth?: number): string {
  const projectPath: string = (project.id || '').replace(/\//g, path.sep);
  const projectPaths: string[] = [configGet('projectFolder'), projectPath, project.version || ''];
  if (depth) {
    return projectPaths.slice(0, depth).join(path.sep);
  }
  return projectPaths.join(path.sep);
}

export async function projectGetLocal(id: string, version = ''): Promise<ProjectVersionLocal> {
  const projects: ProjectVersionLocal[] = await projectsGetLocal();
  return projects.filter((project: ProjectVersionLocal) => {
    const matchVersion: boolean = version ? version === project.version : true;
    return id === project.id && matchVersion;
  })[0];
}

export async function projectsGetLocal(): Promise<ProjectVersionLocal[]> {
  const projectTypes: ProjectTypes = configGet('projectTypes');
  const projectExts: string[] = Object.keys(projectTypes).map((projectTypeKey: string) => {
    return projectTypes[projectTypeKey as keyof ProjectTypes].ext;
  });
  const projectSearchPath: string = path.join(configGet('projectFolder'), '**', `*.{${projectExts.join(',')}}`);
  const projectPaths: string[] = dirRead(projectSearchPath);
  const projects: ProjectVersionLocal[] = [];
  projectPaths.forEach((projectPath: string) => {
    if (projectPath.includes('/Backup/')) return;
    let project: any = fileReadJson(`${pathGetWithoutExt(projectPath)}.json`);
    if (!project) {
      project = projectValidate(projectPath, { files: true, json: true });
    }
    // Use installed path for id, repo and version (instead of autogenerated json)
    const relativePath: string = projectPath.replace(configGet('projectFolder') + path.sep, '');
    project.id = safeSlug(pathGetWithoutExt(relativePath).split(path.sep).join('/'));
    // project.version = pathGetVersion(projectPath);
    project.path = pathGetDirectory(projectPath, path.sep);
    project.status = 'installed';
    projects.push(project);
  });
  return projects;
}

export async function projectInstall(dir: string, id?: string, version?: string): Promise<ProjectVersionLocal> {
  const project: ProjectVersionLocal = projectLoad(dir);
  if (id) {
    const pluginLocal: PluginVersionLocal = await pluginInstall(id, version);
    if (pluginLocal) {
      project.plugins[id] = pluginLocal.version || '';
    }
  } else {
    for (const pluginId in project.plugins) {
      await pluginInstall(pluginId, project.plugins[pluginId]);
    }
  }
  return projectSave(dir, project);
}

export function projectLoad(dir: string): ProjectVersionLocal {
  const projectJson: ProjectVersionLocal = fileReadJson(dir);
  if (projectJson && !projectJson.plugins) {
    projectJson.plugins = {};
  }
  return projectJson;
}

export function projectSave(dir: string, config: ProjectVersionLocal): ProjectVersionLocal {
  fileJsonCreate(dir, config);
  return config;
}

export async function projectStart(dir: string): Promise<Buffer> {
  const project: ProjectVersionLocal = projectLoad(dir);
  const filepath: string = project.files.project.name ? project.files.project.name : project.files.project.url;
  const projectFilePath: string = path.join(pathGetDirectory(dir, path.sep), filepath);
  return fileOpen(projectFilePath);
}

export function projectType(ext: string): ProjectType {
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

export async function projectUninstall(dir: string, id?: string, version?: string): Promise<ProjectVersionLocal> {
  const project = projectLoad(dir);
  if (id) {
    let result = version;
    if (!version) {
      result = project.plugins[id];
    }
    const pluginLocal: PluginVersionLocal = await pluginUninstall(id, result);
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

export function projectValidate(dir: string, options?: PluginValidationOptions): ProjectVersion {
  const relativePath: string = dir.replace(configGet('projectFolder') + path.sep, '');
  const type: ProjectType = projectType(pathGetExt(dir));
  let project: ProjectVersionLocal = projectDefault() as ProjectVersionLocal;
  project.date = fileDate(dir).toISOString();
  project.id = safeSlug(pathGetWithoutExt(relativePath).split(path.sep).join('/'));
  project.name = pathGetFilename(relativePath, path.sep);
  project.path = pathGetDirectory(dir, path.sep);
  project.status = 'installed';
  project.tags = [type.name];
  project.type = type;
  if (options && options.files) {
    project = projectValidateFiles(dir, project);
  }
  if (options && options.json) {
    const projectJsonPath: string = path.join(
      pathGetDirectory(dir, path.sep),
      `${pathGetFilename(dir, path.sep)}.json`,
    );
    fileJsonCreate(projectJsonPath, project);
  }
  return project;
}

export function projectValidateFiles(pathItem: string, json: any): any {
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
