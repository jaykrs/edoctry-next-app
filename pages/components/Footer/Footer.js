"use client"
import { useState } from "react";
import Link from "next/link";
import css from "./Footer.module.css";
import Button1 from "../../utils/Buttons/Button1/Button1"; 
const Footer = () => {
  const [showLanguageSettingsModal, setShowLanguageSettingsModal] = useState(false);

  const handleNavigate = (path) => {
    sessionStorage.setItem("navigatePageCount", 0); 
    window.location.href = path; 
  };

  return (
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.clmns}>
          <div className={css.clmn}>
            <ul className={css.cul}>
              <li className={css.cli}>
                <Link href="/bussiness">Edoctry Business</Link>
              </li>
              <li className={css.cli}>
                <Link href="/">Teach on Edoctry</Link>
              </li>
              <li className={css.cli}>
                <Link href="/">Get the app</Link>
              </li>
              <li className={css.cli}>
                <Link href="/blog/about" >About us</Link>
              </li>
              <li className={css.cli}>
                <Link href="/blog/contacts">Contact us</Link>
              </li>
            </ul>
          </div>
          <div className={css.clmn}>
            <ul className={css.cul}>
              <li className={css.cli}>
                <Link href={"/blog/carrers"}>Careers</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/blogs"} >Blog</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/supports"}>Help and Support</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/affiliate"}>Affiliate</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/investors"}>Investors</Link>
              </li>
            </ul>
          </div>
          <div className={css.clmn}>
            <ul className={css.cul}>
              <li className={css.cli}>
                <Link href={"/blog/investors"}>Terms</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/privacy"}>Privacy policy</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/cookieSetting"}>Cookie settings</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/sitemap"}>Sitemap</Link>
              </li>
              <li className={css.cli}>
                <Link href={"/blog/accessibility"}>Accessibility statement</Link>
              </li>
            </ul>
          </div>
          <div className={[css.lastChild, css.clmn].join(" ")}>
            <Button1
              img={"/publicContent/icons/globe.png"}
              txt="English"
              bck="#1c1d1f"
              color="#fff"
              // onClick={() => setShowLanguageSettingsModal(true)}
              hovBck="rgba(255,255,255,.08)"
              extraCss={{ border: "1px solid #fff" }}
              imageCss={{ filter: "invert(1)" }}
            />
          </div>
        </div>
        <div className={css.creds}>
          <div className={css.cred1}>
            <img className={css.img} src={"/publicContent/images/logo/svg/logo-no-background.svg"} alt="logo" />
          </div>
          <div className={css.cred2}>
            © {new Date().getFullYear()} Edoctry Inc.
          </div>
        </div>
      </div>
      {/* {showLanguageSettingsModal && <LanguageChangeCard setModal={setShowLanguageSettingsModal} />} */}
    </div>
  );
};

export default Footer;
