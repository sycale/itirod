import { Button, Select } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../api/api";
import { JSONtoDTO } from "../mapper/mapper";

export default function Test() {
  const [test, setTest] = useState();
  const [result, setResult] = useState({});
  const [score, setScore] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTestById = async (testId) => {
      const json = await Api.fetchGetTestById(testId);
      const data = await json.json();
      setTest(JSONtoDTO(data));
    };
    fetchTestById(id);
  }, [id]);

  const checkAnswers = () => {
    let score = 0;
    Object.keys(result).forEach((key) => {
      const rightAnswer = test.questions[key].answers.filter(
        (answer) => answer.isCorrect
      )[0];

      if (result[key] === rightAnswer.value) {
        score += 1;
      }
    });
    setScore(score);

    handleCriterias(-1);
  };

  const handleCriterias = (score) => {
    const { criterias } = test;

    const moreValues = criterias.more;
    const lessValues = criterias.less;

    const moreValuesArr = Object.keys(moreValues);
    const lessValuesArr = Object.keys(lessValues);

    const biggestValue = moreValuesArr
      .filter((value) => value < score)
      .slice(-1)[0];

    const smallestValue = lessValuesArr
      .filter((value) => value > score)
      .slice(-1)[0];

    if (biggestValue) {
      eval(moreValues[biggestValue]);
    }

    if (smallestValue) {
      eval(lessValues[smallestValue]);
    }
  };

  const renderQuestions = () => {
    const { questions } = test;
    return questions.map((question) => {
      return (
        <div className="question-container">
          <span>{question.question}</span>
          <Select
            options={question.answers}
            onChange={(e) =>
              setResult({
                ...result,
                [test.questions.indexOf(question)]: e,
              })
            }
          />
        </div>
      );
    });
  };

  return (
    <div className="test-container">
      {test && renderQuestions()}
      <Button
        className="submit-btn"
        onClick={checkAnswers}
        disabled={score !== null}
      >
        Submit Results
      </Button>
      {score !== null && (
        <span className="result-score">Your score is {score}</span>
      )}
    </div>
  );
}
