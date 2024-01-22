import { ConfigInterface } from './types/config';

function configDefaults(
  appFolder: string,
  pluginFolder: string,
  presetFolder: string,
  projectFolder: string
): ConfigInterface {
  return {
    appFolder,
    extAudio: '.wav',
    extFile: '.json',
    extImage: '.png',
    extZip: '.zip',
    ignoredFolders: ['Backup'],
    licenses: [
      {
        key: '0bsd',
        name: 'BSD Zero Clause License',
        url: 'https://choosealicense.com/licenses/0bsd/',
        same: false,
      },
      {
        key: 'afl-3.0',
        name: 'Academic Free License v3.0',
        url: 'https://choosealicense.com/licenses/afl-3.0/',
        same: false,
      },
      {
        key: 'agpl-3.0',
        name: 'GNU Affero General Public License v3.0',
        url: 'https://choosealicense.com/licenses/agpl-3.0',
        same: true,
      },
      {
        key: 'apache-2.0',
        name: 'Apache License 2.0',
        url: 'https://choosealicense.com/licenses/apache-2.0',
        same: false,
      },
      {
        key: 'artistic-2.0',
        name: 'Artistic License 2.0',
        url: 'https://choosealicense.com/licenses/artistic-2.0/',
        same: false,
      },
      {
        key: 'bsd-2-clause',
        name: "BSD 2-Clause 'Simplified' License",
        url: 'https://choosealicense.com/licenses/bsd-2-clause',
        same: false,
      },
      {
        key: 'bsd-3-clause-clear',
        name: 'BSD 3-Clause Clear License',
        url: 'https://choosealicense.com/licenses/bsd-3-clause-clear',
        same: false,
      },
      {
        key: 'bsd-3-clause',
        name: "BSD 3-Clause 'New' or 'Revised' License",
        url: 'https://choosealicense.com/licenses/bsd-3-clause',
        same: false,
      },
      {
        key: 'bsd-4-clause',
        name: "BSD 4-Clause 'Original' or 'Old License",
        url: 'https://choosealicense.com/licenses/bsd-4-clause',
        same: false,
      },
      {
        key: 'bsl-1.0',
        name: 'Boost Software License 1.0',
        url: 'https://choosealicense.com/licenses/bsl-1.0',
        same: false,
      },
      {
        key: 'cc-by-4.0',
        name: 'Creative Commons Attribution 4.0 International',
        url: 'https://choosealicense.com/licenses/cc-by-4.0',
        same: false,
      },
      {
        key: 'cc-by-sa-4.0',
        name: 'Creative Commons Attribution Share Alike 4.0 International',
        url: 'https://choosealicense.com/licenses/cc-by-sa-4.0',
        same: true,
      },
      {
        key: 'cc0-1.0',
        name: 'Creative Commons Zero v1.0 Universal',
        url: 'https://choosealicense.com/licenses/cc0-1.0',
        same: false,
      },
      {
        key: 'cecill-2.1',
        name: 'CeCILL Free Software License Agreement v2.1',
        url: 'https://choosealicense.com/licenses/cecill-2.1',
        same: true,
      },
      {
        key: 'ecl-2.0',
        name: 'Educational Community License v2.0',
        url: 'https://choosealicense.com/licenses/ecl-2.0',
        same: false,
      },
      {
        key: 'epl-1.0',
        name: 'Eclipse Public License 1.0',
        url: 'https://choosealicense.com/licenses/epl-1.0',
        same: true,
      },
      {
        key: 'epl-2.0',
        name: 'Eclipse Public License 2.0',
        url: 'https://choosealicense.com/licenses/epl-2.0',
        same: true,
      },
      {
        key: 'eupl-1.1',
        name: 'European Union Public License 1.1',
        url: 'https://choosealicense.com/licenses/eupl-1.1',
        same: true,
      },
      {
        key: 'eupl-1.2',
        name: 'European Union Public License 1.2',
        url: 'https://choosealicense.com/licenses/eupl-1.2',
        same: true,
      },
      {
        key: 'gpl-2.0',
        name: 'GNU General Public License v2.0',
        url: 'https://choosealicense.com/licenses/gpl-2.0',
        same: true,
      },
      {
        key: 'gpl-3.0',
        name: 'GNU General Public License v3.0',
        url: 'https://choosealicense.com/licenses/gpl-3.0',
        same: true,
      },
      {
        key: 'gpl-3.0',
        name: 'GNU General Public License v3.0',
        url: 'https://choosealicense.com/licenses/gpl-3.0',
        same: true,
      },
      {
        key: 'isc',
        name: 'ISC License',
        url: 'https://choosealicense.com/licenses/isc',
        same: false,
      },
      {
        key: 'lgpl-2.1',
        name: 'GNU Lesser General Public License v2.1',
        url: 'https://choosealicense.com/licenses/lgpl-2.1',
        same: false,
      },
      {
        key: 'lgpl-3.0',
        name: 'GNU Lesser General Public License v3.0',
        url: 'https://choosealicense.com/licenses/lgpl-3.0',
        same: false,
      },
      {
        key: 'lppl-1.3c',
        name: 'LaTeX Project Public License v1.3c',
        url: 'https://choosealicense.com/licenses/lppl-1.3c',
        same: false,
      },
      {
        key: 'mit-0',
        name: 'MIT No Attribution',
        url: 'https://choosealicense.com/licenses/mit-0',
        same: false,
      },
      {
        key: 'mit',
        name: 'MIT License',
        url: 'https://choosealicense.com/licenses/mit',
        same: false,
      },
      {
        key: 'mpl-2.0',
        name: 'Mozilla Public License 2.0',
        url: 'https://choosealicense.com/licenses/mpl-2.0',
        same: true,
      },
      {
        key: 'ms-pl',
        name: 'Microsoft Public License',
        url: 'https://choosealicense.com/licenses/ms-pl',
        same: false,
      },
      {
        key: 'ms-rl',
        name: 'Microsoft Reciprocal License',
        url: 'https://choosealicense.com/licenses/ms-rl',
        same: true,
      },
      {
        key: 'mulanpsl-2.0',
        name: 'Mulan Permissive Software License, Version 2',
        url: 'https://choosealicense.com/licenses/mulanpsl-2.0',
        same: false,
      },
      {
        key: 'ncsa',
        name: 'University of Illinois/NCSA Open Source License',
        url: 'https://choosealicense.com/licenses/ncsa',
        same: false,
      },
      {
        key: 'odbl-1.0',
        name: 'Open Data Commons Open Database License v1.0',
        url: 'https://choosealicense.com/licenses/odbl-1.0',
        same: true,
      },
      {
        key: 'ofl-1.1',
        name: 'SIL Open Font License 1.1',
        url: 'https://choosealicense.com/licenses/ofl-1.1',
        same: true,
      },
      {
        key: 'osl-3.0',
        name: 'Open Software License 3.0',
        url: 'https://choosealicense.com/licenses/osl-3.0',
        same: true,
      },
      {
        key: 'postgresql',
        name: 'PostgreSQL License',
        url: 'https://choosealicense.com/licenses/postgresql',
        same: false,
      },
      {
        key: 'unlicense',
        name: 'The Unlicense',
        url: 'https://choosealicense.com/licenses/unlicense',
        same: false,
      },
      {
        key: 'upl-1.0',
        name: 'Universal Permissive License v1.0',
        url: 'https://choosealicense.com/licenses/upl-1.0',
        same: false,
      },
      {
        key: 'vim',
        name: 'Vim License',
        url: 'https://choosealicense.com/licenses/vim',
        same: true,
      },
      {
        key: 'wtfpl',
        name: 'Do What The F*ck You Want To Public License',
        url: 'https://choosealicense.com/licenses/wtfpl',
        same: false,
      },
      {
        key: 'zlib',
        name: 'zlib License',
        url: 'https://choosealicense.com/licenses/zlib',
        same: false,
      },
      {
        key: 'other',
        name: 'Other',
        url: 'https://choosealicense.com',
        same: true,
      },
    ],
    pluginEffectCategories: {
      all: {
        name: 'All',
        tags: ['All'],
      },
      chorus: {
        name: 'Chorus/Phaser',
        tags: ['Chorus', 'Phaser'],
      },
      compression: {
        name: 'Compression/Distortion',
        tags: ['Compression', 'Distortion', 'Amplifier', 'Amp'],
      },
      eq: {
        name: 'EQ/Pan',
        tags: ['EQ', 'Equalizer', 'Pan'],
      },
      filter: {
        name: 'Filter',
        tags: ['Filter'],
      },
      reverb: {
        name: 'Reverb/Delay',
        tags: ['Reverb', 'Delay'],
      },
    },
    pluginInstrumentCategories: {
      all: {
        name: 'All',
        tags: ['All'],
      },
      drums: {
        name: 'Drums',
        tags: ['Drums', 'Percussion'],
      },
      guitar: {
        name: 'Guitar',
        tags: ['Guitar', 'String'],
      },
      keys: {
        name: 'Keys',
        tags: ['Keys', 'Piano'],
      },
      orchestral: {
        name: 'Orchestral',
        tags: ['Orchestral', 'Orchestra', 'Strings', 'Woodwind', 'Brass'],
      },
      samplers: {
        name: 'Samplers',
        tags: ['Samplers', 'Sampler', 'Sample'],
      },
      synths: {
        name: 'Synths',
        tags: ['Synths', 'Synth'],
      },
      vocals: {
        name: 'Vocals',
        tags: ['Vocals'],
      },
    },
    pluginFile: 'plugin.json',
    pluginFolder,
    pluginRegistry: 'https://studiorack.github.io/studiorack-registry/${type}.json',
    pluginRelease: 'https://github.com/${repo}/releases/download',
    pluginTemplate: 'https://github.com/studiorack/studiorack-template-${template}/archive/main.zip',
    pluginTypes: {
      audioUnits: {
        name: 'Audio Units',
        ext: 'component',
      },
      avidAudioExtension: {
        name: 'Avid Audio Extension',
        ext: 'aax',
      },
      dynamicLinkLibrary: {
        name: 'Dynamic Link Library',
        ext: 'dll',
      },
      cleverAudioPlugin: {
        name: 'Clever Audio Plugin',
        ext: 'clap',
      },
      realtimeAudiosuite: {
        name: 'Real-Time AudioSuite',
        ext: 'rta',
      },
      ladspaVersion2: {
        name: 'LADSPA Version 2',
        ext: 'lv2',
      },
      sf2: {
        name: 'SoundFont 2',
        ext: 'sf2',
      },
      sfz: {
        name: 'SFZ',
        ext: 'sfz',
      },
      timeDivisionMultiplexing: {
        name: 'Time-Division-Multiplexing',
        ext: 'tdm',
      },
      virtualStudioTechnology: {
        name: 'Virtual Studio Technology',
        ext: 'vst',
      },
      virtualStudioTechnology3: {
        name: 'Virtual Studio Technology 3',
        ext: 'vst3',
      },
    },
    presetFolder,
    projectFile: 'project.json',
    projectFolder,
    projectRegistry: 'https://studiorack.github.io/studiorack-registry/',
    projectTypes: {
      ableton: {
        name: 'Ableton',
        ext: 'als',
      },
      cubase: {
        name: 'Cubase',
        ext: 'cpr',
      },
      dawproject: {
        name: 'DAWproject',
        ext: 'dawproject',
      },
      flStudio: {
        name: 'FL Studio',
        ext: 'flp',
      },
      logic: {
        name: 'Logic',
        ext: 'logic',
      },
      proTools: {
        name: 'Pro Tools',
        ext: 'ptx',
      },
      reaper: {
        name: 'Reaper',
        ext: 'rpp',
      },
    },
    clapinfoUrl: 'https://github.com/studiorack/clap-info/releases/download/v1.0.0/clap-info-${platform}.zip',
    pluginvalUrl: 'https://github.com/studiorack/pluginval/releases/download/v1.0.1/pluginval-${platform}.zip',
    validatorUrl:
      'https://github.com/studiorack/studiorack-template-steinberg/releases/latest/download/validator-${platform}.zip',
  };
}

export { configDefaults };
