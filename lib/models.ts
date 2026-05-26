export interface GlassesModel {
  id: string;
  name: string;
  modelUrl: string;
}

/** Models served from /public/models (copied from openclaw-live2d). */
export const GLASSES_MODELS: GlassesModel[] = [
  {
    id: "mao",
    name: "Mao",
    modelUrl: "/models/mao/mao_pro.model3.json",
  },
  {
    id: "natori",
    name: "Natori",
    modelUrl: "/models/natori/natori_pro_t06.model3.json",
  },
];

export function resolveModelFromSearch(
  search: string,
  models = GLASSES_MODELS,
): GlassesModel {
  const id = new URLSearchParams(search).get("model");
  return models.find((m) => m.id === id) ?? models[0];
}
