import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableContainer from "./TableContainer";
import useInstrumentState from "../hooks/use-instrument-state/useInstrumentState";
import { SortBy } from "../hooks/use-instrument-state/types";

jest.mock("../hooks/use-instrument-state/useInstrumentState");
jest.mock("./instrument-table/InstrumentTable", () => () => (
  <div data-testid="mock-instrument-table" />
));

const mockedUseInstrumentState = jest.mocked(useInstrumentState);

describe("TableContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading when loading is true", () => {
    mockedUseInstrumentState.mockReturnValue({
      sortedData: [],
      data: null,
      loading: true,
      error: null,
      sortBy: SortBy.ASSET_CLASS,
    });

    render(<TableContainer />);

    expect(screen.getByTestId("fetch-loading")).toBeInTheDocument();
  });

  it("shows error when error exists", () => {
    mockedUseInstrumentState.mockReturnValue({
      sortedData: [],
      data: null,
      loading: false,
      error: new Error("fail"),
      sortBy: SortBy.ASSET_CLASS,
    });

    render(<TableContainer />);

    expect(screen.getByTestId("fetch-error")).toBeInTheDocument();
  });

  it("renders InstrumentTable when not loading and no error", () => {
    mockedUseInstrumentState.mockReturnValue({
      sortedData: [],
      data: null,
      loading: false,
      error: null,
      sortBy: SortBy.ASSET_CLASS,
    });

    render(<TableContainer />);

    expect(screen.getByTestId("mock-instrument-table")).toBeInTheDocument();
  });
});
