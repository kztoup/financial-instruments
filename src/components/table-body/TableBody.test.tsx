import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableBody from "./TableBody";
import { AssetClass, Instrument } from "../../api/types";

jest.mock("../table-row/TableRow", () => () => (
  <tr data-testid="mock-table-row" />
));

describe("TableBody", () => {
  const data: Instrument[] = [
    { ticker: "ALPHA", price: 10, assetClass: AssetClass.Equities },
    { ticker: "BETA", price: -10, assetClass: AssetClass.Credit },
    { ticker: "GAMMA", price: 5, assetClass: AssetClass.Macro },
  ];

  it("renders only visible rows based on startIndex/endIndex", () => {
    render(
      <table>
        <TableBody
          data={data}
          virtualization={{
            startIndex: 0,
            endIndex: 2,
            topSpacerHeight: 0,
            bottomSpacerHeight: 0,
          }}
        />
      </table>,
    );

    const rows = screen.getAllByTestId("mock-table-row");
    expect(rows).toHaveLength(2);
  });

  it("renders top spacer when topSpacerHeight > 0", () => {
    render(
      <table>
        <TableBody
          data={data}
          virtualization={{
            startIndex: 1,
            endIndex: 2,
            topSpacerHeight: 40,
            bottomSpacerHeight: 0,
          }}
        />
      </table>,
    );

    const spacer = screen.getByTestId("top-spacer");
    expect(spacer).toHaveStyle({ height: "40px" });
  });

  it("renders bottom spacer when bottomSpacerHeight > 0", () => {
    render(
      <table>
        <TableBody
          data={data}
          virtualization={{
            startIndex: 0,
            endIndex: 1,
            topSpacerHeight: 0,
            bottomSpacerHeight: 80,
          }}
        />
      </table>,
    );

    const spacer = screen.getByTestId("bottom-spacer");
    expect(spacer).toHaveStyle({ height: "80px" });
  });

  it("does not render spacer rows when heights are 0", () => {
    render(
      <table>
        <TableBody
          data={data}
          virtualization={{
            startIndex: 0,
            endIndex: 1,
            topSpacerHeight: 0,
            bottomSpacerHeight: 0,
          }}
        />
      </table>,
    );

    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });
});
