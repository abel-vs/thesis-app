import React from 'react';
import Button from './Button';
import EmojiSadIcon from '@heroicons/react/solid';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center">
          {/* <EmojiSadIcon className="h-20" /> */}
          <h2 className=" font-black text-2xl m-10">Oops, there is an error!</h2>
          <p>{this.state.error}</p>
          <Button text="Try again" onClick={() => this.setState({ hasError: false })} />
        </div>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
