import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: '', errorInfo: '' };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div>
            <h1>Something went terribly wrong.</h1>
            <details >
              {this.state.error && this.state.error.toString()}
              <br/>
              {this.state.errorInfo.componentStack}
            </details>
          </div>
          
        );
      }
  
      return this.props.children; 
    }
  }

  // export default {ErrorBoundary};