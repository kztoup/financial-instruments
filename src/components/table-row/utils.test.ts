import { AssetClass } from "../../api/types";
import { rowColor } from "./utils";

describe("rowColor mapping", () => {
  it("has a mapping for every AssetClass", () => {
    const assetClasses = Object.values(AssetClass) as AssetClass[];

    assetClasses.forEach((assetClass) => {
      expect(rowColor[assetClass]).toBeDefined();
      expect(rowColor[assetClass]).not.toBe("");
    });
  });

  it("mapping values are strings and stable", () => {
    expect(rowColor[AssetClass.Equities]).toBe("equities");
    expect(rowColor[AssetClass.Macro]).toBe("macro");
    expect(rowColor[AssetClass.Credit]).toBe("credit");
  });
});
