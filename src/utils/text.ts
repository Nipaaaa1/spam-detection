import { NGrams, PorterStemmer, WordTokenizer } from "natural";
import { stopwords } from "./stopwords";

const stem = (word: string): string => {
  return PorterStemmer.stem(word);
};
const tokenizer = new WordTokenizer()
export const preprocess = (text: string, validWords?: Set<string>): string[] => {
  const tokens = tokenizer.tokenize(text.toLowerCase())
    .filter((word) => word.length > 0 && !stopwords.has(word))
    .map(stem)

  const trigramStrings = NGrams.trigrams(tokens).map(gram => gram.join(" "))
  const final = [...tokens, ...trigramStrings]
  return validWords ? final.filter((w) => validWords.has(w)) : final;
};


