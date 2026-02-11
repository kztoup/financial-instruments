import { rowColor } from "./utils";
import { AssetClass } from "../../api/types";

describe("rowColor", () => {
  it("returns blue-row for Equities", () => {
    expect(rowColor(AssetClass.Equities)).toBe("blue-row");
  });

  it("returns green-row for Credit", () => {
    expect(rowColor(AssetClass.Credit)).toBe("green-row");
  });

  it("returns white-row for Macro", () => {
    expect(rowColor(AssetClass.Macro)).toBe("white-row");
  });
});
