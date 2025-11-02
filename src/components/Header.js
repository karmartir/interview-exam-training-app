import React from "react";

function Header({ clickCount, handleSecretClick }) {
  return (
    <header className="app-header">
      <h1>
        Interview Questions Practic
        <span
          onClick={handleSecretClick}
          style={{ cursor: "default", userSelect: "none" }}
        >
          e
        </span>
        {clickCount > 0 && "!".repeat(clickCount)}
      </h1>
      <p className="subtitle">
        Prepare for your next interview with common questions and answers
      </p>
    </header>
  );
}

export default Header;
