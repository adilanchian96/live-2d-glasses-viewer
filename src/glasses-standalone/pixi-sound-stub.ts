/**
 * TomoView is visual-only. Stub @pixi/sound so the Live2D engine never opens AudioContext.
 */

export class WebAudioMedia {}

export const webaudio = { WebAudioMedia };

const noopSoundInstance = {
  media: {} as object,
  volume: 1,
  play: () => Promise.resolve(noopSoundInstance),
  pause: () => {},
  destroy: () => {},
};

export class Sound {
  media = {} as object;
  volume = 1;

  play() {
    return Promise.resolve(this);
  }

  pause() {}

  destroy() {}

  static from(options: {
    url?: string;
    loaded?: () => void;
  }): Sound {
    const instance = new Sound();
    queueMicrotask(() => {
      options.loaded?.();
    });
    return instance;
  }
}

export const sound = {
  disableAutoPause: true,
  add: () => noopSoundInstance,
  remove: () => {},
  removeAll: () => {},
  stopAll: () => {},
  pauseAll: () => {},
  resumeAll: () => {},
  togglePauseAll: () => {},
  exists: () => false,
  find: () => undefined,
  play: () => noopSoundInstance,
  stop: () => {},
  pause: () => {},
  resume: () => {},
  volume: () => {},
  speed: () => {},
  duration: () => 0,
  init: () => {},
  close: () => {},
};

export default sound;
