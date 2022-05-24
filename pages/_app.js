import '../styles/globals.css';
//db wrapper 
import React, { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import AppErrorFallback from "../components/errors/AppErrorFallback";
if (typeof window === "undefined") {
  global.db = new PrismaClient();
}

const DisableSSR = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    return this.props.children
  }
}

//Context
import { StoreProvider } from "../context/store";
function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);
  

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  pageProps.port = process.env.PORT ?? 3000;

  return (
    <>
      <ErrorBoundary
        onError={(error, info) => {
          if (process.env.NODE_ENV === "production") {
            uploadErrorDetails(error, info);
          }
          setErrorInfo(info);
        }}
        FallbackComponent={(fallbackProps) => {
          return <AppErrorFallback {...fallbackProps} errorInfo={errorInfo} />;
        }}
      >
        <DisableSSR>
          <StoreProvider>
            <Component {...pageProps} />
          </StoreProvider>
        </DisableSSR>
      </ErrorBoundary>
    </>
  );
}

export default MyApp
