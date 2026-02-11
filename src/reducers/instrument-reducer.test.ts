import {
  instrumentReducer,
  instrumentInitialState,
} from "./instrument-reducer";
import { ActionTypes } from "../context/types";
import { SortBy } from "../hooks/use-instrument-state/types";

describe("instrumentReducer", () => {
  describe("SET_SORT", () => {
    it("returns the same state object if sortBy is unchanged", () => {
      const state = {
        ...instrumentInitialState,
        sortBy: SortBy.ASSET_CLASS,
      };

      const action = {
        type: ActionTypes.SET_SORT,
        payload: SortBy.ASSET_CLASS,
      };

      const result = instrumentReducer(state, action);

      expect(result).toBe(state);
    });

    it("returns new state object when sortBy changes", () => {
      const state = {
        ...instrumentInitialState,
        sortBy: SortBy.ASSET_CLASS,
      };

      const action = {
        type: ActionTypes.SET_SORT,
        payload: SortBy.PRICE,
      };

      const result = instrumentReducer(state, action);

      expect(result).not.toBe(state);
      expect(result.sortBy).toBe(SortBy.PRICE);

      expect(result.data).toBe(state.data);
      expect(result.loading).toBe(state.loading);
      expect(result.error).toBe(state.error);
    });
  });

  describe("unknown action", () => {
    it("returns current state for unknown action type", () => {
      const state = { ...instrumentInitialState };

      const result = instrumentReducer(state, {
        type: "UNKNOWN_ACTION" as ActionTypes,
        payload: SortBy.PRICE,
      });

      expect(result).toBe(state);
    });
  });
});
