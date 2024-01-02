export default class nallaPointerException extends Error {
  constructor(errorMessage: string) {
    const errorName = "nallaPointerException";
    errorMessage = errorName + ": " + errorMessage;
    super(errorMessage);
    this.name = errorName;
    this.message = errorMessage;
  }
}
