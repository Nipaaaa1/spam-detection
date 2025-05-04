import path from "path";
import { NaiveBayes } from "../models/naive-bayes";
import { loadSMSDataset } from "./utils/file";
import { preprocess } from "./utils/text";
import fs from "fs";

const dataset = loadSMSDataset("data/spam.csv");
const model = new NaiveBayes();

for (const { label, text } of dataset) {
  const tokens = preprocess(text);
  model.train(label, tokens);
}

const outputDir = path.resolve("saved");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const modelData = JSON.stringify(model, null, 2);
fs.writeFileSync(path.join(outputDir, "model.json"), modelData);

console.log("Model berhasil dilatih dan disimpan ke saved/model.json");
