import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import HeaderCell from "./HeaderCell";
import { SortBy } from "../../hooks/use-instrument-state/types";
import useInstrumentState from "../../hooks/use-instrument-state/useInstrumentState";
import useInstrumentDispatch from "../../hooks/useInstrumentDispatch";

jest.mock("../../hooks/use-instrument-state/useInstrumentState");
jest.mock("../../hooks/useInstrumentDispatch");

const mockedUseInstrumentState = jest.mocked(useInstrumentState);
const mockedUseInstrumentDispatch = jest.mocked(useInstrumentDispatch);

const renderHeaderCell = (label: string, sortKey: SortBy) => {
  return render(
    <table>
      <thead>
        <tr>
          <HeaderCell label={label} sortKey={sortKey} />
        </tr>
      </thead>
    </table>,
  );
};

describe("HeaderCell", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockState = (sortBy: SortBy) => {
    mockedUseInstrumentState.mockReturnValue({
      sortedData: [],
      data: null,
      loading: false,
      error: null,
      sortBy,
    });
  };

  const mockDispatch = (setSort = jest.fn()) => {
    mockedUseInstrumentDispatch.mockReturnValue({
      dispatch: jest.fn(),
      setSort,
    });
  };

  it("renders label", () => {
    mockState(SortBy.ASSET_CLASS);
    mockDispatch();

    renderHeaderCell("Asset Class", SortBy.ASSET_CLASS);

    expect(screen.getByText("Asset Class")).toBeInTheDocument();
    expect(screen.getByTestId("header-asset-class")).toBeInTheDocument();
  });

  it("calls setSort when clicked", () => {
    const setSortMock = jest.fn();

    mockState(SortBy.PRICE);
    mockDispatch(setSortMock);

    renderHeaderCell("Price", SortBy.PRICE);

    fireEvent.click(screen.getByRole("button"));

    expect(setSortMock).toHaveBeenCalledWith(SortBy.PRICE);
  });

  it("shows arrow when active", () => {
    mockState(SortBy.TICKER);
    mockDispatch();

    renderHeaderCell("Ticker", SortBy.TICKER);

    expect(screen.getByTestId("header-ticker")).toHaveTextContent("▲");
  });

  it("does not show arrow when inactive", () => {
    mockState(SortBy.PRICE);
    mockDispatch();

    renderHeaderCell("Ticker", SortBy.TICKER);

    expect(screen.getByText("Ticker")).toBeInTheDocument();
    expect(screen.getByTestId("header-ticker")).not.toHaveTextContent("▲");
  });
});
