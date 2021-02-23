import {
  configGet,
  configSet
} from '../src/config';

const CONFIG_KEY = 'pluginFile';
const CONFIG_DEFAULT_VALUE = 'plugin.json';
const CONFIG_NEW_VALUE = 'metadata.json';

test('Get default value', () => {
  expect(configGet(CONFIG_KEY)).toBe(CONFIG_DEFAULT_VALUE);
});

test('Set new value', () => {
  expect(configSet(CONFIG_KEY, CONFIG_NEW_VALUE)).toBe(CONFIG_NEW_VALUE);
});

test('Get new value', () => {
  expect(configGet(CONFIG_KEY)).toBe(CONFIG_NEW_VALUE);
});
