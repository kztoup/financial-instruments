import { AssetClass } from "../../api/types";

export const rowColor: Record<AssetClass, string> = {
  [AssetClass.Equities]: "equities",
  [AssetClass.Macro]: "macro",
  [AssetClass.Credit]: "credit",
};
