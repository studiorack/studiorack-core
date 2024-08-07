import { expect, test } from 'vitest';
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
  dirPresets,
  dirProjects,
  dirRead,
  dirRename,
  fileCreate,
  isAdmin,
} from '../src/file';
import os from 'os';
import path from 'path';

const DIR_PATH: string = path.join('test', 'new-directory');
const DIR_PATH_GLOB: string = path.join('test', 'new-directory', '**', '*.txt');
const DIR_RENAME: string = path.join('test', 'new-directory-renamed');
const DIR_APP_DATA: string = path.join(dirAppData(), 'studiorack');

const FILE_PATH: string = path.join('test', 'new-directory', 'file.txt');

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

test('Directory plugins', () => {
  if (process.platform === 'win32') {
    expect(dirPlugins()).toEqual(path.join('Program Files', 'Common Files'));
  } else if (process.platform === 'darwin') {
    expect(dirPlugins()).toEqual(`${os.homedir()}/Library/Audio/Plug-ins`);
  } else {
    expect(dirPlugins()).toEqual('usr/local/lib');
  }
});

test('Directory presets', () => {
  if (process.platform === 'win32') {
    expect(dirPresets()).toEqual(path.join(os.homedir(), 'Documents', 'VST3 Presets'));
  } else if (process.platform === 'darwin') {
    expect(dirPresets()).toEqual(`${os.homedir()}/Library/Audio/Presets`);
  } else {
    expect(dirPresets()).toEqual(`${os.homedir()}/.vst3/presets`);
  }
});

test('Directory projects', () => {
  if (process.platform === 'win32') {
    expect(dirProjects()).toEqual(path.join(os.homedir(), 'Documents', 'Audio'));
  } else if (process.platform === 'darwin') {
    expect(dirProjects()).toEqual(`${os.homedir()}/Documents/Audio`);
  } else {
    expect(dirProjects()).toEqual(`${os.homedir()}/Documents/Audio`);
  }
});

test('Read directory', () => {
  expect(dirRead(DIR_PATH)).toEqual([DIR_PATH]);
});

test('Read directory glob', () => {
  expect(dirRead(DIR_PATH_GLOB)).toEqual([FILE_PATH]);
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
  expect(isAdmin()).toEqual(process.env.CI && process.platform === 'win32' ? true : false);
});
