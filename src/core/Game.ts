import WordRandom from '../data/WordRandom';
import BugTrack from './BugTrack';
import TrainerStat from './TrainerStat';
import Card from './Card';

export interface GameOptions {
  words: WordRandom[];
  onUpdate?: () => void;
}

export default class Game {
  private cards: Card[] = [];
  private activeCard: number = 0;
  private onUpdate: () => void;
  public stat: TrainerStat | null = null;
  private pause: boolean = false;

  constructor(options: GameOptions) {
    this.onUpdate = options.onUpdate || (() => {});
    this.startGame(options.words);
  }

  private startGame(words: WordRandom[]): void {
    this.createCards(words);
    this.activeCard = 0;
    this.stat = new TrainerStat(this);
  }

  private createCards(words: WordRandom[]): void {
    this.cards = words.map((word) => {
      return new Card({
        word,
        stat: new BugTrack(),
      });
    });
  }

  public inputLetter(letter: string): void {
    if (this.pause) return;

    const card = this.getActiveCard();
    if (card) {
      card.inputLetter(letter);

      if (card.isCompleted()) {
        this.nextCard();
      }

      if (this.isCompleted()) {
        this.pause = true;
      }

      this.checkWordFail();
      this.onUpdate();
    }
  }

  private checkWordFail(): void {
    const card = this.getActiveCard();
    if (card && card.stat.getErrorsCount() >= 3) {
      card.showRightAnswer();
      this.pause = true;
      setTimeout(() => {
        this.pause = false;
        this.nextCard();
        this.onUpdate();
      }, 2000);
    }
  }

  public isCompleted(): boolean {
    return this.cards.every((card) => card.isCompleted());
  }

  public nextCard(): void {
    if (this.pause) return;
    if (this.activeCard < this.cards.length - 1) {
      this.activeCard++;
    }
    this.onUpdate();
  }

  public prevCard(): void {
    if (this.pause) return;
    if (this.activeCard > 0) {
      this.activeCard--;
    }
    this.onUpdate();
  }

  public getCards(): Card[] {
    return this.cards;
  }

  public getTotal(): number {
    return this.cards.length;
  }

  public getCurrent(): number {
    return this.activeCard + 1;
  }

  public getActiveCard(): Card | undefined {
    return this.cards[this.activeCard];
  }
}
