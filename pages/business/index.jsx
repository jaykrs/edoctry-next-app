import React, { useEffect, useState } from "react";
import css from "./Edoctry.module.css";
import axios from "axios";
import SearchBar from "../utils/SearchBar/SearchBar";
import Layout1 from "../components/Layout1/Layout1";
import InputUtil from "../utils/FormUtils/InputUtil/InputUtil";
import Button1 from "../utils/Buttons/Button1/Button1";
import ConstData from "../../urlConst";
import toastComponent from "../toastComponent";
import { ToastContainer } from "react-toastify";
const EdoctryForm = () => {
  const [state,setState]= useState({
    userName:"",email:"",phone:"",country:"",address:""
  })
  useEffect(() => {
    
  },[state.email])
  const submitHandler = ()=>{
     if(state.userName === "" && state.email === "" && state.country === "" && state.phone.length === undefined && state.phone.length === 8 ){
       toastComponent("warn",ConstData.textConst.enterMandatoryField);
     }else{
      axios.post(ConstData.CMS_URL + "contacts",{
        data:{
          username:state.userName,phoneNo:state.phone,email:state.email,country:state.country,address:state.address
        }
      }).then(res=>{
        stateHandler("userName","");
        stateHandler("email","");
        stateHandler("phone","");
        stateHandler("address","");
        stateHandler("country","");
        toastComponent("success",ConstData.textConst.edoctryBusiness);
      }).catch(err=>{
        toastComponent("error",err.message);
      })
     }
  }
  const handleChange = (e)=>{
      setState(prev=>{
        return {...prev,[`${e.target.name}`]:e.target.value}
      })
  }
  const stateHandler = (name,value)=>{
    setState(prev=>{
      return {...prev,[`${name}`]:value}
    })
  }
  return (
    <Layout1 title="business">
      <ToastContainer />
      <div className={css.outerDiv}>
        <div className={css.loginBox}>
          <div className={css.boxBdy}>
            <h4>Edoctry Bussiness</h4>
            <hr/><br/>
            <InputUtil
              type="text"
              name="userName"
              placeholderTxt="Type your User Name"
              onChange={handleChange}
              state={state.userName}
              
            />

            <InputUtil
              type="email"
              name="email"
              placeholderTxt="Type your Email"
              onChange={handleChange}
              state={state.email}
            />
            <InputUtil
              type="number"
              name="phone"
              placeholderTxt="Phone Pumber"
              onChange={handleChange}
              state={state.phone}
            />
            <InputUtil
              type="text"
              name="address"
              placeholderTxt="Address "
              onChange={handleChange}
              state={state.address}
            />
            <InputUtil
              type="text"
              name="country"
              placeholderTxt="country "
              onChange={handleChange}
              state={state.country}
            />
            <Button1
              txt="Submit"
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
          </div>
        </div>
      </div>
    </Layout1>
  );
};

export default EdoctryForm;
