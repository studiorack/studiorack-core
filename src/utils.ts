import os from 'os';
import path from 'path';
import slugify from 'slugify';

const homedir = os.homedir();
const PLUGIN_DIR = './plugins';
const URLSAFE_REGEX = /[^\w\s$*_+~.()'"!\-:@\/]+/g;
const VERSION_REGEX = /([0-9]+)\.([0-9]+)\.([0-9]+)/g;

function cleanPath(pathItem: string) {
  return pathItem.replace(pluginFolder(true), '');
}

function idToSlug(id: string) {
  return slugify(cleanPath(id).replace(/\//g, '_'), { lower: true, remove: URLSAFE_REGEX });
}

function slugToId(id: string) {
  return slugify(cleanPath(id).replace(/_/g, '/'), { lower: true, remove: URLSAFE_REGEX });
}

function pathGetId(pathItem: string) {
  const splitMatch = cleanPath(pathItem).split('@');
  pathItem = splitMatch ? splitMatch[0] : pathItem;
  const fileName = path.basename(pathItem, path.extname(pathItem));
  return slugify(fileName, { lower: true, remove: URLSAFE_REGEX });
}

function pathGetRepo(pathItem: string) {
  const pathParts = cleanPath(pathItem).split('/');
  return slugify(`${pathParts[0]}/${pathParts[1]}`, { lower: true, remove: URLSAFE_REGEX });
}

function pathGetVersion(pathItem: string) {
  const matches = cleanPath(pathItem).match(VERSION_REGEX);
  return matches ? matches[0] : '0.0.0';
}

function pluginFolder(global: boolean) {
  const supported: { [property: string]: string } = {
    aix: homedir + '/.vst3',
    darwin: '/Library/Audio/Plug-ins/VST3',
    freebsd: homedir + '/.vst3',
    linux: homedir + '/.vst3',
    openbsd: homedir + '/.vst3',
    sunos: homedir + '/.vst3',
    win32: '/Program Files/Common Files/VST3',
    win64: '/Program Files/Common Files/VST3',
  };
  if (global) {
    return supported[process.platform];
  } else {
    return PLUGIN_DIR;
  }
}

export {
  idToSlug,
  slugToId,
  pathGetId,
  pathGetRepo,
  pathGetVersion,
  pluginFolder
};
