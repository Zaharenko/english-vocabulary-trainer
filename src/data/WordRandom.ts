export default class WordRandom {
  private word: string;

  constructor(word: string) {
    this.word = word;
  }

  getShuffled(): string {
    const letters = this.word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  }

  getWord(): string {
    return this.word;
  }
}
