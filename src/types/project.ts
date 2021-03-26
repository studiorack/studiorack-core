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
  tags: string[];
  type?: ProjectType;
  version: string;
}

interface ProjectType {
  name: string;
  ext: string;
}

interface ProjectTypes {
  ableton: ProjectType,
  cubase: ProjectType,
  flStudio: ProjectType,
  logic: ProjectType,
  proTools: ProjectType,
  reaper: ProjectType
}

export {
  ProjectFile,
  ProjectFiles,
  ProjectInterface,
  ProjectType,
  ProjectTypes
};
