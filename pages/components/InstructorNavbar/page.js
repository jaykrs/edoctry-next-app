import React from "react";
import Link from "next/link";
import css from "./InstructorNavbar.module.css";

const InstructorNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    localStorage.removeItem("usertype");
    localStorage.removeItem("email");
    localStorage.setItem("loginStatus", false);
    localStorage.removeItem("customerData");
    localStorage.removeItem("orderPage");
    sessionStorage.clear();
    window.location.reload(true);
  };

  return (
    <div className={css.navbar}>
      <div className={css.right}>
        <Link href="/" passHref>
          <p className={css.hovBox}>Student</p>
        </Link>
        <div className={css.notiBox}>
          <img className={css.notiIcon} src={"/publicContent/icons/notification.png"} alt="notification icon" />
        </div>
        <div className={css.profile}>
          <img src={"/publicContent/icons/user-empty.png"} className={css.profileIcon} />
          <div className={css.menuBox}>
            <div className={css.innerMenuBox}>
              <div className={css.prflDiv}>
                <Link href="/user/profile/settings/basic" passHref>
                  <div className={css.user}>
                    <div className={css.leftUserDiv}>
                      <img src={"/publicContent/icons/user-empty.png"} alt="user profile" className={css.userProfileImg} />
                    </div>
                    <div className={css.rightUserDiv}>
                      {/* <div className={css.uname}>{localStorage.getItem("username")}</div>
                      <div className={css.email}>{localStorage.getItem("email")}</div> */}
                    </div>
                  </div>
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link href="/user/my-courses/learning" passHref>
                  <p className={css.menuItem}>My Learning</p>
                </Link>
                <Link href="/cart" passHref>
                  <p className={css.menuItem}>My Cart</p>
                </Link>
                <Link href="/user/my-courses/wishlist" passHref>
                  <p className={css.menuItem}>My Wishlist</p>
                </Link>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Instructor Dashboard</p>
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Notifications</p>
                </Link>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Messages</p>
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link href="/user/account" passHref>
                  <p className={css.menuItem}>Account Settings</p>
                </Link>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Payment Methods</p>
                </Link>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Subscriptions</p>
                </Link>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Edoctry Credits</p>
                </Link>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Purchase History</p>
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <div className={css.menuItem2}>
                  <span>Language</span>
                  <span>
                    <span>English</span>
                    <img src={"/publicContent/icons/globe.png"} className={css.icon} alt="glob icon" />
                  </span>
                </div>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Public Profile</p>
                </Link>
                <Link href="/user/profile/settings/basic" passHref>
                  <p className={css.menuItem}>Edit Profile</p>
                </Link>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <Link href="/" passHref>
                  <p className={css.menuItem}>Help</p>
                </Link>
                {/* <button onClick={handleLogout} className={"btn btn-primary"} style={{ marginLeft: "5px" }}> */}
                <button  className={"btn btn-primary"} style={{ marginLeft: "5px" }}>
                  Logout
                </button>
              </div>
              <hr className={css.hr} />
              <div className={css.prflDiv}>
                <div className={css.menuItem2}>
                  <span>
                    <div className={css.menuItemTxt1}>Edoctry Business</div>
                    <div className={css.menuItemTxt2}>Bring learning to your company</div>
                  </span>
                  <span>
                    <img src={"/publicContent/icons/exit.png"} className={css.icon} alt="exit icon" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorNavbar;
