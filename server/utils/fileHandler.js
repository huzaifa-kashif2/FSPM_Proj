import fs, { readFileSync } from "fs";
import mammoth from "mammoth";
import { PDFParse } from "pdf-parse";

async function extractTextFromFile(filePath) {
  const fileExtension = filePath.split(".").pop().toLowerCase();

  if (fileExtension === "pdf") {
    const buffer = readFileSync(filePath);
    const uint8Array = new Uint8Array(buffer);
    const parser = new PDFParse(uint8Array);
    const result = await parser.getText();

    await parser.destroy();
    return result.text;
  }

  if (fileExtension === "docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
  }

  if (fileExtension === "txt") {
    return fs.promises.readFile(filePath, "utf8");
  }

  throw new Error("Unsupported file type");
}

export { extractTextFromFile };
