import React, { useState } from "react";
import { Button } from "react-bootstrap";

function RollButton({ handleRandomQuestion, isShaking, selectedQuestion }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const getButtonText = () => {
    if (selectedQuestion === null) return "🎲 Press to choose a question";
    if (isButtonHovered) return "🎲 Roll again...";
    return `Question ${selectedQuestion + 1} selected`;
  };

  return (
    <div className="roll-button-wrapper">
      <Button
        variant="primary"
        size="lg"
        onClick={handleRandomQuestion}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`random-button ${isShaking ? "shaking" : ""}`}
        disabled={isShaking}
      >
        {getButtonText()}
      </Button>
    </div>
  );
}

export default RollButton;
