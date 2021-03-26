import os from 'os';
import path from 'path';
import { configGet } from "./config";
import { fileAdd } from './file';
import { ProjectInterface, ProjectType, ProjectTypes } from "./types/project";

function projectAddFiles(pathItem: string, json: any): any {
  const folder: string = pathItem.substring(0, pathItem.lastIndexOf('/'));
  const id: string = path.basename(pathItem, path.extname(pathItem));

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

function projectCreate(pathItem: string): ProjectInterface {
  const projectExt: string = path.extname(pathItem).replace('.', '');
  const projectTypes: ProjectTypes = configGet('projectTypes');
  let projectType: ProjectType = {
    "name": "Ableton",
    "ext": "als"
  };
  Object.keys(projectTypes).forEach((key: string) => {
    const currentType: ProjectType = projectTypes[key as keyof ProjectTypes];
    if (currentType.ext === projectExt) {
      projectType = currentType;
    }
  });
  return {
    "id": "studiorack-project",
    "author": os.userInfo().username,
    "homepage": "https://studiorack.github.io/studiorack-site/",
    "name": path.basename(pathItem, path.extname(pathItem)),
    "description": "Created using StudioRack",
    "tags": [ projectType.name ],
    "version": "1.0.0",
    "date": "2000-01-01T00:00:00.000Z",
    "type": projectType,
    "files": {
      "audio": {
        "name": "",
        "size": 0,
      },
      "image": {
        "name": "",
        "size": 0,
      },
      "project": {
        "name": "",
        "size": 0,
      }
    },
    "plugins": {}
  }
}

async function projectGet(id: string): Promise<ProjectInterface> {
  const projects = await projectsGet();
  return projects.filter((project: ProjectInterface) => {
    return project.id === id;
  })[0];
}

export {
  projectAddFiles,
  projectCreate,
  projectGet
};
