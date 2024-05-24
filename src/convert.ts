// To parse this data:
//
//   import { Convert, PluginCategory, PluginEntry, PluginFile, PluginFiles, PluginLicense, PluginRegistry, PluginTemplate, PluginType, PluginTypes, PluginValidationOptions, PluginVersion, PluginVersionLocal, ProjectCategory, ProjectEntry, ProjectFile, ProjectFiles, ProjectInterface, ProjectLocal, ProjectTemplate, ProjectType, ProjectTypes, ConfigInterface, PlatformTypes, PlatformsSupported, DAWProject, Project, DAWStructure, DAWApplication, DAWTransport, DAWNameable, DAWDevices, DAWDAWParameters, DAWFileReference, DAWEqBand, DAWNote, DAWWarp, DAWPoint, DAWAutomationTarget, DAWScene, DAWReferenceable, DAWClip, DAWMarker, DAWRealPoint, DAWEnumPoint, DAWBoolPoint, DAWIntegerPoint, DAWTimeSignaturePoint, DAWParameter, DAWLane, DAWArrangement, DAWTimeline, DAWDevice, DAWSend, DAWRealParameter, DAWBoolParameter, DAWIntegerParameter, DAWEnumParameter, DAWTimeSignatureParameter, DAWLanes, DAWTrack, DAWChannel, DAWPlugin, DAWBuiltinDevice, DAWClipSlot, DAWMediaFile, DAWPoints, DAWVst2Plugin, DAWVst3Plugin, DAWClapPlugin, DAWEqualizer, DAWCompressor, DAWNoiseGate, DAWLimiter, DAWAuPlugin, DAWAudio, DAWVideo, DAWUnit, DAWTimeUnit, DAWDeviceRole, DAWEqBandType, DAWMixerRole, DAWSendType, DAWContentType, DAWInterpolation, DAWExpressionType, Tools } from "./file";
//
//   const pluginCategory = Convert.toPluginCategory(json);
//   const pluginEntry = Convert.toPluginEntry(json);
//   const pluginFile = Convert.toPluginFile(json);
//   const pluginFiles = Convert.toPluginFiles(json);
//   const pluginLicense = Convert.toPluginLicense(json);
//   const pluginPack = Convert.toPluginPack(json);
//   const pluginRegistry = Convert.toPluginRegistry(json);
//   const pluginTemplate = Convert.toPluginTemplate(json);
//   const pluginType = Convert.toPluginType(json);
//   const pluginTypes = Convert.toPluginTypes(json);
//   const pluginValidationOptions = Convert.toPluginValidationOptions(json);
//   const pluginVersion = Convert.toPluginVersion(json);
//   const pluginVersions = Convert.toPluginVersions(json);
//   const pluginVersionLocal = Convert.toPluginVersionLocal(json);
//   const projectCategory = Convert.toProjectCategory(json);
//   const projectEntry = Convert.toProjectEntry(json);
//   const projectFile = Convert.toProjectFile(json);
//   const projectFiles = Convert.toProjectFiles(json);
//   const projectInterface = Convert.toProjectInterface(json);
//   const projectLocal = Convert.toProjectLocal(json);
//   const projectPack = Convert.toProjectPack(json);
//   const projectTemplate = Convert.toProjectTemplate(json);
//   const projectType = Convert.toProjectType(json);
//   const projectTypes = Convert.toProjectTypes(json);
//   const configInterface = Convert.toConfigInterface(json);
//   const configList = Convert.toConfigList(json);
//   const platformTypes = Convert.toPlatformTypes(json);
//   const platformsSupported = Convert.toPlatformsSupported(json);
//   const dAWProject = Convert.toDAWProject(json);
//   const project = Convert.toProject(json);
//   const dAWStructure = Convert.toDAWStructure(json);
//   const dAWApplication = Convert.toDAWApplication(json);
//   const dAWTransport = Convert.toDAWTransport(json);
//   const dAWNameable = Convert.toDAWNameable(json);
//   const dAWDevices = Convert.toDAWDevices(json);
//   const dAWDAWParameters = Convert.toDAWDAWParameters(json);
//   const dAWFileReference = Convert.toDAWFileReference(json);
//   const dAWEqBand = Convert.toDAWEqBand(json);
//   const dAWNote = Convert.toDAWNote(json);
//   const dAWWarp = Convert.toDAWWarp(json);
//   const dAWPoint = Convert.toDAWPoint(json);
//   const dAWAutomationTarget = Convert.toDAWAutomationTarget(json);
//   const dAWScene = Convert.toDAWScene(json);
//   const dAWReferenceable = Convert.toDAWReferenceable(json);
//   const dAWClip = Convert.toDAWClip(json);
//   const dAWMarker = Convert.toDAWMarker(json);
//   const dAWRealPoint = Convert.toDAWRealPoint(json);
//   const dAWEnumPoint = Convert.toDAWEnumPoint(json);
//   const dAWBoolPoint = Convert.toDAWBoolPoint(json);
//   const dAWIntegerPoint = Convert.toDAWIntegerPoint(json);
//   const dAWTimeSignaturePoint = Convert.toDAWTimeSignaturePoint(json);
//   const dAWParameter = Convert.toDAWParameter(json);
//   const dAWLane = Convert.toDAWLane(json);
//   const dAWArrangement = Convert.toDAWArrangement(json);
//   const dAWTimeline = Convert.toDAWTimeline(json);
//   const dAWDevice = Convert.toDAWDevice(json);
//   const dAWSend = Convert.toDAWSend(json);
//   const dAWRealParameter = Convert.toDAWRealParameter(json);
//   const dAWBoolParameter = Convert.toDAWBoolParameter(json);
//   const dAWIntegerParameter = Convert.toDAWIntegerParameter(json);
//   const dAWEnumParameter = Convert.toDAWEnumParameter(json);
//   const dAWTimeSignatureParameter = Convert.toDAWTimeSignatureParameter(json);
//   const dAWLanes = Convert.toDAWLanes(json);
//   const dAWTrack = Convert.toDAWTrack(json);
//   const dAWChannel = Convert.toDAWChannel(json);
//   const dAWPlugin = Convert.toDAWPlugin(json);
//   const dAWBuiltinDevice = Convert.toDAWBuiltinDevice(json);
//   const dAWClipSlot = Convert.toDAWClipSlot(json);
//   const dAWMediaFile = Convert.toDAWMediaFile(json);
//   const dAWPoints = Convert.toDAWPoints(json);
//   const dAWVst2Plugin = Convert.toDAWVst2Plugin(json);
//   const dAWVst3Plugin = Convert.toDAWVst3Plugin(json);
//   const dAWClapPlugin = Convert.toDAWClapPlugin(json);
//   const dAWEqualizer = Convert.toDAWEqualizer(json);
//   const dAWCompressor = Convert.toDAWCompressor(json);
//   const dAWNoiseGate = Convert.toDAWNoiseGate(json);
//   const dAWLimiter = Convert.toDAWLimiter(json);
//   const dAWAuPlugin = Convert.toDAWAuPlugin(json);
//   const dAWAudio = Convert.toDAWAudio(json);
//   const dAWVideo = Convert.toDAWVideo(json);
//   const dAWUnit = Convert.toDAWUnit(json);
//   const dAWTimeUnit = Convert.toDAWTimeUnit(json);
//   const dAWDeviceRole = Convert.toDAWDeviceRole(json);
//   const dAWEqBandType = Convert.toDAWEqBandType(json);
//   const dAWMixerRole = Convert.toDAWMixerRole(json);
//   const dAWSendType = Convert.toDAWSendType(json);
//   const dAWContentType = Convert.toDAWContentType(json);
//   const dAWInterpolation = Convert.toDAWInterpolation(json);
//   const dAWExpressionType = Convert.toDAWExpressionType(json);
//   const tools = Convert.toTools(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface PluginRegistry {
  name: string;
  objects: { [key: string]: PluginPack };
  url: string;
  version: string;
}

export interface PluginPack {
  id?: string;
  license?: string;
  version: string;
  versions: { [key: string]: PluginVersions };
}

export interface PluginVersions {
  author: string;
  date: string;
  description: string;
  files: PluginFiles;
  homepage: string;
  id?: string;
  license: PluginLicense | string;
  name: string;
  release?: string;
  repo?: string;
  tags: string[];
  version?: string;
}

export interface PluginFiles {
  audio: PluginFile;
  image: PluginFile;
  linux: PluginFile;
  mac: PluginFile;
  win: PluginFile;
}

export interface PluginFile {
  size: number;
  url: string;
}

export interface PluginLicense {
  key: string;
  name: string;
  same: boolean;
  url: string;
}

export interface PluginTemplate {
  clap: string;
  dpf: string;
  dplug: string;
  iplug: string;
  juce: string;
  sf2: string;
  sfz: string;
  steinberg: string;
}

export interface PluginValidationOptions {
  files?: boolean;
  json?: boolean;
  summary?: boolean;
  txt?: boolean;
  zip?: boolean;
}

export interface PluginVersionLocal {
  author: string;
  date: string;
  description: string;
  files: PluginFiles;
  homepage: string;
  id?: string;
  license: PluginLicense | string;
  name: string;
  paths: string[];
  release?: string;
  repo?: string;
  status: string;
  tags: string[];
  version?: string;
}

export interface ProjectCategory {
  name: string;
  tags: string[];
}

export interface ProjectLocal {
  author: string;
  date: string;
  description: string;
  files: ProjectFiles;
  homepage: string;
  id: string;
  name: string;
  path: string;
  plugins: { [key: string]: string };
  repo: string;
  status: string;
  tags: string[];
  type?: ProjectType;
  version: string;
}

export interface ProjectFiles {
  audio: ProjectFile;
  image: ProjectFile;
  project: ProjectFile;
}

export interface ProjectFile {
  name: string;
  size: number;
}

export interface ProjectType {
  ext: string;
  name: string;
}

export interface ProjectPack {
  id: string;
  license: string;
  version: string;
  versions: { [key: string]: ProjectInterface };
}

