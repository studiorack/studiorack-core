import { dirRead, fileDate, fileJsonCreate, fileJsonLoad } from './file';
import { fileAdd, idToSlug, pathGetId, pathGetRepo } from './utils';
import { Project } from './types';
import path from 'path';

// List of notable DAWs
// https://en.wikipedia.org/wiki/Digital_audio_workstation#List_of_notable_commercial_DAWs
let PROJECT_ROOT = '.';
const PROJECT_LOCAL = `/**/*.{als,cpr,flp,logic,ptx,rpp}`;
const PROJECT_TYPES: { [property: string]: string } = {
  '.als': 'ableton',
  '.cpr': 'cubase',
  '.flp': 'fl-studio',
  '.logic': 'logic',
  '.ptx': 'pro-tools',
  '.rpp': 'reaper'
}

function projectCreateJson(): Project {
  return {
    "author": "StudioRack",
    "homepage": "https://studiorack.github.io/studiorack-site/",
    "name": 'My Project',
    "description": "My project description",
    "tags": [
      "StudioRack"
    ],
    "version": "1.0.0",
    "date": "2000-01-01T00:00:00.000Z",
    "type": "ableton",
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
    const relativePath = projectPath.replace('./test/', '').replace('.als', '');
    let project = fileJsonLoad(jsonPath);
    if (!project) {
      project = projectCreateJson();
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
    project.type = PROJECT_TYPES[path.extname(projectPath)];
    fileJsonCreate(jsonPath, project);
    list.push(project);
  });
  return list;
}

function projectRoot(dir: string) {
  PROJECT_ROOT = dir;
  return PROJECT_ROOT;
}

export {
  projectGet,
  projectsGet,
  projectRoot
};
