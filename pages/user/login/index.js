
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Layout1 from "../../components/Layout1/Layout1";
import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../utils/Buttons/Button1/Button1";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import css from "./Login.module.css"; 
import Link from "next/link";
import toastComponent from "../../toastComponent";
import { CMS_URL } from "../../urlConst";
const Page = () => {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState('');
  const [btnStatus, setBtnStatus] = useState(false);

  let changeHandler = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, 
    }));
  };

   let submitHandler = () => {
    if (!state.email.includes("@")) {
      toastComponent("ValidationError","Invalid Email Address");
      return;
    } else if (state.password.length < 8) {
      toastComponent("ValidationError","Password Length can't be less than 8 characters!");
      return;
    }
// process.env.API_HOST + 
    axios.post( CMS_URL +  "auth/local", { identifier: state.email, password: state.password })
      .then(result => {
        console.log("result",result)
        if (result.request.status === 200) {
          localStorage.setItem("jwt", result.data.jwt);
          localStorage.setItem('username', result.data.user.username);
          localStorage.setItem('email', result.data.user.email);
          localStorage.setItem('usertype', result.data.user.usertype);
          localStorage.setItem('loginStatus', true);

          if (result.data.user.usertype === "customer") {
            router.push("/");
          } else if (result.data.user.usertype === "instructor") {
            router.push("/user/profile/courses");
          }
          toastComponent("success","Successfully Logged In");
        } else {
          toastComponent("error","Something went wrong. Please try again.");
        }
      })
      .catch(error => {
        toastComponent("error",error.message);
        if (error.response.status === 400 && error.response.statusText === "Your account has been blocked by an administrator") {
          setBtnStatus(true);
        }
        console.log("err",error.response);
      });
  };

   const handleUnBlock = async () => {
    // Implement your unblock logic
    // Example using fetch or axios to call API route
    await fetch("/api/unblock-user", {
      method: "POST",
      body: JSON.stringify({ email: state.email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMessage("Email Successfully Sent to your Email, Please Activate your User Id from your Email");
        } else {
          setMessage("Something went Wrong Please try again.");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        setMessage("Something went wrong, please try again.");
      });
   };
  return (
    <>
       <Layout1 title="Login">
       <ToastContainer />
        <div className={css.outerDiv}>
          <div className={css.loginBox}>
            <div className={css.ttl}>Log in to your Edoctry account</div>
            <hr />
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
                  txt="Unblock User Id"
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
              {btnStatus && (
                <div className={css.blck}>
                  <span className={css.blckTxt}>or</span>
                  <a onClick={() => router.reload()} className={css.anchor}>
                    Login
                  </a>
                </div>
              )}
              <div className={css.blck}>
                <span className={css.blckTxt}>or</span>
                <a href="/user/ForgotPassword" className={css.anchor}>
                  Forgot password
                </a>
              </div>
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

export default Page;
