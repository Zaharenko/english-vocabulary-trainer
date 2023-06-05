export default class BugTrack {
  private errorsCount: number = 0;

  isError(): boolean {
    return this.errorsCount > 0;
  }

  getErrorsCount(): number {
    return this.errorsCount;
  }

  reset(): void {
    this.errorsCount = 0;
  }

  addError(): void {
    this.errorsCount++;
  }

  setErrors(num: number): void {
    this.errorsCount = num;
  }
}
