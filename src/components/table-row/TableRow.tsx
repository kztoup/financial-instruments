import React, { FC, memo } from "react";
import { Instrument } from "../../api/types";
import { rowColor } from "./utils";
import styles from "./table-row.module.css";

/**
 * Renders a single row in the instrument table.
 *
 * @param props.ticker - Current instrument ticker
 * @param props.price - Current instrument price
 * @param props.assetClass - Current instrument asset class
 * @param props.rowIndex - Index of the row in the full dataset
 *
 * @returns A table row element.
 */

type Props = Instrument & {
  rowIndex: number;
};

const TableRow: FC<Props> = memo(({ ticker, price, assetClass, rowIndex }) => {
  const safePrice = Number(price);
  const isValidPrice = price !== null && Number.isFinite(safePrice);

  return (
    <tr
      aria-rowindex={rowIndex + 1}
      className={`${styles.row} ${styles[rowColor[assetClass]]}`}
    >
      <td>{assetClass ?? "-"}</td>
      <td className={styles[price >= 0 ? "priceBlue" : "priceRed"]}>
        {isValidPrice ? safePrice.toFixed(2) : "-"}
      </td>
      <td>{ticker ?? "-"}</td>
    </tr>
  );
});

export default TableRow;
