/**
 * Pure parser for Live2D model3.json. Safe for both Node and browser.
 */

export interface MotionEntry {
  group: string;
  index: number;
}

export interface ParsedModel {
  expressions: string[];
  motionMap: Record<string, MotionEntry>;
}

interface Model3Json {
  FileReferences?: {
    Expressions?: Array<{ Name: string; File?: string }>;
    Motions?: Record<string, Array<{ File: string; Name?: string }>>;
  };
}

function motionIdFromPath(filePath: string): string {
  const parts = filePath.split(/[/\\]/);
  const basename = parts[parts.length - 1] ?? "";
  return basename.replace(/\.motion3\.json$/i, "") || basename;
}

export function parseModel3Json(json: unknown): ParsedModel {
  const obj = json as Model3Json;
  const expressions: string[] = [];
  const motionMap: Record<string, MotionEntry> = {};

  const expList = obj?.FileReferences?.Expressions;
  if (Array.isArray(expList)) {
    for (const e of expList) {
      if (e?.Name) {
        expressions.push(e.Name);
      }
    }
  }

  const motions = obj?.FileReferences?.Motions;
  if (motions && typeof motions === "object") {
    for (const [groupName, files] of Object.entries(motions)) {
      if (!Array.isArray(files)) continue;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = file?.File;
        if (typeof filePath !== "string") continue;
        const motionId =
          file.Name && file.Name.trim() ? file.Name : motionIdFromPath(filePath);
        motionMap[motionId] = { group: groupName, index: i };
      }
      if (groupName === "Idle" && files.length > 0) {
        motionMap["Idle"] = { group: "Idle", index: 0 };
      }
    }
  }

  return { expressions, motionMap };
}
