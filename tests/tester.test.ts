import {
  testFolder
} from '../src/tester';

const PLUGIN_DIR: string = './test/plugins';

test('Test folder', () => {
  expect(testFolder(PLUGIN_DIR, {})).toBeDefined();
});
