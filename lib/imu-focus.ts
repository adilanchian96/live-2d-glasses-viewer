/** Minimal surface needed from Live2DModel for head/eye focus. */
export interface FocusTarget {
  focus(x: number, y: number, instant?: boolean): void;
}

export interface ImuFocusOptions {
  viewportSize?: number;
  /** Pixels of focus travel per degree of head tilt from baseline. */
  sensitivity?: { gamma: number; beta: number };
  /** Minimum ms between focus updates. */
  throttleMs?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Request motion/orientation access. On MRBD glasses runtime this often succeeds
 * without a gesture; iOS Safari may require a user tap first.
 */
export async function requestImuPermission(): Promise<boolean> {
  const orientationEvent = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
    requestPermission?: () => Promise<PermissionState>;
  };

  if (typeof orientationEvent.requestPermission === "function") {
    const state = await orientationEvent.requestPermission();
    return state === "granted";
  }

  return true;
}

/**
 * Drive Live2D focus (head/eyes) from DeviceOrientationEvent (glasses IMU).
 * Returns a cleanup function.
 */
export function startImuFocus(
  model: FocusTarget,
  options: ImuFocusOptions = {},
): () => void {
  const size = options.viewportSize ?? 600;
  const center = size / 2;
  const range = size * 0.35;
  const sens = options.sensitivity ?? { gamma: 2.8, beta: 2.2 };
  const throttleMs = options.throttleMs ?? 32;

  let baseline: { beta: number; gamma: number } | null = null;
  let lastUpdate = 0;

  const onOrientation = (e: DeviceOrientationEvent): void => {
    if (e.beta == null || e.gamma == null) return;

    if (!baseline) {
      baseline = { beta: e.beta, gamma: e.gamma };
      model.focus(center, center, true);
      return;
    }

    const now = performance.now();
    if (now - lastUpdate < throttleMs) return;
    lastUpdate = now;

    const dGamma = e.gamma - baseline.gamma;
    const dBeta = e.beta - baseline.beta;

    const x = center + clamp(dGamma * sens.gamma, -range, range);
    const y = center + clamp(dBeta * sens.beta, -range, range);

    model.focus(x, y);
  };

  window.addEventListener("deviceorientation", onOrientation);

  return () => {
    window.removeEventListener("deviceorientation", onOrientation);
  };
}

/**
 * Request permission (when required) and attach IMU → focus mapping.
 */
export async function attachImuFocus(
  model: FocusTarget,
  options?: ImuFocusOptions,
): Promise<() => void> {
  const granted = await requestImuPermission();
  if (!granted) {
    console.warn("[IMU] Orientation permission denied — avatar will not track head movement.");
    return () => {};
  }
  return startImuFocus(model, options);
}
