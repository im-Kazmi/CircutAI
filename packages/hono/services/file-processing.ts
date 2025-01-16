import { promises as fsPromises, createReadStream } from "fs";
import csv from "csv-parser";
import XLSX from "xlsx";
import { lookup } from "mime-types";

export class FileProcessingService {
  async processFile(filePath: string): Promise<string> {
    try {
      const fileType = lookup(filePath);
      if (!fileType) throw new Error("Unable to detect file type.");

      switch (fileType) {
        case "text/plain":
          return this.readFile(filePath);

        case "text/markdown":
          return this.readFile(filePath);

        case "application/pdf":
          return this.processPDF(filePath);

        case "text/csv":
          return this.processCSV(filePath);

        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        case "application/vnd.ms-excel":
          return this.processExcel(filePath);

        case "application/javascript":
        case "text/x-python":
          return this.readFile(filePath);

        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
    } catch (error) {
      throw new Error(`Error processing file: ${(error as Error).message}`);
    }
  }

  private async readFile(filePath: string): Promise<string> {
    try {
      return await fsPromises.readFile(filePath, "utf-8");
    } catch (error) {
      throw new Error(`Error reading file: ${(error as Error).message}`);
    }
  }

  private async processCSV(filePath: string): Promise<string> {
    try {
      const rows: Record<string, string>[] = [];
      return new Promise((resolve, reject) => {
        createReadStream(filePath)
          .pipe(csv())
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

  private async processExcel(filePath: string): Promise<string> {
    try {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      return JSON.stringify(sheetData);
    } catch (error) {
      throw new Error(
        `Error processing Excel file: ${(error as Error).message}`,
      );
    }
  }
}
