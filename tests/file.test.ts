import {
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
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

const DIR_PATH: string = './tests/new-directory';
const DIR_RENAME: string = './tests/new-directory-renamed';

const FILE_PATH: string = './tests/new-directory/file.txt';

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
