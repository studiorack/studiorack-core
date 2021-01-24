import { dirExists, fileSize } from './file';
import slugify from 'slugify';

const URLSAFE_REGEX = /[^\w\s$*_+~.()'"!\-:@\/]+/g;
const VERSION_REGEX = /([0-9]+)\.([0-9]+)\.([0-9]+)/g;

function fileAdd(filePath: string, fileName: string, fileType: string, json: any) {
  if (dirExists(filePath)) {
    // Ensure file type object exists
    if (!json.files[fileType]) {
      json.files[fileType] = {};
    }
    // Add file name
    if (fileName) {
      json.files[fileType].name = fileName;
    }
    // Add file size
    const size = fileSize(filePath);
    if (size) {
      json.files[fileType].size = size;
    }
  }
  return json;
}

function baseName(str: string) {
  let base = str.substring(str.lastIndexOf('/') + 1); 
  if (base.lastIndexOf('.') !== -1) {
    base = base.substring(0, base.lastIndexOf('.'));
  }
  return base;
}

function idToSlug(id: string) {
  return slugify(id.replace(/\//g, '_'), { lower: true, remove: URLSAFE_REGEX });
}

function slugToId(slug: string) {
  return slugify(slug.replace(/_/g, '/'), { lower: true, remove: URLSAFE_REGEX });
}

function pathGetId(pathItem: string) {
  const splitMatch = pathItem.split('@');
  pathItem = splitMatch ? splitMatch[0] : pathItem;
  return slugify(baseName(pathItem), { lower: true, remove: URLSAFE_REGEX });
}

function pathGetRepo(pathItem: string) {
  const pathParts = pathItem.split('/');
  if (pathParts.length > 1) {
    return slugify(`${pathParts[0]}/${pathParts[1]}`, { lower: true, remove: URLSAFE_REGEX });
  }
  return slugify(baseName(pathItem), { lower: true, remove: URLSAFE_REGEX });
}

function pathGetVersion(pathItem: string) {
  const matches = pathItem.match(VERSION_REGEX);
  return matches ? matches[0] : '0.0.0';
}

export {
  fileAdd,
  idToSlug,
  slugToId,
  pathGetId,
  pathGetRepo,
  pathGetVersion
};
