import { readFileSync } from "fs";
import * as pdfParse from "pdf-parse";
import * as csv from "csv-parser";
import * as XLSX from "xlsx";
import * as fs from "fs";

export class FileProcessingService {
  async processFile(filePath: string, fileType: string) {
    try {
      switch (fileType) {
        case "text/plain":
          return this.processTextFile(filePath);

        case "text/markdown":
          return this.processMarkdownFile(filePath);

        case "application/pdf":
          return this.processPDF(filePath);

        case "text/csv":
          return this.processCSV(filePath);

        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        case "application/vnd.ms-excel":
          return this.processExcel(filePath);

        case "application/javascript":
        case "text/x-python":
          return this.processCodeFile(filePath);

        default:
          throw new Error(`Unsupported file type: ${fileType}`);
      }
    } catch (error) {
      throw new Error(`Error processing file: ${(error as Error).message}`);
    }
  }

  private async processTextFile(filePath: string): Promise<string> {
    try {
      const text = readFileSync(filePath, "utf-8");
      return text;
    } catch (error) {
      throw new Error(
        `Error processing text file: ${(error as Error).message}`,
      );
    }
  }

  private async processMarkdownFile(filePath: string): Promise<string> {
    try {
      const markdown = readFileSync(filePath, "utf-8");
      return markdown;
    } catch (error) {
      throw new Error(
        `Error processing markdown file: ${(error as Error).message}`,
      );
    }
  }

  private async processPDF(filePath: string): Promise<string> {
    try {
      const dataBuffer = readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    } catch (error) {
      throw new Error(`Error processing PDF file: ${(error as Error).message}`);
    }
  }

  private async processCSV(filePath: string): Promise<string> {
    try {
      const rows: Record<string, string>[] = [];
      return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (row) => rows.push(row))
          .on("end", () => resolve(JSON.stringify(rows)))
          .on("error", (error) =>
            reject(`Error processing CSV file: ${error}`),
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

  private async processCodeFile(filePath: string): Promise<string> {
    try {
      const code = readFileSync(filePath, "utf-8");
      return code;
    } catch (error) {
      throw new Error(
        `Error processing code file: ${(error as Error).message}`,
      );
    }
  }
}
