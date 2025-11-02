import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAdminQuestions } from "../../hooks/useAdminQuestions";
import PasswordModal from "./PasswordModal";
import InstructionsAlert from "./InstructionsAlert";
import CategoryTabs from "./CategoryTabs";
import QuestionCard from "./QuestionCard";
import AdminFooter from "./AdminFooter";
import "./AdminPanel.css";

function AdminPanel() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [instructionsClosed, setInstructionsClosed] = useState(false);

  const {
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
  } = useAdminQuestions();

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
      toast.success("✓ Access granted", {
        position: "top-center",
        autoClose: 1500,
      });
    } else {
      setPasswordError("Incorrect password");
      toast.error("✗ Incorrect password", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const handleCloseAdmin = () => {
    setShowAdminPanel(false);
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
      <PasswordModal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        onSubmit={handlePasswordSubmit}
      />

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
            <InstructionsAlert
              show={!instructionsClosed}
              onClose={() => setInstructionsClosed(true)}
            />

            {/* Success Alert */}
            {saveSuccess && (
              <Alert variant="success" className="admin-alert">
                ✅ Questions saved successfully! Reloading...
              </Alert>
            )}

            {/* Category Tabs */}
            <CategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              questions={questions}
            />

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
                  <QuestionCard
                    key={index}
                    question={q}
                    index={index}
                    categoryKey={activeCategory}
                    isEditing={
                      editingQuestion?.categoryKey === activeCategory &&
                      editingQuestion?.index === index
                    }
                    onEdit={handleEditQuestion}
                    onDelete={handleDeleteQuestion}
                    onSave={handleSaveEdit}
                    onDoneEditing={() => setEditingQuestion(null)}
                  />
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <AdminFooter
              onReset={handleResetToDefault}
              onSave={handleSaveAll}
              onClose={handleCloseAdmin}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPanel;
