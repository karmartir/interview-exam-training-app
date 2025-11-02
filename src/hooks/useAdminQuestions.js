import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { interviewQuestions as defaultQuestions } from "../questionsData";

export const useAdminQuestions = () => {
  const [questions, setQuestions] = useState({});
  const [activeCategory, setActiveCategory] = useState("developer");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load questions from localStorage or use default
  const getQuestions = () => {
    const saved = localStorage.getItem("interviewQuestions");
    if (saved) {
      return JSON.parse(saved);
    }

    // Check which data source is active
    const useCustomData = localStorage.getItem("useCustomData") === "true";
    if (useCustomData) {
      const myQuestions = require("../my_questionsData").interviewQuestions;
      return myQuestions;
    }

    return defaultQuestions;
  };

  useEffect(() => {
    setQuestions(getQuestions());
  }, []);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions[activeCategory].length,
      question: "",
      answer: "",
    };

    const newIndex = questions[activeCategory].length;

    setQuestions({
      ...questions,
      [activeCategory]: [...questions[activeCategory], newQuestion],
    });

    setEditingQuestion({
      categoryKey: activeCategory,
      index: newIndex,
    });

    toast.info("New question added - scroll down to edit", {
      position: "top-right",
      autoClose: 2000,
    });

    // Scroll to the new question after it renders
    setTimeout(() => {
      const questionCards = document.querySelectorAll(".question-card");
      const lastCard = questionCards[questionCards.length - 1];
      if (lastCard) {
        lastCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  const handleDeleteQuestion = (categoryKey, index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = { ...questions };
      updatedQuestions[categoryKey] = updatedQuestions[categoryKey].filter(
        (_, i) => i !== index
      );

      // Reindex IDs
      updatedQuestions[categoryKey] = updatedQuestions[categoryKey].map(
        (q, i) => ({
          ...q,
          id: i,
        })
      );

      setQuestions(updatedQuestions);

      toast.info("Question deleted", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleEditQuestion = (categoryKey, index) => {
    setEditingQuestion({ categoryKey, index });
  };

  const handleSaveEdit = (categoryKey, index, field, value) => {
    const updatedQuestions = { ...questions };
    updatedQuestions[categoryKey][index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem("interviewQuestions", JSON.stringify(questions));
      console.log("Questions saved to localStorage:", questions);
      setSaveSuccess(true);

      toast.success("✓ Questions saved successfully!", {
        position: "top-center",
        autoClose: 1500,
      });

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Failed to save. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleResetToDefault = () => {
    if (
      window.confirm("This will reset ALL questions to default. Are you sure?")
    ) {
      localStorage.removeItem("interviewQuestions");
      setQuestions(getQuestions());

      toast.success("Reset successful! Click 'Save All Changes' to apply.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return {
    questions,
    activeCategory,
    setActiveCategory,
    editingQuestion,
    setEditingQuestion,
    saveSuccess,
    handleAddQuestion,
    handleDeleteQuestion,
    handleEditQuestion,
    handleSaveEdit,
    handleSaveAll,
    handleResetToDefault,
  };
};
