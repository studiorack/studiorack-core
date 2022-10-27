import path from 'path';
import { configSet } from '../src/config';
import {
  projectCreate,
  projectDefault,
  projectDirectory,
  projectGetLocal,
  projectsGetLocal,
  projectInstall,
  projectLoad,
  projectSave,
  // projectStart,
  projectType,
  projectUninstall,
  projectValidate,
  projectValidateFiles,
} from '../src/project';
import { ProjectInterface, ProjectLocal } from '../src/types/project';

const PROJECT_DIR: string = path.join('test', 'projects');
const PROJECT_ID: string = 'banwer-project/banwer';
const PROJECT_FILE: string = path.join('Banwer Project', 'Banwer.json');
const PROJECT_DEFAULT: ProjectInterface = {
  author: 'studiorack-user',
  homepage: 'https://studiorack.github.io/studiorack-site/',
  description: 'Created using StudioRack',
  tags: ['StudioRack'],
  version: '1.0.0',
  date: '2020-11-21T06:51:57.879Z',
  type: {
    ext: 'als',
    name: 'Ableton',
  },
  id: 'example',
  name: 'StudioRack Project',
  repo: 'songs/april',
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
const PROJECT_LOCAL: ProjectLocal = {
  id: 'banwer',
  author: 'studiorack-user',
  homepage: 'https://studiorack.github.io/studiorack-site/',
  name: 'Banwer',
  description: 'Created using StudioRack',
  tags: ['Ableton'],
  version: '1.0.0',
  date: '2020-11-21T06:51:57.879Z',
  type: {
    ext: 'als',
    name: 'Ableton',
  },
  repo: 'banwer-project',
  path: path.join('test', 'projects', 'Banwer Project'),
  status: 'installed',
  files: {
    audio: {
      name: 'Banwer.wav',
      size: 1539540,
    },
    image: {
      name: 'Banwer.png',
      size: 16300,
    },
    project: {
      name: 'Banwer.als',
      size: 236613,
    },
  },
  plugins: {},
};

beforeAll(() => {
  configSet('projectFolder', PROJECT_DIR);
});

test('Create project locally', () => {
  const result = projectCreate('songs/april/example', false);
  result.date = PROJECT_DEFAULT.date;
  expect(result).toMatchObject(PROJECT_DEFAULT);
});

test('Create project default', () => {
  const result = projectDefault();
  result.id = 'example';
  result.repo = 'songs/april';
  result.date = PROJECT_DEFAULT.date;
  expect(result).toMatchObject(PROJECT_DEFAULT);
});

test('Get project directory', () => {
  expect(projectDirectory(PROJECT_LOCAL)).toEqual(path.join(PROJECT_DIR, 'banwer', '1.0.0'));
});

test('Get project', async () => {
  const result = await projectGetLocal(PROJECT_ID);
  result.date = PROJECT_LOCAL.date;
  expect(result).toEqual(PROJECT_LOCAL);
});

test('Get projects', () => {
  expect(projectsGetLocal()).toBeDefined();
});

test('Install project plugins', async () => {
  const result = await projectInstall(path.join(PROJECT_DIR, PROJECT_FILE));
  result.date = PROJECT_LOCAL.date;
  if (process.platform === 'win32') {
    result.path = result.path.split('/').join('\\');
  }
  expect(result).toEqual(PROJECT_LOCAL);
});

test('Save project json', () => {
  const result = projectSave(path.join(PROJECT_DIR, PROJECT_FILE), PROJECT_LOCAL);
  result.date = PROJECT_LOCAL.date;
  expect(result).toEqual(PROJECT_LOCAL);
});

test('Load project json', () => {
  const result = projectLoad(path.join(PROJECT_DIR, PROJECT_FILE));
  result.date = PROJECT_LOCAL.date;
  expect(result).toEqual(PROJECT_LOCAL);
});

// test('Start project', async () => {
//   expect(await projectStart(path.join(PROJECT_DIR, PROJECT_FILE))).toBeDefined();
// });

test('Get project type', () => {
  expect(projectType('cpr')).toEqual({
    name: 'Cubase',
    ext: 'cpr',
  });
});

test('Uninstall project plugins', async () => {
  const result = await projectUninstall(path.join(PROJECT_DIR, PROJECT_FILE));
  result.date = PROJECT_LOCAL.date;
  expect(result).toEqual(PROJECT_LOCAL);
});

test('Validate project', () => {
  const result = projectValidate(path.join(PROJECT_DIR, 'Banwer Project', 'Banwer.als'), { json: true, files: true });
  result.date = PROJECT_LOCAL.date;
  expect(result).toEqual(PROJECT_LOCAL);
});

test('Validate project files', () => {
  expect(projectValidateFiles(path.join(PROJECT_DIR, 'Banwer Project', 'Banwer.als'), {})).toEqual({
    files: PROJECT_LOCAL.files,
  });
});
