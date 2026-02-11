import React, { FC, memo } from "react";
import HeaderCell from "./HeaderCell";
import { SortBy } from "../../hooks/use-instrument-state/types";
import styles from "./table-head.module.css";

/**
 * Table header component for the instrument table.
 *
 * @returns A memoized table header element.
 */

const TableHead: FC = memo(() => (
  <table className={styles["table-head"]}>
    <thead>
      <tr>
        <HeaderCell label="Asset Class" sortKey={SortBy.ASSET_CLASS} />
        <HeaderCell label="Price" sortKey={SortBy.PRICE} />
        <HeaderCell label="Ticker" sortKey={SortBy.TICKER} />
      </tr>
    </thead>
  </table>
));

export default TableHead;
