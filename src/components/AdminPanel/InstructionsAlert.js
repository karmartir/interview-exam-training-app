import React from "react";
import { Alert } from "react-bootstrap";

function InstructionsAlert({ show, onClose }) {
  if (!show) return null;

  return (
    <Alert variant="info" className="admin-instructions">
      <button
        className="instructions-close-btn"
        onClick={onClose}
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
          Other users won't see your changes unless they use the same browser
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
  );
}

export default InstructionsAlert;
