import '../styles/globals.css';
//db wrapper 
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

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


//Context
import { StoreProvider } from "../context/store";
function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  pageProps.port = process.env.PORT ?? 3000;

  return (
    <>
      <DisableSSR>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </DisableSSR>
    </>
  );
}

export default MyApp
