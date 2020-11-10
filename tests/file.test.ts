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

test('Create new directory', () => {
  expect(dirCreate(DIR_PATH)).toBe(DIR_PATH);
});

test('Create existing directory', () => {
  expect(dirCreate(DIR_PATH)).toBe(false);
});
