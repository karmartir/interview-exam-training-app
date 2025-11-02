import React from "react";

function SelectedQuestionDisplay({ selectedQuestion, currentQuestions }) {
  if (selectedQuestion === null) return null;

  return (
    <div className="selected-question-display">
      <h4>Selected Question:</h4>
      <div className="question-content">
        <span className="question-num">{selectedQuestion + 1})</span>
        <span className="question-title">
          {currentQuestions[selectedQuestion].question}
        </span>
      </div>
    </div>
  );
}

export default SelectedQuestionDisplay;
