import * as XLSX from "xlsx";
import type { EmissionsPoint } from "../types";

export async function loadEmissions(): Promise<EmissionsPoint[]> {
    const response = await fetch("/uk-emissions.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = "1.1";
    const sheet = workbook.Sheets[sheetName];


    const data: (string | number | null)[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: null,
    });

    const headerRowIndex = data.findIndex((row) =>
        row.includes("1990")
    );

    const headerRow = data[headerRowIndex];

    const totalRowIndex = data.findIndex(
        (row) => row[0] === "Total greenhouse gas emissions"
    );

    const totalRow = data[totalRowIndex];
    console.log("Total row:", totalRow);

    const result: EmissionsPoint[] = [];

    headerRow.forEach((cell, colIndex) => {
        if (colIndex === 0) return;
        const year = Number(cell);
        const value = Number(totalRow[colIndex]);

        if (!isNaN(year) && !isNaN(value)) {
            result.push({ year, value });
        }
    });

    console.log("Final result:", result);

    return result;
}