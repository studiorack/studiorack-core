import slugify from 'slugify';

import { PlatformTypes, PluginFiles } from './types/plugin';

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
const URLSAFE_REGEX: RegExp = /[^\w\s$*_+~.()'"!\-:@\/]+/g;
const VERSION_REGEX: RegExp = /([0-9]+)\.([0-9]+)\.([0-9]+)/g;

function getPlatform(): keyof PluginFiles {
  return platformTypes[process.platform];
}

function idToSlug(id: string): string {
  return safeSlug(id.replace(/\//g, '_'));
}

function pathGetDirectory(pathItem: string): string {
  return pathItem.substring(0, pathItem.lastIndexOf('/'));
}

function pathGetExt(pathItem: string): string {
  return pathItem.substring(pathItem.lastIndexOf('.') + 1);
}

function pathGetFilename(str: string): string {
  let base: string = str.substring(str.lastIndexOf('/') + 1);
  if (base.lastIndexOf('.') !== -1) {
    base = base.substring(0, base.lastIndexOf('.'));
  }
  return base;
}

function pathGetId(pathItem: string): string {
  const splitMatch: string[] = pathItem.split('@');
  pathItem = splitMatch ? splitMatch[0] : pathItem;
  return safeSlug(pathGetFilename(pathItem));
}

function pathGetRepo(pathItem: string): string {
  const pathParts: string[] = pathGetDirectory(pathItem).split('/');
  // Plugins should be stored in the following directory format:
  // {userId}/{repoId}/{pluginId}
  // For example:
  // studiorack/studiorack-plugin-steinberg/adelay
  if (pathParts.length > 1) {
    return safeSlug(`${pathParts[0]}/${pathParts[1]}`);
  }
  // Otherwise return full path
  return safeSlug(pathGetDirectory(pathItem));
}

function pathGetVersion(pathItem: string): string {
  const matches: any = pathItem.match(VERSION_REGEX);
  return matches ? matches[0] : '0.0.0';
}

function pathGetWithoutExt(pathItem: string): string {
  return pathItem.substring(0, pathItem.lastIndexOf('.'));
}

function safeSlug(val: string): string {
  return slugify(val, { lower: true, remove: URLSAFE_REGEX });
}

function slugToId(slug: string): string {
  return safeSlug(slug.replace(/_/g, '/'));
}

export {
  getPlatform,
  idToSlug,
  pathGetDirectory,
  pathGetExt,
  pathGetFilename,
  pathGetId,
  pathGetRepo,
  pathGetVersion,
  pathGetWithoutExt,
  safeSlug,
  slugToId,
};
