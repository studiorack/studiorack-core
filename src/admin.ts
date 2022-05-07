// Run when Electron needs elevated privileges
// studiorack plugin install studiorack/adlplug/adlplug
// studiorack plugin uninstall studiorack/adlplug/adlplug

import { exec } from 'child_process';
import sudoPrompt from '@vscode/sudo-prompt';
import path from 'path';

const PACKAGE_NAME: string = '@studiorack/cli';

// workaround to prevent npm outdated exiting the process.
// https://github.com/npm/rfcs/issues/473
function execAsync(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout: string, stderr: string) => {
      if (stderr !== '') {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
}

function installCli(): Promise<string> {
  return openPrompt(`npm install ${PACKAGE_NAME} -g --json`);
}

async function isCliInstalled(): Promise<boolean> {
  try {
    const output: string = await execAsync(`npm list ${PACKAGE_NAME} -g --json`);
    console.log('isCliInstalled.success', output);
    const outputJson: any = JSON.parse(output);
    return outputJson && outputJson.dependencies[PACKAGE_NAME] ? true : false;
  } catch (e) {
    return false;
  }
}

async function isCliOutdated(): Promise<boolean> {
  try {
    const output: string = await execAsync(`npm outdated ${PACKAGE_NAME} -g --json`);
    console.log('isCliOutdated.success', output);
    const outputJson: any = JSON.parse(output);
    return outputJson && outputJson[PACKAGE_NAME] ? true : false;
  } catch (e) {
    return false;
  }
}

function openPrompt(cmd: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log('openPrompt', cmd);
    sudoPrompt.exec(
      cmd,
      {
        name: 'StudioRack',
        icns: path.join(__dirname, 'images/icon.icns'),
      },
      (error, stdout, stderr) => {
        if (error || stderr) {
          console.log('openPrompt.error', error, stderr);
          reject(error);
        } else {
          console.log('openPrompt.success', stdout);
          resolve(stdout?.toString() || '');
        }
      }
    );
  });
}

function runCliAsAdmin(args: string): Promise<string> {
  return openPrompt(`studiorack ${args}`);
}

function updateCli(): Promise<string> {
  return openPrompt(`npm update ${PACKAGE_NAME} -g --json`);
}

export { execAsync, installCli, isCliInstalled, isCliOutdated, runCliAsAdmin, updateCli };
