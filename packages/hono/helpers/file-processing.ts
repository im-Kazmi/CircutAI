import axios from "axios";
import pdfdist from "pdfjs-dist";

export async function extractTextFromPdf(filePath: string) {
  const response = await axios.get(filePath, {
    responseType: "arraybuffer", // Ensure binary data is downloaded
  });

  const pdf = await pdfdist.getDocument({ data: new Uint8Array(response.data) })
    .promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ");
  }

  return chunkText(text);
}

export function chunkText(text: string, maxChunkLength = 1000) {
  const words = text.split(/\s+/);
  const chunks = [];
  let currentChunk = "";

  for (const word of words) {
    if (currentChunk.length + word.length + 1 > maxChunkLength) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }
    currentChunk += (currentChunk ? " " : "") + word;
  }

  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
