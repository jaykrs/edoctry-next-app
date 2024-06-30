import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Layout1 from "../../components/Layout1/Layout1";

import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../utils/Buttons/Button1/Button1";
import css from "../verifyUser/verifyUser.module.css";
import axios from "axios";
import toastComponent from "../../toastComponent";
import { ToastContainer } from "react-toastify";
import {textConst, CMS_URL} from "../../urlConst"
const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    otp: 0,
    count: 0
  });
  const [btn, setBtn] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useRouter();
  // useEffect(()=>{
  //  // let interval =  setInterval(()=>{
  //   //    if(state.count > 0 ){
  //   //     stateHandler("count", state.count - 1)
  //   //    }
  //   //  }, 2000);
  //   //  if(state.count <= 0){
  //   //     return clearInterval(interval);
  //   //  }
  // },[btn]);
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
    if (state.email !== "") {
      axios.get( CMS_URL + "onboard/newPassword/" + state.email)
        .then(res => {
          setMessage(textConst.ForgotPassword);
          setBtn(true);
          toastComponent("success",textConst.ForgotPassword);
        }).catch(err => {
          toastComponent("error", err.message);
        })
    } else {
      toastComponent("error", "Please enter your valid email!");
    }
  };
  const onBackHandler = () => {
    navigate.push("/user/login");
  }

  const stateHandler = (name, value) => {
    setState(prev => {
      return { ...prev, [`${name}`]: value };
    })
  }
  console.log("btn",btn);
  return (
    <>
      <Layout1 title="forgot-password">
        <ToastContainer />
        <div className={css.outerDiv}>
          <div className={css.loginBox}>
            <div className={css.ttl}>Forgot Password</div>
            <hr />
            {message}
            <div className={css.boxBdy}>
              <InputUtil
                type="email"
                name="email"
                state={state.email}
                icon={"/publicContent/icons/email.png"}
                placeholderTxt="Email"
                onChange={changeHanlder}
              />
              {
                !btn &&
                <Button1
                  txt="Send"
                  color="#fff"
                  bck="#a435f0"
                  hovBck="#8710d8"
                  extraCss={{
                    width: "100%",
                    margin: "0",
                    border: "none",
                    padding: "1rem",
                  }}
                  onClick={submitHandler}
                />
              }
              {
                btn &&
                <Button1
                  txt="Back To Login"
                  color="#fff"
                  bck="#a435f0"
                  hovBck="#8710d8"
                  extraCss={{
                    width: "100%",
                    margin: "0",
                    border: "none",
                    padding: "1rem",
                  }}
                  onClick={onBackHandler}
                />
              }
              {
                btn &&
                <Button1
                  txt="Re Send"
                  color="#fff"
                  bck="#a435f0"
                  hovBck="#8710d8"
                  extraCss={{
                    width: "100%",
                    margin: "5px 0",
                    border: "none",
                    padding: "1rem",
                  }}
                  onClick={submitHandler}
                />
              }

              <div className={css.blck}>
              <span className={css.blckTxt}>Log in to a different account?</span>
                <Link href="/user/login" className={css.anchor}>
                  Login
                </Link>
              </div>
              <div className={css.blck}>
                <span className={css.blckTxt}>Don't have an account?</span>
                <Link href="/user/signup" className={css.anchor}>
                  <b>Signup</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout1>
    </>
  );
};

export default ForgotPassword;
