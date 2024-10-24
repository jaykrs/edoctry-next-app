import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from next/link
import css from "./Navbar.module.css";
import SearchBar from "../../utils/SearchBar/SearchBar";
import Button1 from "../../utils/Buttons/Button1/Button1";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
const Navbar = () => {
  let [menuState, setMenuState] = useState(false);
  const [modal, setModal] = useState(false);
  const router = useRouter(); // Use useRouter hook
  const [data, setData] = useState([]);
  const navigateHandler = () => {
    sessionStorage.setItem("backtoHomePage", true);
    router.push("/"); // Use router.push for navigation
  };
  useEffect(() => {
    let cartData = Cookie.get("cart");
    cartData = cartData ? JSON.parse(cartData) : [];
    setData(cartData.length);
  })

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
          {/* <Link href="/business" style={{ textDecoration: "none" }}>
            <p className={css.hovBox}>Teach on Edoctry</p>
          </Link> */}


          <div className={css.btns}>
            <Link href="/cart" className={css.cartBox}>
              <p>
                <img className={css.cartIcon} src={"/publicContent/icons/shopping-cart.png"} alt="cart icon" />
              </p>
              <p style={{ margin: "-56px 0px 0px 10px" }} >
                {data}
              </p>
            </Link>

            <Link href="/user/login" style={{ textDecoration: "none" }} className={css.profile}>
              <p>
                {/* <Button1 txt="Login" /> */}
                <img src={"/publicContent/icons/user-empty.png"} className={css.profileIcon} />
              </p>
            </Link>
            {/* <Link href="/user/signup" style={{ textDecoration: "none" }}>
              <p>
                <Button1
                  txt="Sign up"
                  bck="#1c1d1f"
                  color="#fff"
                  hovBck="#000"
                />
              </p>
            </Link> */}
            {/* <Button1 disableBtn={true} img={"/publicContent/icons/globe.png"} txt="" onClick={() => setModal(true)} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
