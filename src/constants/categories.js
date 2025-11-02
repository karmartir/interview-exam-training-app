export const CATEGORIES = [
  { key: "softskills", label: "Soft Skills" },
  { key: "developer", label: "Developer" },
  { key: "devops", label: "DevOps" },
  { key: "uiux", label: "UI/UX" },
  { key: "ml", label: "Machine Learning" },
];

export const DEFAULT_CATEGORY = "softskills";

// Get admin password from environment variable
export const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "1234";

// Secret click count for data source toggle
export const SECRET_CLICK_COUNT =
  parseInt(process.env.REACT_APP_SECRET_CLICK_COUNT) || 3;

// App info
export const APP_NAME =
  process.env.REACT_APP_NAME || "Interview Questions Practice";
export const APP_AUTHOR = process.env.REACT_APP_AUTHOR || "Kar-ma.dev";
