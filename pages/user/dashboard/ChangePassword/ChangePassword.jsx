import { useState } from "react";
import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../../../utils/Buttons/Button1/Button1";
import css from "./ChangePassword.module.css";
import { CMS_URL, textConst } from "../../../urlConst";
import axios from "axios";
import toastComponent from "../../../toastComponent";
import { ToastContainer } from "react-toastify";

const ChangePassword = (props) => {
  const {loading=false,setLoading=(()=>{})} = props;
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    email : localStorage.getItem("email")
  });
  const [message, setMessage] = useState("");

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
    setLoading(true);
    axios.put(CMS_URL + "/api/onboard/update/password", state,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(response => {
         setLoading(false);
            toastComponent("success",textConst.passwordSuccess);
      },{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
      })
      .catch(err => {
        toastComponent(err.message);
          setTimeout(()=>{
            setLoading(false);
          },5000);

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
                icon={"/publicContent/icons/lock.png"}
                placeholderTxt="Old Password"
                onChange={changeHanlder}
              />

              <InputUtil
                type="password"
                name="newPassword"
                state={state.newPassword}
                icon={"/publicContent/icons/lock.png"}
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
