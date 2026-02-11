import React from "react";
import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import { InstrumentDispatch } from "../context/instrument-context";
import useInstrumentDispatch from "./useInstrumentDispatch";
import { ActionTypes } from "../context/types";
import { SortBy } from "./use-instrument-state/types";

const mockDispatch = jest.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <InstrumentDispatch.Provider value={mockDispatch}>
    {children}
  </InstrumentDispatch.Provider>
);

describe("useInstrumentDispatch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns dispatch and setSort", () => {
    const { result } = renderHook(() => useInstrumentDispatch(), { wrapper });
    expect(result.current.dispatch).toBe(mockDispatch);
    expect(typeof result.current.setSort).toBe("function");
  });

  it("setSort dispatches correct action", () => {
    const { result } = renderHook(() => useInstrumentDispatch(), { wrapper });

    act(() => {
      result.current.setSort(SortBy.PRICE);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: ActionTypes.SET_SORT,
      payload: SortBy.PRICE,
    });
  });

  it("throws error when used outside provider", () => {
    expect(() => renderHook(() => useInstrumentDispatch())).toThrow(
      "useInstrumentDispatch must be used within InstrumentsProvider",
    );
  });
});
