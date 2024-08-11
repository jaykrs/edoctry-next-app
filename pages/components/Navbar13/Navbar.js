"use client"
import React, { useState } from "react";
import Link from "next/link";
import css from "./Navbar.module.css";
import SearchBar from "../../utils/SearchBar/SearchBar";
import Button1 from "../../utils/Buttons/Button1/Button1";
const Navbar = () => {
  let [menuState, setMenuState] = useState(false);
  const [modal, setModal] = useState(false);
  const navigateHandler = () => {
    sessionStorage.setItem("backtoHomePage", true);
    router.push("/");
  };
  return (
    <>
      <div className={css.navbar}>
        <div className={css.menuBox} onClick={() => setMenuState((prev) => !prev)}>
          <img src={"/publicContent/icons/hamburger.png"} alt="menu icon" className={css.menuIcon} />
        </div>
        <div className={css.left}>
          <Link href="/">
            <p className={css.logoBox}>
              <img
              src="/publicContent/images/logo/svg/logo-no-background.svg" // Adjust path relative to public folder
              alt="Logo"
              className={css.logo}
            />
            </p>
          </Link>
        </div>
        <div className={css.right}>
          <div className={css.searchBox}>
            <SearchBar />
          </div>
          <Link href="/bussiness">
            <p className={css.hovBox}>Teach on Edoctry</p>
          </Link>
          <Link href="/cart" className={css.cartBox}>
            <div>
              <img className={css.cartIcon} src={"/publicContent/icons/shopping-cart.png"} alt="cart icon" />
            </div>
          </Link>
          <div className={css.btns}>
            <Link href="/user/login">
              <div>
                <Button1 txt="Login" />
              </div>
            </Link>
            <Link href="/user/signup">
              <div>
                <Button1
                  txt="Sign up"
                  bck="#1c1d1f"
                  color="#fff"
                  hovBck="#000"
                />
              </div>
            </Link>
            <Button1 disableBtn={true} img={"/publicContent/icons/globe.png"} txt="" onClick={() => setModal(true)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
