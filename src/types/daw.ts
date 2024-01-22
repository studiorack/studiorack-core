interface DAWProject {
  arrangement: DAWArrangement;
  auPlugin: DAWAuPlugin;
  audio: DAWAudio;
  boolParameter: DAWBoolParameter;
  boolPoint: DAWBoolPoint;
  builtinDevice: DAWBuiltinDevice;
  channel: DAWChannel;
  clapPlugin: DAWClapPlugin;
  clip: DAWClip;
  clipSlot: DAWClipSlot;
  clips: DAWClip[];
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
  noiseGate: DAWNoiseGate;
  note: DAWNote;
  notes: DAWNote[];
  point: DAWPoint;
  points: DAWPoints;
  project: DAWProject;
  realParameter: DAWRealParameter;
  realPoint: DAWRealPoint;
  scene: DAWScene;
  timeSignatureParameter: DAWTimeSignatureParameter;
  timeSignaturePoint: DAWTimeSignaturePoint;
  timeline: DAWTimeline;
  track: DAWTrack;
  video: DAWVideo;
  vst2Plugin: DAWVst2Plugin;
  vst3Plugin: DAWVst3Plugin;
  warp: DAWWarp;
  warps: DAWWarp[];
  markers: DAWMarker[];
  parameter: DAWParameter;
  Arrangement: DAWArrangement;
  Application: DAWApplication;
  Transport?: DAWTransport;
  Structure?: DAWStructure;
  Scenes?: DAWScene[];
  $version: string;
}

class Project {}

interface DAWStructure {
  Track: DAWTrack;
  Channel: DAWChannel;
}

interface DAWApplication {
  $name: string;
  $version: string;
}

interface DAWTransport {
  Tempo?: DAWRealParameter;
  TimeSignature?: DAWTimeSignatureParameter;
}

interface DAWNameable {
  $name: string;
  $color: string;
  $comment: string;
}

interface DAWDevices {
  Device: DAWDevice;
  Vst2Plugin: DAWVst2Plugin;
  Vst3Plugin: DAWVst3Plugin;
  ClapPlugin: DAWClapPlugin;
  BuiltinDevice: DAWBuiltinDevice;
  Equalizer: DAWEqualizer;
  Compressor: DAWCompressor;
  NoiseGate: DAWNoiseGate;
  Limiter: DAWLimiter;
  AuPlugin: DAWAuPlugin;
}

interface DAWDAWParameters {
  parameter: DAWParameter;
  RealParameter: DAWRealParameter;
  BoolParameter: DAWBoolParameter;
  IntegerParameter: DAWIntegerParameter;
  EnumParameter: DAWEnumParameter;
  TimeSignatureParameter: DAWTimeSignatureParameter;
}

interface DAWFileReference {
  $path: string;
  $external: boolean;
}

interface DAWEqBand {
  Freq: DAWRealParameter;
  Gain?: DAWRealParameter;
  Q?: DAWRealParameter;
  Enabled?: DAWBoolParameter;
  $type: DAWEqBandType;
  $order: number;
}

interface DAWNote {
  $time: string;
  $duration: string;
  $channel: number;
  $key: number;
  $vel: string;
  $rel: string;
  Timeline: DAWTimeline;
  Lanes: DAWLanes;
  Notes: DAWNote[];
  Clips: DAWClip[];
  ClipSlot: DAWClipSlot;
  markers: DAWMarker[];
  Warps: DAWWarp[];
  Audio: DAWAudio;
  Video: DAWVideo;
  Points: DAWPoints;
}

interface DAWWarp {
  $time: number;
  $contentTime: number;
}

interface DAWPoint {
  $time: string;
}

interface DAWAutomationTarget {
  $parameter: string;
  $expression: DAWExpressionType;
  $channel: number;
  $key: number;
  $controller: number;
}

interface DAWScene {}

interface DAWReferenceable extends DAWNameable {}

