import {
  dirCreate,
  dirDelete,
  dirEmpty,
  dirExists,
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

const DIR_PATH = './tests/new-directory';
const DIR_RENAME = './tests/new-directory-renamed';

const FILE_PATH = './tests/new-directory/file.txt';

test('Create new directory', () => {
  expect(dirCreate(DIR_PATH)).toBe(DIR_PATH);
});

test('Create existing directory', () => {
  expect(dirCreate(DIR_PATH)).toBe(false);
});

test('Directory is empty', () => {
  expect(dirEmpty(DIR_PATH)).toBe(true);
});

test('Directory exists', () => {
  expect(dirExists(DIR_PATH)).toBe(true);
});

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
  expect(dirDelete(DIR_RENAME)).toBe(false);
});
