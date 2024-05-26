# studiorack-core

![Test](https://github.com/studiorack/studiorack-core/workflows/Test/badge.svg)

Common methods package shared across StudioRack CLI, app and website for handling installing DAW VST plugin dependencies.

- admin - Standalone script for running plugin installations with admin privileges
- api - Helper methods for getting data via web requests
- config- Reading and writing configuration settings
- file - Helper methods for manipulating local files
- plugin - Logic for searching and installing plugins
- project - Logic for searching and indexing audio projects
- tool - Utilities and tools for validating plugins
- utils - Other helper methods and string utilities

## Developer information

StudioRack Core was built using:

- NodeJS 20.x
- TypeScript 5.x

## Installation

To install the common package, run the command:

    npm install @studiorack/core

## Usage

Import the package using:

    import { toolInstall } from '@studiorack/core';

Then use the available methods as normal.

## Deployment

Release an updated version on npm by simply creating a version tag:

    npm version patch
    git push && git push origin --tags

Then publish to npm using:

    npm publish

## Contact

For more information please contact kmturley
