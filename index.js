// This file is used for local development
// Use the `npm run dev` command to build and run the file
// Debug particular methods quickly without having to run all tests `npm test`

const api = require('./dist/api.js');
const config = require('./dist/config.js');
const file = require('./dist/file.js');
const plugin = require('./dist/plugin.js');
const project = require('./dist/plugin.js');
const utils = require('./dist/utils.js');
const test = require('./dist/test.js');
const validate = require('./dist/validate.js');

async function run() {
  // const pluginList = await plugin.pluginList();
  // console.log('pluginList', pluginList);

  // const pluginSearch = await plugin.pluginSearch('delay');
  // console.log('pluginSearch', pluginSearch);

  // const pluginGet = await plugin.pluginGet('studiorack/oxe/oxe');
  // console.log('pluginGet', pluginGet);

  // const pluginsGetLocal = await plugin.pluginsGetLocal();
  // console.log('pluginsGetLocal', pluginsGetLocal);

  // const pluginInstall = await plugin.pluginInstall('studiorack/oxe/oxe');
  // console.log('pluginInstall', pluginInstall);

  // const pluginInstalled = await plugin.pluginInstalled('studiorack/oxe/oxe');
  // console.log('pluginInstalled', pluginInstalled);

  // const pluginUninstall = await plugin.pluginUninstall('studiorack/oxe/oxe');
  // console.log('pluginUninstall', pluginUninstall);

  // const plugin = await registry.pluginGetLocal('studiorack/oxe/oxe');
  // console.log('plugin', plugin);

  const result = await test.testFolder('/Library/Audio/Plug-ins/VST/*.vst');
  console.log('result', result);
}

run();
