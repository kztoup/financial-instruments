import React, { FC, memo } from "react";
import { SortBy } from "../../hooks/use-instrument-state/types";
import useInstrumentState from "../../hooks/use-instrument-state/useInstrumentState";
import useInstrumentDispatch from "../../hooks/useInstrumentDispatch";

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

  const onSortChange = (key: SortBy) => setSort(key);

  const isActive = sortBy === sortKey;

  return (
    <th data-testid={`header-${sortKey}`} onClick={() => onSortChange(sortKey)}>
      {label} {isActive ? "▲" : ""}
    </th>
  );
});

export default HeaderCell;
