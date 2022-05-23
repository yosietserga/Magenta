import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faSignOut } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
} from "reactstrap";
import { getCookie, removeCookie, log } from "../../../utils/common";
import Img from "../../../components/image";
import { StoreContext } from "../../../context/store";



function NavBar(props) {
  const { session } = props;
  const [toggle, setToggle] = React.useState(true);
  const store = React.useContext(StoreContext);

  const handlerToggle = (e) => {
    setToggle(!toggle);
    store.emit("sidebarToggle", toggle);
  }

  const signOut = () => {
    //return;
    removeCookie("uuid");
    removeCookie("accessToken");
    log(getCookie("accessToken"));

    if (typeof window != "undefined") window.location.href = "/login";
  };

  store.on("sidebarClose", () => {
    setToggle(false);
    store.emit("sidebarToggle", false);
  });

  return (
    <>
      <nav className="bg-brand absolute top-0 left-0 w-full z-10 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 shadow-md">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-1 px-4">
          <div className="grid gap-3 grid-cols-3">
            <Button
              className="w-10 max-w-sm bg-purple border-white"
              onClick={handlerToggle}
            >
              <FontAwesomeIcon icon={faAlignLeft} size="sm" />
            </Button>
            <div>
              <Link href="/panel">
                <a>
                  <Img
                    s="logo/logo.png"
                    a="Logo"
                    c="admin-logo"
                    w="120px"
                    h="40px"
                  />
                </a>
              </Link>
            </div>

            <Button
              className="w-10 max-w-sm bg-purple border-white"
              onClick={signOut}
            >
              <FontAwesomeIcon icon={faSignOut} size="sm" />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
