import fs from "fs";
import path from "path";
import { NaiveBayes } from "../models/naive-bayes";
import { preprocess } from "./utils/text";
import { loadSMSDataset } from "./utils/file";

const modelJson = fs.readFileSync(path.resolve("saved/model.json"), "utf-8");
const parsed = JSON.parse(modelJson);
const model = new NaiveBayes();
Object.assign(model, parsed);

const dataset = loadSMSDataset("data/spam.csv");

let correct = 0;

for (const { label, text } of dataset) {
  const tokens = preprocess(text);
  const prediction = model.predict(tokens);
  if (prediction === label) correct++;
}

const accuracy = (correct / dataset.length) * 100;
console.log(`Akurasi: ${accuracy.toFixed(2)}% (${correct}/${dataset.length})`);
