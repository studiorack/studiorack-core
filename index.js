// This file is used for local development
// Use the `npm run dev` command to build and run the file
// Debug particular methods quickly without having to run all tests `npm test`

const api = require('./dist/api.js');
const config = require('./dist/config.js');
const file = require('./dist/file.js');
const plugin = require('./dist/plugin.js');
const project = require('./dist/plugin.js');
const utils = require('./dist/utils.js');
const validate = require('./dist/validate.js');

async function run() {
  // const pluginList = await plugin.pluginList();
  // console.log('pluginList', pluginList);

  // const pluginSearch = await plugin.pluginSearch('delay');
  // console.log('pluginSearch', pluginSearch);

  // const pluginGet = await plugin.pluginGet('studiorack/plugin-oxe/oxe');
  // console.log('pluginGet', pluginGet);

  const pluginsGetLocal = await plugin.pluginsGetLocal();
  console.log('pluginsGetLocal', pluginsGetLocal);

  // const pluginInstall = await plugin.pluginInstall('studiorack/plugin-adlplug/adlplug');
  // console.log('pluginInstall', pluginInstall);

  // const pluginInstalled = await plugin.pluginInstalled('studiorack/plugin-adlplug/adlplug');
  // console.log('pluginInstalled', pluginInstalled);

  // const pluginUninstall = await plugin.pluginUninstall('studiorack/studiorack-plugin-dplug/witty-audio-clip-it');
  // console.log('pluginUninstall', pluginUninstall);

  // const plugin = await registry.pluginGetLocal('meldaproduction/tools/mutility');
  // console.log('plugin', plugin);
}

run();
