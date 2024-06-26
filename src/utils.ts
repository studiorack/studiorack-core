import slugify from 'slugify';

import { PluginFiles, PluginVersion } from './types/plugin.js';
import { PlatformTypes } from './types/config.js';

const platformTypes: PlatformTypes = {
  aix: 'linux',
  android: 'linux',
  cygwin: 'linux',
  darwin: 'mac',
  freebsd: 'linux',
  linux: 'linux',
  netbsd: 'linux',
  openbsd: 'linux',
  sunos: 'linux',
  win32: 'win',
  win64: 'win',
};
let LOGGING_ENABLED: boolean = false;
const URLSAFE_REGEX: RegExp = /[^\w\s$*_+~.()'"!\-:@/]+/g;
const VERSION_REGEX: RegExp = /([0-9]+)\.([0-9]+)\.([0-9]+)/g;

export function getPlatform(): keyof PluginFiles {
  return platformTypes[process.platform as keyof PlatformTypes];
}

export function idToSlug(id: string): string {
  return safeSlug(id.replace(/\//g, '_'));
}

export function inputGetParts(input: string): string[] {
  return input.split('@');
}

export function isTests() {
  const jest: boolean = process.env.JEST_WORKER_ID !== undefined;
  const vitest: boolean = process.env.VITEST_WORKER_ID !== undefined;
  return jest || vitest;
}

export function log(...args: any) {
  if (LOGGING_ENABLED) {
    console.log(...args);
  }
}

export function logEnable() {
  LOGGING_ENABLED = true;
}

export function logDisable() {
  LOGGING_ENABLED = false;
}

// Plugin paths are assumed to follow the following format:
// {userId}/{repoId}/{pluginId}/{versionId}/{pluginFilename}
//
// For example:
// studiorack/oxe/oxe/1.3.5/oxe.vst3

export function pathGetDirectory(pathItem: string, separator: string = '/'): string {
  return pathItem.substring(0, pathItem.lastIndexOf(separator));
}

export function pathGetExt(pathItem: string): string {
  return pathItem.substring(pathItem.lastIndexOf('.') + 1);
}

export function pathGetFilename(str: string, separator: string = '/'): string {
  let base: string = str.substring(str.lastIndexOf(separator) + 1);
  if (base.lastIndexOf('.') !== -1) {
    base = base.substring(0, base.lastIndexOf('.'));
  }
  return base;
}

export function pathGetId(pathItem: string, separator: string = '/'): string {
  const pathParts: string[] = pathGetDirectory(pathItem, separator).split(separator);
  if (pathParts.length > 2) {
    return safeSlug(pathParts[2]);
  }
  // Otherwise return full path
  return safeSlug(pathGetDirectory(pathItem, separator));
}

export function pathGetRepo(pathItem: string, separator: string = '/'): string {
  const pathParts: string[] = pathGetDirectory(pathItem, separator).split(separator);
  if (pathParts.length > 1) {
    return safeSlug(`${pathParts[0]}/${pathParts[1]}`);
  }
  // Otherwise return full path
  return safeSlug(pathGetDirectory(pathItem, separator));
}

export function pathGetVersion(pathItem: string): string {
  const matches: any = pathItem.match(VERSION_REGEX);
  return matches ? matches[0] : '0.0.0';
}

export function pathGetWithoutExt(pathItem: string): string {
  const extIndex = pathItem.lastIndexOf('.');
  // If string contains a period
  if (extIndex !== -1) {
    const extLength = pathItem.length - extIndex;
    // If the period + ext is 4-5 characters long or is .component
    if (extLength === 4 || extLength === 5 || pathItem.substr(-10) === '.component') {
      return pathItem.substring(0, pathItem.lastIndexOf('.'));
    }
  }
  return pathItem;
}

export function pluginFileUrl(plugin: PluginVersion, type: keyof PluginFiles): string {
  const file = plugin.files[type];
  const filepath: string = file.url ? file.url : file.name || '';
  if (filepath.startsWith('https://')) {
    return filepath;
  }
  return `https://github.com/${plugin.repo}/releases/download/${plugin.release}/${filepath}`;
}

export function safeSlug(val: string): string {
  // @ts-expect-error slugify library issue with ESM modules
  return slugify(val, { lower: true, remove: URLSAFE_REGEX });
}

export function slugToId(slug: string): string {
  return safeSlug(slug.replace(/_/g, '/'));
}
