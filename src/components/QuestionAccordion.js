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
            {/* Practiced indicator first */}
            {questionHistory.includes(index) && (
              <span className="practiced-indicator me-2">✓</span>
            )}

            {/* Then question number */}
            <span className="question-number me-2">{index + 1})</span>

            {/* Then question text */}
            <span className="question-text">{item.question}</span>
          </Accordion.Header>
          <Accordion.Body>{item.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default QuestionAccordion;
