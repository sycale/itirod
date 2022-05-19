export default class Question {
  question;

  answers;

  constructor(_question, _options) {
    this.question = _question;
    this.answers = _options;
  }

  toObject() {
    return {
      question: this.question,
      answers: this.answers,
    };
  }
}
