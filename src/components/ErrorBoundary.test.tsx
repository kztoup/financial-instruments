import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const ErrorComponent = () => {
  throw new Error("error");
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">ok</div>
      </ErrorBoundary>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders fallback UI when a child throws", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();

    spy.mockRestore();
  });
});
