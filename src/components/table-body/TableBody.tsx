import React, { FC, memo } from "react";
import { COLUMN_COUNT } from "./constants";
import TableRow from "../table-row/TableRow";
import { Instrument } from "../../api/types";

/**
 * Virtualized table body component.
 *
 * @param props.data - The instrument data.
 *
 * @param props.virtualization - Virtualization configuration.
 * @param props.virtualization.startIndex - Index of the first visible row.
 * @param props.virtualization.endIndex - Index after the last visible row.
 * @param props.virtualization.topSpacerHeight - Height of the spacer above visible rows.
 * @param props.virtualization.bottomSpacerHeight - Height of the spacer below visible rows.
 *
 * @returns A table body element.
 */

type Props = {
  data: Instrument[];
  virtualization: {
    startIndex: number;
    endIndex: number;
    topSpacerHeight: number;
    bottomSpacerHeight: number;
  };
};

const TableBody: FC<Props> = memo(({ data, virtualization }) => {
  const { startIndex, endIndex, topSpacerHeight, bottomSpacerHeight } =
    virtualization;

  const visibleRows = data.slice(startIndex, endIndex);

  return (
    <tbody aria-rowcount={data.length}>
      {topSpacerHeight > 0 && (
        <tr
          aria-hidden="true"
          role="presentation"
          data-testid="top-spacer"
          style={{ height: topSpacerHeight }}
        >
          <td colSpan={COLUMN_COUNT} />
        </tr>
      )}

      {visibleRows.map((row, i) => {
        const actualIndex = startIndex + i;

        return (
          <TableRow
            key={`${row.ticker}-${row.assetClass}-${actualIndex}`}
            rowIndex={actualIndex}
            {...row}
          />
        );
      })}

      {bottomSpacerHeight > 0 && (
        <tr
          aria-hidden="true"
          role="presentation"
          data-testid="bottom-spacer"
          style={{ height: bottomSpacerHeight }}
        >
          <td colSpan={COLUMN_COUNT} />
        </tr>
      )}
    </tbody>
  );
});

export default TableBody;
