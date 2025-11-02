import { useState, useCallback } from "react";

export const useQuestionManager = (currentQuestions) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  const handleRandomQuestion = useCallback(() => {
    setIsShaking(true);
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

  const resetProgress = useCallback(() => {
    setQuestionHistory([]);
    setAnsweredCount(0);
    setSelectedQuestion(null);
    setHasRolled(false);
  }, []);

  return {
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
    resetProgress,
  };
};
