
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Layout1 from "../../components/Layout1/Layout1";
import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../utils/Buttons/Button1/Button1";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import css from "./Login.module.css";
import Link from "next/link";
import toastComponent from "../../toastComponent";
import ConstData from "../../../urlConst";
import PageLoadingComponent from "../../utils/PageLoadingComponent/PageLoadingComponents";
const Page = () => {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("usertype") && localStorage.getItem("jwt") && localStorage.getItem("loginStatus")){
      router.push("/");
    }
  },[])

  let changeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let submitHandler = () => {
    if (!state.email.includes("@")) {
      toastComponent("ValidationError", "Invalid Email Address");
      return;
    } else if (state.password.length < 8) {
      toastComponent("ValidationError", "Password Length can't be less than 8 characters!");
      return;
    }
    // process.env.API_HOST + 
    axios.post(ConstData.CMS_URL + "auth/local", { identifier: state.email, password: state.password })
      .then(result => {
        console.log("result", result)
        if (result.request.status === 200) {
          localStorage.setItem("jwt", result.data.jwt);
          localStorage.setItem('username', result.data.user.username);
          localStorage.setItem('email', result.data.user.email);
          localStorage.setItem('usertype', result.data.user.usertype);
          localStorage.setItem('loginStatus', true);

          if (result.data.user.usertype === "customer") {
            router.push("/");
          } else if (result.data.user.usertype === "instructor") {
            router.push("/user/my-courses/courseView");
          }
          
          toastComponent("success", "Successfully Logged In");
        } else {
          toastComponent("error", "Something went wrong. Please try again.");
        }
      })
      .catch(error => { 
        if(error.response.status){
          if (error.response.status === 400 && error.message === "Your account has been blocked by an administrator") {
            setBtnStatus(true);
          }
        }
        toastComponent("error", error.message);
      });
  };

  const handleUnBlock = async () => {
    setLoading(true);
    await axios.get(ConstData.CMS_URL + "onboard/email/token/" + state.email)
      .then(res => {
        if (res.status === 200) {
          toastComponent("success", ConstData.textConst.userUnBlockSuccess);
          setTimeout(()=>{
            setMessage(ConstData.textConst.userUnBlockSuccess);
          },3000)
        } else {
          setMessage("Something went Wrong Please");
        }
        setLoading(false);
        setTimeout(()=>{
          setState((prev) => ({
            ...prev,
            ["email"]: "",["password"]:"",
          }));
          setBtnStatus(false);
        },6000)
      }).catch(err => {
        toastComponent("error",err.message);
        setTimeout(()=>{
          setLoading(false);
        },5000)
      })
  }

  return (
    <>
      <Layout1 title="Login">
        <ToastContainer />
        <PageLoadingComponent loading={loading} setLoading={setLoading} />
        <div className={css.outerDiv}>
          <div className={css.loginBox}>
            <div className={css.ttl}>Log in to your Edoctry account</div>
            <hr />
            {message}
            <div className={css.boxBdy}>
              <InputUtil
                type="email"
                name="email"
                state={state.email}
                placeholderTxt="Email"
                onChange={changeHandler}
              />
              {!btnStatus && (
                <InputUtil
                  type="password"
                  name="password"
                  state={state.password}
                  placeholderTxt="Password"
                  onChange={changeHandler}
                />
              )}
              {!btnStatus ? (
                <Button1
                  txt="Login"
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
              ) : (
                <Button1
                  txt="Verify"
                  color="#fff"
                  bck="#a435f0"
                  hovBck="#8710d8"
                  extraCss={{
                    width: "100%",
                    margin: "0",
                    border: "none",
                    padding: "1rem",
                  }}
                  onClick={handleUnBlock}
                />
              )}
              <div className={css.blck}>
                <span className={css.blckTxt}>or</span>
                <a href="/user/ForgotPassword" className={css.anchor}>
                  Forgot password
                </a>
              </div>
              <div className={css.blck}>
                <span className={css.blckTxt}>Log in to a different account?</span>
                <Link href="#" onClick={()=> {
                  setState((prev) => ({
                    ...prev,
                    ["email"]: "",["password"]:"",
                  }));
                  setBtnStatus(false);
                }} className={css.anchor}>
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

export default Page;
