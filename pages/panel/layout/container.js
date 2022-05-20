import React, { useState, useEffect } from "react";
import {
  getCookie,
  removeCookie,
  log,
} from "../../../utils/common";
import { StoreContext } from "../../../context/store";
import Head from "next/head";


/* Components */
import SideBar from "./sidebar";
import NavBar from "./navbar";

function AdminContainer(mainProps) {
  const { children } = mainProps;
  const [isOpen, setOpen] = React.useState(false);
  const [session, setSession] = useState(false);
  const store = React.useContext(StoreContext);

  const signOut = () => {
    //return;
    removeCookie("uuid");
    removeCookie("accessToken");
    log(getCookie("accessToken"));
    
    if (typeof window != "undefined") window.location.href = "/login";
  };

  useEffect(() => {
    try {
      fetch("/api/auth/session")
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          log({ data });
          if (typeof data.user != "undefined" && data.user?.id) {
            setSession(data.user);
          } else {
            setSession(false);
          }
        });
    } catch (err) {
      console.log(JSON.stringify(err));
      setSession(false);
    }
  }, [setSession]);

  if (!getCookie("accessToken") || !getCookie("uuid")) {
    signOut();
  }

  store.on("sidebarToggle", (o) => {
    setOpen(o);
  });

  return (
    <>
      <Head>
        <title>Admin | Magenta Capital</title>

        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar
        session={session}
        signOut={() => {
          signOut();
        }}
      />
      <div className="flex overflow-hidden bg-white pt-16">
        <SideBar session={session} />

        <div id="mainContent" className={(isOpen?"is-open ":"is-close") + `h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64`}>
          {children}
        </div>
      </div>
    </>
  );
}

export default AdminContainer;
