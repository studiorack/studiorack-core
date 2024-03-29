// This file is used for local development
// Use the `npm run dev` command to build and run the file
// Debug particular methods quickly without having to run all tests `npm test`

const admin = require('./dist/admin.js');
const api = require('./dist/api.js');
const config = require('./dist/config.js');
const file = require('./dist/file.js');
const plugin = require('./dist/plugin.js');
const project = require('./dist/project.js');
const utils = require('./dist/utils.js');
const tool = require('./dist/tool.js');

async function run() {
  // Enable logging to see what is going on
  utils.logEnable();

  // const toolInstall = await tool.toolInstall('pluginval');
  // console.log('toolInstall', toolInstall);

  // const toolFolder = await tool.toolFolder('pluginval', 'test/tool/**/*.vst3');
  // console.log('toolFolder', toolFolder);

  // const pluginList = await plugin.pluginList();
  // console.log('pluginList', pluginList);

  const pluginSearch = await plugin.pluginSearch('delay');
  console.log('pluginSearch', pluginSearch);

  // const pluginGet = await plugin.pluginGet('studiorack/oxe/oxe');
  // console.log('pluginGet', pluginGet);

  // const pluginsGetLocal = await plugin.pluginsGetLocal();
  // console.log('pluginsGetLocal', pluginsGetLocal);

  // console.log('isCliInstalled', admin.isCliInstalled());

  // const pluginInstall = await plugin.pluginInstall('studiorack/adlplug/adlplug');
  // console.log('pluginInstall', pluginInstall);

  // const pluginInstalled = await plugin.pluginInstalled('studiorack/adlplug/adlplug');
  // console.log('pluginInstalled', pluginInstalled);

  // const pluginUninstall = await plugin.pluginUninstall('studiorack/adlplug/adlplug');
  // console.log('pluginUninstall', pluginUninstall);

  // const pluginGetLocal = await plugin.pluginGetLocal('studiorack/adlplug/adlplug');
  // console.log('pluginGetLocal', pluginGetLocal);

  // const pluginInstallAll = await plugin.pluginInstallAll();
  // console.log('pluginInstallAll', pluginInstallAll);

  // const pluginUninstallAll = await plugin.pluginUninstallAll();
  // console.log('pluginUninstallAll', pluginUninstallAll);

  // const pluginValidate = await plugin.pluginValidate('./test/plugins/VST3/studiorack/adlplug/adlplug/1.0.2/ADLplug.vst3', {
  //   files: true,
  //   json: false,
  //   summary: false,
  //   txt: false,
  //   zip: false,
  // });
  // console.log('pluginValidate', pluginValidate);

  // const pluginValidateFolder = await plugin.pluginValidateFolder('./test/plugins/**/*.vst3', {
  //   files: true,
  //   json: false,
  //   summary: true,
  //   txt: false,
  //   zip: false,
  // });
  // console.log('pluginValidateFolder', pluginValidateFolder);
}

run();
