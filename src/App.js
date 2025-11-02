import "./App.css";
import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hooks
import { useDataSource } from "./hooks/useDataSource";
import { useTimer } from "./hooks/useTimer";
import { useQuestionManager } from "./hooks/useQuestionManager";

// Components
import Header from "./components/Header";
import ProgressTracker from "./components/ProgressTracker";
import RollButton from "./components/RollButton";
import CategoryButtons from "./components/CategoryButtons";
import SelectedQuestionDisplay from "./components/SelectedQuestionDisplay";
import TimerControls from "./components/TimerControls";
import AnswerCard from "./components/AnswerCard";
import QuestionHistory from "./components/QuestionHistory";
import QuestionAccordion from "./components/QuestionAccordion";
import Footer from "./components/Footer";

function App() {
  const [category, setCategory] = useState("developer");
  const [showAnswer, setShowAnswer] = useState(false);

  // Custom Hooks
  const { clickCount, handleSecretClick, getCurrentInterviewQuestions } =
    useDataSource();
  const currentInterviewQuestions = getCurrentInterviewQuestions();
  const currentQuestions = currentInterviewQuestions[category];

  const {
    selectedQuestion,
    setSelectedQuestion,
    questionHistory,
    answeredCount,
    setAnsweredCount,
    isShaking,
    hasRolled,
    activeKey,
    setActiveKey,
    handleRandomQuestion,
    resetProgress: baseResetProgress,
  } = useQuestionManager(currentQuestions);

  const {
    timer,
    isTimerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    setTimer,
    setIsTimerRunning,
  } = useTimer();

  // Category change handler
  const handleCategoryChange = useCallback(
    (newCategory) => {
      setCategory(newCategory);
      setSelectedQuestion(null);
      setShowAnswer(false);
      setTimer(0);
      setIsTimerRunning(false);
      setActiveKey(null);
    },
    [setSelectedQuestion, setTimer, setIsTimerRunning, setActiveKey]
  );

  // Show/Hide answer handler
  const handleShowAnswer = useCallback(() => {
    setShowAnswer((prev) => !prev);
    if (!showAnswer && selectedQuestion !== null) {
      setAnsweredCount((prev) => prev + 1);
      setIsTimerRunning(false);
    }
  }, [showAnswer, selectedQuestion, setAnsweredCount, setIsTimerRunning]);

  // Reset progress with toast
  const resetProgress = useCallback(() => {
    baseResetProgress();
    setCategory("developer");
    setShowAnswer(false);
    setTimer(0);
    setIsTimerRunning(false);

    toast.info("Progress reset", {
      position: "top-right",
      autoClose: 2000,
    });
  }, [baseResetProgress, setTimer, setIsTimerRunning]);

  const categories = [
    { key: "developer", label: "Developer" },
    { key: "devops", label: "DevOps" },
    { key: "uiux", label: "UI/UX" },
    { key: "ml", label: "Machine Learning" },
    { key: "softskills", label: "Soft Skills" },
  ];

  return (
    <div className={`app-container ${hasRolled ? "compact" : ""}`}>
      <ToastContainer />

      {!hasRolled && (
        <Header clickCount={clickCount} handleSecretClick={handleSecretClick} />
      )}

      <div className="content-wrapper">
        <div className="two-column-layout">
          {/* LEFT COLUMN */}
          <div className="left-column">
            <ProgressTracker
              questionHistory={questionHistory}
              currentQuestions={currentQuestions}
              answeredCount={answeredCount}
              resetProgress={resetProgress}
            />

            <div className="buttons-grid">
              <RollButton
                handleRandomQuestion={handleRandomQuestion}
                isShaking={isShaking}
                selectedQuestion={selectedQuestion}
              />
              <CategoryButtons
                categories={categories}
                category={category}
                handleCategoryChange={handleCategoryChange}
              />
            </div>

            <SelectedQuestionDisplay
              selectedQuestion={selectedQuestion}
              currentQuestions={currentQuestions}
            />

            {selectedQuestion !== null && (
              <TimerControls
                timer={timer}
                isTimerRunning={isTimerRunning}
                startTimer={startTimer}
                stopTimer={stopTimer}
                resetTimer={resetTimer}
                showAnswer={showAnswer}
                handleShowAnswer={handleShowAnswer}
              />
            )}

            <AnswerCard
              showAnswer={showAnswer}
              selectedQuestion={selectedQuestion}
              currentQuestions={currentQuestions}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            <QuestionHistory questionHistory={questionHistory} />
            <QuestionAccordion
              currentQuestions={currentQuestions}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              selectedQuestion={selectedQuestion}
              questionHistory={questionHistory}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
