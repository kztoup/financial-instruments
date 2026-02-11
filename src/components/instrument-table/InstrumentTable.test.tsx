import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InstrumentTable from "./InstrumentTable";
import useInstrumentState from "../../hooks/use-instrument-state/useInstrumentState";
import useScroll from "../../hooks/useScroll";
import { AssetClass, Instrument } from "../../api/types";
import { SortBy } from "../..//hooks/use-instrument-state/types";

jest.mock("../../hooks/use-instrument-state/useInstrumentState");
jest.mock("../../hooks/useScroll");

jest.mock("../table-head/TableHead", () => () => (
  <div data-testid="mock-table-head" />
));

jest.mock("../table-body/TableBody", () => () => (
  <div data-testid="mock-table-body" />
));

const mockedUseInstrumentState = jest.mocked(useInstrumentState);
const mockedUseScroll = jest.mocked(useScroll);

describe("InstrumentTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sampleData = Array.from({ length: 100 }, (_, i) => ({
    ticker: `TICKER-${i}`,
    price: i,
    assetClass: AssetClass.Equities,
  }));

  const mockState = (sortedData: Instrument[]) => {
    mockedUseInstrumentState.mockReturnValue({
      sortedData,
      data: null,
      loading: false,
      error: null,
      sortBy: SortBy.ASSET_CLASS,
    });
  };

  it("renders head and body", () => {
    mockState(sampleData);
    mockedUseScroll.mockReturnValue({ scrollTop: 0, onScroll: jest.fn() });

    render(<InstrumentTable />);

    expect(screen.getByTestId("mock-table-head")).toBeInTheDocument();
    expect(screen.getByTestId("mock-table-body")).toBeInTheDocument();
  });

  it("calls onScroll when scroll event occurs", () => {
    const onScrollMock = jest.fn();
    mockState(sampleData);
    mockedUseScroll.mockReturnValue({ scrollTop: 0, onScroll: onScrollMock });

    const { container } = render(<InstrumentTable />);

    const wrapper = container.firstChild as HTMLElement;
    fireEvent.scroll(wrapper);

    expect(onScrollMock).toHaveBeenCalled();
  });
});
