
interface ProjectCategory {
  name: string;
  tags: string[];
}

interface ProjectEntry {
  id: string;
  license: string;
  version: string;
  versions: { [version: string]: ProjectInterface };
}

interface ProjectFile {
  name: string;
  size: number;
}

interface ProjectFiles {
  audio: ProjectFile;
  image: ProjectFile;
  project: ProjectFile;
}

interface ProjectInterface {
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

interface ProjectLocal extends ProjectInterface {
  path: string;
  status: string;
}

interface ProjectPack {
  [property: string]: ProjectEntry;
}

interface ProjectTemplate {
  ableton: string;
  cubase: string;
  flStudio: string;
  logic: string;
  proTools: string;
  reaper: string;
}

interface ProjectType {
  name: string;
  ext: string;
}

interface ProjectTypes {
  ableton: ProjectType;
  cubase: ProjectType;
  flStudio: ProjectType;
  logic: ProjectType;
  proTools: ProjectType;
  reaper: ProjectType;
}

export {
  ProjectCategory,
  ProjectEntry,
  ProjectFile,
  ProjectFiles,
  ProjectInterface,
  ProjectLocal,
  ProjectPack,
  ProjectTemplate,
  ProjectType,
  ProjectTypes,
};
