/**
 * Standalone glasses viewer (no React). Bundled to public/glasses-viewer.js
 * for Meta Ray-Ban Display WebView compatibility.
 */
import { Application, extensions } from "pixi.js";
import {
  Live2DModel,
  Live2DPlugin,
  MotionPriority,
} from "untitled-pixi-live2d-engine/cubism";

extensions.add(Live2DPlugin);
import { parseModel3Json, type MotionEntry } from "../../lib/model-parser";
import { resolveModelFromSearch } from "../../lib/models";

const VIEWPORT = 600;

declare global {
  interface Window {
    Live2DCubismCore?: unknown;
  }
}

function setStatus(message: string, isError = false): void {
  const el = document.getElementById("glasses-status");
  if (!el) return;
  el.textContent = message;
  el.classList.toggle("glasses-status--error", isError);
  el.classList.remove("glasses-status--hidden");
}

function hideStatus(): void {
  document.getElementById("glasses-status")?.classList.add("glasses-status--hidden");
}

/** glasses-boot.js loads Cubism before this module; brief wait for edge cases. */
function waitForCubismCore(timeoutMs = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Live2DCubismCore) {
      resolve();
      return;
    }
    const started = Date.now();
    const tick = (): void => {
      if (window.Live2DCubismCore) {
        resolve();
        return;
      }
      if (Date.now() - started > timeoutMs) {
        reject(new Error("Cubism core did not load"));
        return;
      }
      setTimeout(tick, 50);
    };
    tick();
  });
}

function pickRandomMotion(
  motionMap: Record<string, MotionEntry>,
): MotionEntry | null {
  const ids = Object.keys(motionMap);
  if (ids.length === 0) return null;
  const reactive = ids.filter((id) => id !== "Idle");
  const pool = reactive.length > 0 ? reactive : ids;
  const id = pool[Math.floor(Math.random() * pool.length)];
  return motionMap[id] ?? null;
}

function getRenderResolution(): number {
  // 2× backing store → sharper on waveguide / high-DPI WebViews (still displayed at 600×600 CSS)
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  return Math.min(Math.max(dpr, 2), 2);
}

async function createPixiApp(): Promise<Application> {
  const resolution = getRenderResolution();
  const base = {
    width: VIEWPORT,
    height: VIEWPORT,
    backgroundAlpha: 0,
    resolution,
    autoDensity: true,
    antialias: true,
  };

  for (const preference of ["webgl", "webgpu"] as const) {
    const app = new Application();
    try {
      await app.init({ ...base, preference });
      return app;
    } catch {
      app.destroy(true);
    }
  }

  const fallback = new Application();
  await fallback.init(base);
  return fallback;
}

async function main(): Promise<void> {
  const host = document.getElementById("avatar-host");
  if (!host) {
    setStatus("Missing viewer container", true);
    return;
  }

  setStatus("Loading TomoView…");

  await waitForCubismCore();
  setStatus("Starting graphics…");

  const app = await createPixiApp();
  host.appendChild(app.canvas);

  const modelInfo = resolveModelFromSearch(window.location.search);
  const modelUrl = new URL(modelInfo.modelUrl, window.location.origin).href;

  setStatus("Loading character…");
  const model = await Live2DModel.from(modelUrl, {
    autoFocus: false,
    autoHitTest: false,
  });
  model.anchor.set(0.5);
  app.stage.addChild(model);

  const modelJsonRes = await fetch(modelUrl);
  const modelJson = await modelJsonRes.json();
  const { motionMap } = parseModel3Json(modelJson);

  const fitModel = (): void => {
    const modelW = model.internalModel.width;
    const modelH = model.internalModel.height;
    const padding = 24;
    const maxW = VIEWPORT - padding;
    const maxH = VIEWPORT - padding;
    const scaleX = modelW > 0 ? maxW / modelW : 0.5;
    const scaleY = modelH > 0 ? maxH / modelH : 0.5;
    const scale = Math.min(scaleX, scaleY);
    model.scale.set(scale);
    // Whole-pixel center reduces soft edges when scaled
    model.position.set(
      Math.round(VIEWPORT / 2),
      Math.round(VIEWPORT / 2),
    );
  };

  await new Promise((r) => setTimeout(r, 100));
  fitModel();

  const playMotion = (entry: MotionEntry): void => {
    model.motion(entry.group, entry.index, MotionPriority.FORCE);
  };

  if (motionMap.Idle) {
    playMotion(motionMap.Idle);
  }

  let motionTimer: ReturnType<typeof setTimeout> | undefined;
  const scheduleRandomMotion = (): void => {
    const delayMs = 4000 + Math.random() * 8000;
    motionTimer = setTimeout(() => {
      const entry = pickRandomMotion(motionMap);
      if (entry) playMotion(entry);
      scheduleRandomMotion();
    }, delayMs);
  };
  scheduleRandomMotion();

  hideStatus();

  window.addEventListener("beforeunload", () => {
    if (motionTimer) clearTimeout(motionTimer);
    app.destroy(true, { children: true });
  });
}

main().catch((err) => {
  console.error(err);
  setStatus(
    err instanceof Error ? err.message : "TomoView failed to start",
    true,
  );
});
