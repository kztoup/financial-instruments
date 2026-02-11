import React, { FC, memo, useMemo } from "react";
import TableHead from "../table-head/TableHead";
import TableBody from "../table-body/TableBody";
import useInstrumentState from "../../hooks/use-instrument-state/useInstrumentState";
import useScroll from "../../hooks/useScroll";
import { ROW_HEIGHT, TABLE_HEIGHT, BUFFER } from "./constants";

/**
 * InstrumentTable component.
 *
 * @returns A table with virtualized body.
 */

const InstrumentTable: FC = memo(() => {
  const { sortedData } = useInstrumentState();
  const { scrollTop, onScroll } = useScroll();
  const totalRows = sortedData.length;

  const virtualization = useMemo(() => {
    const visibleCount = Math.ceil(TABLE_HEIGHT / ROW_HEIGHT);
    const rawStart = Math.floor(scrollTop / ROW_HEIGHT);

    const startIndex = Math.max(0, rawStart - BUFFER);
    const endIndex = Math.min(
      totalRows,
      startIndex + visibleCount + BUFFER * 2,
    );

    const translateY = startIndex * ROW_HEIGHT;
    const visibleRows = sortedData.slice(startIndex, endIndex);

    return { startIndex, endIndex, translateY, visibleRows };
  }, [scrollTop, sortedData, totalRows]);

  return (
    <div
      style={{
        height: TABLE_HEIGHT,
        overflowY: "auto",
        border: "1px solid #CCCCCC",
      }}
      onScroll={onScroll}
    >
      <TableHead />
      <TableBody
        height={totalRows * ROW_HEIGHT}
        virtualization={virtualization}
      />
    </div>
  );
});

export default InstrumentTable;
