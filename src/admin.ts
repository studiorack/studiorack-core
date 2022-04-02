// Run when Electron needs elevated privileges
// npm run build && node ./dist/admin.js --operation install --id studiorack/adlplug/adlplug
// npm run build && node ./dist/admin.js --operation uninstall --id studiorack/adlplug/adlplug

import sudoPrompt from '@vscode/sudo-prompt';
import { pluginInstall, pluginUninstall } from './plugin';

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

function runCliAsAdmin(args: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log(`node ./dist/admin.js ${args}`);
    sudoPrompt.exec(`node ./dist/admin.js ${args}`, { name: 'StudioRack' }, (error, stdout, stderr) => {
      if (stdout) {
        console.log('runCliAsAdmin', stdout);
      }
      if (stderr) {
        console.log('runCliAsAdmin', stderr);
      }
      if (error) {
        reject(error);
      } else {
        resolve(stdout?.toString() || '');
      }
    });
  });
}

init();

export { runCliAsAdmin };
