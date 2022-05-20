import { cloneElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactElement } from "react";
import type { DataGridProps } from "react-data-grid";


const isServer = typeof window === "undefined";

export async function exportToCsv<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
  const { head, body, foot } = await getGridContent(gridElement);
  const content = [...head, ...body, ...foot]
    .map((cells) => cells.map(serialiseCellValue).join(","))
    .join("\n");

  console.log({ gridElement, head, body, foot });

  downloadFile(
    fileName,
    new Blob([content], { type: "text/csv;charset=utf-8;" })
  );
}

export async function exportToXlsx<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
  const [{ utils, writeFile }, { head, body, foot }] = await Promise.all([
    import("xlsx"),
    getGridContent(gridElement),
  ]);
  const wb = utils.book_new();
  const ws = utils.aoa_to_sheet([...head, ...body, ...foot]);
  utils.book_append_sheet(wb, ws, "Sheet 1");
  writeFile(wb, fileName);
}

export async function exportToPdf<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>,
  fileName: string
) {
  const [{ jsPDF }, autoTable, { head, body, foot }] = await Promise.all([
    import("jspdf"),
    (await import("jspdf-autotable")).default,
    await getGridContent(gridElement),
  ]);
  const doc = new jsPDF({
    orientation: "l",
    unit: "px",
  });

  autoTable(doc, {
    head,
    body,
    foot,
    horizontalPageBreak: true,
    styles: { cellPadding: 1.5, fontSize: 8, cellWidth: "wrap" },
    tableWidth: "wrap",
  });
  doc.save(fileName);
}

async function getGridContent<R, SR>(
  gridElement: ReactElement<DataGridProps<R, SR>>
) {
  const grid = document.createElement("div");

  try {
    grid.innerHTML = renderToStaticMarkup(
      cloneElement(gridElement, {
        enableVirtualization: false,
      })
    );

    console.log({grid});

    function getRows(selector: string) {
      return Array.from(grid.querySelectorAll(selector)).map(
        (gridRow) => {
          return Array.from(
            gridRow.querySelectorAll(".rdg-cell")
          ).map((gridCell) => gridCell?.innerText);
        }
      );
    }
    
    return {
      head: getRows(".rdg-header-row"),
      body: getRows(".rdg-row:not(.rdg-summary-row)"),
      foot: getRows(".rdg-summary-row"),
    };
  } catch(error) {
    console.log({error});
  }
}

function serialiseCellValue(value: unknown) {
  if (typeof value === "string") {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(",")
      ? `"${formattedValue}"`
      : formattedValue;
  }
  return value;
}

function downloadFile(fileName: string, data: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}
