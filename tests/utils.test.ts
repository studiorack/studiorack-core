import {
  getPlatform,
  idToSlug,
  inputGetParts,
  pathGetDirectory,
  pathGetExt,
  pathGetFilename,
  pathGetId,
  pathGetRepo,
  pathGetVersion,
  pathGetWithoutExt,
  safeSlug,
  slugToId
} from '../src/utils';

// Plugin paths are assumed to follow the following format:
// {userId}/{repoId}/{pluginId}/{versionId}/{pluginFilename}
// 
// For example:
// studiorack/plugin-oxe/oxe/1.3.5/oxe.vst3

const PLUGIN_PATH = 'studiorack/plugin-oxe/oxe/1.3.5/oxe.vst3';
const PLUGIN_PATH_DIR = 'studiorack/plugin-oxe/oxe/1.3.5';
const PLUGIN_REPO = 'studiorack/plugin-oxe';
const PLUGIN_REPO_INCORRECT = 'Studiorack/plugin-Oxe/Oxe';
const PLUGIN_ID = 'oxe';
const PLUGIN_VERSION = '1.3.5';
const PLUGIN_FILENAME = 'oxe';
const PLUGIN_EXT= 'vst3';
const PLUGIN_SLUG = 'studiorack_plugin-oxe_oxe';

test('Get platform', () => {
  expect(getPlatform()).toEqual('mac');
});

test('Id to slug', () => {
  expect(idToSlug(`${PLUGIN_REPO}/${PLUGIN_ID}`)).toEqual(PLUGIN_SLUG);
});

test('Input get parts', () => {
  expect(inputGetParts(`${PLUGIN_REPO}/${PLUGIN_ID}@${PLUGIN_VERSION}`)).toEqual([`${PLUGIN_REPO}/${PLUGIN_ID}`, PLUGIN_VERSION]);
});

test('Path get directory', () => {
  expect(pathGetDirectory(PLUGIN_PATH)).toEqual(`${PLUGIN_REPO}/${PLUGIN_ID}/${PLUGIN_VERSION}`);
});

test('Path get extension', () => {
  expect(pathGetExt(PLUGIN_PATH)).toEqual(PLUGIN_EXT);
});

test('Path get filename', () => {
  expect(pathGetFilename(PLUGIN_PATH)).toEqual(PLUGIN_FILENAME);
});

test('Path get id', () => {
  expect(pathGetId(PLUGIN_PATH)).toEqual(PLUGIN_ID);
});

test('Path get repo', () => {
  expect(pathGetRepo(PLUGIN_PATH)).toEqual(PLUGIN_REPO);
});

test('Path get version', () => {
  expect(pathGetVersion(PLUGIN_PATH)).toEqual(PLUGIN_VERSION);
});

test('Path without ext', () => {
  expect(pathGetWithoutExt(PLUGIN_PATH)).toEqual(`${PLUGIN_REPO}/${PLUGIN_ID}/${PLUGIN_VERSION}/${PLUGIN_FILENAME}`);
  expect(pathGetWithoutExt(PLUGIN_PATH_DIR)).toEqual(`${PLUGIN_REPO}/${PLUGIN_ID}/${PLUGIN_VERSION}`);
});

test('Slug safe', () => {
  expect(safeSlug(PLUGIN_REPO_INCORRECT)).toEqual(`${PLUGIN_REPO}/${PLUGIN_ID}`);
});

test('Slug to id', () => {
  expect(slugToId(PLUGIN_SLUG)).toEqual(`${PLUGIN_REPO}/${PLUGIN_ID}`);
});
