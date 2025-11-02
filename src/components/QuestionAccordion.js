import React from "react";
import { Accordion } from "react-bootstrap";

function QuestionAccordion({
  currentQuestions,
  activeKey,
  setActiveKey,
  selectedQuestion,
  questionHistory,
}) {
  return (
    <Accordion activeKey={activeKey} onSelect={setActiveKey}>
      {currentQuestions.map((item, index) => (
        <Accordion.Item
          eventKey={String(item.id)}
          key={item.id}
          className={item.id === selectedQuestion ? "selected-question" : ""}
        >
          <Accordion.Header>
            <span className="question-number">{index + 1})</span>
            <span className="question-text">{item.question}</span>
            {questionHistory.includes(index) && (
              <span className="practiced-indicator">✓</span>
            )}
          </Accordion.Header>
          <Accordion.Body>{item.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default QuestionAccordion;
