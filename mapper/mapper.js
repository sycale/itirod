import Question from "../DTO/question.js";
import Test from "../DTO/test.js";

export const JSONtoDTO = (test) => {
  return new Test(
    test.questions.map(
      (question) => new Question(question.question, question.answers)
    ),
    test.criterias
  );
};

export const DTOToJson = (testDTO) => {
  return testDTO.toObject();
};
