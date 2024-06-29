"use client"
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
 import Navbar from "../Navbar"; // Assuming custom path alias configured
import LoggedInNavbar from "../LoggedInNavbar/LoggedInNavbar"; // Assuming custom path alias configured
import Footer from "../Footer/Footer"; // Assuming custom path alias configured
// import LoginModal from "@/components/Auth/LoginModal/LoginModal"; // Assuming custom path alias configured

const Layout1 = ({ modal = false, setModal = () => {}, children }) => {
 // const router = useRouter();
  const [auth, setAuth] = useState(false); // Next.js does not rely on localStorage for initial state, use cookies or server-side data fetching for authentication

  // Example of setting authentication state based on cookie or server-side data
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
      {comp}
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout1;
