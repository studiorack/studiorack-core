// Run when Electron needs elevated privileges
// studiorack plugin install studiorack/adlplug/adlplug
// studiorack plugin uninstall studiorack/adlplug/adlplug

import sudoPrompt from '@vscode/sudo-prompt';

function runCliAsAdmin(args: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    console.log(`studiorack ${args}`);
    sudoPrompt.exec(
      `npm install @studiorack/cli -g && studiorack ${args}`,
      { name: 'StudioRack' },
      (error, stdout, stderr) => {
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
      }
    );
  });
}

export { runCliAsAdmin };
