import React, { FC, memo } from "react";
import TableHead from "../table-head/TableHead";
import TableBody from "../table-body/TableBody";
import useInstrumentState from "../../hooks/use-instrument-state/useInstrumentState";
import useVirtualization from "../../hooks/useVirtualization";
import useScroll from "../../hooks/useScroll";
import { ROW_HEIGHT, TABLE_HEIGHT, BUFFER } from "./constants";
import styles from "./instrument-table.module.css";

/**
 * InstrumentTable component.
 *
 * @returns A table with virtualized body.
 */

const InstrumentTable: FC = memo(() => {
  const { sortedData } = useInstrumentState();
  const { scrollTop, onScroll } = useScroll();

  const virtualization = useVirtualization({
    scrollTop,
    rowHeight: ROW_HEIGHT,
    containerHeight: TABLE_HEIGHT,
    totalRows: sortedData.length,
    buffer: BUFFER,
  });

  return (
    <div
      className={styles.wrapper}
      style={{ height: TABLE_HEIGHT }}
      onScroll={onScroll}
    >
      <table
        aria-label="Instruments table"
        aria-rowcount={sortedData.length}
        className={styles.table}
      >
        <TableHead />
        <TableBody data={sortedData} virtualization={virtualization} />
      </table>
    </div>
  );
});

export default InstrumentTable;
