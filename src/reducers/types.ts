import { Instrument } from "../api/types";
import { SortBy } from "../hooks/use-instrument-state/types";

export type InstrumentInitialState = {
  data: Instrument[] | null;
  loading: boolean;
  error: Error | null;
  sortBy: SortBy;
};
