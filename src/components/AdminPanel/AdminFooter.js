import React from "react";
import { Button } from "react-bootstrap";

function AdminFooter({ onReset, onSave, onClose }) {
  return (
    <div className="admin-footer">
      <Button variant="warning" size="sm" onClick={onReset}>
        🔄 Reset to Default
      </Button>
      <Button variant="success" size="sm" onClick={onSave}>
        💾 Save All Changes
      </Button>
      <Button variant="secondary" size="sm" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
}

export default AdminFooter;
