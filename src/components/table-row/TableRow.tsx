import React, { FC, memo } from "react";
import { AssetClass } from "../../api/types";
import { rowColor } from "./utils";
import styles from "./table-row.module.css";

/**
 * Renders a single row in the instrument table.
 *
 * @param props.ticker - Instrument ticker
 * @param props.price - Current instrument price
 * @param props.assetClass - Asset class for styling
 *
 * @returns A table row element.
 */

type Props = {
  ticker: string;
  price: number;
  assetClass: AssetClass;
};

const TableRow: FC<Props> = memo(({ ticker, price, assetClass }) => {
  return (
    <tr className={styles[rowColor(assetClass)]}>
      <td>{assetClass}</td>
      <td className={styles[price >= 0 ? "price-blue" : "price-red"]}>
        {price.toFixed(2)}
      </td>
      <td>{ticker}</td>
    </tr>
  );
});

export default TableRow;
