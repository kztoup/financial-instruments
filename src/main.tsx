import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InstrumentProvider from "./InstrumentProvider";
import { TableContainer, ErrorBoundary } from "./components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <h1>Financial Instruments</h1>
      <InstrumentProvider>
        <TableContainer />
      </InstrumentProvider>
    </ErrorBoundary>
  </StrictMode>,
);
