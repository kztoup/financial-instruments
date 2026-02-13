import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import InstrumentTable from "./InstrumentTable";

import useInstrumentState from "../../hooks/use-instrument-state/useInstrumentState";
import useScroll from "../../hooks/useScroll";
import useVirtualization from "../../hooks/useVirtualization";

import { AssetClass, Instrument } from "../../api/types";
import { SortBy } from "../../hooks/use-instrument-state/types";
import { BUFFER, ROW_HEIGHT, TABLE_HEIGHT } from "./constants";

jest.mock("../../hooks/use-instrument-state/useInstrumentState");
jest.mock("../../hooks/useScroll");
jest.mock("../../hooks/useVirtualization");

jest.mock("../table-head/TableHead", () => () => (
  <thead data-testid="mock-table-head" />
));

jest.mock("../table-body/TableBody", () => () => (
  <tbody data-testid="mock-table-body" />
));

const mockedUseInstrumentState = jest.mocked(useInstrumentState);
const mockedUseScroll = jest.mocked(useScroll);
const mockedUseVirtualization = jest.mocked(useVirtualization);

describe("InstrumentTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const sampleData: Instrument[] = Array.from({ length: 100 }, (_, i) => ({
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

    mockedUseScroll.mockReturnValue({
      scrollTop: 0,
      onScroll: jest.fn(),
    });

    mockedUseVirtualization.mockReturnValue({
      startIndex: 0,
      endIndex: 20,
      topSpacerHeight: 0,
      bottomSpacerHeight: 80 * ROW_HEIGHT,
    });

    render(<InstrumentTable />);

    expect(screen.getByTestId("mock-table-head")).toBeInTheDocument();
    expect(screen.getByTestId("mock-table-body")).toBeInTheDocument();
  });

  it("calls onScroll when scroll event occurs", () => {
    const onScrollMock = jest.fn();
    mockState(sampleData);

    mockedUseScroll.mockReturnValue({
      scrollTop: 0,
      onScroll: onScrollMock,
    });

    mockedUseVirtualization.mockReturnValue({
      startIndex: 0,
      endIndex: 20,
      topSpacerHeight: 0,
      bottomSpacerHeight: 80 * ROW_HEIGHT,
    });

    const { container } = render(<InstrumentTable />);
    const wrapper = container.firstChild as HTMLElement;

    fireEvent.scroll(wrapper);

    expect(onScrollMock).toHaveBeenCalled();
  });

  it("calls useVirtualization with correct params", () => {
    mockState(sampleData);

    mockedUseScroll.mockReturnValue({
      scrollTop: 50,
      onScroll: jest.fn(),
    });

    mockedUseVirtualization.mockReturnValue({
      startIndex: 1,
      endIndex: 21,
      topSpacerHeight: ROW_HEIGHT,
      bottomSpacerHeight: (100 - 21) * ROW_HEIGHT,
    });

    render(<InstrumentTable />);

    expect(mockedUseVirtualization).toHaveBeenCalledWith({
      scrollTop: 50,
      rowHeight: ROW_HEIGHT,
      containerHeight: TABLE_HEIGHT,
      totalRows: sampleData.length,
      buffer: BUFFER,
    });
  });
});
