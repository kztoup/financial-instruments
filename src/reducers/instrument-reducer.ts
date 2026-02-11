import { SortBy } from "../hooks/use-instrument-state/types";
import { ActionTypes, InstrumentAction } from "../context/types";
import { InstrumentInitialState } from "./types";

/**
 * Initial state for the instrument reducer.
 *
 * @remarks
 * - `data`, `loading`, and `error` are provided by the async data hook.
 * - `sortBy` is used for UI sorting controls.
 */

export const instrumentInitialState: InstrumentInitialState = {
  data: [],
  loading: false,
  error: null,
  sortBy: SortBy.ASSET_CLASS,
};

/**
 * Reducer for instrument-related UI state.
 *
 * @param state - Current state
 * @param action - Action describing how to update the state
 * @returns New state
 */

export const instrumentReducer = (
  state: InstrumentInitialState,
  action: InstrumentAction,
): InstrumentInitialState => {
  switch (action.type) {
    case ActionTypes.SET_SORT:
      if (state.sortBy === action.payload) {
        return state;
      }
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};
