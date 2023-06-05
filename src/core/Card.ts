import BugTrack from './BugTrack';
import WordRandom from '../data/WordRandom';
import Letter from './Letter';

export interface TrainerOptions {
  word: WordRandom;
  stat: BugTrack;
}

export default class Card {
  public stat: BugTrack;
  public word: WordRandom;

  public answerLetters: Letter[] = [];
  public shuffleLetters: Letter[] = [];

  constructor(options: TrainerOptions) {
    this.stat = options.stat;
    this.word = options.word;

    this.shuffleLetters = this.word
      .getShuffled()
      .split('')
      .map((letter) => new Letter(letter, 'default'));
  }

  inputLetter(letter: string): boolean {
    const payload =
      this.answerLetters.map((letter) => letter.letter).join('') + letter;

    if (this.isMatch(payload)) {
      const index = this.shuffleLetters.findIndex((l) => l.letter === letter);
      if (index !== -1) {
        this.shuffleLetters.splice(index, 1);
        this.answerLetters.push(new Letter(letter, 'success'));
        return true;
      }
    }

    this.stat.addError();
    return false;
  }

  getNextLetter(): string {
    const word = this.word.getWord();
    return word?.[this.answerLetters.length] || '';
  }

  showRightAnswer() {
    this.answerLetters = this.word
      .getWord()
      .split('')
      .map((letter) => new Letter(letter, 'error'));
    this.shuffleLetters = [];
  }

  isCompleted() {
    return (
      this.word.getWord() ===
      this.answerLetters.map((letter) => letter.letter).join('')
    );
  }

  isFail() {
    return this.stat.getErrorsCount() >= 3;
  }

  isMatch(payload: string) {
    return this.word.getWord().startsWith(payload);
  }
}
