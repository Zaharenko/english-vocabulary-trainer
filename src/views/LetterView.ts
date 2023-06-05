interface Props {
  letter: string;
  type: 'success' | 'error' | 'default';
  onClick?: (this: HTMLElement, ev: MouseEvent) => any;
}

export default class LetterView {
  private props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  getColorClass(): string {
    switch (this.props.type) {
      case 'error':
        return 'bg-red';
      case 'success':
        return 'bg-green';
      default:
        return 'bg-blue';
    }
  }

  template(): HTMLElement {
    const btnWord = document.createElement('button');

    btnWord.className = `text-white font-bold py-2 px-4 mx-3 rounded ${this.getColorClass()}-500 hover:${this.getColorClass()}-600`;
    btnWord.type = 'button';
    btnWord.dataset.letter = this.props.letter;
    btnWord.textContent = this.props.letter;
    if (this.props.onClick) {
      btnWord.addEventListener('click', this.props.onClick);
    }
    return btnWord;
  }
}
