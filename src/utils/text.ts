import { PorterStemmer } from "natural";
import { stopwords } from "./stopwords";

const stem = (word: string): string => {
  return PorterStemmer.stem(word);
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


