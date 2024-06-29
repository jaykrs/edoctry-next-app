"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../../utils/SearchBar/SearchBar"; // Adjust path as per your setup
import css from "./LoggedInNavbar.module.css";

const LoggedInNavbar = () => {
  const [menuState, setMenuState] = useState(false);
  const [showLanguageSettingsModal, setShowLanguageSettingsModal] = useState(false);
  const [login, setLogin] = useState(false);
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("username");
  const [data, setData] = useState([]);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      setLogin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("usertype");
    localStorage.removeItem("email");
    localStorage.setItem("loginStatus", false);
    localStorage.removeItem("customerData");
    localStorage.removeItem("orderPage");
    window.location.reload(true);
  };

  return (
    <div className={css.navbar}>
      <div className={css.left}>
        <Link href="/">
          <div className={css.logoBox}>
            <img src={"/publicContent/images/logo/svg/logo-no-background.svg"} alt="logo" className={css.logo} />
          </div>
        </Link>
      </div>
      <div className={css.right}>
        <div className={css.searchBox}>
          <SearchBar />
        </div>
        <div className={css.hovBox} target="_blank">
          <Link href="/business" passHref>
            <p className={css.anchor}>Edoctry Business</p>
          </Link>
        </div>
        {localStorage.getItem("usertype") === "instructor" && (
          <Link href="/user/profile/courses" passHref>
            <p className={css.hovBox}>Instructor</p>
          </Link>
        )}
        {localStorage.getItem("usertype") === "customer" && (
          <Link href="/user/my-courses/learning" passHref>
            <p className={css.hovBox}>My Learning</p>
          </Link>
        )}
        <Link href="/cart" passHref>
          <p className={css.cartBox} style={{ marginRight: "23px" }}>
            <img className={css.cartIcon} src={"/publicContent/icons/heart.png"} alt="wishlist icon" />
          </p>
        </Link>
        <p style={{ margin: "-23px -23px 0 0" }} className={css.cartValue}>
          {data.length}
        </p>
        <Link href="/cart" passHref>
          <p className={css.cartBox}>
            <img className={css.cartIcon} src={"/publicContent/icons/shopping-cart.png"} alt="cart icon" />
          </p>
        </Link>
        {
          login ? <div className={css.profile}>
            <img src={"/publicContent/icons/user-empty.png"} className={css.profileIcon} />
            <div className={css.menuBox} >
              <div className={css.innerMenuBox}>
                <div className={css.prflDiv}>
                  <Link href="/user/profile/settings/basic" className={css.user}>
                    <div className={css.leftUserDiv}>
                      <img
                        src={"/publicContent/icons/user-empty.png"}
                        alt="user profile"
                        className={css.userProfileImg}
                      />
                    </div>
                    <div className={css.rightUserDiv}>
                      <div className={css.uname}>{userName}</div>
                      <div className={css.email}>{userEmail}</div>
                    </div>
                  </Link>
                </div>
                <hr className={css.hr} />
                <div className={css.prflDiv}>
                  {
                    localStorage.getItem("usertype") === "customer" &&
                    <Link href="/user/my-courses/learning" className={css.menuItem}>
                      My Learning
                    </Link>
                  }
                  {localStorage.getItem("usertype") === "customer" &&
                    <Link href="/cart" className={css.menuItem} style={{ display: 'flex', justifyContent: "space-between" }}>
                      <p>My Cart</p> <h6>{data.length}</h6>
                    </Link>}
                  {localStorage.getItem("usertype") === "customer" &&
                    <Link href="/user/my-courses/wishlist" className={css.menuItem}>
                      My Wishlist
                    </Link>}
                  {
                    // localStorage.getItem("usertype") === "instructor" &&
                    <Link href="/user/profile/dashboard/courses" className={css.menuItem}>
                      Dashboard
                    </Link>}
                </div>
                <hr className={css.hr} />
                <div className={css.prflDiv}>
                  <Link href="/" className={css.menuItem}>
                    Notifications
                  </Link>
                  <Link href="/" className={css.menuItem}>
                    Messages
                  </Link>
                </div>
                <hr className={css.hr} />
                <div className={css.prflDiv}>
                  {/* <Link to="/user/account" className={css.menuItem}>
                    Account Settings
                  </Link> */}
                  {localStorage.getItem("usertype") === "customer" &&
                    <Link href="/" className={css.menuItem}>
                      Payment Methods
                    </Link>}
                  <Link href="/" className={css.menuItem}>
                    Subscriptions
                  </Link>
                  <Link href="/" className={css.menuItem}>
                    Edoctry Credits
                  </Link>
                  <Link href="/" className={css.menuItem}>
                    Purchase History
                  </Link>
                </div>
                <hr className={css.hr} />
                <div className={css.prflDiv}>
                  <div className={css.menuItem2}>
                    <span onClick={() => setShowLanguageSettingsModal(true)}>
                      Language
                    </span>
                    <span onClick={() => setShowLanguageSettingsModal(true)}>
                      <span>English</span>
                      <img src={"/publicContent/icons/globe.png"} className={css.icon} alt="glob icon" />
                    </span>
                  </div>
                </div>
                <hr className={css.hr} />
                <div className={css.prflDiv}>
                  <Link href="user/koushil" className={css.menuItem}>
                    Public Profile
                  </Link>
                  <Link
                    href="/user/profile/settings/basic"
                    className={css.menuItem}
                  >
                    Edit Profile
                  </Link>
                </div>
                <hr className={css.hr} />
                <div className={css.prflDiv}>
                  <Link href="/" className={css.menuItem}>
                    Help
                  </Link>
                </div>
                <div>
                  <button onClick={() => handleLogout()} className={"btn btn-primary"} style={{ marginLeft: "20px" }}>
                    Logout
                  </button>
                </div>
                <hr className={css.hr} />
                <div className={css.prflDiv}>
                  <div className={css.menuItem2}>
                    <span>
                      <div className={css.menuItemTxt1}>Edoctry Bussiness</div>
                      <div className={css.menuItemTxt2}>
                        Bring learning to your company
                      </div>
                    </span>
                    <span>
                      <img src={"/publicContent/icons/exit.png"} className={css.icon} alt="exit icon" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
            : <Link href={"/user/signup"} >signup</Link>
        }
      </div>
    </div>
  );
};

export default LoggedInNavbar;
