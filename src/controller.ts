import Game, { GameOptions } from './core/Game';
import LetterView from './views/LetterView';
import WordRandom from './data/WordRandom';
import words from './data/words.json';
import Letter from './core/Letter';

const Elements = {
  total: '#total_questions',
  current: '#current_question',
  shuffled: '#letters',
  answer: '#answer',
  quizBlock: '#quiz',
  statBlock: '#stat',
};

export default class Controller {
  private game: Game;

  constructor() {
    this.startGame();
    document.addEventListener('keypress', this.keyboardHandler.bind(this));
  }

  startGame() {
    const words = this.getRandomWords(6);
    const options: GameOptions = {
      words,
      onUpdate: this.renderGame.bind(this),
    };
    this.game = new Game(options);
    this.renderGame();
  }

  getRandomWords(num: number): WordRandom[] {
    const shuffledWords = words.slice().sort(() => Math.random() - 0.5);
    return shuffledWords
      .slice(0, num)
      .map((word: string) => new WordRandom(word || ''));
  }

  renderGame() {
    this.renderHeader();
    this.renderAnswer();
    this.renderShuffle();

    if (this.game.isCompleted()) {
      this.renderStatistic();
    }
  }

  renderHeader() {
    const currentEl = document.querySelector(Elements.current) as HTMLElement;
    currentEl.textContent = String(this.game.getCurrent());

    const totalEl = document.querySelector(Elements.total) as HTMLElement;
    totalEl.textContent = String(this.game.getTotal());
  }

  renderAnswer() {
    const answerEl = document.querySelector(Elements.answer) as HTMLElement;
    answerEl.innerHTML = '';

    const card = this.game.getActiveCard();
    card?.answerLetters.forEach((letterInstance: Letter) => {
      const letterView = new LetterView({
        letter: letterInstance.letter,
        type: letterInstance.type,
      });

      const letterTemplate = letterView.template();
      if (letterTemplate) {
        answerEl.appendChild(letterTemplate);
      }
    });
  }

  renderShuffle() {
    const shuffledEl = document.querySelector(Elements.shuffled) as HTMLElement;
    shuffledEl.innerHTML = '';

    const card = this.game.getActiveCard();
    card?.shuffleLetters.forEach((letterInstance: Letter) => {
      const letterView = new LetterView({
        letter: letterInstance.letter,
        type: letterInstance.type,
        onClick: () => this.onLetterClick(letterInstance),
      });

      const letterEl = letterView.template();
      if (letterEl) {
        shuffledEl.appendChild(letterEl);
      }
    });
  }

  onLetterClick(letterInstance: Letter) {
    this.input(letterInstance.letter);
    const card = this.game.getActiveCard();
    if (card?.getNextLetter() !== letterInstance.letter) {
      letterInstance.type = 'error';
      this.renderGame();
    }
  }

  input(letter: string) {
    this.game.inputLetter(letter);
  }

  renderStatistic() {
    const quizBlockEl = document.querySelector(
      Elements.quizBlock
    ) as HTMLElement;
    quizBlockEl.style.display = 'none';

    const statBlockEl = document.querySelector(
      Elements.statBlock
    ) as HTMLElement;
    statBlockEl.style.display = 'flex';
    statBlockEl.innerHTML = `
      <p>Words with no errors: ${this.game.stat.noErrorWordsCount()}</p>
      <p>Errors count: ${this.game.stat.errorsCount()}</p>
      <p>Word with most errors: ${this.game.stat.worstWord()}</p>
    `;
  }

  keyboardHandler(event: KeyboardEvent) {
    const letter = event.key;
    this.game.inputLetter(letter);
  }
}

new Controller();
