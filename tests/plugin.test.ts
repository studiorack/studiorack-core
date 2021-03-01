import {
  pluginCreate
} from '../src/plugin';

test('Get default value', () => {
  expect(pluginCreate('./plugins', 'dplug')).toBe(true);
});
