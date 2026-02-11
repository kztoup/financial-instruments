import React from "react";
import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import useAsyncData from "./useAsyncData";

type ResultType = { value: number };

const TestComponent = ({
  fetcher,
  onRender,
}: {
  fetcher: () => Promise<ResultType>;
  onRender: (state) => void;
}) => {
  const state = useAsyncData(fetcher);
  onRender(state);
  return null;
};

describe("useAsyncData", () => {
  it("sets data after successful fetch", async () => {
    const fetcher = jest.fn(() => Promise.resolve({ value: 42 }));
    let state;

    await act(async () => {
      render(<TestComponent fetcher={fetcher} onRender={(s) => (state = s)} />);
    });

    expect(state.loading).toBe(false);
    expect(state.data).toEqual({ value: 42 });
    expect(state.error).toBeNull();
  });

  it("sets error on fetch failure", async () => {
    const fetcher = jest.fn(() => Promise.reject(new Error("fail")));
    let state;

    await act(async () => {
      render(<TestComponent fetcher={fetcher} onRender={(s) => (state = s)} />);
    });

    expect(state.loading).toBe(false);
    expect(state.data).toBeNull();
    expect(state.error?.message).toBe("fail");
  });
});
