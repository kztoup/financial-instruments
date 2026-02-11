import { useContext, useMemo } from "react";
import { InstrumentState } from "../../context/instrument-context";
import { sortInstruments } from "./utils";

/**
 * Custom hook to read instrument state from context.
 *
 * @returns An object containing:
 * - All fields from `InstrumentState`
 * - `sortedData`: `data` sorted by `state.sortBy`
 */

const useInstrumentState = () => {
  const state = useContext(InstrumentState);
  if (!state)
    throw new Error(
      "useInstrumentState must be used within InstrumentsProvider",
    );

  const { data } = state;

  const sortedData = useMemo(() => {
    if (!data) {
      return [];
    }
    return sortInstruments(data, state.sortBy);
  }, [data, state.sortBy]);

  return { ...state, sortedData };
};

export default useInstrumentState;
