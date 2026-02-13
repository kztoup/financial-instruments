import React, { Component, ReactNode } from "react";

/**
 * ErrorBoundary component.
 *
 * Wraps children and catches rendering errors in the component tree below it.
 *
 * @param props.children - React nodes to render inside the boundary.
 *
 * @returns The child tree when no error has occurred, otherwise a fallback UI.
 */

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <button onClick={this.handleReset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
