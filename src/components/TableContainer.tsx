import React, { FC } from "react";
import InstrumentTable from "./instrument-table/InstrumentTable";
import useInstrumentState from "../hooks/use-instrument-state/useInstrumentState";

/**
 * Container component responsible for rendering the instrument table.
 *
 * @returns A loading message, error message, or the instrument table.
 */

const TableContainer: FC = () => {
  const { loading, error } = useInstrumentState();

  if (loading) return <div data-testid="fetch-loading">Loading...</div>;
  if (error)
    return <div data-testid="fetch-error">Error: {error?.message}</div>;

  return <InstrumentTable />;
};

export default TableContainer;
