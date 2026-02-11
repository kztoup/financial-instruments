import { SortBy } from "../hooks/use-instrument-state/types";

export enum ActionTypes {
  SET_SORT = "SET_SORT",
}

export type InstrumentAction = {
  type: ActionTypes.SET_SORT;
  payload: SortBy;
};
