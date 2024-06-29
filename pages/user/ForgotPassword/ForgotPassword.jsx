import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Layout1 from "../../Layout1/Layout1";

import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../../utils/Buttons/Button1/Button1";

import fImg from "../../../../src/publicContent/icons/facebook.svg";
import gImg from "../../../../src/publicContent/icons/google.svg";
import aImg from "../../../../src/publicContent/icons/apple-logo.svg";
import email from "../../../../src/publicContent/icons/email.png";
import lock from "../../../../src/publicContent/icons/lock.png";
import { CMS_URL, textConst } from "../../../components/const/urlConst";

import css from "../verifyUser/verifyUser.module.css";
import axios from "axios";
import toastComponent from "../../../toastComponent";
import { ToastContainer } from "react-toastify";

const ForgotPassword = () => {
  const [state, setState] = useState({
    email: "",
    otp: 0,
    count:0
  });
  const [btn, setBtn] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
// useEffect(()=>{
//   let interval =  setInterval(()=>{
//      if(state.count > 0 ){
//       stateHandler("count", state.count - 1)
//      }
//    }, 2000);
//    if(state.count <= 0){
//       return clearInterval(interval);
//    }
// },[state.count]);
  const oauth = [
    { img: fImg, txt: "Continue with Facebook", link: "/facebook-auth" },
    { img: gImg, txt: "Continue with Google", link: "/google-auth" },
    { img: aImg, txt: "Continue with Apple", link: "/apple-auth" },
  ];

  let changeHanlder = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  let submitHandler = () => {
     if(state.email !== ""){
        axios.get( CMS_URL +  "/api/onboard/newPassword/" + state.email)
     .then(res=>{
        setMessage(textConst.ForgotPassword);
        setBtn(true);
         toastComponent("success",textConst.ForgotPassword);
         console.log("response",res)
     }).catch(err=>{
      toastComponent("error",err.message);
     })
     }else{
        toastComponent("error","Please enter your valid email!");
     }
  };
const onBackHandler = ()=>{
   navigate("/join/login");
}

const stateHandler = (name, value)=>{
  setState(prev=>{
    return {...prev, [`${name}`]: value};
  })
}
  return (
    <>
      <Layout1>
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
                icon={email}
                placeholderTxt="Email"
                onChange={changeHanlder}
              />
              {
                !btn &&
                <Button1
                txt="Send"
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
              }
              {
                btn &&
                <Button1
                txt="Back To Login"
                color="var(--white)"
                bck="var(--purple)"
                hovBck="var(--purple-dark)"
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
                  color="var(--white)"
                  bck="var(--purple)"
                  hovBck="var(--purple-dark)"
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
                <Link to="/join/login" className={css.anchor}>
                  Log in to a different account
                </Link>
              </div>
              <div className={css.blck}>
                <span className={css.blckTxt}>Dont have an account?</span>
                <Link to="/join/signup" className={css.anchor}>
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
