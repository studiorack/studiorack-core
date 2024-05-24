// Run when Electron needs elevated privileges
// npm run build && node ./build/admin.js --operation install --id studiorack/adlplug/adlplug
// npm run build && node ./build/admin.js --operation uninstall --id studiorack/adlplug/adlplug

import { pluginInstall, pluginUninstall } from './plugin.js';

interface Arguments {
  operation: string;
  id: string;
  ver: string;
}

function getArguments(): Arguments {
  return {
    operation: process.argv[3],
    id: process.argv[5],
    ver: process.argv[7],
  };
}

async function init() {
  const argv: Arguments = getArguments();
  if (argv.operation === 'install') {
    await pluginInstall(argv.id, argv.ver);
  } else if (argv.operation === 'uninstall') {
    await pluginUninstall(argv.id, argv.ver);
  }
}

init();

export { init, getArguments };
