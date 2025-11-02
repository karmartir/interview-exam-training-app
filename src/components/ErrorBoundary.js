import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // You could send to error tracking service here (Sentry, etc.)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "3rem 2rem",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>😕</h1>
          <h2 style={{ color: "#333", marginBottom: "1rem" }}>
            Oops! Something went wrong
          </h2>
          <p style={{ color: "#666", marginBottom: "0.5rem" }}>
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <details style={{ marginTop: "1rem", textAlign: "left" }}>
            <summary style={{ cursor: "pointer", color: "#666" }}>
              Technical details
            </summary>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "1rem",
                borderRadius: "4px",
                overflow: "auto",
                fontSize: "0.85rem",
                marginTop: "0.5rem",
              }}
            >
              {this.state.error?.stack}
            </pre>
          </details>
          <button
            onClick={this.handleReset}
            style={{
              marginTop: "2rem",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
