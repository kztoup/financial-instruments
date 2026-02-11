import React from "react";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import useInstrumentState from "./useInstrumentState";
import { InstrumentState } from "../../context/instrument-context";
import { sortInstruments } from "./utils";
import { InstrumentInitialState } from "../../reducers/types";
import { AssetClass, Instrument } from "../../api/types";
import { SortBy } from "./types";
jest.mock("./utils", () => ({
  sortInstruments: jest.fn(),
}));

const sampleData: Instrument[] = [
  { ticker: "ALPHA", price: 3150.67, assetClass: AssetClass.Credit },
  { ticker: "BETA", price: 3791.37, assetClass: AssetClass.Equities },
];

let stateRef: { current: InstrumentInitialState };

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <InstrumentState.Provider value={stateRef.current}>
    {children}
  </InstrumentState.Provider>
);

const makeState = (partial?: Partial<InstrumentInitialState>) => {
  return {
    data: sampleData,
    sortBy: SortBy.TICKER,
    loading: false,
    error: null,
    ...partial,
  } satisfies InstrumentInitialState;
};

describe("useInstrumentState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("throws error if used outside InstrumentsProvider", () => {
    expect(() => {
      renderHook(() => useInstrumentState());
    }).toThrow("useInstrumentState must be used within InstrumentsProvider");
  });

  it("returns sortedData using sortInstruments", () => {
    (sortInstruments as jest.Mock).mockReturnValue(sampleData);

    stateRef = { current: makeState({ sortBy: SortBy.PRICE }) };

    const { result } = renderHook(() => useInstrumentState(), {
      wrapper: Wrapper,
    });

    expect(sortInstruments).toHaveBeenCalledWith(sampleData, SortBy.PRICE);
    expect(result.current.sortedData).toEqual(sampleData);
  });

  it("returns empty array when data is null", () => {
    stateRef = { current: makeState({ data: null }) };

    const { result } = renderHook(() => useInstrumentState(), {
      wrapper: Wrapper,
    });

    expect(result.current.sortedData).toEqual([]);
    expect(sortInstruments).not.toHaveBeenCalled();
  });

  it("re-sorts data when sortBy changes", () => {
    (sortInstruments as jest.Mock).mockImplementation((data) => data);

    stateRef = { current: makeState({ sortBy: SortBy.TICKER }) };

    const { rerender } = renderHook(() => useInstrumentState(), {
      wrapper: Wrapper,
    });

    stateRef.current = {
      ...stateRef.current,
      sortBy: SortBy.ASSET_CLASS,
    };

    rerender();

    expect(sortInstruments).toHaveBeenCalledTimes(2);
    expect(sortInstruments).toHaveBeenLastCalledWith(
      sampleData,
      SortBy.ASSET_CLASS,
    );
  });
});
