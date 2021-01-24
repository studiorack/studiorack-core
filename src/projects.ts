import { dirRead, fileDate, fileJsonCreate, fileJsonLoad, fileLoad } from './file';
import { fileAdd, idToSlug, pathGetId, pathGetRepo } from './utils';
import path from 'path';

// List of notable DAWs
// https://en.wikipedia.org/wiki/Digital_audio_workstation#List_of_notable_commercial_DAWs

const PROJECT_LOCAL = `./test/**/*.{als,cpr,flp,logic,ptx,rpp}`;
const PROJECT_TYPES: { [property: string]: string } = {
  '.als': 'ableton',
  '.cpr': 'cubase',
  '.flp': 'fl-studio',
  '.logic': 'logic',
  '.ptx': 'pro-tools',
  '.rpp': 'reaper'
}

function projectCreateJson() {
  return {
    "author": "StudioRack",
    "homepage": "https://studiorack.github.io/studiorack-site/",
    "name": 'StudioRack project',
    "description": "StudioRack description",
    "tags": [
      "StudioRack"
    ],
    "version": "1.0",
    "files": {}
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

async function projectsGet() {
  // Proof-of-concept code
  const list: any = [];
  const projectPaths = dirRead(PROJECT_LOCAL);
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

export { 
  projectsGet
};
