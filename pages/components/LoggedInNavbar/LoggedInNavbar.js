//"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchBar from "../../utils/SearchBar/SearchBar"; // Adjust path as per your setup
import css from "./LoggedInNavbar.module.css";
import { useRouter } from "next/router";
const LoggedInNavbar = () => {
  const [menuState, setMenuState] = useState(false);
  const [showLanguageSettingsModal, setShowLanguageSettingsModal] = useState(false);
  const [login, setLogin] = useState(false);
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem("email") : "";
  const userName = typeof window !== 'undefined' ? localStorage.getItem("username") : "";
  const userType = typeof window !== 'undefined' ? localStorage.getItem("usertype") : "";
  const [data, setData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      setLogin(true);
    }
  }, []);

  const handleLogout = () => {
    setLoading(true);
    localStorage.clear();
    sessionStorage.clear()
    router.push("/");
    if(router.asPath === "/"){
       window.location.reload(true);
    }
    setLoading(false);

  };

  return (
    <div className={css.navbar}>
      <div style={{ display: loading ? 'block' : 'none' }}>
        <div className={"overlay"}></div>
        <div className={"spinner_wrapper"}>
          <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
      <div className={css.left}>
        <Link href="/" className={css.linkOver}>
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
          <Link href="/business" passHref className={css.linkOver}>
            <p className={css.anchor}>Edoctry Business</p>
          </Link>
        </div>
        {userType === "instructor" && (
          <Link href="/user/my-courses/courseView" passHref className={css.linkOver} >
            <p className={css.hovBox}>Instructor</p>
          </Link>
        )}
        {userType === "customer" && (
          <Link href="/user/my-courses" passHref className={css.linkOver}>
            <p className={css.hovBox}>My Learning</p>
          </Link>
        )}
        <Link href="/cart" passHref className={css.linkOver}>
          <p className={css.cartBox} style={{ marginRight: "23px" }}>
            <img className={css.cartIcon} src={"/publicContent/icons/heart.png"} alt="wishlist icon" />
          </p>
        </Link>
        <p style={{ margin: "-23px -23px 0 0" }} className={css.cartValue}>
          {data.length}
        </p>
        <Link href="/cart" passHref className={css.linkOver}>
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
                    userType === "customer" &&
                    <Link href="/user/my-courses/learning" className={css.menuItem}>
                      My Learning
                    </Link>
                  }
                  {userType === "customer" &&
                    <Link href="/cart" className={css.menuItem} style={{ display: 'flex', justifyContent: "space-between" }}>
                      <p>My Cart</p> <h6>{data.length}</h6>
                    </Link>}
                  {userType === "customer" &&
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
                  {userType === "customer" &&
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