interface DAWClip extends DAWNameable {
  Timeline: DAWTimeline;
  Lanes: DAWLanes;
  Notes: DAWNote[];
  Clips: DAWClip[];
  ClipSlot: DAWClipSlot;
  markers: DAWMarker[];
  Warps: DAWWarp[];
  Audio: DAWAudio;
  Video: DAWVideo;
  Points: DAWPoints;
}

interface DAWMarker extends DAWNameable {}

interface DAWRealPoint extends DAWPoint {}

interface DAWEnumPoint extends DAWPoint {}

interface DAWBoolPoint extends DAWPoint {}

interface DAWIntegerPoint extends DAWPoint {}

interface DAWTimeSignaturePoint extends DAWPoint {}

interface DAWParameter {}

interface DAWLane {}

interface DAWArrangement {
  Lanes: DAWLanes;
  Markers?: DAWMarker[];
  TempoAutomation?: DAWPoints;
  TimeSignatureAutomation?: DAWPoints;
}

interface DAWTimeline {}

interface DAWDevice {
  Parameters?: DAWDAWParameters;
  Enabled?: DAWBoolParameter;
  State?: DAWFileReference;
}

interface DAWSend {
  Pan?: DAWRealParameter;
  Volume: DAWRealParameter;
}

interface DAWRealParameter extends DAWParameter {}

interface DAWBoolParameter extends DAWParameter {}

interface DAWIntegerParameter extends DAWParameter {}

interface DAWEnumParameter extends DAWParameter {}

interface DAWTimeSignatureParameter extends DAWParameter {}

interface DAWLanes extends DAWTimeline {
  Timeline: DAWTimeline;
  Lanes: DAWLanes;
  Notes: DAWNote[];
  Clips: DAWClip[];
  ClipSlot: DAWClipSlot;
  markers: DAWMarker[];
  Warps: DAWWarp[];
  Audio: DAWAudio;
  Video: DAWVideo;
  Points: DAWPoints;
}

interface DAWTrack extends DAWLane {
  Channel: DAWChannel;
  Track?: DAWTrack[];
}

interface DAWChannel extends DAWLane {
  Devices?: DAWDevices;
  Mute?: DAWBoolParameter;
  Pan?: DAWRealParameter;
  Sends?: DAWSend[];
  Volume?: DAWRealParameter;
}

interface DAWPlugin extends DAWDevice {}

interface DAWBuiltinDevice extends DAWDevice {}

interface DAWClipSlot extends DAWTimeline {
  Clip: DAWClip;
}

interface DAWMediaFile extends DAWTimeline {
  File: DAWFileReference;
}

interface DAWPoints extends DAWTimeline {
  Target: DAWAutomationTarget;
  Point: DAWPoint;
  RealPoint: DAWRealPoint;
  EnumPoint: DAWEnumPoint;
  BoolPoint: DAWBoolPoint;
  IntegerPoint: DAWIntegerPoint;
  TimeSignaturePoint: DAWTimeSignaturePoint;
}

interface DAWVst2Plugin extends DAWPlugin {}

interface DAWVst3Plugin extends DAWPlugin {}

interface DAWClapPlugin extends DAWPlugin {}

interface DAWEqualizer extends DAWBuiltinDevice {
  Band?: DAWEqBand[];
  InputGain?: DAWRealParameter;
  OutputGain?: DAWRealParameter;
}

interface DAWCompressor extends DAWBuiltinDevice {
  Attack?: DAWRealParameter;
  AutoMakeup?: DAWBoolParameter;
  InputGain?: DAWRealParameter;
  OutputGain?: DAWRealParameter;
  Ratio?: DAWRealParameter;
  Release?: DAWRealParameter;
  Threshold?: DAWRealParameter;
}

