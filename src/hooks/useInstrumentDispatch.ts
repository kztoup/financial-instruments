import { useContext, useCallback } from "react";
import { InstrumentDispatch } from "../context/instrument-context";
import { SortBy } from "./use-instrument-state/types";
import { ActionTypes } from "../context/types";

/**
 * Custom hook that exposes the dispatch function from `InstrumentDispatch`.
 *
 * @returns An object containing `dispatch` and `setSort`.
 * - `dispatch`: the raw reducer dispatch
 * - `setSort`: a convenience method that dispatches a `SET_SORT` action
 */

const useInstrumentDispatch = () => {
  const dispatch = useContext(InstrumentDispatch);
  if (!dispatch) {
    throw new Error(
      "useInstrumentDispatch must be used within InstrumentsProvider",
    );
  }

  const setSort = useCallback(
    (key: SortBy) => dispatch({ type: ActionTypes.SET_SORT, payload: key }),
    [dispatch],
  );

  return { dispatch, setSort };
};

export default useInstrumentDispatch;
