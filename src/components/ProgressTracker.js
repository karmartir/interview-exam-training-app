import React from "react";
import { Button } from "react-bootstrap";
import AdminPanel from "./AdminPanel/AdminPanel";

function ProgressTracker({
  questionHistory,
  currentQuestions,
  answeredCount,
  resetProgress,
}) {
  return (
    <div className="progress-tracker">
      <div className="progress-item">
        <span className="progress-label">Questions Practiced:</span>
        <span className="progress-value">
          {questionHistory.length} / {currentQuestions.length}
        </span>
      </div>
      <div className="progress-item">
        <span className="progress-label">Answers Viewed:</span>
        <span className="progress-value">{answeredCount}</span>
      </div>
      <div className="progress-buttons">
        <AdminPanel />
        <Button variant="outline-secondary" size="sm" onClick={resetProgress}>
          Reset Progress
        </Button>
      </div>
    </div>
  );
}

export default ProgressTracker;
