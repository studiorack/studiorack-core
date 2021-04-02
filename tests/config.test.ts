import {
  configGet,
  configSet
} from '../src/config';
import { ConfigInterface } from '../src/types/config';

const CONFIG_KEY: keyof ConfigInterface = 'pluginFile';
const CONFIG_DEFAULT_VALUE: string = 'plugin.json';
const CONFIG_NEW_VALUE: string = 'metadata.json';

test('Get default value', () => {
  expect(configGet(CONFIG_KEY)).toEqual(CONFIG_DEFAULT_VALUE);
});

test('Set new value', () => {
  expect(configSet(CONFIG_KEY, CONFIG_NEW_VALUE)).toEqual(CONFIG_NEW_VALUE);
});

test('Get new value', () => {
  expect(configGet(CONFIG_KEY)).toEqual(CONFIG_NEW_VALUE);
});
