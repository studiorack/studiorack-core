import {
  dirAppData,
  dirContains,
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
  dirIs,
  dirMove,
  dirOpen,
  dirPlugins,
  dirProjects,
  dirRead,
  dirRename,
  fileAdd,
  fileCreate,
  fileDate,
  fileDelete,
  fileExec,
  fileExists,
  fileJsonCreate,
  fileJsonLoad,
  fileLoad,
  fileMove,
  fileOpen,
  fileSize,
  isAdmin,
  zipCreate,
  zipExtract,
} from '../src/file';
import os from 'os';
import path from 'path';

const DIR_PATH: string = path.join('tests', 'new-directory');
const DIR_RENAME: string = path.join('tests', 'new-directory-renamed');
const DIR_APP_DATA: string = path.join(dirAppData(), 'studiorack');

const FILE_PATH: string = path.join('tests', 'new-directory', 'file.txt');

test('Directory app data', () => {
  if (process.platform === 'win32') {
    expect(dirAppData()).toEqual(process.env.APPDATA);
  } else if (process.platform === 'darwin') {
    expect(dirAppData()).toEqual(`${os.homedir()}/Library/Preferences`);
  } else {
    expect(dirAppData()).toEqual(`${os.homedir()}/.local/share`);
  }
});

test('Directory contains', () => {
  expect(dirContains(dirAppData(), DIR_APP_DATA)).toEqual(true);
  expect(dirContains(dirAppData(), DIR_PATH)).toEqual(false);
});

test('Create new directory', () => {
  expect(dirCreate(DIR_PATH)).toEqual(DIR_PATH);
});

test('Create existing directory', () => {
  expect(dirCreate(DIR_PATH)).toEqual(false);
});

test('Directory is empty', () => {
  expect(dirEmpty(DIR_PATH)).toEqual(true);
});

test('Directory exists', () => {
  expect(dirExists(DIR_PATH)).toEqual(true);
});

test('Directory is', () => {
  fileCreate(FILE_PATH, 'file contents');
  expect(dirIs(DIR_PATH)).toEqual(true);
  expect(dirIs(FILE_PATH)).toEqual(false);
});

test('Directory move', () => {
  expect(dirMove(DIR_PATH, DIR_RENAME)).toBeUndefined();
  expect(dirMove(DIR_RENAME, DIR_PATH)).toBeUndefined();
});

test('Directory open', () => {
  expect(dirOpen(DIR_PATH)).toEqual(new Buffer(''));
});

// test('Directory plugins', () => {
//   expect(dirPlugins()).toEqual('/Library/Audio/Plug-ins/VST3');
// });

// test('Directory projects', () => {
//   expect(dirProjects()).toEqual('/Users/username');
// });

test('Read directory', () => {
  expect(dirRead(DIR_PATH)).toMatchObject([DIR_PATH]);
});

test('Create file', () => {
  expect(fileCreate(FILE_PATH, 'file contents')).toBeUndefined();
});

test('Rename directory', () => {
  expect(dirRename(DIR_PATH, DIR_RENAME)).toBeUndefined();
});

test('Delete existing directory', () => {
  expect(dirDelete(DIR_RENAME)).toBeUndefined();
});

test('Delete missing directory', () => {
  expect(dirDelete(DIR_RENAME)).toEqual(false);
});

test('Is Admin', () => {
  expect(isAdmin()).toEqual(false);
});
