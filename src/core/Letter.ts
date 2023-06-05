export default class Letter {
  public letter: string;
  public type: 'error' | 'success' | 'default';

  constructor(letter: string, type: 'error' | 'success' | 'default') {
    this.letter = letter;
    this.type = type;
  }
}
