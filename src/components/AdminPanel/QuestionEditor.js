import React from "react";
import { Form, Button } from "react-bootstrap";

function QuestionEditor({ question, onSave, onDone }) {
  return (
    <div className="question-edit-mode">
      <Form.Group className="mb-3">
        <Form.Label>
          <strong>Question:</strong>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={question.question}
          onChange={(e) => onSave("question", e.target.value)}
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
          value={question.answer}
          onChange={(e) => onSave("answer", e.target.value)}
          placeholder="Enter answer here..."
        />
      </Form.Group>
      <Button variant="success" size="sm" onClick={onDone}>
        ✓ Done Editing
      </Button>
    </div>
  );
}

export default QuestionEditor;
