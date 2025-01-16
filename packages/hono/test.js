import pkg from "pdfjs-dist";
const { getDocument } = pkg;
import fs from "fs";
import axios from "axios";

extractTextFromLocalPdf(
  "https://circut-ai.060bfd194d2fcf0b4665b57dab183689.r2.cloudflarestorage.com/uploads/d41945fc-b27f-4ad9-b62f-341e58ca3369_Lundh%20F.%20-%20Python%20imaging%20library%20%28PIL%29%20quick%20overview%20%282002%29.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=4bf03f01533b257b6c7dbe73d93c078d%2F20250116%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20250116T161049Z&X-Amz-Expires=3600&X-Amz-Signature=ad15235eb78fbdddb9117116cd4fa6b51d5b3d2fd8d32b7ce1ec4ae6206ba128&X-Amz-SignedHeaders=host&x-id=GetObject",
).then((text) => console.log("Extracted text:", text));

async function extractTextFromLocalPdf(filePath) {
  const pdf = await extractTextFromPdf(filePath);

  return pdf;
}

async function extractTextFromPdf(filePath) {
  const response = await axios.get(filePath, {
    responseType: "arraybuffer", // Ensure binary data is downloaded
  });

  const pdf = await getDocument({ data: new Uint8Array(response.data) })
    .promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(" ");
  }

  return chunkText(text);
}

function chunkText(text, maxChunkLength = 1000) {
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
