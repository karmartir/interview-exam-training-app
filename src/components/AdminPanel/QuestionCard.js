import React from "react";
import { Card, Button } from "react-bootstrap";
import QuestionEditor from "./QuestionEditor";

function QuestionCard({
  question,
  index,
  categoryKey,
  isEditing,
  onEdit,
  onDelete,
  onSave,
  onDoneEditing,
}) {
  return (
    <Card className="question-card">
      <Card.Body>
        {isEditing ? (
          <QuestionEditor
            question={question}
            onSave={(field, value) => onSave(categoryKey, index, field, value)}
            onDone={onDoneEditing}
          />
        ) : (
          <div className="question-view-mode">
            <div className="question-header">
              <h5>Question {index + 1})</h5>
              <div className="question-actions">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onEdit(categoryKey, index)}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(categoryKey, index)}
                >
                  🗑️ Delete
                </Button>
              </div>
            </div>
            <div className="question-preview">
              <p>
                <strong>Q:</strong>{" "}
                {question.question || (
                  <em className="text-muted">No question text</em>
                )}
              </p>
              <p>
                <strong>A:</strong>{" "}
                {question.answer || (
                  <em className="text-muted">No answer text</em>
                )}
              </p>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default QuestionCard;
