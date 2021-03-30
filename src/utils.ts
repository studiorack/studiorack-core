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

function baseName(str: string): string {
  let base: string = str.substring(str.lastIndexOf('/') + 1);
  if (base.lastIndexOf('.') !== -1) {
    base = base.substring(0, base.lastIndexOf('.'));
  }
  return base;
}

function getPlatform(): keyof PluginFiles {
  return platformTypes[process.platform];
}

function idToSlug(id: string): string {
  return safeSlug(id.replace(/\//g, '_'));
}

function slugToId(slug: string): string {
  return safeSlug(slug.replace(/_/g, '/'));
}

function pathGetId(pathItem: string): string {
  const splitMatch: string[] = pathItem.split('@');
  pathItem = splitMatch ? splitMatch[0] : pathItem;
  return safeSlug(baseName(pathItem));
}

function pathGetRepo(pathItem: string): string {
  const pathParts: string[] = pathItem.split('/');
  if (pathParts.length > 1) {
    return safeSlug(`${pathParts[0]}/${pathParts[1]}`);
  }
  return safeSlug(baseName(pathItem));
}

function pathGetVersion(pathItem: string): string {
  const matches: any = pathItem.match(VERSION_REGEX);
  return matches ? matches[0] : '0.0.0';
}

function safeSlug(val: string): string {
  return slugify(val, { lower: true, remove: URLSAFE_REGEX });
}

export { baseName, getPlatform, idToSlug, slugToId, pathGetId, pathGetRepo, pathGetVersion, safeSlug };
