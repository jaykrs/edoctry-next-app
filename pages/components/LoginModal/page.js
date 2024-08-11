import { useState } from "react";

import Link from "next/link";

import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../utils/Buttons/Button1/Button1";
import css from "./LoginModal.module.css";
const LoginModal = ({ setModal = () => {} }) => {
  // const { setModal = () => {} } = props;
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const oauth = [
    { img: "/publicContent/icons/facebook.svg", txt: "Continue with Facebook", link: "/facebook-auth" },
    { img: "/publicContent/icons/google.svg", txt: "Continue with Google", link: "/google-auth" },
    { img: "/publicContent/icons/apple-logo.svg", txt: "Continue with Apple", link: "/apple-auth" },
  ];

  let changeHanlder = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  let submitHandler = () => {
    if (!state.email.includes("@") || state.password.length < 10) {
      console.log("Error", state);
      return;
    }
    console.log(state, "Form Values");
  };

  return (
    <>
      <div className={css.outerDiv}>
        <div className={css.loginBox}>
          <div className={css.ttl}>
            <span>Log in to your Edoctry account</span>
            <img
              src={"/publicContent/icons/close.png"}
              alt="close icon"
              className={css.cicon}
              onClick={() => setModal(false)}
            />
          </div>
          <hr />
          <div className={css.boxBdy}>
            {oauth?.map((item, id) => {
              return (
                <div className={css.oauth} key={id}>
                  <img src={item?.img} alt="login img" className={css.icon} />
                  <span className={css.txt}>{item?.txt}</span>
                </div>
              );
            })}
            <InputUtil
              type="email"
              name="email"
              state={state.email}
              icon={"/publicContent/icons/email.png"}
              placeholderTxt="Email"
              onChange={changeHanlder}
            />
            <InputUtil
              type="password"
              name="password"
              state={state.password}
              icon={"/publicContent/icons/lock.png"}
              placeholderTxt="Password"
              onChange={changeHanlder}
            />
            <Button1
              txt="Login"
              color="var(--white)"
              bck="var(--purple)"
              hovBck="var(--purple-dark)"
              extraCss={{
                width: "100%",
                margin: "0",
                border: "none",
                padding: "1rem",
              }}
              onClick={submitHandler}
            />
            <div className={css.blck}>
              <span className={css.blckTxt}>or</span>
              <Link href="/join/forgot-password" className={css.anchor}>
                Forgot password
              </Link>
            </div>
            <div className={css.blck}>
              <Link href="/join/login" className={css.anchor}>
                Log in to a different account
              </Link>
            </div>
            <div className={css.blck}>
              <span className={css.blckTxt}>Dont have an account?</span>
              <Link href="/join/signup" className={css.anchor}>
                <b>Signup</b>
              </Link>
            </div>
            <div className={css.blck}>
              <Link href="/join/login" className={css.anchor}>
                <b>Login with your organization</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
