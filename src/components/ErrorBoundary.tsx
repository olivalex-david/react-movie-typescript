import React, { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

type State = {
  hasError: boolean;
  error: string;
  errorInfo: string;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false, error: '', errorInfo: ''
  }  
 
  
    static getDerivedStateFromError(_: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      // You can also log the error to an error reporting service
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
            </details>
          </div>
        );
      }
  
      return this.props.children; 
    }
  }

  // export default {ErrorBoundary};