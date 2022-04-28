// Run when Electron needs elevated privileges
// studiorack plugin install studiorack/adlplug/adlplug
// studiorack plugin uninstall studiorack/adlplug/adlplug

import { execSync } from 'child_process';
import sudoPrompt from '@vscode/sudo-prompt';

function isCliInstalled() {
  try {
    execSync(`studiorack --version`);
    return true;
  } catch (e) {
    return false;
  }
}

function installCli(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log(`npm install @studiorack/cli -g`);
    sudoPrompt.exec(
      `npm install @studiorack/cli -g`,
      {
        name: 'StudioRack',
        icns: './src/images/icon.icns',
      },
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.log('installCli.error', error, stderr);
          reject(error);
        } else {
          console.log('installCli.success', stdout);
          resolve(stdout?.toString() || '');
        }
      }
    );
  });
}

function runCliAsAdmin(args: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log(`studiorack ${args}`);
    sudoPrompt.exec(
      `studiorack ${args}`,
      {
        name: 'StudioRack',
        icns: './src/images/icon.icns',
      },
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.log('runCliAsAdmin.error', error, stderr);
          reject(error);
        } else {
          console.log('runCliAsAdmin.success', stdout);
          resolve(stdout?.toString() || '');
        }
      }
    );
  });
}

export { installCli, isCliInstalled, runCliAsAdmin };