export interface ProjectInterface {
  author: string;
  date: string;
  description: string;
  files: ProjectFiles;
  homepage: string;
  id: string;
  name: string;
  plugins: { [key: string]: string };
  repo: string;
  tags: string[];
  type?: ProjectType;
  version: string;
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

export interface ConfigInterface {
  appFolder: string;
  clapinfoUrl: string;
  extAudio: string;
  extFile: string;
  extImage: string;
  extZip: string;
  ignoredFolders: string[];
  licenses: PluginLicense[];
  pluginEffectCategories: { [key: string]: ConfigList };
  pluginFile: string;
  pluginFolder: string;
  pluginInstrumentCategories: { [key: string]: ConfigList };
  pluginRegistry: string;
  pluginRelease: string;
  pluginTemplate: string;
  pluginTypes: PluginTypes;
  pluginvalUrl: string;
  presetFolder: string;
  projectFile: string;
  projectFolder: string;
  projectRegistry: string;
  projectTypes: ProjectTypes;
  validatorUrl: string;
}

export interface ConfigList {
  name: string;
  tags: string[];
}

export interface PluginTypes {
  audioUnits: PluginType;
  avidAudioExtension: PluginType;
  cleverAudioPlugin: PluginType;
  dynamicLinkLibrary: PluginType;
  ladspaVersion2: PluginType;
  realtimeAudiosuite: PluginType;
  sf2: PluginType;
  sfz: PluginType;
  timeDivisionMultiplexing: PluginType;
  virtualStudioTechnology: PluginType;
  virtualStudioTechnology3: PluginType;
}

export interface PluginType {
  ext: string;
  name: string;
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

export interface PlatformTypes {
  aix: AIX;
  android: AIX;
  cygwin: AIX;
  darwin: AIX;
  freebsd: AIX;
  linux: AIX;
  netbsd: AIX;
  openbsd: AIX;
  sunos: AIX;
  win32: AIX;
  win64: AIX;
}

export enum AIX {
  Audio = 'audio',
  Image = 'image',
  Linux = 'linux',
  MAC = 'mac',
  Win = 'win',
}

export interface PlatformsSupported {
  aix: string;
  android: string;
  cygwin: string;
  darwin: string;
  freebsd: string;
  linux: string;
  netbsd: string;
  openbsd: string;
  sunos: string;
  win32: string;
}

export interface DAWProject {
  $version: string;
  Application: DAWApplication;
  arrangement: DAWArrangement;
  Arrangement: DAWArrangement;
  audio: DAWAudio;
  auPlugin: DAWAuPlugin;
  boolParameter: DAWBoolParameter;
  boolPoint: DAWBoolPoint;
  builtinDevice: DAWBuiltinDevice;
  channel: DAWChannel;
  clapPlugin: DAWClapPlugin;
  clip: DAWClip;
  clips: DAWClip[];
  clipSlot: DAWClipSlot;
  compressor: DAWCompressor;
  device: DAWDevice;
  enumParameter: DAWEnumParameter;
  enumPoint: DAWEnumPoint;
  equalizer: DAWEqualizer;
  integerParameter: DAWIntegerParameter;
  integerPoint: DAWIntegerPoint;
  lanes: DAWLanes;
  limiter: DAWLimiter;
  marker: DAWMarker;
  markers: DAWMarker[];
  noiseGate: DAWNoiseGate;
  note: DAWNote;
  notes: DAWNote[];
  parameter: DAWParameter;
  point: DAWPoint;
  points: DAWPoints;
  project: DAWProject;
  realParameter: DAWRealParameter;
  realPoint: DAWRealPoint;
  scene: DAWScene;
  Scenes?: DAWScene[];
  Structure?: DAWStructure;
  timeline: DAWTimeline;
  timeSignatureParameter: DAWTimeSignatureParameter;
  timeSignaturePoint: DAWTimeSignaturePoint;
  track: DAWTrack;
  Transport?: DAWTransport;
  video: DAWVideo;
  vst2Plugin: DAWVst2Plugin;
  vst3Plugin: DAWVst3Plugin;
  warp: DAWWarp;
  warps: DAWWarp[];
}

export interface DAWApplication {
  $name: string;
  $version: string;
}

export interface DAWArrangement {
  Lanes: DAWLanes;
  Markers?: DAWMarker[];
  TempoAutomation?: DAWPoints;
  TimeSignatureAutomation?: DAWPoints;
}

export interface DAWNote {
  $channel: number;
  $duration: string;
  $key: number;
  $rel: string;
  $time: string;
  $vel: string;
  Audio: DAWAudio;
  Clips: DAWClip[];
  ClipSlot: DAWClipSlot;
  Lanes: DAWLanes;
  markers: DAWMarker[];
  Notes: DAWNote[];
  Points: DAWPoints;
  Timeline: DAWTimeline;
  Video: DAWVideo;
  Warps: DAWWarp[];
}

export interface DAWClip {
  $color: string;
  $comment: string;
  $name: string;
  Audio: DAWAudio;
  Clips: DAWClip[];
  ClipSlot: DAWClipSlot;
  Lanes: DAWLanes;
  markers: DAWMarker[];
  Notes: DAWNote[];
  Points: DAWPoints;
  Timeline: DAWTimeline;
  Video: DAWVideo;
  Warps: DAWWarp[];
}

export interface DAWClipSlot {
  Clip: DAWClip;
}

export interface DAWLanes {
  Audio: DAWAudio;
  Clips: DAWClip[];
  ClipSlot: DAWClipSlot;
  Lanes: DAWLanes;
  markers: DAWMarker[];
  Notes: DAWNote[];
  Points: DAWPoints;
  Timeline: DAWTimeline;
  Video: DAWVideo;
  Warps: DAWWarp[];
}

export interface DAWAudio {
  File: DAWFileReference;
}

export interface DAWFileReference {
  $external: boolean;
  $path: string;
}

export interface DAWPoints {
  BoolPoint: DAWBoolPoint;
  EnumPoint: DAWEnumPoint;
  IntegerPoint: DAWIntegerPoint;
  Point: DAWPoint;
  RealPoint: DAWRealPoint;
  Target: DAWAutomationTarget;
  TimeSignaturePoint: DAWTimeSignaturePoint;
}

export interface DAWBoolPoint {
  $time: string;
}

export interface DAWEnumPoint {
  $time: string;
}

export interface DAWIntegerPoint {
  $time: string;
}

export interface DAWPoint {
  $time: string;
}

export interface DAWRealPoint {
  $time: string;
}

export interface DAWAutomationTarget {
  $channel: number;
  $controller: number;
  $expression: DAWExpressionType;
  $key: number;
  $parameter: string;
}

export enum DAWExpressionType {
  ChannelController = 'channelController',
  ChannelPressure = 'channelPressure',
  Formant = 'formant',
  Gain = 'gain',
  Pan = 'pan',
  PitchBend = 'pitchBend',
  PolyPressure = 'polyPressure',
  Pressure = 'pressure',
  ProgramChange = 'programChange',
  Timbre = 'timbre',
  Transpose = 'transpose',
}

export interface DAWTimeSignaturePoint {
  $time: string;
}

export interface DAWTimeline {}

export interface DAWVideo {
  File: DAWFileReference;
}

export interface DAWWarp {
  $contentTime: number;
  $time: number;
}

export interface DAWMarker {
  $color: string;
  $comment: string;
  $name: string;
}

export interface DAWScene {}

export interface DAWStructure {
  Channel: DAWChannel;
  Track: DAWTrack;
}

export interface DAWChannel {
  Devices?: DAWDevices;
  Mute?: DAWBoolParameter;
  Pan?: DAWRealParameter;
  Sends?: DAWSend[];
  Volume?: DAWRealParameter;
}

export interface DAWDevices {
  AuPlugin: DAWAuPlugin;
  BuiltinDevice: DAWBuiltinDevice;
  ClapPlugin: DAWClapPlugin;
  Compressor: DAWCompressor;
  Device: DAWDevice;
  Equalizer: DAWEqualizer;
  Limiter: DAWLimiter;
  NoiseGate: DAWNoiseGate;
  Vst2Plugin: DAWVst2Plugin;
  Vst3Plugin: DAWVst3Plugin;
}

export interface DAWAuPlugin {
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWBoolParameter {}

export interface DAWDAWParameters {
  BoolParameter: DAWBoolParameter;
  EnumParameter: DAWEnumParameter;
  IntegerParameter: DAWIntegerParameter;
  parameter: DAWParameter;
  RealParameter: DAWRealParameter;
  TimeSignatureParameter: DAWTimeSignatureParameter;
}

export interface DAWEnumParameter {}

export interface DAWIntegerParameter {}

export interface DAWRealParameter {}

export interface DAWTimeSignatureParameter {}

export interface DAWParameter {}

export interface DAWBuiltinDevice {
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWClapPlugin {
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWCompressor {
  Attack?: DAWRealParameter;
  AutoMakeup?: DAWBoolParameter;
  Enabled?: DAWBoolParameter;
  InputGain?: DAWRealParameter;
  OutputGain?: DAWRealParameter;
  Parameters?: DAWDAWParameters;
  Ratio?: DAWRealParameter;
  Release?: DAWRealParameter;
  State?: DAWFileReference;
  Threshold?: DAWRealParameter;
}

export interface DAWDevice {
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWEqualizer {
  Band?: DAWEqBand[];
  Enabled?: DAWBoolParameter;
  InputGain?: DAWRealParameter;
  OutputGain?: DAWRealParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWEqBand {
  $order: number;
  $type: DAWEqBandType;
  Enabled?: DAWBoolParameter;
  Freq: DAWRealParameter;
  Gain?: DAWRealParameter;
  Q?: DAWRealParameter;
}

export enum DAWEqBandType {
  BandPass = 'bandPass',
  Bell = 'bell',
  HighPass = 'highPass',
  HighShelf = 'highShelf',
  LowPass = 'lowPass',
  LowShelf = 'lowShelf',
  Notch = 'notch',
}

export interface DAWLimiter {
  Attack?: DAWRealParameter;
  Enabled?: DAWBoolParameter;
  InputGain?: DAWRealParameter;
  OutputGain?: DAWRealParameter;
  Parameters?: DAWDAWParameters;
  Release?: DAWRealParameter;
  State?: DAWFileReference;
  Threshold?: DAWRealParameter;
}

export interface DAWNoiseGate {
  Attack?: DAWRealParameter;
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  Range?: DAWRealParameter;
  Ratio?: DAWRealParameter;
  Release?: DAWRealParameter;
  State?: DAWFileReference;
  Threshold?: DAWRealParameter;
}

export interface DAWVst2Plugin {
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWVst3Plugin {
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWSend {
  Pan?: DAWRealParameter;
  Volume: DAWRealParameter;
}

export interface DAWTrack {
  Channel: DAWChannel;
  Track?: DAWTrack[];
}

export interface DAWTransport {
  Tempo?: DAWRealParameter;
  TimeSignature?: DAWTimeSignatureParameter;
}

export interface Project {}

export interface DAWNameable {
  $color: string;
  $comment: string;
  $name: string;
}

export interface DAWReferenceable {
  $color: string;
  $comment: string;
  $name: string;
}

export interface DAWLane {}

export interface DAWPlugin {
  Enabled?: DAWBoolParameter;
  Parameters?: DAWDAWParameters;
  State?: DAWFileReference;
}

export interface DAWMediaFile {
  File: DAWFileReference;
}

export enum DAWUnit {
  BPM = 'bpm',
  Beats = 'beats',
  Decibel = 'decibel',
  Hertz = 'hertz',
  Linear = 'linear',
  Normalized = 'normalized',
  Percent = 'percent',
  Seconds = 'seconds',
  Semitones = 'semitones',
}

export enum DAWTimeUnit {
  Beats = 'beats',
  Seconds = 'seconds',
}

export enum DAWDeviceRole {
  Analyzer = 'analyzer',
  AudioFX = 'audioFX',
  Instrument = 'instrument',
  NoteFX = 'noteFX',
}

export enum DAWMixerRole {
  Effect = 'effect',
  Master = 'master',
  Regular = 'regular',
  Submix = 'submix',
  Vca = 'vca',
}

export enum DAWSendType {
  Post = 'post',
  Pre = 'pre',
}

export enum DAWContentType {
  Audio = 'audio',
  Automation = 'automation',
  Markers = 'markers',
  Notes = 'notes',
  Tracks = 'tracks',
  Video = 'video',
}

export enum DAWInterpolation {
  Hold = 'hold',
  Linear = 'linear',
}

export interface Tools {
  clapinfo: string;
  pluginval: string;
  validator: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toPluginCategory(json: string): ConfigList {
    return cast(JSON.parse(json), r('ConfigList'));
  }

  public static pluginCategoryToJson(value: ConfigList): string {
    return JSON.stringify(uncast(value, r('ConfigList')), null, 2);
  }

  public static toPluginEntry(json: string): PluginPack {
    return cast(JSON.parse(json), r('PluginPack'));
  }

  public static pluginEntryToJson(value: PluginPack): string {
    return JSON.stringify(uncast(value, r('PluginPack')), null, 2);
  }

  public static toPluginFile(json: string): PluginFile {
    return cast(JSON.parse(json), r('PluginFile'));
  }

  public static pluginFileToJson(value: PluginFile): string {
    return JSON.stringify(uncast(value, r('PluginFile')), null, 2);
  }

  public static toPluginFiles(json: string): PluginFiles {
    return cast(JSON.parse(json), r('PluginFiles'));
  }

  public static pluginFilesToJson(value: PluginFiles): string {
    return JSON.stringify(uncast(value, r('PluginFiles')), null, 2);
  }

  public static toPluginLicense(json: string): PluginLicense {
    return cast(JSON.parse(json), r('PluginLicense'));
  }

  public static pluginLicenseToJson(value: PluginLicense): string {
    return JSON.stringify(uncast(value, r('PluginLicense')), null, 2);
  }

  public static toPluginPack(json: string): { [key: string]: PluginPack } {
    return cast(JSON.parse(json), m(r('PluginPack')));
  }

  public static pluginPackToJson(value: { [key: string]: PluginPack }): string {
    return JSON.stringify(uncast(value, m(r('PluginPack'))), null, 2);
  }

  public static toPluginRegistry(json: string): PluginRegistry {
    return cast(JSON.parse(json), r('PluginRegistry'));
  }

  public static pluginRegistryToJson(value: PluginRegistry): string {
    return JSON.stringify(uncast(value, r('PluginRegistry')), null, 2);
  }

  public static toPluginTemplate(json: string): PluginTemplate {
    return cast(JSON.parse(json), r('PluginTemplate'));
  }

  public static pluginTemplateToJson(value: PluginTemplate): string {
    return JSON.stringify(uncast(value, r('PluginTemplate')), null, 2);
  }

  public static toPluginType(json: string): PluginType {
    return cast(JSON.parse(json), r('PluginType'));
  }

  public static pluginTypeToJson(value: PluginType): string {
    return JSON.stringify(uncast(value, r('PluginType')), null, 2);
  }

  public static toPluginTypes(json: string): PluginTypes {
    return cast(JSON.parse(json), r('PluginTypes'));
  }

  public static pluginTypesToJson(value: PluginTypes): string {
    return JSON.stringify(uncast(value, r('PluginTypes')), null, 2);
  }

  public static toPluginValidationOptions(json: string): PluginValidationOptions {
    return cast(JSON.parse(json), r('PluginValidationOptions'));
  }

  public static pluginValidationOptionsToJson(value: PluginValidationOptions): string {
    return JSON.stringify(uncast(value, r('PluginValidationOptions')), null, 2);
  }

  public static toPluginVersion(json: string): PluginVersions {
    return cast(JSON.parse(json), r('PluginVersions'));
  }

  public static pluginVersionToJson(value: PluginVersions): string {
    return JSON.stringify(uncast(value, r('PluginVersions')), null, 2);
  }

  public static toPluginVersions(json: string): { [key: string]: PluginVersions } {
    return cast(JSON.parse(json), m(r('PluginVersions')));
  }

  public static pluginVersionsToJson(value: { [key: string]: PluginVersions }): string {
    return JSON.stringify(uncast(value, m(r('PluginVersions'))), null, 2);
  }

  public static toPluginVersionLocal(json: string): PluginVersionLocal {
    return cast(JSON.parse(json), r('PluginVersionLocal'));
  }

  public static pluginVersionLocalToJson(value: PluginVersionLocal): string {
    return JSON.stringify(uncast(value, r('PluginVersionLocal')), null, 2);
  }

  public static toProjectCategory(json: string): ProjectCategory {
    return cast(JSON.parse(json), r('ProjectCategory'));
  }

  public static projectCategoryToJson(value: ProjectCategory): string {
    return JSON.stringify(uncast(value, r('ProjectCategory')), null, 2);
  }

  public static toProjectEntry(json: string): ProjectPack {
    return cast(JSON.parse(json), r('ProjectPack'));
  }

  public static projectEntryToJson(value: ProjectPack): string {
    return JSON.stringify(uncast(value, r('ProjectPack')), null, 2);
  }

  public static toProjectFile(json: string): ProjectFile {
    return cast(JSON.parse(json), r('ProjectFile'));
  }

  public static projectFileToJson(value: ProjectFile): string {
    return JSON.stringify(uncast(value, r('ProjectFile')), null, 2);
  }

  public static toProjectFiles(json: string): ProjectFiles {
    return cast(JSON.parse(json), r('ProjectFiles'));
  }

  public static projectFilesToJson(value: ProjectFiles): string {
    return JSON.stringify(uncast(value, r('ProjectFiles')), null, 2);
  }

  public static toProjectInterface(json: string): ProjectInterface {
    return cast(JSON.parse(json), r('ProjectInterface'));
  }

  public static projectInterfaceToJson(value: ProjectInterface): string {
    return JSON.stringify(uncast(value, r('ProjectInterface')), null, 2);
  }

  public static toProjectLocal(json: string): ProjectLocal {
    return cast(JSON.parse(json), r('ProjectLocal'));
  }

  public static projectLocalToJson(value: ProjectLocal): string {
    return JSON.stringify(uncast(value, r('ProjectLocal')), null, 2);
  }

  public static toProjectPack(json: string): { [key: string]: ProjectPack } {
    return cast(JSON.parse(json), m(r('ProjectPack')));
  }

  public static projectPackToJson(value: { [key: string]: ProjectPack }): string {
    return JSON.stringify(uncast(value, m(r('ProjectPack'))), null, 2);
  }

  public static toProjectTemplate(json: string): ProjectTemplate {
    return cast(JSON.parse(json), r('ProjectTemplate'));
  }

  public static projectTemplateToJson(value: ProjectTemplate): string {
    return JSON.stringify(uncast(value, r('ProjectTemplate')), null, 2);
  }

  public static toProjectType(json: string): ProjectType {
    return cast(JSON.parse(json), r('ProjectType'));
  }

  public static projectTypeToJson(value: ProjectType): string {
    return JSON.stringify(uncast(value, r('ProjectType')), null, 2);
  }

  public static toProjectTypes(json: string): ProjectTypes {
    return cast(JSON.parse(json), r('ProjectTypes'));
  }

  public static projectTypesToJson(value: ProjectTypes): string {
    return JSON.stringify(uncast(value, r('ProjectTypes')), null, 2);
  }

  public static toConfigInterface(json: string): ConfigInterface {
    return cast(JSON.parse(json), r('ConfigInterface'));
  }

  public static configInterfaceToJson(value: ConfigInterface): string {
    return JSON.stringify(uncast(value, r('ConfigInterface')), null, 2);
  }

  public static toConfigList(json: string): { [key: string]: ConfigList } {
    return cast(JSON.parse(json), m(r('ConfigList')));
  }

  public static configListToJson(value: { [key: string]: ConfigList }): string {
    return JSON.stringify(uncast(value, m(r('ConfigList'))), null, 2);
  }

  public static toPlatformTypes(json: string): PlatformTypes {
    return cast(JSON.parse(json), r('PlatformTypes'));
  }

  public static platformTypesToJson(value: PlatformTypes): string {
    return JSON.stringify(uncast(value, r('PlatformTypes')), null, 2);
  }

  public static toPlatformsSupported(json: string): PlatformsSupported {
    return cast(JSON.parse(json), r('PlatformsSupported'));
  }

  public static platformsSupportedToJson(value: PlatformsSupported): string {
    return JSON.stringify(uncast(value, r('PlatformsSupported')), null, 2);
  }

  public static toDAWProject(json: string): DAWProject {
    return cast(JSON.parse(json), r('DAWProject'));
  }

  public static dAWProjectToJson(value: DAWProject): string {
    return JSON.stringify(uncast(value, r('DAWProject')), null, 2);
  }

  public static toProject(json: string): Project {
    return cast(JSON.parse(json), r('Project'));
  }

  public static projectToJson(value: Project): string {
    return JSON.stringify(uncast(value, r('Project')), null, 2);
  }

  public static toDAWStructure(json: string): DAWStructure {
    return cast(JSON.parse(json), r('DAWStructure'));
  }

  public static dAWStructureToJson(value: DAWStructure): string {
    return JSON.stringify(uncast(value, r('DAWStructure')), null, 2);
  }

  public static toDAWApplication(json: string): DAWApplication {
    return cast(JSON.parse(json), r('DAWApplication'));
  }

  public static dAWApplicationToJson(value: DAWApplication): string {
    return JSON.stringify(uncast(value, r('DAWApplication')), null, 2);
  }

  public static toDAWTransport(json: string): DAWTransport {
    return cast(JSON.parse(json), r('DAWTransport'));
  }

  public static dAWTransportToJson(value: DAWTransport): string {
    return JSON.stringify(uncast(value, r('DAWTransport')), null, 2);
  }

  public static toDAWNameable(json: string): DAWNameable {
    return cast(JSON.parse(json), r('DAWNameable'));
  }

  public static dAWNameableToJson(value: DAWNameable): string {
    return JSON.stringify(uncast(value, r('DAWNameable')), null, 2);
  }

  public static toDAWDevices(json: string): DAWDevices {
    return cast(JSON.parse(json), r('DAWDevices'));
  }

  public static dAWDevicesToJson(value: DAWDevices): string {
    return JSON.stringify(uncast(value, r('DAWDevices')), null, 2);
  }

  public static toDAWDAWParameters(json: string): DAWDAWParameters {
    return cast(JSON.parse(json), r('DAWDAWParameters'));
  }

  public static dAWDAWParametersToJson(value: DAWDAWParameters): string {
    return JSON.stringify(uncast(value, r('DAWDAWParameters')), null, 2);
  }

  public static toDAWFileReference(json: string): DAWFileReference {
    return cast(JSON.parse(json), r('DAWFileReference'));
  }

  public static dAWFileReferenceToJson(value: DAWFileReference): string {
    return JSON.stringify(uncast(value, r('DAWFileReference')), null, 2);
  }

  public static toDAWEqBand(json: string): DAWEqBand {
    return cast(JSON.parse(json), r('DAWEqBand'));
  }

  public static dAWEqBandToJson(value: DAWEqBand): string {
    return JSON.stringify(uncast(value, r('DAWEqBand')), null, 2);
  }

  public static toDAWNote(json: string): DAWNote {
    return cast(JSON.parse(json), r('DAWNote'));
  }

  public static dAWNoteToJson(value: DAWNote): string {
    return JSON.stringify(uncast(value, r('DAWNote')), null, 2);
  }

  public static toDAWWarp(json: string): DAWWarp {
    return cast(JSON.parse(json), r('DAWWarp'));
  }

  public static dAWWarpToJson(value: DAWWarp): string {
    return JSON.stringify(uncast(value, r('DAWWarp')), null, 2);
  }

  public static toDAWPoint(json: string): DAWPoint {
    return cast(JSON.parse(json), r('DAWPoint'));
  }

  public static dAWPointToJson(value: DAWPoint): string {
    return JSON.stringify(uncast(value, r('DAWPoint')), null, 2);
  }

  public static toDAWAutomationTarget(json: string): DAWAutomationTarget {
    return cast(JSON.parse(json), r('DAWAutomationTarget'));
  }

  public static dAWAutomationTargetToJson(value: DAWAutomationTarget): string {
    return JSON.stringify(uncast(value, r('DAWAutomationTarget')), null, 2);
  }

  public static toDAWScene(json: string): DAWScene {
    return cast(JSON.parse(json), r('DAWScene'));
  }

  public static dAWSceneToJson(value: DAWScene): string {
    return JSON.stringify(uncast(value, r('DAWScene')), null, 2);
  }

  public static toDAWReferenceable(json: string): DAWReferenceable {
    return cast(JSON.parse(json), r('DAWReferenceable'));
  }

  public static dAWReferenceableToJson(value: DAWReferenceable): string {
    return JSON.stringify(uncast(value, r('DAWReferenceable')), null, 2);
  }

  public static toDAWClip(json: string): DAWClip {
    return cast(JSON.parse(json), r('DAWClip'));
  }

  public static dAWClipToJson(value: DAWClip): string {
    return JSON.stringify(uncast(value, r('DAWClip')), null, 2);
  }

  public static toDAWMarker(json: string): DAWMarker {
    return cast(JSON.parse(json), r('DAWMarker'));
  }

  public static dAWMarkerToJson(value: DAWMarker): string {
    return JSON.stringify(uncast(value, r('DAWMarker')), null, 2);
  }

  public static toDAWRealPoint(json: string): DAWRealPoint {
    return cast(JSON.parse(json), r('DAWRealPoint'));
  }

  public static dAWRealPointToJson(value: DAWRealPoint): string {
    return JSON.stringify(uncast(value, r('DAWRealPoint')), null, 2);
  }

  public static toDAWEnumPoint(json: string): DAWEnumPoint {
    return cast(JSON.parse(json), r('DAWEnumPoint'));
  }

  public static dAWEnumPointToJson(value: DAWEnumPoint): string {
    return JSON.stringify(uncast(value, r('DAWEnumPoint')), null, 2);
  }

  public static toDAWBoolPoint(json: string): DAWBoolPoint {
    return cast(JSON.parse(json), r('DAWBoolPoint'));
  }

  public static dAWBoolPointToJson(value: DAWBoolPoint): string {
    return JSON.stringify(uncast(value, r('DAWBoolPoint')), null, 2);
  }

  public static toDAWIntegerPoint(json: string): DAWIntegerPoint {
    return cast(JSON.parse(json), r('DAWIntegerPoint'));
  }

  public static dAWIntegerPointToJson(value: DAWIntegerPoint): string {
    return JSON.stringify(uncast(value, r('DAWIntegerPoint')), null, 2);
  }

  public static toDAWTimeSignaturePoint(json: string): DAWTimeSignaturePoint {
    return cast(JSON.parse(json), r('DAWTimeSignaturePoint'));
  }

  public static dAWTimeSignaturePointToJson(value: DAWTimeSignaturePoint): string {
    return JSON.stringify(uncast(value, r('DAWTimeSignaturePoint')), null, 2);
  }

  public static toDAWParameter(json: string): DAWParameter {
    return cast(JSON.parse(json), r('DAWParameter'));
  }

  public static dAWParameterToJson(value: DAWParameter): string {
    return JSON.stringify(uncast(value, r('DAWParameter')), null, 2);
  }

  public static toDAWLane(json: string): DAWLane {
    return cast(JSON.parse(json), r('DAWLane'));
  }

  public static dAWLaneToJson(value: DAWLane): string {
    return JSON.stringify(uncast(value, r('DAWLane')), null, 2);
  }

  public static toDAWArrangement(json: string): DAWArrangement {
    return cast(JSON.parse(json), r('DAWArrangement'));
  }

  public static dAWArrangementToJson(value: DAWArrangement): string {
    return JSON.stringify(uncast(value, r('DAWArrangement')), null, 2);
  }

  public static toDAWTimeline(json: string): DAWTimeline {
    return cast(JSON.parse(json), r('DAWTimeline'));
  }

  public static dAWTimelineToJson(value: DAWTimeline): string {
    return JSON.stringify(uncast(value, r('DAWTimeline')), null, 2);
  }

  public static toDAWDevice(json: string): DAWDevice {
    return cast(JSON.parse(json), r('DAWDevice'));
  }

  public static dAWDeviceToJson(value: DAWDevice): string {
    return JSON.stringify(uncast(value, r('DAWDevice')), null, 2);
  }

  public static toDAWSend(json: string): DAWSend {
    return cast(JSON.parse(json), r('DAWSend'));
  }

  public static dAWSendToJson(value: DAWSend): string {
    return JSON.stringify(uncast(value, r('DAWSend')), null, 2);
  }

  public static toDAWRealParameter(json: string): DAWRealParameter {
    return cast(JSON.parse(json), r('DAWRealParameter'));
  }

  public static dAWRealParameterToJson(value: DAWRealParameter): string {
    return JSON.stringify(uncast(value, r('DAWRealParameter')), null, 2);
  }

  public static toDAWBoolParameter(json: string): DAWBoolParameter {
    return cast(JSON.parse(json), r('DAWBoolParameter'));
  }

  public static dAWBoolParameterToJson(value: DAWBoolParameter): string {
    return JSON.stringify(uncast(value, r('DAWBoolParameter')), null, 2);
  }

  public static toDAWIntegerParameter(json: string): DAWIntegerParameter {
    return cast(JSON.parse(json), r('DAWIntegerParameter'));
  }

  public static dAWIntegerParameterToJson(value: DAWIntegerParameter): string {
    return JSON.stringify(uncast(value, r('DAWIntegerParameter')), null, 2);
  }

  public static toDAWEnumParameter(json: string): DAWEnumParameter {
    return cast(JSON.parse(json), r('DAWEnumParameter'));
  }

  public static dAWEnumParameterToJson(value: DAWEnumParameter): string {
    return JSON.stringify(uncast(value, r('DAWEnumParameter')), null, 2);
  }

  public static toDAWTimeSignatureParameter(json: string): DAWTimeSignatureParameter {
    return cast(JSON.parse(json), r('DAWTimeSignatureParameter'));
  }

  public static dAWTimeSignatureParameterToJson(value: DAWTimeSignatureParameter): string {
    return JSON.stringify(uncast(value, r('DAWTimeSignatureParameter')), null, 2);
  }

  public static toDAWLanes(json: string): DAWLanes {
    return cast(JSON.parse(json), r('DAWLanes'));
  }

  public static dAWLanesToJson(value: DAWLanes): string {
    return JSON.stringify(uncast(value, r('DAWLanes')), null, 2);
  }

  public static toDAWTrack(json: string): DAWTrack {
    return cast(JSON.parse(json), r('DAWTrack'));
  }

  public static dAWTrackToJson(value: DAWTrack): string {
    return JSON.stringify(uncast(value, r('DAWTrack')), null, 2);
  }

  public static toDAWChannel(json: string): DAWChannel {
    return cast(JSON.parse(json), r('DAWChannel'));
  }

  public static dAWChannelToJson(value: DAWChannel): string {
    return JSON.stringify(uncast(value, r('DAWChannel')), null, 2);
  }

  public static toDAWPlugin(json: string): DAWPlugin {
    return cast(JSON.parse(json), r('DAWPlugin'));
  }

  public static dAWPluginToJson(value: DAWPlugin): string {
    return JSON.stringify(uncast(value, r('DAWPlugin')), null, 2);
  }

  public static toDAWBuiltinDevice(json: string): DAWBuiltinDevice {
    return cast(JSON.parse(json), r('DAWBuiltinDevice'));
  }

  public static dAWBuiltinDeviceToJson(value: DAWBuiltinDevice): string {
    return JSON.stringify(uncast(value, r('DAWBuiltinDevice')), null, 2);
  }

  public static toDAWClipSlot(json: string): DAWClipSlot {
    return cast(JSON.parse(json), r('DAWClipSlot'));
  }

  public static dAWClipSlotToJson(value: DAWClipSlot): string {
    return JSON.stringify(uncast(value, r('DAWClipSlot')), null, 2);
  }

  public static toDAWMediaFile(json: string): DAWMediaFile {
    return cast(JSON.parse(json), r('DAWMediaFile'));
  }

  public static dAWMediaFileToJson(value: DAWMediaFile): string {
    return JSON.stringify(uncast(value, r('DAWMediaFile')), null, 2);
  }

  public static toDAWPoints(json: string): DAWPoints {
    return cast(JSON.parse(json), r('DAWPoints'));
  }

  public static dAWPointsToJson(value: DAWPoints): string {
    return JSON.stringify(uncast(value, r('DAWPoints')), null, 2);
  }

  public static toDAWVst2Plugin(json: string): DAWVst2Plugin {
    return cast(JSON.parse(json), r('DAWVst2Plugin'));
  }

  public static dAWVst2PluginToJson(value: DAWVst2Plugin): string {
    return JSON.stringify(uncast(value, r('DAWVst2Plugin')), null, 2);
  }

  public static toDAWVst3Plugin(json: string): DAWVst3Plugin {
    return cast(JSON.parse(json), r('DAWVst3Plugin'));
  }

  public static dAWVst3PluginToJson(value: DAWVst3Plugin): string {
    return JSON.stringify(uncast(value, r('DAWVst3Plugin')), null, 2);
  }

  public static toDAWClapPlugin(json: string): DAWClapPlugin {
    return cast(JSON.parse(json), r('DAWClapPlugin'));
  }

  public static dAWClapPluginToJson(value: DAWClapPlugin): string {
    return JSON.stringify(uncast(value, r('DAWClapPlugin')), null, 2);
  }

  public static toDAWEqualizer(json: string): DAWEqualizer {
    return cast(JSON.parse(json), r('DAWEqualizer'));
  }

  public static dAWEqualizerToJson(value: DAWEqualizer): string {
    return JSON.stringify(uncast(value, r('DAWEqualizer')), null, 2);
  }

  public static toDAWCompressor(json: string): DAWCompressor {
    return cast(JSON.parse(json), r('DAWCompressor'));
  }

  public static dAWCompressorToJson(value: DAWCompressor): string {
    return JSON.stringify(uncast(value, r('DAWCompressor')), null, 2);
  }

  public static toDAWNoiseGate(json: string): DAWNoiseGate {
    return cast(JSON.parse(json), r('DAWNoiseGate'));
  }

  public static dAWNoiseGateToJson(value: DAWNoiseGate): string {
    return JSON.stringify(uncast(value, r('DAWNoiseGate')), null, 2);
  }

  public static toDAWLimiter(json: string): DAWLimiter {
    return cast(JSON.parse(json), r('DAWLimiter'));
  }

  public static dAWLimiterToJson(value: DAWLimiter): string {
    return JSON.stringify(uncast(value, r('DAWLimiter')), null, 2);
  }

  public static toDAWAuPlugin(json: string): DAWAuPlugin {
    return cast(JSON.parse(json), r('DAWAuPlugin'));
  }

  public static dAWAuPluginToJson(value: DAWAuPlugin): string {
    return JSON.stringify(uncast(value, r('DAWAuPlugin')), null, 2);
  }

  public static toDAWAudio(json: string): DAWAudio {
    return cast(JSON.parse(json), r('DAWAudio'));
  }

  public static dAWAudioToJson(value: DAWAudio): string {
    return JSON.stringify(uncast(value, r('DAWAudio')), null, 2);
  }

  public static toDAWVideo(json: string): DAWVideo {
    return cast(JSON.parse(json), r('DAWVideo'));
  }

  public static dAWVideoToJson(value: DAWVideo): string {
    return JSON.stringify(uncast(value, r('DAWVideo')), null, 2);
  }

  public static toDAWUnit(json: string): DAWUnit {
    return cast(JSON.parse(json), r('DAWUnit'));
  }

  public static dAWUnitToJson(value: DAWUnit): string {
    return JSON.stringify(uncast(value, r('DAWUnit')), null, 2);
  }

  public static toDAWTimeUnit(json: string): DAWTimeUnit {
    return cast(JSON.parse(json), r('DAWTimeUnit'));
  }

  public static dAWTimeUnitToJson(value: DAWTimeUnit): string {
    return JSON.stringify(uncast(value, r('DAWTimeUnit')), null, 2);
  }

  public static toDAWDeviceRole(json: string): DAWDeviceRole {
    return cast(JSON.parse(json), r('DAWDeviceRole'));
  }

  public static dAWDeviceRoleToJson(value: DAWDeviceRole): string {
    return JSON.stringify(uncast(value, r('DAWDeviceRole')), null, 2);
  }

  public static toDAWEqBandType(json: string): DAWEqBandType {
    return cast(JSON.parse(json), r('DAWEqBandType'));
  }

  public static dAWEqBandTypeToJson(value: DAWEqBandType): string {
    return JSON.stringify(uncast(value, r('DAWEqBandType')), null, 2);
  }

  public static toDAWMixerRole(json: string): DAWMixerRole {
    return cast(JSON.parse(json), r('DAWMixerRole'));
  }

  public static dAWMixerRoleToJson(value: DAWMixerRole): string {
    return JSON.stringify(uncast(value, r('DAWMixerRole')), null, 2);
  }

  public static toDAWSendType(json: string): DAWSendType {
    return cast(JSON.parse(json), r('DAWSendType'));
  }

  public static dAWSendTypeToJson(value: DAWSendType): string {
    return JSON.stringify(uncast(value, r('DAWSendType')), null, 2);
  }

  public static toDAWContentType(json: string): DAWContentType {
    return cast(JSON.parse(json), r('DAWContentType'));
  }

  public static dAWContentTypeToJson(value: DAWContentType): string {
    return JSON.stringify(uncast(value, r('DAWContentType')), null, 2);
  }

  public static toDAWInterpolation(json: string): DAWInterpolation {
    return cast(JSON.parse(json), r('DAWInterpolation'));
  }

  public static dAWInterpolationToJson(value: DAWInterpolation): string {
    return JSON.stringify(uncast(value, r('DAWInterpolation')), null, 2);
  }

  public static toDAWExpressionType(json: string): DAWExpressionType {
    return cast(JSON.parse(json), r('DAWExpressionType'));
  }

  public static dAWExpressionTypeToJson(value: DAWExpressionType): string {
    return JSON.stringify(uncast(value, r('DAWExpressionType')), null, 2);
  }

  public static toTools(json: string): Tools {
    return cast(JSON.parse(json), r('Tools'));
  }

  public static toolsToJson(value: Tools): string {
    return JSON.stringify(uncast(value, r('Tools')), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : '';
  const keyText = key ? ` for key "${key}"` : '';
  throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map(a => {
          return prettyTypeName(a);
        })
        .join(', ')}]`;
    }
  } else if (typeof typ === 'object' && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map(a => {
        return l(a);
      }),
      val,
      key,
      parent,
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l('array'), val, key, parent);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l('Date'), val, key, parent);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue(l(ref || 'object'), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === 'object' && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
        ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty('props')
          ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  PluginRegistry: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'objects', js: 'objects', typ: m(r('PluginPack')) },
      { json: 'url', js: 'url', typ: '' },
      { json: 'version', js: 'version', typ: '' },
    ],
    false,
  ),
  PluginPack: o(
    [
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'license', js: 'license', typ: u(undefined, '') },
      { json: 'version', js: 'version', typ: '' },
      { json: 'versions', js: 'versions', typ: m(r('PluginVersions')) },
    ],
    false,
  ),
  PluginVersions: o(
    [
      { json: 'author', js: 'author', typ: '' },
      { json: 'date', js: 'date', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'files', js: 'files', typ: r('PluginFiles') },
      { json: 'homepage', js: 'homepage', typ: '' },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'license', js: 'license', typ: u(r('PluginLicense'), '') },
      { json: 'name', js: 'name', typ: '' },
      { json: 'release', js: 'release', typ: u(undefined, '') },
      { json: 'repo', js: 'repo', typ: u(undefined, '') },
      { json: 'tags', js: 'tags', typ: a('') },
      { json: 'version', js: 'version', typ: u(undefined, '') },
    ],
    false,
  ),
  PluginFiles: o(
    [
      { json: 'audio', js: 'audio', typ: r('PluginFile') },
      { json: 'image', js: 'image', typ: r('PluginFile') },
      { json: 'linux', js: 'linux', typ: r('PluginFile') },
      { json: 'mac', js: 'mac', typ: r('PluginFile') },
      { json: 'win', js: 'win', typ: r('PluginFile') },
    ],
    false,
  ),
  PluginFile: o(
    [
      { json: 'size', js: 'size', typ: 3.14 },
      { json: 'url', js: 'url', typ: '' },
    ],
    false,
  ),
  PluginLicense: o(
    [
      { json: 'key', js: 'key', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'same', js: 'same', typ: true },
      { json: 'url', js: 'url', typ: '' },
    ],
    false,
  ),
  PluginTemplate: o(
    [
      { json: 'clap', js: 'clap', typ: '' },
      { json: 'dpf', js: 'dpf', typ: '' },
      { json: 'dplug', js: 'dplug', typ: '' },
      { json: 'iplug', js: 'iplug', typ: '' },
      { json: 'juce', js: 'juce', typ: '' },
      { json: 'sf2', js: 'sf2', typ: '' },
      { json: 'sfz', js: 'sfz', typ: '' },
      { json: 'steinberg', js: 'steinberg', typ: '' },
    ],
    false,
  ),
  PluginValidationOptions: o(
    [
      { json: 'files', js: 'files', typ: u(undefined, true) },
      { json: 'json', js: 'json', typ: u(undefined, true) },
      { json: 'summary', js: 'summary', typ: u(undefined, true) },
      { json: 'txt', js: 'txt', typ: u(undefined, true) },
      { json: 'zip', js: 'zip', typ: u(undefined, true) },
    ],
    false,
  ),
  PluginVersionLocal: o(
    [
      { json: 'author', js: 'author', typ: '' },
      { json: 'date', js: 'date', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'files', js: 'files', typ: r('PluginFiles') },
      { json: 'homepage', js: 'homepage', typ: '' },
      { json: 'id', js: 'id', typ: u(undefined, '') },
      { json: 'license', js: 'license', typ: u(r('PluginLicense'), '') },
      { json: 'name', js: 'name', typ: '' },
      { json: 'paths', js: 'paths', typ: a('') },
      { json: 'release', js: 'release', typ: u(undefined, '') },
      { json: 'repo', js: 'repo', typ: u(undefined, '') },
      { json: 'status', js: 'status', typ: '' },
      { json: 'tags', js: 'tags', typ: a('') },
      { json: 'version', js: 'version', typ: u(undefined, '') },
    ],
    false,
  ),
  ProjectCategory: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'tags', js: 'tags', typ: a('') },
    ],
    false,
  ),
  ProjectLocal: o(
    [
      { json: 'author', js: 'author', typ: '' },
      { json: 'date', js: 'date', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'files', js: 'files', typ: r('ProjectFiles') },
      { json: 'homepage', js: 'homepage', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'path', js: 'path', typ: '' },
      { json: 'plugins', js: 'plugins', typ: m('') },
      { json: 'repo', js: 'repo', typ: '' },
      { json: 'status', js: 'status', typ: '' },
      { json: 'tags', js: 'tags', typ: a('') },
      { json: 'type', js: 'type', typ: u(undefined, r('ProjectType')) },
      { json: 'version', js: 'version', typ: '' },
    ],
    false,
  ),
  ProjectFiles: o(
    [
      { json: 'audio', js: 'audio', typ: r('ProjectFile') },
      { json: 'image', js: 'image', typ: r('ProjectFile') },
      { json: 'project', js: 'project', typ: r('ProjectFile') },
    ],
    false,
  ),
  ProjectFile: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'size', js: 'size', typ: 3.14 },
    ],
    false,
  ),
  ProjectType: o(
    [
      { json: 'ext', js: 'ext', typ: '' },
      { json: 'name', js: 'name', typ: '' },
    ],
    false,
  ),
  ProjectPack: o(
    [
      { json: 'id', js: 'id', typ: '' },
      { json: 'license', js: 'license', typ: '' },
      { json: 'version', js: 'version', typ: '' },
      { json: 'versions', js: 'versions', typ: m(r('ProjectInterface')) },
    ],
    false,
  ),
  ProjectInterface: o(
    [
      { json: 'author', js: 'author', typ: '' },
      { json: 'date', js: 'date', typ: '' },
      { json: 'description', js: 'description', typ: '' },
      { json: 'files', js: 'files', typ: r('ProjectFiles') },
      { json: 'homepage', js: 'homepage', typ: '' },
      { json: 'id', js: 'id', typ: '' },
      { json: 'name', js: 'name', typ: '' },
      { json: 'plugins', js: 'plugins', typ: m('') },
      { json: 'repo', js: 'repo', typ: '' },
      { json: 'tags', js: 'tags', typ: a('') },
      { json: 'type', js: 'type', typ: u(undefined, r('ProjectType')) },
      { json: 'version', js: 'version', typ: '' },
    ],
    false,
  ),
  ProjectTemplate: o(
    [
      { json: 'ableton', js: 'ableton', typ: '' },
      { json: 'cubase', js: 'cubase', typ: '' },
      { json: 'dawproject', js: 'dawproject', typ: '' },
      { json: 'flStudio', js: 'flStudio', typ: '' },
      { json: 'logic', js: 'logic', typ: '' },
      { json: 'proTools', js: 'proTools', typ: '' },
      { json: 'reaper', js: 'reaper', typ: '' },
    ],
    false,
  ),
  ConfigInterface: o(
    [
      { json: 'appFolder', js: 'appFolder', typ: '' },
      { json: 'clapinfoUrl', js: 'clapinfoUrl', typ: '' },
      { json: 'extAudio', js: 'extAudio', typ: '' },
      { json: 'extFile', js: 'extFile', typ: '' },
      { json: 'extImage', js: 'extImage', typ: '' },
      { json: 'extZip', js: 'extZip', typ: '' },
      { json: 'ignoredFolders', js: 'ignoredFolders', typ: a('') },
      { json: 'licenses', js: 'licenses', typ: a(r('PluginLicense')) },
      { json: 'pluginEffectCategories', js: 'pluginEffectCategories', typ: m(r('ConfigList')) },
      { json: 'pluginFile', js: 'pluginFile', typ: '' },
      { json: 'pluginFolder', js: 'pluginFolder', typ: '' },
      { json: 'pluginInstrumentCategories', js: 'pluginInstrumentCategories', typ: m(r('ConfigList')) },
      { json: 'pluginRegistry', js: 'pluginRegistry', typ: '' },
      { json: 'pluginRelease', js: 'pluginRelease', typ: '' },
      { json: 'pluginTemplate', js: 'pluginTemplate', typ: '' },
      { json: 'pluginTypes', js: 'pluginTypes', typ: r('PluginTypes') },
      { json: 'pluginvalUrl', js: 'pluginvalUrl', typ: '' },
      { json: 'presetFolder', js: 'presetFolder', typ: '' },
      { json: 'projectFile', js: 'projectFile', typ: '' },
      { json: 'projectFolder', js: 'projectFolder', typ: '' },
      { json: 'projectRegistry', js: 'projectRegistry', typ: '' },
      { json: 'projectTypes', js: 'projectTypes', typ: r('ProjectTypes') },
      { json: 'validatorUrl', js: 'validatorUrl', typ: '' },
    ],
    false,
  ),
  ConfigList: o(
    [
      { json: 'name', js: 'name', typ: '' },
      { json: 'tags', js: 'tags', typ: a('') },
    ],
    false,
  ),
  PluginTypes: o(
    [
      { json: 'audioUnits', js: 'audioUnits', typ: r('PluginType') },
      { json: 'avidAudioExtension', js: 'avidAudioExtension', typ: r('PluginType') },
      { json: 'cleverAudioPlugin', js: 'cleverAudioPlugin', typ: r('PluginType') },
      { json: 'dynamicLinkLibrary', js: 'dynamicLinkLibrary', typ: r('PluginType') },
      { json: 'ladspaVersion2', js: 'ladspaVersion2', typ: r('PluginType') },
      { json: 'realtimeAudiosuite', js: 'realtimeAudiosuite', typ: r('PluginType') },
      { json: 'sf2', js: 'sf2', typ: r('PluginType') },
      { json: 'sfz', js: 'sfz', typ: r('PluginType') },
      { json: 'timeDivisionMultiplexing', js: 'timeDivisionMultiplexing', typ: r('PluginType') },
      { json: 'virtualStudioTechnology', js: 'virtualStudioTechnology', typ: r('PluginType') },
      { json: 'virtualStudioTechnology3', js: 'virtualStudioTechnology3', typ: r('PluginType') },
    ],
    false,
  ),
  PluginType: o(
    [
      { json: 'ext', js: 'ext', typ: '' },
      { json: 'name', js: 'name', typ: '' },
    ],
    false,
  ),
  ProjectTypes: o(
    [
      { json: 'ableton', js: 'ableton', typ: r('ProjectType') },
      { json: 'cubase', js: 'cubase', typ: r('ProjectType') },
      { json: 'dawproject', js: 'dawproject', typ: r('ProjectType') },
      { json: 'flStudio', js: 'flStudio', typ: r('ProjectType') },
      { json: 'logic', js: 'logic', typ: r('ProjectType') },
      { json: 'proTools', js: 'proTools', typ: r('ProjectType') },
      { json: 'reaper', js: 'reaper', typ: r('ProjectType') },
    ],
    false,
  ),
  PlatformTypes: o(
    [
      { json: 'aix', js: 'aix', typ: r('AIX') },
      { json: 'android', js: 'android', typ: r('AIX') },
      { json: 'cygwin', js: 'cygwin', typ: r('AIX') },
      { json: 'darwin', js: 'darwin', typ: r('AIX') },
      { json: 'freebsd', js: 'freebsd', typ: r('AIX') },
      { json: 'linux', js: 'linux', typ: r('AIX') },
      { json: 'netbsd', js: 'netbsd', typ: r('AIX') },
      { json: 'openbsd', js: 'openbsd', typ: r('AIX') },
      { json: 'sunos', js: 'sunos', typ: r('AIX') },
      { json: 'win32', js: 'win32', typ: r('AIX') },
      { json: 'win64', js: 'win64', typ: r('AIX') },
    ],
    false,
  ),
  PlatformsSupported: o(
    [
      { json: 'aix', js: 'aix', typ: '' },
      { json: 'android', js: 'android', typ: '' },
      { json: 'cygwin', js: 'cygwin', typ: '' },
      { json: 'darwin', js: 'darwin', typ: '' },
      { json: 'freebsd', js: 'freebsd', typ: '' },
      { json: 'linux', js: 'linux', typ: '' },
      { json: 'netbsd', js: 'netbsd', typ: '' },
      { json: 'openbsd', js: 'openbsd', typ: '' },
      { json: 'sunos', js: 'sunos', typ: '' },
      { json: 'win32', js: 'win32', typ: '' },
    ],
    false,
  ),
  DAWProject: o(
    [
      { json: '$version', js: '$version', typ: '' },
      { json: 'Application', js: 'Application', typ: r('DAWApplication') },
      { json: 'arrangement', js: 'arrangement', typ: r('DAWArrangement') },
      { json: 'Arrangement', js: 'Arrangement', typ: r('DAWArrangement') },
      { json: 'audio', js: 'audio', typ: r('DAWAudio') },
      { json: 'auPlugin', js: 'auPlugin', typ: r('DAWAuPlugin') },
      { json: 'boolParameter', js: 'boolParameter', typ: r('DAWBoolParameter') },
      { json: 'boolPoint', js: 'boolPoint', typ: r('DAWBoolPoint') },
      { json: 'builtinDevice', js: 'builtinDevice', typ: r('DAWBuiltinDevice') },
      { json: 'channel', js: 'channel', typ: r('DAWChannel') },
      { json: 'clapPlugin', js: 'clapPlugin', typ: r('DAWClapPlugin') },
      { json: 'clip', js: 'clip', typ: r('DAWClip') },
      { json: 'clips', js: 'clips', typ: a(r('DAWClip')) },
      { json: 'clipSlot', js: 'clipSlot', typ: r('DAWClipSlot') },
      { json: 'compressor', js: 'compressor', typ: r('DAWCompressor') },
      { json: 'device', js: 'device', typ: r('DAWDevice') },
      { json: 'enumParameter', js: 'enumParameter', typ: r('DAWEnumParameter') },
      { json: 'enumPoint', js: 'enumPoint', typ: r('DAWEnumPoint') },
      { json: 'equalizer', js: 'equalizer', typ: r('DAWEqualizer') },
      { json: 'integerParameter', js: 'integerParameter', typ: r('DAWIntegerParameter') },
      { json: 'integerPoint', js: 'integerPoint', typ: r('DAWIntegerPoint') },
      { json: 'lanes', js: 'lanes', typ: r('DAWLanes') },
      { json: 'limiter', js: 'limiter', typ: r('DAWLimiter') },
      { json: 'marker', js: 'marker', typ: r('DAWMarker') },
      { json: 'markers', js: 'markers', typ: a(r('DAWMarker')) },
      { json: 'noiseGate', js: 'noiseGate', typ: r('DAWNoiseGate') },
      { json: 'note', js: 'note', typ: r('DAWNote') },
      { json: 'notes', js: 'notes', typ: a(r('DAWNote')) },
      { json: 'parameter', js: 'parameter', typ: r('DAWParameter') },
      { json: 'point', js: 'point', typ: r('DAWPoint') },
      { json: 'points', js: 'points', typ: r('DAWPoints') },
      { json: 'project', js: 'project', typ: r('DAWProject') },
      { json: 'realParameter', js: 'realParameter', typ: r('DAWRealParameter') },
      { json: 'realPoint', js: 'realPoint', typ: r('DAWRealPoint') },
      { json: 'scene', js: 'scene', typ: r('DAWScene') },
      { json: 'Scenes', js: 'Scenes', typ: u(undefined, a(r('DAWScene'))) },
      { json: 'Structure', js: 'Structure', typ: u(undefined, r('DAWStructure')) },
      { json: 'timeline', js: 'timeline', typ: r('DAWTimeline') },
      { json: 'timeSignatureParameter', js: 'timeSignatureParameter', typ: r('DAWTimeSignatureParameter') },
      { json: 'timeSignaturePoint', js: 'timeSignaturePoint', typ: r('DAWTimeSignaturePoint') },
      { json: 'track', js: 'track', typ: r('DAWTrack') },
      { json: 'Transport', js: 'Transport', typ: u(undefined, r('DAWTransport')) },
      { json: 'video', js: 'video', typ: r('DAWVideo') },
      { json: 'vst2Plugin', js: 'vst2Plugin', typ: r('DAWVst2Plugin') },
      { json: 'vst3Plugin', js: 'vst3Plugin', typ: r('DAWVst3Plugin') },
      { json: 'warp', js: 'warp', typ: r('DAWWarp') },
      { json: 'warps', js: 'warps', typ: a(r('DAWWarp')) },
    ],
    false,
  ),
  DAWApplication: o(
    [
      { json: '$name', js: '$name', typ: '' },
      { json: '$version', js: '$version', typ: '' },
    ],
    false,
  ),
  DAWArrangement: o(
    [
      { json: 'Lanes', js: 'Lanes', typ: r('DAWLanes') },
      { json: 'Markers', js: 'Markers', typ: u(undefined, a(r('DAWMarker'))) },
      { json: 'TempoAutomation', js: 'TempoAutomation', typ: u(undefined, r('DAWPoints')) },
      { json: 'TimeSignatureAutomation', js: 'TimeSignatureAutomation', typ: u(undefined, r('DAWPoints')) },
    ],
    false,
  ),
  DAWNote: o(
    [
      { json: '$channel', js: '$channel', typ: 3.14 },
      { json: '$duration', js: '$duration', typ: '' },
      { json: '$key', js: '$key', typ: 3.14 },
      { json: '$rel', js: '$rel', typ: '' },
      { json: '$time', js: '$time', typ: '' },
      { json: '$vel', js: '$vel', typ: '' },
      { json: 'Audio', js: 'Audio', typ: r('DAWAudio') },
      { json: 'Clips', js: 'Clips', typ: a(r('DAWClip')) },
      { json: 'ClipSlot', js: 'ClipSlot', typ: r('DAWClipSlot') },
      { json: 'Lanes', js: 'Lanes', typ: r('DAWLanes') },
      { json: 'markers', js: 'markers', typ: a(r('DAWMarker')) },
      { json: 'Notes', js: 'Notes', typ: a(r('DAWNote')) },
      { json: 'Points', js: 'Points', typ: r('DAWPoints') },
      { json: 'Timeline', js: 'Timeline', typ: r('DAWTimeline') },
      { json: 'Video', js: 'Video', typ: r('DAWVideo') },
      { json: 'Warps', js: 'Warps', typ: a(r('DAWWarp')) },
    ],
    false,
  ),
  DAWClip: o(
    [
      { json: '$color', js: '$color', typ: '' },
      { json: '$comment', js: '$comment', typ: '' },
      { json: '$name', js: '$name', typ: '' },
      { json: 'Audio', js: 'Audio', typ: r('DAWAudio') },
      { json: 'Clips', js: 'Clips', typ: a(r('DAWClip')) },
      { json: 'ClipSlot', js: 'ClipSlot', typ: r('DAWClipSlot') },
      { json: 'Lanes', js: 'Lanes', typ: r('DAWLanes') },
      { json: 'markers', js: 'markers', typ: a(r('DAWMarker')) },
      { json: 'Notes', js: 'Notes', typ: a(r('DAWNote')) },
      { json: 'Points', js: 'Points', typ: r('DAWPoints') },
      { json: 'Timeline', js: 'Timeline', typ: r('DAWTimeline') },
      { json: 'Video', js: 'Video', typ: r('DAWVideo') },
      { json: 'Warps', js: 'Warps', typ: a(r('DAWWarp')) },
    ],
    false,
  ),
  DAWClipSlot: o([{ json: 'Clip', js: 'Clip', typ: r('DAWClip') }], false),
  DAWLanes: o(
    [
      { json: 'Audio', js: 'Audio', typ: r('DAWAudio') },
      { json: 'Clips', js: 'Clips', typ: a(r('DAWClip')) },
      { json: 'ClipSlot', js: 'ClipSlot', typ: r('DAWClipSlot') },
      { json: 'Lanes', js: 'Lanes', typ: r('DAWLanes') },
      { json: 'markers', js: 'markers', typ: a(r('DAWMarker')) },
      { json: 'Notes', js: 'Notes', typ: a(r('DAWNote')) },
      { json: 'Points', js: 'Points', typ: r('DAWPoints') },
      { json: 'Timeline', js: 'Timeline', typ: r('DAWTimeline') },
      { json: 'Video', js: 'Video', typ: r('DAWVideo') },
      { json: 'Warps', js: 'Warps', typ: a(r('DAWWarp')) },
    ],
    false,
  ),
  DAWAudio: o([{ json: 'File', js: 'File', typ: r('DAWFileReference') }], false),
  DAWFileReference: o(
    [
      { json: '$external', js: '$external', typ: true },
      { json: '$path', js: '$path', typ: '' },
    ],
    false,
  ),
  DAWPoints: o(
    [
      { json: 'BoolPoint', js: 'BoolPoint', typ: r('DAWBoolPoint') },
      { json: 'EnumPoint', js: 'EnumPoint', typ: r('DAWEnumPoint') },
      { json: 'IntegerPoint', js: 'IntegerPoint', typ: r('DAWIntegerPoint') },
      { json: 'Point', js: 'Point', typ: r('DAWPoint') },
      { json: 'RealPoint', js: 'RealPoint', typ: r('DAWRealPoint') },
      { json: 'Target', js: 'Target', typ: r('DAWAutomationTarget') },
      { json: 'TimeSignaturePoint', js: 'TimeSignaturePoint', typ: r('DAWTimeSignaturePoint') },
    ],
    false,
  ),
  DAWBoolPoint: o([{ json: '$time', js: '$time', typ: '' }], false),
  DAWEnumPoint: o([{ json: '$time', js: '$time', typ: '' }], false),
  DAWIntegerPoint: o([{ json: '$time', js: '$time', typ: '' }], false),
  DAWPoint: o([{ json: '$time', js: '$time', typ: '' }], false),
  DAWRealPoint: o([{ json: '$time', js: '$time', typ: '' }], false),
  DAWAutomationTarget: o(
    [
      { json: '$channel', js: '$channel', typ: 3.14 },
      { json: '$controller', js: '$controller', typ: 3.14 },
      { json: '$expression', js: '$expression', typ: r('DAWExpressionType') },
      { json: '$key', js: '$key', typ: 3.14 },
      { json: '$parameter', js: '$parameter', typ: '' },
    ],
    false,
  ),
  DAWTimeSignaturePoint: o([{ json: '$time', js: '$time', typ: '' }], false),
  DAWTimeline: o([], false),
  DAWVideo: o([{ json: 'File', js: 'File', typ: r('DAWFileReference') }], false),
  DAWWarp: o(
    [
      { json: '$contentTime', js: '$contentTime', typ: 3.14 },
      { json: '$time', js: '$time', typ: 3.14 },
    ],
    false,
  ),
  DAWMarker: o(
    [
      { json: '$color', js: '$color', typ: '' },
      { json: '$comment', js: '$comment', typ: '' },
      { json: '$name', js: '$name', typ: '' },
    ],
    false,
  ),
  DAWScene: o([], false),
  DAWStructure: o(
    [
      { json: 'Channel', js: 'Channel', typ: r('DAWChannel') },
      { json: 'Track', js: 'Track', typ: r('DAWTrack') },
    ],
    false,
  ),
  DAWChannel: o(
    [
      { json: 'Devices', js: 'Devices', typ: u(undefined, r('DAWDevices')) },
      { json: 'Mute', js: 'Mute', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Pan', js: 'Pan', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Sends', js: 'Sends', typ: u(undefined, a(r('DAWSend'))) },
      { json: 'Volume', js: 'Volume', typ: u(undefined, r('DAWRealParameter')) },
    ],
    false,
  ),
  DAWDevices: o(
    [
      { json: 'AuPlugin', js: 'AuPlugin', typ: r('DAWAuPlugin') },
      { json: 'BuiltinDevice', js: 'BuiltinDevice', typ: r('DAWBuiltinDevice') },
      { json: 'ClapPlugin', js: 'ClapPlugin', typ: r('DAWClapPlugin') },
      { json: 'Compressor', js: 'Compressor', typ: r('DAWCompressor') },
      { json: 'Device', js: 'Device', typ: r('DAWDevice') },
      { json: 'Equalizer', js: 'Equalizer', typ: r('DAWEqualizer') },
      { json: 'Limiter', js: 'Limiter', typ: r('DAWLimiter') },
      { json: 'NoiseGate', js: 'NoiseGate', typ: r('DAWNoiseGate') },
      { json: 'Vst2Plugin', js: 'Vst2Plugin', typ: r('DAWVst2Plugin') },
      { json: 'Vst3Plugin', js: 'Vst3Plugin', typ: r('DAWVst3Plugin') },
    ],
    false,
  ),
  DAWAuPlugin: o(
    [
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWBoolParameter: o([], false),
  DAWDAWParameters: o(
    [
      { json: 'BoolParameter', js: 'BoolParameter', typ: r('DAWBoolParameter') },
      { json: 'EnumParameter', js: 'EnumParameter', typ: r('DAWEnumParameter') },
      { json: 'IntegerParameter', js: 'IntegerParameter', typ: r('DAWIntegerParameter') },
      { json: 'parameter', js: 'parameter', typ: r('DAWParameter') },
      { json: 'RealParameter', js: 'RealParameter', typ: r('DAWRealParameter') },
      { json: 'TimeSignatureParameter', js: 'TimeSignatureParameter', typ: r('DAWTimeSignatureParameter') },
    ],
    false,
  ),
  DAWEnumParameter: o([], false),
  DAWIntegerParameter: o([], false),
  DAWRealParameter: o([], false),
  DAWTimeSignatureParameter: o([], false),
  DAWParameter: o([], false),
  DAWBuiltinDevice: o(
    [
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWClapPlugin: o(
    [
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWCompressor: o(
    [
      { json: 'Attack', js: 'Attack', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'AutoMakeup', js: 'AutoMakeup', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'InputGain', js: 'InputGain', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'OutputGain', js: 'OutputGain', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'Ratio', js: 'Ratio', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Release', js: 'Release', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
      { json: 'Threshold', js: 'Threshold', typ: u(undefined, r('DAWRealParameter')) },
    ],
    false,
  ),
  DAWDevice: o(
    [
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWEqualizer: o(
    [
      { json: 'Band', js: 'Band', typ: u(undefined, a(r('DAWEqBand'))) },
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'InputGain', js: 'InputGain', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'OutputGain', js: 'OutputGain', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWEqBand: o(
    [
      { json: '$order', js: '$order', typ: 3.14 },
      { json: '$type', js: '$type', typ: r('DAWEqBandType') },
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Freq', js: 'Freq', typ: r('DAWRealParameter') },
      { json: 'Gain', js: 'Gain', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Q', js: 'Q', typ: u(undefined, r('DAWRealParameter')) },
    ],
    false,
  ),
  DAWLimiter: o(
    [
      { json: 'Attack', js: 'Attack', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'InputGain', js: 'InputGain', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'OutputGain', js: 'OutputGain', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'Release', js: 'Release', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
      { json: 'Threshold', js: 'Threshold', typ: u(undefined, r('DAWRealParameter')) },
    ],
    false,
  ),
  DAWNoiseGate: o(
    [
      { json: 'Attack', js: 'Attack', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'Range', js: 'Range', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Ratio', js: 'Ratio', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Release', js: 'Release', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
      { json: 'Threshold', js: 'Threshold', typ: u(undefined, r('DAWRealParameter')) },
    ],
    false,
  ),
  DAWVst2Plugin: o(
    [
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWVst3Plugin: o(
    [
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWSend: o(
    [
      { json: 'Pan', js: 'Pan', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'Volume', js: 'Volume', typ: r('DAWRealParameter') },
    ],
    false,
  ),
  DAWTrack: o(
    [
      { json: 'Channel', js: 'Channel', typ: r('DAWChannel') },
      { json: 'Track', js: 'Track', typ: u(undefined, a(r('DAWTrack'))) },
    ],
    false,
  ),
  DAWTransport: o(
    [
      { json: 'Tempo', js: 'Tempo', typ: u(undefined, r('DAWRealParameter')) },
      { json: 'TimeSignature', js: 'TimeSignature', typ: u(undefined, r('DAWTimeSignatureParameter')) },
    ],
    false,
  ),
  Project: o([], false),
  DAWNameable: o(
    [
      { json: '$color', js: '$color', typ: '' },
      { json: '$comment', js: '$comment', typ: '' },
      { json: '$name', js: '$name', typ: '' },
    ],
    false,
  ),
  DAWReferenceable: o(
    [
      { json: '$color', js: '$color', typ: '' },
      { json: '$comment', js: '$comment', typ: '' },
      { json: '$name', js: '$name', typ: '' },
    ],
    false,
  ),
  DAWLane: o([], false),
  DAWPlugin: o(
    [
      { json: 'Enabled', js: 'Enabled', typ: u(undefined, r('DAWBoolParameter')) },
      { json: 'Parameters', js: 'Parameters', typ: u(undefined, r('DAWDAWParameters')) },
      { json: 'State', js: 'State', typ: u(undefined, r('DAWFileReference')) },
    ],
    false,
  ),
  DAWMediaFile: o([{ json: 'File', js: 'File', typ: r('DAWFileReference') }], false),
  Tools: o(
    [
      { json: 'clapinfo', js: 'clapinfo', typ: '' },
      { json: 'pluginval', js: 'pluginval', typ: '' },
      { json: 'validator', js: 'validator', typ: '' },
    ],
    false,
  ),
  AIX: ['audio', 'image', 'linux', 'mac', 'win'],
  DAWExpressionType: [
    'channelController',
    'channelPressure',
    'formant',
    'gain',
    'pan',
    'pitchBend',
    'polyPressure',
    'pressure',
    'programChange',
    'timbre',
    'transpose',
  ],
  DAWEqBandType: ['bandPass', 'bell', 'highPass', 'highShelf', 'lowPass', 'lowShelf', 'notch'],
  DAWUnit: ['bpm', 'beats', 'decibel', 'hertz', 'linear', 'normalized', 'percent', 'seconds', 'semitones'],
  DAWTimeUnit: ['beats', 'seconds'],
  DAWDeviceRole: ['analyzer', 'audioFX', 'instrument', 'noteFX'],
  DAWMixerRole: ['effect', 'master', 'regular', 'submix', 'vca'],
  DAWSendType: ['post', 'pre'],
  DAWContentType: ['audio', 'automation', 'markers', 'notes', 'tracks', 'video'],
  DAWInterpolation: ['hold', 'linear'],
};
