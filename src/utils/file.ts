import fs from "fs";
import * as fsAsync from "fs/promises"
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

export function splitDataset<T>(data: T[], trainRatio = 0.8): { train: T[]; test: T[] } {
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  const trainSize = Math.floor(data.length * trainRatio);
  return {
    train: shuffled.slice(0, trainSize),
    test: shuffled.slice(trainSize),
  };
}

export const saveValidWords = async (validWords: Set<string>, filePath: string) => {
  const arr = Array.from(validWords);
  await fsAsync.writeFile(filePath, JSON.stringify(arr, null, 2));
};

export const loadValidWords = async (filePath: string): Promise<Set<string>> => {
  const data = await fsAsync.readFile(filePath, "utf-8");
  const arr = JSON.parse(data);
  return new Set(arr);
};
