import React, { FC, ReactNode, useMemo, useReducer } from "react";
import {
  InstrumentState,
  InstrumentDispatch,
} from "./context/instrument-context";
import {
  instrumentReducer,
  instrumentInitialState,
} from "./reducers/instrument-reducer";
import useAsyncData from "./hooks/useAsyncData";
import { Instrument } from "./api/types";
import { fetchInstruments } from "./api/instrument";

/**
 * Provides instrument state and dispatch to the component tree.
 * 
 * - `useAsyncData` handles the async lifecycle (loading, success, error).
 * - `useReducer` handles local UI state such as `sortBy`.
 * - The merged state is exposed through `InstrumentState` context.
 * - The dispatch function is exposed through `InstrumentDispatch` context.
 
 * @returns A context provider wrapping its children.
*/

const InstrumentProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, loading, error } = useAsyncData<Instrument[]>(fetchInstruments);
  const [state, dispatch] = useReducer(
    instrumentReducer,
    instrumentInitialState,
  );

  const memoizedState = useMemo(
    () => ({ ...state, data, loading, error }),
    [state, data, loading, error],
  );

  return (
    <InstrumentState.Provider value={{ ...memoizedState }}>
      <InstrumentDispatch.Provider value={dispatch}>
        {children}
      </InstrumentDispatch.Provider>
    </InstrumentState.Provider>
  );
};

export default InstrumentProvider;
