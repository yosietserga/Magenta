import React from "react";
import { Button } from "reactstrap";

export function ExportCSVButton({ onExport, children }) {
  const isServer = typeof window === "undefined";
  const [exporting, setExporting] = React.useState(false);

  if (isServer) return <Button>Loading...</Button>;

  return (
    <Button
      disabled={exporting}
      onClick={async () => {
        setExporting(true);
        await onExport();
        setExporting(false);
      }}
    >
      {exporting ? "Exporting" : children}
    </Button>
  );
}
