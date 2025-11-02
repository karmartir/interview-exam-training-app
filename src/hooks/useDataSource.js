import { useState } from "react";
import { toast } from "react-toastify";
import { interviewQuestions } from "../questionsData";
import { interviewQuestions as myInterviewQuestions } from "../my_questionsData";
import { TOAST_CONFIG } from "../constants/toastConfig";

export const useDataSource = () => {
  const [clickCount, setClickCount] = useState(() => {
    return parseInt(localStorage.getItem("clickCount")) || 0;
  });
  const [useCustomData, setUseCustomData] = useState(() => {
    return localStorage.getItem("useCustomData") === "true";
  });

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
        TOAST_CONFIG.success
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
          TOAST_CONFIG.success
        );

        // Reload after toast
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  // Get current interview questions based on data source
  const getCurrentInterviewQuestions = () => {
    const baseQuestions = useCustomData
      ? myInterviewQuestions
      : interviewQuestions;
    const savedQuestions = localStorage.getItem("interviewQuestions");

    if (savedQuestions) {
      return JSON.parse(savedQuestions);
    }
    return baseQuestions;
  };

  return {
    clickCount,
    useCustomData,
    handleSecretClick,
    getCurrentInterviewQuestions,
  };
};
