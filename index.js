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
const tester = require('./dist/tester.js');
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

  // console.log('isCliInstalled', admin.isCliInstalled());

  // Enable logging to see what is going on
  utils.logEnable();

  const pluginInstall = await plugin.pluginInstall('studiorack/adlplug/adlplug');
  console.log('pluginInstall', pluginInstall);

  // const pluginInstalled = await plugin.pluginInstalled('studiorack/adlplug/adlplug');
  // console.log('pluginInstalled', pluginInstalled);

  // const pluginUninstall = await plugin.pluginUninstall('studiorack/adlplug/adlplug');
  // console.log('pluginUninstall', pluginUninstall);

  // const pluginGetLocal = await plugin.pluginGetLocal('studiorack/adlplug/adlplug');
  // console.log('pluginGetLocal', pluginGetLocal);

  // const testFolder = await tester.testFolder('/Library/Audio/Plug-ins/VST/*.vst');
  // console.log('testFolder', testFolder);

  // const pluginInstallAll = await plugin.pluginInstallAll();
  // console.log('pluginInstallAll', pluginInstallAll);

  // const pluginUninstallAll = await plugin.pluginUninstallAll();
  // console.log('pluginUninstallAll', pluginUninstallAll);

  // const result = await validate.validateFolder('test/plugins/**/*.{dll,lv2,vst,vst3}', {
  //   files: true,
  //   json: true,
  //   txt: true,
  //   zip: true,
  //   summary: true
  // });
  // console.log('validatePlugin', result);

}

run();