interface DAWNoiseGate extends DAWBuiltinDevice {
  Attack?: DAWRealParameter;
  Range?: DAWRealParameter;
  Ratio?: DAWRealParameter;
  Release?: DAWRealParameter;
  Threshold?: DAWRealParameter;
}

interface DAWLimiter extends DAWBuiltinDevice {
  Attack?: DAWRealParameter;
  InputGain?: DAWRealParameter;
  OutputGain?: DAWRealParameter;
  Release?: DAWRealParameter;
  Threshold?: DAWRealParameter;
}

interface DAWAuPlugin extends DAWPlugin {}

interface DAWAudio extends DAWMediaFile {}

interface DAWVideo extends DAWMediaFile {}

enum DAWUnit {
  linear = 'linear',
  normalized = 'normalized',
  percent = 'percent',
  decibel = 'decibel',
  hertz = 'hertz',
  semitones = 'semitones',
  seconds = 'seconds',
  beats = 'beats',
  bpm = 'bpm',
}

enum DAWTimeUnit {
  beats = 'beats',
  seconds = 'seconds',
}

enum DAWDeviceRole {
  instrument = 'instrument',
  noteFX = 'noteFX',
  audioFX = 'audioFX',
  analyzer = 'analyzer',
}

enum DAWEqBandType {
  highPass = 'highPass',
  lowPass = 'lowPass',
  bandPass = 'bandPass',
  highShelf = 'highShelf',
  lowShelf = 'lowShelf',
  bell = 'bell',
  notch = 'notch',
}

enum DAWMixerRole {
  regular = 'regular',
  master = 'master',
  effect = 'effect',
  submix = 'submix',
  vca = 'vca',
}

enum DAWSendType {
  pre = 'pre',
  post = 'post',
}

enum DAWContentType {
  audio = 'audio',
  automation = 'automation',
  notes = 'notes',
  video = 'video',
  markers = 'markers',
  tracks = 'tracks',
}

enum DAWInterpolation {
  hold = 'hold',
  linear = 'linear',
}

enum DAWExpressionType {
  gain = 'gain',
  pan = 'pan',
  transpose = 'transpose',
  timbre = 'timbre',
  formant = 'formant',
  pressure = 'pressure',
  channelController = 'channelController',
  channelPressure = 'channelPressure',
  polyPressure = 'polyPressure',
  pitchBend = 'pitchBend',
  programChange = 'programChange',
}

export {
  DAWApplication,
  DAWArrangement,
  DAWAuPlugin,
  DAWAudio,
  DAWAutomationTarget,
  DAWBoolParameter,
  DAWBoolPoint,
  DAWBuiltinDevice,
  DAWChannel,
  DAWClapPlugin,
  DAWClip,
  DAWClipSlot,
  DAWCompressor,
  DAWContentType,
  DAWDAWParameters,
  DAWDevice,
  DAWDeviceRole,
  DAWDevices,
  DAWEnumParameter,
  DAWEnumPoint,
  DAWEqBand,
  DAWEqBandType,
  DAWEqualizer,
  DAWExpressionType,
  DAWFileReference,
  DAWIntegerParameter,
  DAWIntegerPoint,
  DAWInterpolation,
  DAWLane,
  DAWLanes,
  DAWLimiter,
  DAWMarker,
  DAWMediaFile,
  DAWMixerRole,
  DAWNameable,
  DAWNoiseGate,
  DAWNote,
  DAWParameter,
  DAWPlugin,
  DAWPoint,
  DAWPoints,
  DAWProject,
  DAWRealParameter,
  DAWRealPoint,
  DAWReferenceable,
  DAWScene,
  DAWSend,
  DAWSendType,
  DAWStructure,
  DAWTimeSignatureParameter,
  DAWTimeSignaturePoint,
  DAWTimeUnit,
  DAWTimeline,
  DAWTrack,
  DAWTransport,
  DAWUnit,
  DAWVideo,
  DAWVst2Plugin,
  DAWVst3Plugin,
  DAWWarp,
};
