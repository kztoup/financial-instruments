import React, { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import useVirtualization, { Config } from "./useVirtualization";

type Result = ReturnType<typeof useVirtualization>;

const Virtualization = ({
  config,
  onResult,
}: {
  config: Config;
  onResult: (result: Result) => void;
}) => {
  const result = useVirtualization(config);

  useEffect(() => {
    onResult(result);
  }, [result, onResult]);

  return <div data-testid="virtualization-test" />;
};

describe("useVirtualization", () => {
  it("calculates correct virtualization values", async () => {
    let result!: Result;

    render(
      <Virtualization
        config={{
          scrollTop: 40,
          rowHeight: 40,
          containerHeight: 600,
          totalRows: 100,
          buffer: 1,
        }}
        onResult={(r) => {
          result = r;
        }}
      />,
    );

    await screen.findByTestId("virtualization-test");

    expect(result).toEqual({
      startIndex: 0,
      endIndex: 17,
      topSpacerHeight: 0,
      bottomSpacerHeight: (100 - 17) * 40,
    });
  });

  it("clamps startIndex to 0", async () => {
    let result!: Result;

    render(
      <Virtualization
        config={{
          scrollTop: 0,
          rowHeight: 40,
          containerHeight: 600,
          totalRows: 100,
          buffer: 5,
        }}
        onResult={(r) => {
          result = r;
        }}
      />,
    );

    await screen.findByTestId("virtualization-test");

    expect(result.startIndex).toBe(0);
  });

  it("clamps endIndex to totalRows", async () => {
    let result!: Result;

    render(
      <Virtualization
        config={{
          scrollTop: 10000,
          rowHeight: 40,
          containerHeight: 600,
          totalRows: 100,
          buffer: 5,
        }}
        onResult={(r) => {
          result = r;
        }}
      />,
    );

    await screen.findByTestId("virtualization-test");

    expect(result.endIndex).toBe(100);
  });
});
