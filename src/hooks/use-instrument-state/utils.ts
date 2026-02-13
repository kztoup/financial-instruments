import { Instrument, AssetClass } from "../../api/types";
import { SortBy } from "./types";

export const assetClassOrder: Record<AssetClass, number> = {
  [AssetClass.Equities]: 1,
  [AssetClass.Macro]: 2,
  [AssetClass.Credit]: 3,
};

export const sortInstruments = (data: Instrument[], sortBy: SortBy) => {
  const sorted = [...data];

  if (sortBy === SortBy.ASSET_CLASS) {
    return sorted.sort(
      (a, b) =>
        (assetClassOrder?.[a.assetClass] ?? Infinity) -
        (assetClassOrder?.[b.assetClass] ?? Infinity),
    );
  }

  if (sortBy === SortBy.PRICE) {
    return sorted.sort((a, b) => (b.price ?? Infinity) - (a.price ?? Infinity));
  }

  if (sortBy === SortBy.TICKER) {
    return sorted.sort((a, b) =>
      (a.ticker ?? "").localeCompare(b.ticker ?? ""),
    );
  }

  return sorted;
};
