import path from 'path';
import { PLUGIN_FOLDER } from './registry';
import slugify from 'slugify';

const VERSION_REGEX = /([0-9]+)\.([0-9]+)\.([0-9]+)/g;
const URLSAFE_REGEX = /[^\w\s$*_+~.()'"!\-:@\/]+/g;

function cleanPath(pathItem: string) {
  return pathItem.replace(PLUGIN_FOLDER, '');
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

export {
  idToSlug,
  slugToId,
  pathGetId,
  pathGetRepo,
  pathGetVersion
};
