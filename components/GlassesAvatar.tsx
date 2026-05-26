"use client";

import { useEffect, useRef } from "react";
import { attachImuFocus } from "@/lib/imu-focus";
import { parseModel3Json, type MotionEntry } from "@/lib/model-parser";
import { resolveModelFromSearch } from "@/lib/models";

const VIEWPORT = 600;

declare global {
  interface Window {
    Live2DCubismCore?: unknown;
  }
}

function waitForCubismCore(timeoutMs = 15000): Promise<void> {
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
        reject(new Error("Live2DCubismCore failed to load"));
        return;
      }
      requestAnimationFrame(tick);
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

export default function GlassesAvatar() {
  const hostRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const hostEl = hostRef.current;
    if (!hostEl) return;

    let cancelled = false;

    async function init(host: HTMLDivElement): Promise<void> {
      await waitForCubismCore();

      const [{ Application }, { Live2DModel, MotionPriority }] = await Promise.all([
        import("pixi.js"),
        import("untitled-pixi-live2d-engine/cubism"),
      ]);

      if (cancelled) return;

      const modelInfo = resolveModelFromSearch(window.location.search);
      const modelUrl = new URL(modelInfo.modelUrl, window.location.origin).href;

      const app = new Application();
      await app.init({
        width: VIEWPORT,
        height: VIEWPORT,
        preference: "webgl",
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        backgroundAlpha: 0,
        antialias: true,
      });

      if (cancelled) {
        app.destroy(true);
        return;
      }

      host.appendChild(app.canvas);

      const model = await Live2DModel.from(modelUrl, {
        autoFocus: false,
        autoHitTest: false,
      });
      model.anchor.set(0.5);
      app.stage.addChild(model);

      const stopImuFocus = await attachImuFocus(model, { viewportSize: VIEWPORT });

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
        model.position.set(VIEWPORT / 2, VIEWPORT / 2);
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
          if (entry) {
            playMotion(entry);
          }
          scheduleRandomMotion();
        }, delayMs);
      };

      scheduleRandomMotion();

      cleanupRef.current = () => {
        if (motionTimer) clearTimeout(motionTimer);
        stopImuFocus();
        app.destroy(true, { children: true });
        host.replaceChildren();
      };
    }

    init(hostEl).catch((err) => {
      console.error(err);
      hostEl.innerHTML = `<pre style="color:#f88;font:12px monospace;padding:8px;white-space:pre-wrap">${String(err)}</pre>`;
    });

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="avatar-host"
      aria-hidden
    />
  );
}
