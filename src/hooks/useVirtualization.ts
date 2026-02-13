import { useMemo } from "react";

/**
 * Configuration for the virtualization hook.
 *
 * @param scrollTop - Current vertical scroll position (px).
 * @param rowHeight - Height of each row item (px).
 * @param containerHeight - Height of the visible container (px).
 * @param totalRows - Total number of rows in the list.
 * @param buffer - Number of extra rows rendered above and below the viewport to avoid visible loading while scrolling.
 *
 * @returns An object containing:
 * - `startIndex`: Index of the first row to render
 * - `endIndex`: Index of the last row to render (exclusive)
 * - `topSpacerHeight`: Height (px) of the spacer above rendered rows
 * - `bottomSpacerHeight`: Height (px) of the spacer below rendered rows
 */

export type Config = {
  scrollTop: number;
  rowHeight: number;
  containerHeight: number;
  totalRows: number;
  buffer: number;
};

const useVirtualization = ({
  scrollTop,
  rowHeight,
  containerHeight,
  totalRows,
  buffer,
}: Config) => {
  return useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / rowHeight);
    const rawStart = Math.floor(scrollTop / rowHeight);

    const startIndex = Math.max(0, rawStart - buffer);
    const endIndex = Math.min(
      totalRows,
      startIndex + visibleCount + buffer * 2,
    );

    return {
      startIndex,
      endIndex,
      topSpacerHeight: startIndex * rowHeight,
      bottomSpacerHeight: (totalRows - endIndex) * rowHeight,
    };
  }, [scrollTop, rowHeight, containerHeight, totalRows, buffer]);
};

export default useVirtualization;
