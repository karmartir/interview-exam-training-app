import { useState, useEffect } from "react";
import { Modal, Form, Alert, Button, Card } from "react-bootstrap";
import { interviewQuestions as defaultQuestions } from "./questionsData";
import "./AdminPanel.css";

function AdminPanel() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [questions, setQuestions] = useState({});
  const [activeCategory, setActiveCategory] = useState("developer");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [instructionsClosed, setInstructionsClosed] = useState(false);

  // Load questions from localStorage or use default
  const getQuestions = () => {
    const saved = localStorage.getItem("interviewQuestions");
    if (saved) {
      return JSON.parse(saved);
    }

    // Check which data source is active
    const useCustomData = localStorage.getItem("useCustomData") === "true";
    if (useCustomData) {
      const myQuestions = require("./my_questionsData").interviewQuestions;
      return myQuestions;
    }

    return defaultQuestions;
  };

  useEffect(() => {
    if (showAdminPanel) {
      setQuestions(getQuestions());
    }
  }, [showAdminPanel]);

  const handleAdminClick = () => {
    setShowPasswordModal(true);
    setPassword("");
    setPasswordError("");
  };

  const handlePasswordSubmit = () => {
    if (password === "1234") {
      setShowPasswordModal(false);
      setShowAdminPanel(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password");
    }
  };

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

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      alert("Failed to save. Please try again.");
    }
  };

  const handleResetToDefault = () => {
    if (
      window.confirm("This will reset ALL questions to default. Are you sure?")
    ) {
      localStorage.removeItem("interviewQuestions");
      setQuestions(getQuestions());
      alert("Reset successful! Click 'Save All Changes' to apply.");
    }
  };

  const handleCloseAdmin = () => {
    setShowAdminPanel(false);
    setSaveSuccess(false);
    setEditingQuestion(null);
  };

  const categories = [
    { key: "developer", label: "Developer" },
    { key: "devops", label: "DevOps" },
    { key: "uiux", label: "UI/UX" },
    { key: "ml", label: "Machine Learning" },
    { key: "softskills", label: "Soft Skills" },
  ];

  return (
    <>
      {/* Admin Button */}
      <Button variant="outline-secondary" size="sm" onClick={handleAdminClick}>
        Admin
      </Button>

      {/* Password Modal */}
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Admin Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handlePasswordSubmit()}
            />
          </Form.Group>
          {passwordError && (
            <Alert variant="danger" className="mt-3 mb-0">
              {passwordError}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Admin Panel - Full Screen */}
      {showAdminPanel && (
        <div className="admin-panel-overlay">
          <div className="admin-panel">
            <div className="admin-header">
              <h2>📝 Admin Panel - Manage Questions</h2>
              <Button variant="danger" onClick={handleCloseAdmin}>
                ✕ Close
              </Button>
            </div>

            {/* Instructions */}
            {!instructionsClosed && (
              <Alert variant="info" className="admin-instructions">
                <button
                  className="instructions-close-btn"
                  onClick={() => setInstructionsClosed(true)}
                  aria-label="Close instructions"
                >
                  ✕
                </button>
                <strong>⚠️ Important Notes:</strong>
                <ul>
                  <li>Changes are saved in your browser's localStorage</li>
                  <li>If you clear browser data, all changes will be lost</li>
                  <li>Each browser/device has its own separate data</li>
                  <li>
                    Other users won't see your changes unless they use the same
                    browser
                  </li>
                </ul>
                <strong>📖 How to use:</strong>
                <ul>
                  <li>
                    <strong>Add:</strong> Click "Add New Question" button
                  </li>
                  <li>
                    <strong>Edit:</strong> Click "Edit" on any question
                  </li>
                  <li>
                    <strong>Delete:</strong> Click "Delete" to remove a question
                  </li>
                  <li>
                    <strong>Save:</strong> Click "Save All Changes" when done
                  </li>
                </ul>
              </Alert>
            )}

            {saveSuccess && (
              <Alert variant="success" className="admin-alert">
                ✅ Questions saved successfully! Reloading...
              </Alert>
            )}

            {/* Category Tabs */}
            <div className="admin-category-tabs">
              {categories.map(({ key, label }) => (
                <Button
                  key={key}
                  variant={
                    activeCategory === key ? "primary" : "outline-primary"
                  }
                  onClick={() => setActiveCategory(key)}
                  className="category-tab-btn"
                >
                  {label} ({questions[key]?.length || 0})
                </Button>
              ))}
            </div>

            {/* Questions List */}
            <div className="admin-content">
              <div className="admin-content-header">
                <h4>
                  {categories.find((c) => c.key === activeCategory)?.label}{" "}
                  Questions
                </h4>
                <Button variant="success" onClick={handleAddQuestion}>
                  ➕ Add New Question
                </Button>
              </div>

              <div className="questions-list">
                {questions[activeCategory]?.map((q, index) => (
                  <Card key={index} className="question-card">
                    <Card.Body>
                      {editingQuestion?.categoryKey === activeCategory &&
                      editingQuestion?.index === index ? (
                        // Edit Mode
                        <div className="question-edit-mode">
                          <Form.Group className="mb-3">
                            <Form.Label>
                              <strong>Question:</strong>
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={2}
                              value={q.question}
                              onChange={(e) =>
                                handleSaveEdit(
                                  activeCategory,
                                  index,
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Enter question here..."
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              <strong>Answer:</strong>
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              value={q.answer}
                              onChange={(e) =>
                                handleSaveEdit(
                                  activeCategory,
                                  index,
                                  "answer",
                                  e.target.value
                                )
                              }
                              placeholder="Enter answer here..."
                            />
                          </Form.Group>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => setEditingQuestion(null)}
                          >
                            ✓ Done Editing
                          </Button>
                        </div>
                      ) : (
                        // View Mode
                        <div className="question-view-mode">
                          <div className="question-header">
                            <h5>Question {index + 1})</h5>
                            <div className="question-actions">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() =>
                                  handleEditQuestion(activeCategory, index)
                                }
                              >
                                ✏️ Edit
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() =>
                                  handleDeleteQuestion(activeCategory, index)
                                }
                              >
                                🗑️ Delete
                              </Button>
                            </div>
                          </div>
                          <div className="question-preview">
                            <p>
                              <strong>Q:</strong>{" "}
                              {q.question || (
                                <em className="text-muted">No question text</em>
                              )}
                            </p>
                            <p>
                              <strong>A:</strong>{" "}
                              {q.answer || (
                                <em className="text-muted">No answer text</em>
                              )}
                            </p>
                          </div>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="admin-footer">
              <Button
                variant="warning"
                size="lg"
                onClick={handleResetToDefault}
              >
                🔄 Reset to Default
              </Button>
              <Button variant="success" size="lg" onClick={handleSaveAll}>
                💾 Save All Changes
              </Button>
              <Button variant="secondary" size="lg" onClick={handleCloseAdmin}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPanel;
