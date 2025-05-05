import { stopwords } from "./stopwords";

const suffixes = ["ing", "ed", "ly", "es", "s", "ment"];

const stem = (word: string): string => {
  for (const suffix of suffixes) {
    if (word.endsWith(suffix) && word.length > suffix.length + 2) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
};

export const preprocess = (text: string, validWords?: Set<string>): string[] => {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !stopwords.has(word))
    .map(stem)

  return validWords ? tokens.filter((w) => validWords.has(w)) : tokens;
};


