import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export const loadSMSDataset = (filePath: string): { label: "spam" | "ham"; text: string }[] => {
  const fullPath = path.resolve(filePath);
  const file = fs.readFileSync(fullPath, "utf-8");
  const records = parse(file, {
    columns: false,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((row: string[]) => ({
    label: row[0] as "spam" | "ham",
    text: row[1],
  }));
}
