import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import HTMLHead from "./partials/head.js";
import Link from "next/link";
import Img from "../image";

export default function Header() {
  const breakpoint = 1024;

  return (
    <>
      <HTMLHead />

      <header>
          <p></p>
      </header>
    </>
  );
}
