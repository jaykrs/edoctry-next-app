import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Layout1 from "../../Layout1/Layout1";

import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import CheckboxUtil from "../../../utils/FormUtils/CheckboxUtil/CheckboxUtil";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import SelectUtil from "../../../utils/FormUtils/SelectUtil/SelectUtil";

import user from "../../../../src/publicContent/icons/user.png";
import email from "../../../../src/publicContent/icons/email.png";
import lock from "../../../../src/publicContent/icons/lock.png";
import css from "./ChangePassword.module.css";
import { CMS_URL, textConst } from "../../../components/const/urlConst";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa6";
import toastComponent from "../../../toastComponent";
import { ToastContainer } from "react-toastify";

const ChangePassword = () => {
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    email : localStorage.getItem("email")
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  let changeHanlder = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  let submitHandler = () => {
    if(state.oldPassword === "" || state.newPassword === "" || state.oldPassword === state.newPassword){
      toastComponent("error",textConst.newPasswordUpdate);
      return;
    }
   // let passRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
   let passRgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%&*])[a-zA-Z\d@!#$%&*]{8,}$/;

   
    if(!passRgx.test(state.newPassword)){
      toastComponent("error",textConst.invalidData + "password");
    }
    axios.put(CMS_URL + "/api/onboard/update/password", state,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(response => {
            console.log("response",response);
            toastComponent("success",textConst.passwordSuccess);
      },{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
      })
      .catch(err => {
        toastComponent(err.response.data.error.message);

      })

  };

  return (
    <>
        <ToastContainer />
        <div className={css.outerDiv}>
          <div className={css.loginBox}>
            {message}
            <div className={css.boxBdy}>
              <InputUtil
                type="password"
                name="oldPassword"
                state={state.oldPassword}
                icon={lock}
                placeholderTxt="Old Password"
                onChange={changeHanlder}
              />

              <InputUtil
                type="password"
                name="newPassword"
                state={state.newPassword}
                icon={lock}
                placeholderTxt="New Password"
                onChange={changeHanlder}
              />
              <Button1
                txt="Change Password"
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
            </div>
          </div>
        </div>
    </>
  );
};

export default ChangePassword;
