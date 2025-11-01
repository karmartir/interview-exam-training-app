import { Accordion, Button } from "react-bootstrap";
import "./App.css";
import { useState, useEffect } from "react";
import { interviewQuestions } from "./questionsData";

function App() {
  const [activeKey, setActiveKey] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [category, setCategory] = useState("developer");

  const currentQuestions = interviewQuestions[category];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleRandomQuestion = () => {
    setIsShaking(true);
    setShowAnswer(false);
    setTimer(0);
    setIsTimerRunning(false);
    setHasRolled(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * currentQuestions.length);
      setSelectedQuestion(randomIndex);
      setActiveKey(null);
      setIsShaking(false);

      // Add to history if not already there
      if (!questionHistory.includes(randomIndex)) {
        setQuestionHistory([...questionHistory, randomIndex]);
      }
    }, 500);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSelectedQuestion(null);
    setQuestionHistory([]);
    setAnsweredCount(0);
    setShowAnswer(false);
    setTimer(0);
    setIsTimerRunning(false);
    setActiveKey(null);
  };

  const handleStartTimer = () => {
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
  };

  const handleShowAnswer = () => {
    setShowAnswer(!showAnswer);
    if (!showAnswer && selectedQuestion !== null) {
      setAnsweredCount(answeredCount + 1);
      handleStopTimer();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getButtonText = () => {
    if (selectedQuestion === null) {
      return "🎲 Press to choose a question";
    }
    if (isButtonHovered) {
      return "🎲 Roll again...";
    }
    return `Question ${selectedQuestion + 1} selected`;
  };

  const resetProgress = () => {
    setQuestionHistory([]);
    setAnsweredCount(0);
    setSelectedQuestion(null);
    setShowAnswer(false);
    setTimer(0);
    setIsTimerRunning(false);
    setHasRolled(false);
    setCategory("developer");
  };

  return (
    <div className={`app-container ${hasRolled ? "compact" : ""}`}>
      {!hasRolled && (
        <header className="app-header">
          <h1>Interview Questions Practice</h1>
          <p className="subtitle">
            Prepare for your next interview with common questions and answers
          </p>
        </header>
      )}

      <div className="content-wrapper">
        <div className="two-column-layout">
          {/* LEFT COLUMN - Controls and Info */}
          <div className="left-column">
            {/* Progress Tracker */}
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
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={resetProgress}
              >
                Reset Progress
              </Button>
            </div>

            {/* Button Container with Roll and Categories */}
            <div className="buttons-grid">
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

              <div className="category-buttons">
                <Button
                  variant={
                    category === "developer" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleCategoryChange("developer")}
                  className="category-btn"
                >
                  Developer
                </Button>
                <Button
                  variant={
                    category === "devops" ? "primary" : "outline-primary"
                  }
                  onClick={() => handleCategoryChange("devops")}
                  className="category-btn"
                >
                  DevOps
                </Button>
                <Button
                  variant={category === "uiux" ? "primary" : "outline-primary"}
                  onClick={() => handleCategoryChange("uiux")}
                  className="category-btn"
                >
                  UI/UX
                </Button>
                <Button
                  variant={category === "ml" ? "primary" : "outline-primary"}
                  onClick={() => handleCategoryChange("ml")}
                  className="category-btn"
                >
                  Machine Learning
                </Button>
              </div>
            </div>

            {/* Selected Question Display */}
            {selectedQuestion !== null && (
              <div className="selected-question-display">
                <h4>Selected Question:</h4>
                <div className="question-content">
                  <span className="question-num">{selectedQuestion + 1})</span>
                  <span className="question-title">
                    {currentQuestions[selectedQuestion].question}
                  </span>
                </div>
              </div>
            )}

            {/* Timer and Answer Controls */}
            {selectedQuestion !== null && (
              <div className="controls-section">
                <div className="timer-section">
                  <div className="timer-display">{formatTime(timer)}</div>
                  <div className="timer-buttons">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleStartTimer}
                      disabled={isTimerRunning}
                    >
                      ▶ Start
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={handleStopTimer}
                      disabled={!isTimerRunning}
                    >
                      ⏸ Pause
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setTimer(0);
                        setIsTimerRunning(false);
                      }}
                    >
                      ⏹ Reset
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
            )}

            {/* Show answer in a card if button clicked */}
            {showAnswer && selectedQuestion !== null && (
              <div className="answer-card">
                <h5>Answer:</h5>
                <p>{currentQuestions[selectedQuestion].answer}</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Accordion */}
          <div className="right-column">
            {/* Question History */}
            {questionHistory.length > 0 && (
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
            )}

            <Accordion
              activeKey={activeKey}
              onSelect={(key) => setActiveKey(key)}
            >
              {currentQuestions.map((item, index) => (
                <Accordion.Item
                  eventKey={item.id.toString()}
                  key={item.id}
                  className={
                    item.id === selectedQuestion ? "selected-question" : ""
                  }
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
