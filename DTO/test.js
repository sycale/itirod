export default class Test {
  questions;
  criterias;

  constructor(_questions, _criterias) {
    this.questions = _questions;
    this.criterias = _criterias;
  }

  toObject() {
    return {
      questions: this.questions.map((question) => question.toObject()),
      criterias: this.criterias,
    };
  }
}
