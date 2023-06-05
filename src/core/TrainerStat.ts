import Game from './Game';

export default class TrainerStat {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  noErrorWordsCount(): number {
    return this.game.getCards().filter((card) => !card.stat.isError()).length;
  }

  errorsCount(): number {
    return this.game
      .getCards()
      .reduce((prev, current) => prev + current.stat.getErrorsCount(), 0);
  }

  worstWord(): string {
    const cards = this.game.getCards();
    const sortedCards = cards.sort(
      (a, b) => b.stat.getErrorsCount() - a.stat.getErrorsCount()
    );
    const card = sortedCards[0];
    if (card) {
      return card.word.getWord();
    }
    return '';
  }
}
