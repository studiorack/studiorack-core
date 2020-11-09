import { fileJsonCreate, fileJsonLoad } from './file';

const PROJECT_CONFIG = `${process.cwd()}/project.json`;

function loadProject() {
  const project = fileJsonLoad(PROJECT_CONFIG) || {};
  if (!project.plugins) {
    project.plugins = {};
  }
  return project;
}

function saveProject(config: object) {
  return fileJsonCreate(PROJECT_CONFIG, config);
}

export {
  loadProject,
  saveProject
};
