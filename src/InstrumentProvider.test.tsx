import React, { useContext } from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InstrumentProvider from "./InstrumentProvider";
import {
  InstrumentState,
  InstrumentDispatch,
} from "./context/instrument-context";
import { ActionTypes } from "./context/types";
import { SortBy } from "./hooks/use-instrument-state/types";
import { fetchInstruments } from "./api/instrument";
import { AssetClass } from "./api/types";

jest.mock("./api/instrument");

const mockedFetchInstruments = jest.mocked(fetchInstruments);

describe("InstrumentProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockData = [
    { ticker: "TICKER", price: 10, assetClass: AssetClass.Equities },
  ];

  const Consumer = () => {
    const state = useContext(InstrumentState);
    const dispatch = useContext(InstrumentDispatch);

    return (
      <div>
        <span data-testid="loading">{`${state?.loading}`}</span>
        <span data-testid="provider-children">children</span>
        <span data-testid="sort">{state?.sortBy}</span>

        <button
          onClick={() =>
            dispatch?.({
              type: ActionTypes.SET_SORT,
              payload: SortBy.PRICE,
            })
          }
        >
          Change Sort
        </button>
      </div>
    );
  };

  const setup = async (mockReturn = mockData) => {
    mockedFetchInstruments.mockResolvedValue(mockReturn);

    render(
      <InstrumentProvider>
        <Consumer />
      </InstrumentProvider>,
    );

    // wait for the hook to finish fetching
    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("false");
    });
  };

  it("provides async data to context", async () => {
    await setup(mockData);

    expect(screen.getByTestId("provider-children")).toHaveTextContent(
      "children",
    );
  });

  it("updates sortBy when dispatch is called", async () => {
    await setup(mockData);

    const user = userEvent.setup();
    await user.click(screen.getByText("Change Sort"));

    expect(screen.getByTestId("sort")).toHaveTextContent(SortBy.PRICE);
  });
});
