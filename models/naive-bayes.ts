export class NaiveBayes {
  private spamWordCounts: Record<string, number> = {};
  private hamWordCounts: Record<string, number> = {};
  private spamTotalWords = 0;
  private hamTotalWords = 0;
  private spamDocs = 0;
  private hamDocs = 0;
  private vocabulary: Set<string> = new Set();
  private vocabSize = 0;

  train(label: "spam" | "ham", tokens: string[]) {
    if (label === "spam") this.spamDocs++;
    else this.hamDocs++;

    for (const token of tokens) {
      this.vocabulary.add(token);
      if (label === "spam") {
        this.spamWordCounts[token] = (this.spamWordCounts[token] || 0) + 1;
        this.spamTotalWords++;
      } else {
        this.hamWordCounts[token] = (this.hamWordCounts[token] || 0) + 1;
        this.hamTotalWords++;
      }
    }
    this.vocabulary = new Set([...Object.keys(this.spamWordCounts), ...Object.keys(this.hamWordCounts)]);
    this.vocabSize = this.vocabulary.size
  }

  predict(tokens: string[]): "spam" | "ham" {
    const totalDocs = this.spamDocs + this.hamDocs;

    let spamScore = Math.log(this.spamDocs / totalDocs);
    let hamScore = Math.log(this.hamDocs / totalDocs);

    for (const token of tokens) {
      const spamCount = this.spamWordCounts[token] || 0;
      const hamCount = this.hamWordCounts[token] || 0;

      const pTokenSpam = (spamCount + 1) / (this.spamTotalWords + this.vocabSize);
      const pTokenHam = (hamCount + 1) / (this.hamTotalWords + this.vocabSize);

      spamScore += Math.log(pTokenSpam);
      hamScore += Math.log(pTokenHam);
    }

    return spamScore > hamScore ? "spam" : "ham";
  }

}
