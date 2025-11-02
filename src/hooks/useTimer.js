import { useState, useEffect, useCallback } from "react";

export const useTimer = () => {
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = useCallback(() => setIsTimerRunning(true), []);
  const stopTimer = useCallback(() => setIsTimerRunning(false), []);
  const resetTimer = useCallback(() => {
    setTimer(0);
    setIsTimerRunning(false);
  }, []);

  return {
    timer,
    isTimerRunning,
    startTimer,
    stopTimer,
    resetTimer,
    setTimer,
    setIsTimerRunning,
  };
};
