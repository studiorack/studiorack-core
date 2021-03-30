import { configSet } from '../src/config';
import { dirDelete } from '../src/file';
import {
  projectValidate
} from '../src/project';
import { ProjectLocal } from '../src/types/project';

const PROJECT_DIR: string = './test/projects';
const PROJECT_LOCAL: ProjectLocal = {
  "id": "studiorack-project",
  "author": "studiorack-user",
  "homepage": "https://studiorack.github.io/studiorack-site/",
  "name": "Banwer",
  "description": "Created using StudioRack",
  "tags": [ "Ableton" ],
  "version": "1.0.0",
  "date": "2020-11-21T06:51:57.879Z",
  "type": {
    "ext": "als",
    "name": "Ableton"
  },
  "path": "./test/projects/Banwer Project/Banwer.als",
  "status": "installed",
  "files": {
    "audio": {
      "name": "Banwer.wav",
      "size": 1539540,
    },
    "image": {
      "name": "Banwer.png",
      "size": 16300,
    },
    "project": {
      "name": "Banwer.als",
      "size": 236613,
    }
  },
    "plugins": {}
};

beforeAll(() => {
  configSet('projectFolder', PROJECT_DIR);
});

test('Validate project json', async () => {
  expect(await projectValidate(`${PROJECT_DIR}/Banwer Project/Banwer.als`, { json: true, files: true })).toBe(PROJECT_LOCAL);
});
