import React from "react";
import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import useScroll from "./useScroll";

const TestComponent = ({ onRender }: { onRender: (hook) => void }) => {
  const hook = useScroll();
  onRender(hook);
  return null;
};

describe("useScroll", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      return window.setTimeout(() => cb(Date.now()), 16) as unknown as number;
    });

    jest
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation((id: number) => {
        window.clearTimeout(id);
      });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("initial scrollTop is 0", () => {
    let hook;

    render(<TestComponent onRender={(h) => (hook = h)} />);

    expect(hook.scrollTop).toBe(0);
  });

  it("updates scrollTop on scroll using requestAnimationFrame", () => {
    let hook;

    render(<TestComponent onRender={(h) => (hook = h)} />);

    act(() => {
      hook.onScroll({ currentTarget: { scrollTop: 100 } });
    });

    expect(hook.scrollTop).toBe(0);

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(hook.scrollTop).toBe(100);
  });

  it("cancels animation frame on unmount", () => {
    let hook;

    const { unmount } = render(<TestComponent onRender={(h) => (hook = h)} />);

    act(() => {
      hook.onScroll({ currentTarget: { scrollTop: 50 } });
    });

    unmount();

    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });
});
