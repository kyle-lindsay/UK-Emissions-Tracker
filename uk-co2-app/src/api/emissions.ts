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

    const firstYear = headerRow[1];
    const firstValue = totalRow[1];

  const firstPoint: EmissionsPoint = {
        year: Number(firstYear),
        value: Number(firstValue),
    };

    console.log("First point:", firstPoint);

    const result: EmissionsPoint[] = [];
    console.log("Empty result:", result);

    return [];
}