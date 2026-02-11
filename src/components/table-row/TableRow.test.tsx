import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableRow from "./TableRow";
import { AssetClass } from "../../api/types";

const renderRow = (props: {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}) =>
  render(
    <table>
      <tbody>
        <TableRow {...props} />
      </tbody>
    </table>,
  );

describe("TableRow", () => {
  it("renders asset class, price and ticker", () => {
    renderRow({ ticker: "ALPHA", price: 100, assetClass: AssetClass.Equities });

    expect(screen.getByText("Equities")).toBeInTheDocument();
    expect(screen.getByText("ALPHA")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();
  });

  it("formats price to 2 decimal places (rounding)", () => {
    renderRow({
      ticker: "ALPHA",
      price: 1.235,
      assetClass: AssetClass.Equities,
    });

    expect(screen.getByText("1.24")).toBeInTheDocument();
  });

  describe.each([
    [100, "price-blue"],
    [-50, "price-red"],
  ])("price styling", (price, expectedClass) => {
    it(`applies ${expectedClass} when price is ${price}`, () => {
      renderRow({
        ticker: "ALPHA",
        price,
        assetClass: AssetClass.Equities,
      });

      const priceCell = screen.getByText(price.toFixed(2));
      expect(priceCell).toHaveClass(expectedClass);
    });
  });

  describe.each([
    [AssetClass.Equities, "blue-row"],
    [AssetClass.Credit, "green-row"],
    [AssetClass.Macro, "white-row"],
  ])("row color styling", (assetClass, expectedClass) => {
    it(`applies ${expectedClass} for ${assetClass}`, () => {
      renderRow({
        ticker: "ALPHA",
        price: 100,
        assetClass,
      });

      const row = screen.getByRole("row");
      expect(row).toHaveClass(expectedClass);
    });
  });
});
