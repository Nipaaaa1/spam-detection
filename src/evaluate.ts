import fs from "fs";
import path from "path";
import { NaiveBayes } from "../models/naive-bayes";
import { preprocess } from "./utils/text";
import { loadSMSDataset, loadValidWords, splitDataset } from "./utils/file";

const evaluate = async () => {
  const modelJson = fs.readFileSync(path.resolve("saved/model.json"), "utf-8");
  const parsed = JSON.parse(modelJson);
  const model = new NaiveBayes();
  Object.assign(model, parsed);

  const dataset = loadSMSDataset("data/spam.csv");
  const { test } = splitDataset(dataset)
  const validWords = await loadValidWords("models/valid-words.json")

  let correct = 0;

  for (const { label, text } of test) {
    const tokens = preprocess(text, validWords);
    const prediction = model.predict(tokens);
    if (prediction === label) correct++;
  }

  const accuracy = (correct / dataset.length) * 100;
  console.log(`Akurasi: ${accuracy.toFixed(2)}% (${correct}/${dataset.length})`);
}

evaluate()
