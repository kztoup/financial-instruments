import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableBody from "./TableBody";
import { AssetClass, Instrument } from "../../api/types";

jest.mock("../table-row/TableRow", () => () => (
  <tr data-testid="mock-table-row" />
));

describe("TableBody", () => {
  const visibleRows: Instrument[] = [
    { ticker: "ALPHA", price: 10, assetClass: AssetClass.Equities },
    { ticker: "BETA", price: -10, assetClass: AssetClass.Credit },
  ];

  it("renders correct height", () => {
    render(
      <TableBody
        height={200}
        virtualization={{ translateY: 0, visibleRows }}
      />,
    );

    const wrapper = screen.getByTestId("table-body-wrapper");
    expect(wrapper).toHaveStyle({ height: "200px" });
  });

  it("applies translateY correctly", () => {
    render(
      <TableBody
        height={200}
        virtualization={{ translateY: 50, visibleRows }}
      />,
    );

    const tbody = screen.getByTestId("table-body-tbody");
    expect(tbody).toHaveStyle({ transform: "translateY(50px)" });
  });

  it("renders visible rows", () => {
    render(
      <TableBody
        height={200}
        virtualization={{ translateY: 0, visibleRows }}
      />,
    );

    const headers = screen.getAllByTestId("mock-table-row");
    expect(headers).toHaveLength(2);
  });
});
