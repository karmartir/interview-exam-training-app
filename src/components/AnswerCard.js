import React from "react";

function AnswerCard({ showAnswer, selectedQuestion, currentQuestions }) {
  if (!showAnswer || selectedQuestion === null) return null;

  return (
    <div className="answer-card">
      <h5>Answer:</h5>
      <p>{currentQuestions[selectedQuestion].answer}</p>
    </div>
  );
}

export default AnswerCard;
