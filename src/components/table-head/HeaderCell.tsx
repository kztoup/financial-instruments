import React, { FC, memo } from "react";
import { SortBy } from "../../hooks/use-instrument-state/types";
import useInstrumentState from "../../hooks/use-instrument-state/useInstrumentState";
import useInstrumentDispatch from "../../hooks/useInstrumentDispatch";
import styles from "./header-cell.module.css";

/**
 * Table header cell that triggers sorting when clicked.
 *
 * @param props.label - The header label text.
 * @param props.sortKey - The sort key represented by this column.
 *
 * @returns A `<th>` element.
 */

type Props = {
  label: string;
  sortKey: SortBy;
};

const HeaderCell: FC<Props> = memo(({ label, sortKey }) => {
  const { sortBy } = useInstrumentState();
  const { setSort } = useInstrumentDispatch();

  const isActive = sortBy === sortKey;

  return (
    <th scope="col" data-testid={`header-${sortKey}`}>
      <button
        aria-label={`${label} sort`}
        className={styles.sortButton}
        onClick={() => setSort(sortKey)}
      >
        {label}
        {isActive && <span className={styles.arrow}>▲</span>}
      </button>
    </th>
  );
});

export default HeaderCell;
