import { AssetClass } from "../../api/types";

export const rowColor = (assetClass: AssetClass) => {
  switch (assetClass) {
    case AssetClass.Equities:
      return "blue-row";
    case AssetClass.Credit:
      return "green-row";
    default:
      return "white-row";
  }
};
