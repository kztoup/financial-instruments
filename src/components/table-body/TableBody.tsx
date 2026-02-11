import React, { FC, memo } from "react";
import TableRow from "../table-row/TableRow";
import { Instrument } from "src/api/types";
import styles from "./table-body.module.css";

/**
 * Virtualized table body component.
 *
 * @param props.height - Height of the scrollable area.
 * @param props.virtualization - Virtualization state containing translateY and visible rows.
 *
 * @returns A table body element.
 */

type Props = {
  height: number;
  virtualization: {
    translateY: number;
    visibleRows: Instrument[];
  };
};

const TableBody: FC<Props> = memo(({ height, virtualization }) => {
  return (
    <div
      data-testid="table-body-wrapper"
      style={{
        height,
        position: "relative",
      }}
    >
      <table className={styles["table-body"]}>
        <tbody
          data-testid="table-body-tbody"
          style={{ transform: `translateY(${virtualization.translateY}px)` }}
        >
          {virtualization.visibleRows.map(({ ticker, price, assetClass }) => (
            <TableRow
              key={ticker}
              ticker={ticker}
              price={price}
              assetClass={assetClass}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default TableBody;
