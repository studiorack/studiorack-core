export interface ProjectCategory {
  name: string;
  tags: string[];
}

export interface ProjectEntry {
  version: string;
  versions: ProjectVersions;
  // Deprecated in v2
  id?: string;
  license?: string;
}

export interface ProjectFile {
  url: string;
  size: number;
  name?: string;
}

export interface ProjectFiles {
  audio: ProjectFile;
  image: ProjectFile;
  project: ProjectFile;
}

export interface ProjectLicense {
  key: string;
  name: string;
  url: string;
  same: boolean;
}

export interface ProjectPack {
  [id: string]: ProjectEntry;
}

export interface ProjectRegistry {
  name: string;
  url: string;
  version: string;
  objects: ProjectPack;
}

export interface ProjectTemplate {
  ableton: string;
  cubase: string;
  dawproject: string;
  flStudio: string;
  logic: string;
  proTools: string;
  reaper: string;
}

export interface ProjectType {
  name: string;
  ext: string;
}

export interface ProjectTypes {
  ableton: ProjectType;
  cubase: ProjectType;
  dawproject: ProjectType;
  flStudio: ProjectType;
  logic: ProjectType;
  proTools: ProjectType;
  reaper: ProjectType;
}

export interface ProjectVersion {
  author: string;
  date: string;
  description: string;
  homepage: string;
  name: string;
  files: ProjectFiles;
  license: string | ProjectLicense;
  plugins: ProjectVersionPlugins;
  tags: string[];
  type?: ProjectType;
  // Deprecated in v2
  id?: string;
  release?: string;
  repo?: string;
  version?: string;
}

export interface ProjectVersionPlugins {
  [id: string]: string;
}

export interface ProjectVersions {
  [version: string]: ProjectVersion;
}

export interface ProjectVersionLocal extends ProjectVersion {
  path: string;
  status: string;
}
