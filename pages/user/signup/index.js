
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";

import { FaUserPlus } from "react-icons/fa6";
import toastComponent from "../../toastComponent";
import { ToastContainer } from "react-toastify";
import css from "./Signup.module.css";
import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../utils/Buttons/Button2/Button2";
import Layout1 from "../../components/Layout1/Layout1";
import CheckboxUtil from "../../utils/FormUtils/CheckboxUtil/CheckboxUtil";
import Link from "next/link";
import ConstData from "../../../urlConst";
import PageLoadingComponents from "../../utils/PageLoadingComponent/PageLoadingComponents";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    usertype: "",
    check: true,
    block: true,
    confirmed: false,
    role: "Authenticated"
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const changeHandler = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkboxChangeHandler = () => {
    setState((prev) => ({ ...prev, check: !prev.check }));
  };

  const submitHandler = () => {
    if (state.email === "" || state.password === "") {
      toastComponent("error", "Please enter all the mandatory fields!");
      return;
    }

    const regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&*])[a-zA-Z\d@!#$%&*]{8,}$/;

    if (!regx.test(state.email)) {
      toastComponent("error", "Invalid email: " + state.email);
      return;
    }

    if (!passRgx.test(state.password)) {
      toastComponent("error", "Invalid password format.");
      return;
    }
    setLoading(true);
    axios
      .post(ConstData.CMS_URL + "auth/local/register", state)
      .then((response) => {
        if (response.status === 200 && response.data.jwt) {
          const { usertype } = response.data.user;
          const postData = {
            data: {
              [usertype === "customer" ? "customeremail" : "instructoremail"]: state.email,
              [usertype === "customer" ? "customername" : "display_name"]: state.username
            }
          };

          axios
            .post(
              `${ConstData.CMS_URL}${usertype}s`,
              postData
            )
            .then(() => {
              setLoading(false);
              setTimeout(() => {
                toastComponent("success", "Successfully registered!");
              }, 2000);
              router.push("/user/login");
            })

            .catch((err) => {
              toastComponent("error", err.response.data.error.message);
              setTimeout(() => {
                setLoading(false);
              }, 5000)
            });
        } else {
          router.push('/join/signup');
        }
      })
      .catch((err) => {
        
        setTimeout(() => {
          setLoading(false);
          toastComponent("error", err.response.data.error.message);
        }, 4000)
        
      });
  };
  return (
    <>
      <Layout1 title="signup">
        <ToastContainer />
        <PageLoadingComponents loading={loading} setLoading={setLoading} />
        <div className={css.outerDiv}>
          <div className={css.loginBox}>
            <div className={css.ttl}>Sign Up and Start Learning | Edoctry</div>
            <hr />
            {message}
            <div className={css.boxBdy}>
              {/* InputUtil, CheckboxUtil, Button1 components */}
              {/* Replace with your existing components */}
              <InputUtil
                type="text"
                name="username"
                state={state.username}
                icon={"/publicContent/icons/user.png"}
                placeholderTxt="Name"
                onChange={changeHandler}
              />
              <InputUtil
                type="email"
                name="email"
                state={state.email}
                icon={"/publicContent/icons/email.png"}
                placeholderTxt="Email"
                onChange={changeHandler}
              />
              {/* Other InputUtil components */}
              <div className="pb-2">
                <FaUserPlus size={27} className={css.iconStyle} />
                <div>
                  <select
                    className="form-control mb-1 selectStyle"
                    style={{ padding: "12px 0 12px 52px", fontSize: "1rem", fontWeight: " 500", border: "solid 1px #000", borderRadius: "0", color: "#6a6f73", width: "100%", marginBottom: "20px" }}
                    value={state.usertype}
                    name="usertype"
                    onChange={changeHandler}
                  >
                    <option disabled selected>
                      User type
                    </option>
                    <option value="customer">Customer</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
              </div>
              {/* Password InputUtil, CheckboxUtil components */}
              <InputUtil
                type="password"
                name="password"
                state={state.password}
                icon={"/publicContent/icons/lock.png"}
                placeholderTxt="Password"
                onChange={changeHandler}
              />
              <CheckboxUtil
                label="Send me special offers, personalized recommendations, and learning tips."
                type="checkbox"
                name="checkbox"
                id="checkbox"
                state={state.check}
                onChange={checkboxChangeHandler}
              />
              <Button1
                txt="Signup"
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
                <span className={css.blckTxt}>
                  By signing up, you agree to our
                  <a href="/page?pageid=termsOfUseAndPrivacy" className={css.anchor}>
                    Terms of Use
                  </a>
                  and
                  <a href="/page?pageid=termsOfUseAndPrivacy" className={css.anchor}>
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>
              <div className={css.blck}>
                <span className={css.blckTxt2}>Already have an account?</span>
                <Link href="/user/login" className={css.anchor}>
                  <b>Log in</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout1>
    </>
  );
};

export default Signup;
