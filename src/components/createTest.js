import { Button, Form, Input, Radio } from "antd";
import React, { useState } from "react";
import Api from "../api/api";

export default function CreateTest() {
  const [questions, setQuestions] = useState([]);
  const [criterias, setCriterias] = useState({});
  const [rightAnswer, setRightAnswer] = useState(null);
  const [linkToTheTest, setLinkForTheTest] = useState(null);

  const postTest = async () => {
    const data = await Api.addTest({ questions, criterias });

    const json = await data.json();

    setLinkForTheTest(json);
  };

  const handleFormSubmit = (e) => {
    if (rightAnswer === null) {
      alert("Please choose right answer");
    } else {
      console.log(e);
      const {
        question,
        firstQuestion,
        secondQuestion,
        thirdQuestion,
        fourthQuestion,
      } = e;
      const questionToAdd = {
        question,
        answers: [
          {
            value: firstQuestion,
            isCorrect: rightAnswer === 0,
          },
          {
            value: secondQuestion,
            isCorrect: rightAnswer === 1,
          },
          {
            value: thirdQuestion,
            isCorrect: rightAnswer === 2,
          },
          {
            value: fourthQuestion,
            isCorrect: rightAnswer === 3,
          },
        ],
      };
      setQuestions([...questions, questionToAdd]);
    }
  };

  const handleCriterias = (e) => {
    const { moreNumber, moreAction, lessNumber, lessAction } = e;
    const criteriasToSend = {
      more: {
        ...criterias.more,
        [moreNumber]: moreAction,
      },
      less: {
        ...criterias.less,
        [lessNumber]: lessAction,
      },
    };

    setCriterias(criteriasToSend);
  };

  const renderCriterias = () => {
    return (
      <div className="d-flex flex-column">
        <div className="d-flex flex-column">
          {criterias.more &&
            Object.keys(criterias.more).map((key) => (
              <>
                <span>
                  {">"} {key} - {criterias.more[key]}
                </span>
              </>
            ))}
        </div>
        <div className="d-flex flex-column">
          {criterias.less &&
            Object.keys(criterias.less).map((key) => (
              <>
                <span>
                  {"<"} {key} - {criterias.less[key]}
                </span>
              </>
            ))}
        </div>{" "}
        <Form onFinish={handleCriterias}>
          <div>
            <span>More: Number</span>
            <Form.Item name="moreNumber">
              <Input />
            </Form.Item>
            <span>Action</span>

            <Form.Item name="moreAction">
              <Input />
            </Form.Item>
          </div>
          <span>Less: Number</span>

          <Form.Item name="lessNumber">
            <Input />
          </Form.Item>
          <span>Action</span>
          <Form.Item name="lessAction">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit Criterias</Button>
          </Form.Item>
        </Form>
      </div>
    );
  };

  const renderQuestionsInput = () => {
    return (
      <div className="mb-5">
        {questions.map((question) => (
          <div className="border">
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
          </div>
        ))}
        <div>
          <Form onFinish={handleFormSubmit} className="">
            <span>Provide question here</span>

            <Form.Item
              name="question"
              rules={[{ required: true, message: "Please  fill this area!" }]}
            >
              <Input name="question" />
            </Form.Item>
            <Form.Item>
              <span>Provide answers here</span>

              <Radio.Group
                name="rightQuestion"
                onChange={(e) => setRightAnswer(e.target.value)}
              >
                <div className="d-flex flex-row">
                  <Form.Item
                    name="firstQuestion"
                    rules={[
                      { required: true, message: "Please  fill this area!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Radio value={0} />
                </div>

                <div className="d-flex flex-row">
                  <Form.Item
                    name="secondQuestion"
                    rules={[
                      { required: true, message: "Please  fill this area!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Radio value={1} />
                </div>

                <div className="d-flex flex-row">
                  <Form.Item
                    name="thirdQuestion"
                    rules={[
                      { required: true, message: "Please  fill this area!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Radio value={2} />
                </div>

                <div className="d-flex flex-row">
                  <Form.Item
                    name="fourthQuestion"
                    rules={[
                      { required: true, message: "Please  fill this area!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Radio value={3} />
                </div>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Add more</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  };
  return (
    <div className="test-container">
      {renderQuestionsInput()}
      {renderCriterias()}
      {linkToTheTest !== null && (
        <span>
          Link to your test -
          <a
            target="_blank"
            rel="noreferrer"
            href={window.location.origin + "/" + linkToTheTest}
          >
            {window.location.origin + "/" + linkToTheTest}
          </a>
        </span>
      )}
      <Button onClick={postTest}>Post Test</Button>
    </div>
  );
}
