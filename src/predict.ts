import fs from "fs";
import path from "path";
import readline from "readline";
import { preprocess } from "./utils/text";
import { NaiveBayes } from "../models/naive-bayes";
import { loadValidWords } from "./utils/file";

const modelJson = fs.readFileSync(path.resolve("saved/model.json"), "utf-8");
const parsed = JSON.parse(modelJson);
const model = new NaiveBayes();
Object.assign(model, parsed);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = () => {
  rl.question("Masukkan pesan untuk diprediksi (atau ketik 'exit' untuk keluar): ", async (input) => {
    if (input.toLowerCase() === "exit") {
      rl.close();
      return;
    }
    const validWords = await loadValidWords("models/valid-words.json")
    const tokens = preprocess(input, validWords);
    const prediction = model.predict(tokens);
    console.log(`Prediksi: ${prediction}\n`);
    prompt();
  });
};

console.log("=== Spam Detector ===");
prompt();
