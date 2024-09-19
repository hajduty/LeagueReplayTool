export enum KeybindChannels {
  MINIMIZE = "minimize",
  OPEN_VISIBILITY = "open-visibility",
  OPEN_ENVIRONMENT = "open-environment",
  OPEN_KEYBINDS = "open-keybinds",
  ADD_KEYFRAME = "add-keyframe",
  SET_KEYFRAME = "set-keyframe",
  DELETE_KEYFRAME = "delete-keyframe",
  PAUSE = "pause",
  REWIND = "rewind",
  APPLY_SEQUENCE = "apply-sequence",
  SPEED_UP = "speed-up",
  SPEED_DOWN = "speed-down",
}

export interface Keybind {
  channel: KeybindChannels;
  action: string;
  bind: string;
}

export type KeybindMap = Map<KeybindChannels, Keybind>;

export const defaultKeybinds: Keybind[] = [
  { channel: KeybindChannels.MINIMIZE, action: "Minimize Windows", bind: "Ctrl+Shift+M" },
  { channel: KeybindChannels.OPEN_VISIBILITY, action: "Open Visibility Window", bind: "Ctrl+Shift+V" },
  { channel: KeybindChannels.OPEN_ENVIRONMENT, action: "Open Environment Window", bind: "Ctrl+Shift+E" },
  { channel: KeybindChannels.OPEN_KEYBINDS, action: "Open Keybinds Window", bind: "Ctrl+Shift+K" },
  { channel: KeybindChannels.ADD_KEYFRAME, action: "Add Keyframe", bind: "Ctrl+A" },
  { channel: KeybindChannels.SET_KEYFRAME, action: "Set Keyframe", bind: "Ctrl+Shift+S" },
  { channel: KeybindChannels.DELETE_KEYFRAME, action: "Delete Keyframe", bind: "Ctrl+D" },
  { channel: KeybindChannels.PAUSE, action: "Pause", bind: "Shift+P" },
  { channel: KeybindChannels.REWIND, action: "Rewind", bind: "Shift+R" },
  { channel: KeybindChannels.APPLY_SEQUENCE, action: "Apply Sequence", bind: "Ctrl+Shift+A" },
  { channel: KeybindChannels.SPEED_UP, action: "Speed Up", bind: "Shift+U" },
  { channel: KeybindChannels.SPEED_DOWN, action: "Speed Down", bind: "Shift+D" },
];

export const defaultKeybindMap = new Map<KeybindChannels, Keybind>(
  defaultKeybinds.map((keybind) => [keybind.channel, keybind])
);
