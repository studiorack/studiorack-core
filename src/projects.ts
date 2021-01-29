import { dirRead, fileAdd, fileDate, fileJsonCreate, fileJsonLoad } from './file';
import { idToSlug, pathGetId, pathGetRepo } from './utils';
import { Project } from './types';
import os from 'os';
import path from 'path';
import slugify from 'slugify';

// List of notable DAWs
// https://en.wikipedia.org/wiki/Digital_audio_workstation#List_of_notable_commercial_DAWs
let PROJECT_ROOT = '.';
const PROJECT_TYPES: { [property: string]: string } = {
  'als': 'Ableton',
  'cpr': 'Cubase',
  'flp': 'FL Studio',
  'logic': 'Logic',
  'ptx': 'Pro Tools',
  'rpp': 'Reaper'
}
const PROJECT_LOCAL = `/**/*.{${Object.keys(PROJECT_TYPES).join(',')}}`;

function projectCreateJson(pathItem: string): Project {
  return {
    "author": os.userInfo().username,
    "homepage": "https://studiorack.github.io/studiorack-site/",
    "name": path.basename(pathItem, path.extname(pathItem)),
    "description": "Created using StudioRack",
    "tags": [
      PROJECT_TYPES[path.extname(pathItem).replace('.', '')]
    ],
    "version": "1.0.0",
    "date": "2000-01-01T00:00:00.000Z",
    "type": "none",
    "files": {},
    "plugins": {}
  }
}

function projectAddFiles(pathItem: string, json: any) {
  const folder = pathItem.substring(0, pathItem.lastIndexOf('/'));
  const id = path.basename(pathItem, path.extname(pathItem));

  // Ensure files object exists
  if (!json.files) {
    json.files = {};
  }
  // Add audio, image and zip files
  json = fileAdd(`${folder}/${id}.wav`, `${id}.wav`, 'audio', json);
  json = fileAdd(`${folder}/${id}.png`, `${id}.png`, 'image', json);
  json = fileAdd(pathItem, path.basename(pathItem), 'project', json);
  return json;
}

async function projectGet(id: string) {
  const projects = await projectsGet();
  return projects.filter((project: Project) => {
    return project.id === id;
  })[0];
}

async function projectsGet() {
  // Proof-of-concept code
  const list: any = [];
  const projectPaths = dirRead(`${PROJECT_ROOT}${PROJECT_LOCAL}`);
  projectPaths.forEach((projectPath: string) => {
    if (projectPath.includes('Backup')) {
      return;
    }
    const jsonPath = projectPath.substring(0, projectPath.lastIndexOf('.')) + '.json';
    const relativePath = projectPath.replace(PROJECT_ROOT + '/', '');
    let project = fileJsonLoad(jsonPath);
    if (!project) {
      project = projectCreateJson(projectPath);
    }
    const date = fileDate(projectPath);
    if (date) {
      project.date = date.toISOString();
    }
    if (project && project.files) {
      project = projectAddFiles(projectPath, project);
    }
    project.id = `${pathGetRepo(relativePath)}/${pathGetId(relativePath)}`;
    project.path = projectPath;
    project.slug = idToSlug(project.id);
    project.type = slugify(PROJECT_TYPES[path.extname(projectPath).replace('.', '')], { lower: true });
    fileJsonCreate(jsonPath, project);
    list.push(project);
  });
  return list;
}

function projectRoot(dir?: string) {
  if (dir) {
    PROJECT_ROOT = dir;
  }
  return PROJECT_ROOT;
}

export {
  PROJECT_TYPES,
  projectGet,
  projectsGet,
  projectRoot
};
