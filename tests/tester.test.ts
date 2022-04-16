import path from 'path';
import {
  testFolder
} from '../src/tester';

const PLUGIN_DIR: string = path.join('test', 'plugins');

test('Test folder', () => {
  expect(testFolder(PLUGIN_DIR, {})).toBeDefined();
});
