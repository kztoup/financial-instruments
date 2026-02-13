import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableRow from "./TableRow";
import { AssetClass } from "../../api/types";
import styles from "./table-row.module.css";

const renderRow = (props: {
  ticker: string;
  price: number;
  assetClass: AssetClass;
  rowIndex: number;
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
    renderRow({
      ticker: "ALPHA",
      price: 100,
      assetClass: AssetClass.Equities,
      rowIndex: 0,
    });

    expect(screen.getByText("Equities")).toBeInTheDocument();
    expect(screen.getByText("ALPHA")).toBeInTheDocument();
    expect(screen.getByText("100.00")).toBeInTheDocument();
  });

  it("formats price to 2 decimal places (rounding)", () => {
    renderRow({
      ticker: "ALPHA",
      price: 1.235,
      assetClass: AssetClass.Equities,
      rowIndex: 0,
    });

    expect(screen.getByText("1.24")).toBeInTheDocument();
  });

  describe.each([
    [100, styles.priceBlue],
    [-50, styles.priceRed],
  ])("price styling", (price, expectedClass) => {
    it(`applies ${expectedClass} when price is ${price}`, () => {
      renderRow({
        ticker: "ALPHA",
        price,
        assetClass: AssetClass.Equities,
        rowIndex: 0,
      });

      const priceCell = screen.getByText(price.toFixed(2));
      expect(priceCell).toHaveClass(expectedClass);
    });
  });

  describe.each([
    [AssetClass.Equities, styles.equities],
    [AssetClass.Credit, styles.credit],
    [AssetClass.Macro, styles.macro],
  ])("row color styling", (assetClass, expectedClass) => {
    it(`applies ${expectedClass} for ${assetClass}`, () => {
      renderRow({
        ticker: "ALPHA",
        price: 100,
        assetClass,
        rowIndex: 0,
      });

      const row = screen.getByRole("row");
      expect(row).toHaveClass(styles.row);
      expect(row).toHaveClass(expectedClass);
    });
  });
});
