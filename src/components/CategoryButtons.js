import React from "react";
import { Button } from "react-bootstrap";

function CategoryButtons({ categories, category, handleCategoryChange }) {
  return (
    <div className="category-buttons">
      {categories.map(({ key, label }) => (
        <Button
          key={key}
          variant={category === key ? "primary" : "outline-primary"}
          onClick={() => handleCategoryChange(key)}
          className="category-btn"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}

export default CategoryButtons;
