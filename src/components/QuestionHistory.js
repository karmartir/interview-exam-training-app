import React from "react";

function QuestionHistory({ questionHistory }) {
  if (questionHistory.length === 0) return null;

  return (
    <div className="history-section">
      <h6>Practice History:</h6>
      <div className="history-badges">
        {questionHistory.map((qIndex) => (
          <span key={qIndex} className="history-badge">
            Q{qIndex + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default QuestionHistory;
