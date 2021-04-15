import {
  getPlatform,
  idToSlug,
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

const PLUGIN_ID = 'seven-delay';
const PLUGIN_PATH = 'ryukau/vstplugins/seven-delay/0.1.14/SevenDelay.vst3';
const PLUGIN_REPO = 'ryukau/vstplugins';
const PLUGIN_SLUG = 'ryukau_vstplugins_seven-delay';
const PLUGIN_VERSION = '0.1.14';

test('Id to slug', () => {
  expect(idToSlug(`${PLUGIN_REPO}/${PLUGIN_ID}`)).toEqual(PLUGIN_SLUG);
});

// test('Path get id', () => {
//   expect(pathGetId(PLUGIN_PATH)).toEqual(PLUGIN_ID);
// });

test('Path get repo', () => {
  expect(pathGetRepo(PLUGIN_PATH)).toEqual(PLUGIN_REPO);
});

// test('Path get version', () => {
//   expect(pathGetRepo(PLUGIN_PATH)).toEqual(PLUGIN_VERSION);
// });

test('Slug to id', () => {
  expect(slugToId(PLUGIN_SLUG)).toEqual(`${PLUGIN_REPO}/${PLUGIN_ID}`);
});
