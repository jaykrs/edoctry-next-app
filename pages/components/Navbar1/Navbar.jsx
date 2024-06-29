import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import css from "./Navbar.module.css";

import MobileNavbar from "./MobileNavbar";
import SearchBar from "../../../utils/SearchBar/SearchBar";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import LanguageChangeCard from "../../Cards/LanguageChangeCard/LanguageChangeCard";
import logo from "../../../../src/publicContent/images/logo/svg/logo-no-background.svg";
import globeIcon from "../../../../src/publicContent/icons/globe.png";
import hamburgerIcon from "../../../../src/publicContent/icons/hamburger.png";
import cartIcon from "../../../../src/publicContent/icons/shopping-cart.png"
const Navbar = () => {
  let [menuState, setMenuState] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
 const nevigateHandler = ()=>{
    sessionStorage.setItem("backtoHomePage",true);
    navigate("/");
 }

  return (
    <>
      <div className={css.navbar}>
        {modal ? <LanguageChangeCard setModal={setModal} /> : ""}
        <div
          className={css.menuBox}
          onClick={() => setMenuState((prev) => !prev)}
        >
          <img src={hamburgerIcon} alt="menu icon" className={css.menuIcon} />
        </div>
        <div className={css.left}>
          <Link className={css.logoBox} to={"/"}>
            <img src={logo} alt="logo" className={css.logo} />
          </Link>
        </div>
        <div className={css.right}>
          {/* <div className={css.catDropdown}>Categories</div> */}
          <div className={css.searchBox}>
            <SearchBar  
            />
          </div>
          <Link className={css.hovBox} to="/bussiness" >
            Teach on Edoctry
          </Link>
          <Link to="/cart" className={css.cartBox}>
            <img
              className={css.cartIcon}
              src={cartIcon}
              alt="cart icon"
            />
          </Link>
          <div className={css.btns}>
            <Button1 txt="Login" link="/join/login" />
            <Button1
              txt="Sign up"
              bck="#1c1d1f"
              link="/join/signup"
              color="#fff"
              hovBck="#000"
            />
            <Button1 disableBtn={true} img={globeIcon} txt="" onClick={() => setModal(true)} />
          </div>
        </div>
      </div>
      {menuState ? <MobileNavbar /> : ""}
    </>
  );
};

export default Navbar;
