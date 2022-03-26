import {
  dirAppData,
  dirContains,
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
  dirOpen,
  dirPlugins,
  dirProjects,
  dirRead,
  dirRename,
  fileCreate,
  fileDate,
  fileExec,
  fileExists,
  fileJsonCreate,
  fileJsonLoad,
  fileLoad,
  fileOpen,
  fileSize,
  zipCreate,
  zipExtract,
} from '../src/file';
import path from 'path';

const DIR_PATH: string = './tests/new-directory';
const DIR_RENAME: string = './tests/new-directory-renamed';
const DIR_APP_DATA: string = path.join(dirAppData(), 'studiorack');

const FILE_PATH: string = './tests/new-directory/file.txt';

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
