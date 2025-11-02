import React from "react";
import { Button } from "react-bootstrap";

function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
  questions,
}) {
  return (
    <div className="admin-category-tabs">
      {categories.map(({ key, label }) => (
        <Button
          key={key}
          variant={activeCategory === key ? "primary" : "outline-primary"}
          onClick={() => setActiveCategory(key)}
          className="category-tab-btn"
        >
          {label} ({questions[key]?.length || 0})
        </Button>
      ))}
    </div>
  );
}

export default CategoryTabs;
