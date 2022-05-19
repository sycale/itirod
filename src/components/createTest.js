import { Form, Input, Radio } from "antd";
import React, { useState } from "react";

export default function CreateTest() {
  const [questions, setQuestions] = useState([]);
  const [criterias, setCriterias] = useState([]);
  const [questionToAdd, setQuestionToAdd] = useState({});

  const renderQuestionsInput = () => {
    return (
      <div>
        {questions.map((question) => {
          <div>
            <span>Your question: {question.question}</span>
            <span>Answers</span>
            {question.answers.map((answer) => (
              <div>
                <span>
                  {answer.value}
                  {answer.isCorrect && " - correct"}
                </span>
              </div>
            ))}
          </div>;
        })}
        <div>
          <span>Provide question here</span>
          <Input
            onChange={(e) =>
              setQuestionToAdd({ ...questionToAdd, question: e.target.value })
            }
          />
          <div>
            <span>Provide answers here</span>

            <Radio.Group onChange={(e) => console.log(e)}>
              <div>
                <Input
                  onChange={(e) =>
                    setQuestionToAdd({
                      ...questionToAdd,
                      answers: [
                        ...(questionToAdd?.answers || []),
                        { 0: e.target.value },
                      ],
                    })
                  }
                />
                <Radio value={0} />
              </div>
              <div>
                <Input
                  onChange={(e) =>
                    setQuestionToAdd({
                      ...questionToAdd,
                      answers: [
                        ...(questionToAdd?.answers || []),
                        { 1: e.target.value },
                      ],
                    })
                  }
                />
                <Radio value={1} />
              </div>
              <div>
                <Input
                  onChange={(e) => {
                    console.log(e);
                    setQuestionToAdd({
                      ...questionToAdd,
                      answers: [
                        ...(questionToAdd?.answers || []),
                        { 2: e.target.value },
                      ],
                    });
                  }}
                />
                <Radio value={2} />
              </div>
              <div>
                <Input
                  onChange={(e) =>
                    setQuestionToAdd({
                      ...questionToAdd,
                      answers: [
                        ...(questionToAdd?.answers || []),
                        { 3: e.target.value },
                      ],
                    })
                  }
                />
                <Radio value={3} />
              </div>
            </Radio.Group>
          </div>
        </div>
      </div>
    );
  };
  return <div className="test-container">{renderQuestionsInput()}</div>;
}
