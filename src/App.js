import { Accordion, Button } from "react-bootstrap";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { interviewQuestions } from "./questionsData";
import { interviewQuestions as myInterviewQuestions } from "./my_questionsData";
import AdminPanel from "./AdminPanel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [clickCount, setClickCount] = useState(() => {
    return parseInt(localStorage.getItem("clickCount")) || 0;
  });
  const [useCustomData, setUseCustomData] = useState(() => {
    return localStorage.getItem("useCustomData") === "true";
  });

  // Use custom data source or default based on toggle
  const baseQuestions = useCustomData
    ? myInterviewQuestions
    : interviewQuestions;

  // Don't pass baseQuestions, let it load from localStorage
  const savedQuestions = localStorage.getItem("interviewQuestions");
  let currentInterviewQuestions;

  if (savedQuestions) {
    // If user has edited questions, use those
    currentInterviewQuestions = JSON.parse(savedQuestions);
  } else {
    // Otherwise use the selected base (custom or default)
    currentInterviewQuestions = baseQuestions;
  }

  const currentQuestions = currentInterviewQuestions[category];

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleSecretClick = () => {
    if (clickCount === 3) {
      // If already showing "!!!", toggle back
      const newUseCustom = !useCustomData;
      setUseCustomData(newUseCustom);
      localStorage.setItem("useCustomData", newUseCustom.toString());

      // Reset count
      setClickCount(0);
      localStorage.setItem("clickCount", "0");

      // Clear any edited questions so it uses the base data
      localStorage.removeItem("interviewQuestions");

      // Show toast notification
      toast.success(
        newUseCustom
          ? "✓ Switched to my_questionsData.js"
          : "✓ Switched back to questionsData.js",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Reload after toast
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      // Increment count
      const newCount = clickCount + 1;
      setClickCount(newCount);
      localStorage.setItem("clickCount", newCount.toString());

      if (newCount === 3) {
        // First time reaching 3
        const newUseCustom = !useCustomData;
        setUseCustomData(newUseCustom);
        localStorage.setItem("useCustomData", newUseCustom.toString());

        // Clear any edited questions so it uses the base data
        localStorage.removeItem("interviewQuestions");

        // Show toast notification
        toast.success(
          newUseCustom
            ? "✓ Switched to my_questionsData.js"
            : "✓ Switched back to questionsData.js",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        // Reload after toast
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  const handleRandomQuestion = useCallback(() => {
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

      setQuestionHistory((prev) =>
        prev.includes(randomIndex) ? prev : [...prev, randomIndex]
      );
    }, 500);
  }, [currentQuestions.length]);

  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
    setSelectedQuestion(null);
    setQuestionHistory([]);
    setAnsweredCount(0);
    setShowAnswer(false);
    setTimer(0);
    setIsTimerRunning(false);
    setActiveKey(null);
  }, []);

  const handleShowAnswer = useCallback(() => {
    setShowAnswer((prev) => !prev);
    if (!showAnswer && selectedQuestion !== null) {
      setAnsweredCount((prev) => prev + 1);
      setIsTimerRunning(false);
    }
  }, [showAnswer, selectedQuestion]);

  const handleTimerReset = useCallback(() => {
    setTimer(0);
    setIsTimerRunning(false);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getButtonText = () => {
    if (selectedQuestion === null) return "🎲 Press to choose a question";
    if (isButtonHovered) return "🎲 Roll again...";
    return `Question ${selectedQuestion + 1} selected`;
  };

  const resetProgress = useCallback(() => {
    setQuestionHistory([]);
    setAnsweredCount(0);
    setSelectedQuestion(null);
    setShowAnswer(false);
    setTimer(0);
    setIsTimerRunning(false);
    setHasRolled(false);
    setCategory("developer");

    toast.info("Progress reset", {
      position: "top-right",
      autoClose: 2000,
    });
  }, []);

  const categories = [
    { key: "developer", label: "Developer" },
    { key: "devops", label: "DevOps" },
    { key: "uiux", label: "UI/UX" },
    { key: "ml", label: "Machine Learning" },
    { key: "softskills", label: "Soft Skills" },
  ];

  return (
    <div className={`app-container ${hasRolled ? "compact" : ""}`}>
      {/* Toast Container */}
      <ToastContainer />

      {!hasRolled && (
        <header className="app-header">
          <h1>
            Interview Questions Practic
            <span
              onClick={handleSecretClick}
              style={{ cursor: "default", userSelect: "none" }}
            >
              e
            </span>
            {clickCount > 0 && "!".repeat(clickCount)}
          </h1>
          <p className="subtitle">
            Prepare for your next interview with common questions and answers
          </p>
        </header>
      )}

      <div className="content-wrapper">
        <div className="two-column-layout">
          {/* LEFT COLUMN */}
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
              <div className="progress-buttons">
                <AdminPanel />
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={resetProgress}
                >
                  Reset Progress
                </Button>
              </div>
            </div>

            {/* Buttons Grid */}
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
                {categories.map(({ key, label }) => (
                  <Button
                    key={key}
                    variant={category === key ? "primary" : "outline-primary"}
                    onClick={() => handleCategoryChange(key)}
                    className="category-btn"
                  >
                    {label}
                  </Button>
                ))}
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
                      onClick={() => setIsTimerRunning(true)}
                      disabled={isTimerRunning}
                    >
                      ▶ Start
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => setIsTimerRunning(false)}
                      disabled={!isTimerRunning}
                    >
                      ⏸ Pause
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleTimerReset}
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

            {/* Answer Card */}
            {showAnswer && selectedQuestion !== null && (
              <div className="answer-card">
                <h5>Answer:</h5>
                <p>{currentQuestions[selectedQuestion].answer}</p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
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

            <Accordion activeKey={activeKey} onSelect={setActiveKey}>
              {currentQuestions.map((item, index) => (
                <Accordion.Item
                  eventKey={String(item.id)}
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

      {/* Footer */}
      <footer className="app-footer">
        <p>Kar-ma.dev registered. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
