import path from "path";
import { NaiveBayes } from "../models/naive-bayes";
import { loadSMSDataset, saveValidWords, splitDataset } from "./utils/file";
import { preprocess } from "./utils/text";
import fs from "fs";

const train = async () => {
  const wordFreq: Record<string, number> = {};
  const dataset = loadSMSDataset("data/spam.csv");
  const { train } = splitDataset(dataset)
  const model = new NaiveBayes();

  for (const { text } of train) {
    const tokens = preprocess(text);
    for (const token of tokens) {
      wordFreq[token] = (wordFreq[token] || 0) + 1;
    }
  }

  const validWords = new Set(
    Object.entries(wordFreq)
      .filter(([_, freq]) => freq >= 3)
      .map(([word]) => word)
  );


  await saveValidWords(validWords, "models/valid-words.json")

  for (const { label, text } of train) {
    const tokens = preprocess(text, validWords);
    model.train(label, tokens);
  }

  const outputDir = path.resolve("saved");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const modelData = JSON.stringify(model, null, 2);
  fs.writeFileSync(path.join(outputDir, "model.json"), modelData);

  console.log("Model berhasil dilatih dan disimpan ke saved/model.json");
}

train()
