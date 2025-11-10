import React from "react";
import { Button } from "react-bootstrap";
import { formatTime } from "../utils/formatTime";

function TimerControls({
  timer,
  isTimerRunning,
  startTimer,
  stopTimer,
  resetTimer,
  showAnswer,
  handleShowAnswer,
}) {
  return (
    <div className="controls-section flex flex-row">
      <div className="timer-section">
        <div className="timer-display">{formatTime(timer)}</div>
        <div className="timer-buttons">
          <Button
            variant="success"
            size="sm"
            onClick={startTimer}
            disabled={isTimerRunning}
          >
            ▶
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={stopTimer}
            disabled={!isTimerRunning}
          >
            ⏸
          </Button>
          <Button variant="danger" size="sm" onClick={resetTimer}>
            ⏹
          </Button>
        </div>
      </div>

      <Button
        variant="info"
        size="lg"
        onClick={handleShowAnswer}
        className="show-answer-button"
      >
        {showAnswer ? "Hide Answer" : "Show Answer"}
      </Button>
    </div>
  );
}

export default TimerControls;
