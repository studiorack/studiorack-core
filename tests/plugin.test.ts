import { dirDelete } from '../src/file';
import {
  pluginCreate,
  pluginGet
} from '../src/plugin';

const PLUGIN_DIR = './test/plugins';
const PLUGIN_ID = 'studiorack/studiorack-plugin-steinberg/adelay';
const PLUGIN_TEMPLATE = 'dplug';

beforeAll(() => {
  dirDelete(PLUGIN_DIR);
});

test('Create a plugin from a template', async () => {
  expect(await pluginCreate(PLUGIN_DIR, PLUGIN_TEMPLATE)).toBe(true);
});

test('Get valid plugin by id', async () => {
  expect(await pluginGet(PLUGIN_ID)).toMatchObject({"id": PLUGIN_ID, "version": "1.1.0", "versions": {"1.1.0": {"author": "Steinberg Media Technologies", "date": "2020-12-25T00:37:16.868Z", "description": "Test Class", "files": {"audio": {"name": "adelay.wav", "size": 352844}, "image": {"name": "adelay.png", "size": 9588}, "linux": {"name": "adelay-linux.zip", "size": 322192}, "mac": {"name": "adelay-mac.zip", "size": 322192}, "win": {"name": "adelay-win.zip", "size": 322192}}, "homepage": "http://www.steinberg.net", "id": "adelay", "name": "ADelayTest Factory", "release": "v0.0.1", "tags": ["Fx", "Delay"], "version": "1.1.0"}}});
});

test('Get invalid plugin by id', async () => {
  expect(await pluginGet('example/plugin')).toBeFalsy();
});
