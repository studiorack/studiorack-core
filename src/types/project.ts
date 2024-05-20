export interface ProjectCategory {
  name: string;
  tags: string[];
}

export interface ProjectEntry {
  id: string;
  license: string;
  version: string;
  versions: { [version: string]: ProjectInterface };
}

export interface ProjectFile {
  name: string;
  size: number;
}

export interface ProjectFiles {
  audio: ProjectFile;
  image: ProjectFile;
  project: ProjectFile;
}

export interface ProjectInterface {
  author: string;
  date: string;
  description: string;
  homepage: string;
  id: string;
  name: string;
  files: ProjectFiles;
  plugins: { [property: string]: string };
  repo: string;
  tags: string[];
  type?: ProjectType;
  version: string;
}

export interface ProjectLocal extends ProjectInterface {
  path: string;
  status: string;
}

export interface ProjectPack {
  [property: string]: ProjectEntry;
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
