import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableHead from "./TableHead";

jest.mock("./HeaderCell", () => () => <th data-testid="mock-header-cell" />);

describe("TableHead", () => {
  it("renders three HeaderCell components", () => {
    render(<TableHead />);

    const headers = screen.getAllByTestId("mock-header-cell");
    expect(headers).toHaveLength(3);
  });
});
