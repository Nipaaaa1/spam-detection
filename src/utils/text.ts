import { stopwords } from "./stopwords";

export const preprocess = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !stopwords.has(word));
};
