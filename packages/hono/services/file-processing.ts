import csv from "csv-parser";
import { readFile as ReadExcelFile } from "xlsx";
import { lookup } from "mime-types";

export class FileProcessingService {
  async processFile(fileUrl: string, fileName: string): Promise<string> {
    try {
      const fileType = lookup(fileName);
      if (!fileType) throw new Error("Unable to detect file type.");

      switch (fileType) {
        case "text/plain":
        case "text/markdown":
        case "application/javascript":
        case "text/x-python":
          return this.readFile(fileUrl);

        case "text/csv":
          return this.processCSV(fileUrl);

        // case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        // case "application/vnd.ms-excel":
        //   return this.processExcel(fileUrl);

        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
    } catch (error) {
      throw new Error(`Error processing file: ${(error as Error).message}`);
    }
  }

  private async readFile(fileUrl: string): Promise<string> {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      throw new Error(`Error reading file: ${(error as Error).message}`);
    }
  }

  private async processCSV(fileUrl: string): Promise<string> {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      const rows: Record<string, string>[] = [];
      return new Promise((resolve, reject) => {
        csv()
          .on("data", (row) => rows.push(row))
          .on("end", () => resolve(JSON.stringify(rows)))
          .on("error", (error) =>
            reject(new Error(`Error processing CSV file: ${error.message}`)),
          );
      });
    } catch (error) {
      throw new Error(`Error processing CSV file: ${(error as Error).message}`);
    }
  }

  // private async processExcel(fileUrl: string): Promise<string> {
  //   try {
  //     const response = await fetch(fileUrl);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const arrayBuffer = await response.arrayBuffer();
  //     const workbook = ReadExcelFile(new Uint8Array(arrayBuffer), {
  //       type: "array",
  //     });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  //     return JSON.stringify(sheetData);
  //   } catch (error) {
  //     throw new Error(
  //       `Error processing Excel file: ${(error as Error).message}`,
  //     );
  //   }
  // }
}
