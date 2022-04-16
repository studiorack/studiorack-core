// This file is used for local development
// Use the `npm run dev` command to build and run the file
// Debug particular methods quickly without having to run all tests `npm test`

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

  // const pluginInstall = await plugin.pluginInstall('studiorack/salamander-grand-piano/salamander-grand-piano');
  // console.log('pluginInstall', pluginInstall);

  // const pluginInstalled = await plugin.pluginInstalled('studiorack/salamander-grand-piano/salamander-grand-piano');
  // console.log('pluginInstalled', pluginInstalled);

  // const pluginUninstall = await plugin.pluginUninstall('studiorack/salamander-grand-piano/salamander-grand-piano');
  // console.log('pluginUninstall', pluginUninstall);

  // const pluginGetLocal = await plugin.pluginGetLocal('studiorack/salamander-grand-piano/salamander-grand-piano');
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
