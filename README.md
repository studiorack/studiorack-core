# studiorack-core
![Test](https://github.com/studiorack/studiorack-core/workflows/Test/badge.svg)

Common methods package shared across StudioRack CLI, app and website. Handling installing DAW VST plugin dependencies using:

* NodeJS 12.x
* TypeScript 4.x


## Installation

To install the common package, run the command:

    npm install @studiorack/core


## Usage

Import the package using:

    import { validateInstall } from '@studiorack/core';

Then use the available methods as normal.


## Deployment

Release an updated version on npm by simply creating a version tag:

    npm version patch
    git push && git push origin --tags

Then publish to npm using:

    npm publish


## Contact

For more information please contact kmturley
