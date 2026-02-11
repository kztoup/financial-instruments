import { Dispatch, createContext } from "react";
import { InstrumentInitialState } from "../reducers/types";
import { InstrumentAction } from "./types";

export const InstrumentState = createContext<
  InstrumentInitialState | undefined
>(undefined);
export const InstrumentDispatch = createContext<
  Dispatch<InstrumentAction> | undefined
>(undefined);
