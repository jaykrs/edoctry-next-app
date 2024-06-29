import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout1 from "../../components/Layout1/Layout1";
import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../utils/Buttons/Button1/Button1";
import css from "./verifyUser.module.css";
import axios from "axios";

const VerifyUser = () => {
  const [state, setState] = useState({
    email: "",
    otp: "",
  });
  const [message, setMessage] = useState('');

  const navigate = useRouter();

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
    // if (!state.email.includes("@") || state.password.length < 10) {
    //   console.log("Error", state);
    //   return;
    // }

    axios.post(CMS_URL + "/api/auth/local", { identifier: state.email, password: state.password })
      .then(result => {
        console.log('userdata', result)

        if (result.request.status === 200) {
          localStorage.setItem("jwt", result.data.jwt)
          localStorage.setItem('username', result.data.user.username);
          localStorage.setItem('email', result.data.user.email);
          localStorage.setItem('usertype', result.data.user.usertype);
          localStorage.setItem('loginStatus', true);

          if (result.data.user.usertype === "customer") {
            axios.get(CMS_URL + "/api/customers?filters[customeremail][$eq]=" + result.data.user.email ,{
              headers:{
                Authorization: "Bearer " + localStorage.getItem("jwt")
              }
            })
              .then(res => {
                localStorage.setItem("customerid", res.data.data[0].id)
                if (localStorage.getItem("orderPage") === "backToOrderPage") {
                  navigate.push("/cart")
                }else if("buyItem" === "backToCourseDetails"){
                   navigate("/coursesDetails")
                } else {
                  navigate.push("/")
                }
              })
              .catch(err => {
                console.log(err);
              })
          } else if (result.data.user.usertype === "instructor") {
            axios.get(CMS_URL + "/api/instructors?filters[instructoremail][$eq]=" + result.data.user.email ,{
              headers:{
                Authorization: "Bearer " + localStorage.getItem("jwt")
              }
            })
              .then(res => {
                console.log('ins',res)
                localStorage.setItem("instructorid", res.data.data[0].id)
                navigate.push("/user/profile/courses");
              })
              .catch(err => {
                console.log(err);
              })
          }
          setMessage("you are successfully login");
          
          
        } else {
          setMessage("something went wrong , please try to signin again ")
        }
      })
      .catch(error => {
        setMessage("Status code: " + error.response.data.error.status + ", message : " + error.response.data.error.message)
      });


  };

  return (
    <>
      <Layout1>
        <div className={css.outerDiv}>
          <div className={css.loginBox}>
            <div className={css.ttl}>Verify your Edoctry account</div>
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
              <InputUtil
                type="number"
                name="otp"
                state={state.otp}
                icon={"/publicContent/icons/lock.png"}
                placeholderTxt="6 digit otp"
                onChange={changeHanlder}
              />
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
              <div className={css.blck}>
                <span className={css.blckTxt}>or</span>
                <Link to="/user/ForgotPassword" className={css.anchor}>
                  Forgot password
                </Link>
              </div>
              <div className={css.blck}>
                <Link to="/user/login" className={css.anchor}>
                  Log in to a different account
                </Link>
              </div>
              <div className={css.blck}>
                <span className={css.blckTxt}>Dont have an account?</span>
                <Link to="/user/signup" className={css.anchor}>
                  <b>Signup</b>
                </Link>
              </div>
              <div className={css.blck}>
                <Link to="/user/login" className={css.anchor}>
                  <b>Login with your organization</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout1>
    </>
  );
};

export default VerifyUser;
