import * as XLSX from "xlsx";
import type { EmissionsPoint } from "../types";

export async function loadEmissions(): Promise<EmissionsPoint[]> {
    const response = await fetch("/uk-emissions.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = "1.1";
    const sheet = workbook.Sheets[sheetName];
    console.log(workbook.SheetNames);

    const data: (string | number | null)[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: null,
    });

    const headerRowIndex = data.findIndex((row) =>
        row.includes("1990")
    );

    console.log("Header row index:", headerRowIndex);

    console.log(data.slice(0, 15));

    return [];
}