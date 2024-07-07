"use client"
import { useState, useEffect } from "react";
 import Navbar from "../Navbar";
import LoggedInNavbar from "../LoggedInNavbar/LoggedInNavbar";
import Footer from "../Footer/Footer"; 
import Head from "next/head";
const Layout1 = ({ modal = false, setModal = () => {},title, children }) => {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loginStatus") === "true";
    setAuth(isLoggedIn);
  }, []);
  let comp = <Navbar />;
  if (auth) {
    comp = <LoggedInNavbar />;
  }
  return (
    <>
      {/* {modal && (
        <LoginModal setModal={setModal} />
        // Example of using React Portal directly within the component
        // In Next.js, portals might not be necessary for simple modals, can be managed within component state
        // createPortal(
        //   <LoginModal setModal={setModal} />,
        //   document.getElementById("modal")
        // )
      )} */}
      <Head>
        <title>{title ? title : "Edoctry"} </title>
        <meta name="description" content="web app content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/publicContent/favicon.ico" />
      </Head>
      {comp}
      <div>{children}</div>
      <Footer />

    </>
  );
};

export default Layout1;
