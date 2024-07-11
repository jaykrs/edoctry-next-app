import InputUtil from "../../../../utils/FormUtils/InputUtil/InputUtil";
import { FaEnvelopeOpenText } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CMS_URL, textConst } from "../../../../urlConst"; 
import { useRouter } from "next/navigation";
import Layout1 from "../../../../components/Layout1/Layout1";
import css from "./InstructorUnitEditPage.module.css";
// import MDEditor, { commands } from '@uiw/react-md-editor';
import toastComponent from "../../../../toastComponent";
const InstructorUnitEditPage = () => {
  let langOption = [
    { key: "Select Language", value: "" },
    { key: "English", value: "english" },
    { key: "Hindi", value: "hindi" }
  ]
  const navigate = useRouter();
  const [message, setMessage] = useState("");
  const [unitTlt,setUnitTlt] = useState("");
  const [unitBrief,setUnitBrief] = useState("");
  const [labProject,setLabProject] = useState("");
  const [state, setState] = useState({
    unit_duration: 0,
    courseid: localStorage.getItem("courseId"),
    labproject_attachment:"",
    unit_introductory_video: "",
    id:0
  })

  useEffect(()=>{
    axios.get(CMS_URL + "courseunits?filters[id][$eq]=" + sessionStorage.getItem("unitEditId"))
    .then(res=>{
        let data= res.data.data[0].attributes;
        setUnitTlt(data.unit_title);
        setUnitBrief(data.unit_brief);
        setLabProject(data.labproject);
        setState(prev=>{
            return {...prev, ["unit_duration"]:data.unit_duration,["id"]:res.data.data[0].id
        }
        })
    })
  }, [])
  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCreate = () => {
    if (unitTlt === "" || unitBrief === "" || labProject === "") {
      return toastComponent("error", textConst.enterMandatoryField);
    } else {
      axios.put(CMS_URL + "courseunits/" + state.id, {
        "data": {
          "unit_title": unitTlt,
          "unit_duration": state.unit_duration,
          "labproject": labProject,
          "unit_brief": unitBrief,
          "courseid": state.courseid,
          "unit_introductory_video" : state.unit_introductory_video
        }
      },{
        headers : { Authorization : "Bearer " + localStorage.getItem("jwt")}
      })
        .then(res => {
          toastComponent("success",textConst.tableUpdatedSuccess);
          setTimeout(()=>{
            navigate.push("/user/my-courses/view");
          },3000);
          
        }).catch(err => {
           toastComponent("error",err.message);
        })

    }
  }

  return (

    <Layout1 >
      <div>
        <div style={{ margin: "40px  4% 0 4%"}} className="d-flex justify-content-between">
          <h1>Unit</h1>
          <button className="btn btn-primary btnStyle1" onClick={handleCreate}>Update</button>
        </div>

        <div className="d-flex justify-content-row">

          <div style={{ width: "3%" }}></div>
          <div className="row" style={{ width: "94%" }}>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Title<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={unitTlt}
                onChange={setUnitTlt}
                preview="edit"
                components={{
                  toolbar: (command, disabled, executeCommand) => {
                    if (command.keyCommand === 'code') {
                      return (
                        <button
                          aria-label="Insert code"
                          disabled={disabled}
                          onClick={(evn) => {
                            evn.stopPropagation();
                            executeCommand(command, command.groupName)
                          }}
                        >
                          Code
                        </button>
                      )
                    }
                  }
                }}
                
              /> */}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px"}}>
              <label style={{ marginBottom: "5px" }}><strong>Brief<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={unitBrief}
                onChange={setUnitBrief}
                preview="edit"
                components={{
                  toolbar: (command, disabled, executeCommand) => {
                    if (command.keyCommand === 'code') {
                      return (
                        <button
                          aria-label="Insert code"
                          disabled={disabled}
                          onClick={(evn) => {
                            evn.stopPropagation();
                            executeCommand(command, command.groupName)
                          }}
                        >
                          Code
                        </button>
                      )
                    }
                  }
                }}
                
              /> */}
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Lab Project<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={labProject}
                onChange={setLabProject}
                preview="edit"
                components={{
                  toolbar: (command, disabled, executeCommand) => {
                    if (command.keyCommand === 'code') {
                      return (
                        <button
                          aria-label="Insert code"
                          disabled={disabled}
                          onClick={(evn) => {
                            evn.stopPropagation();
                            executeCommand(command, command.groupName)
                          }}
                        >
                          Code
                        </button>
                      )
                    }
                  }
                }}
                
              /> */}
            </div>

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "5px 30px" }}>
              {/* <InputUtil
                label="Unit Duration(hour)"
                type="number"
                name="unit_duration"
                icon={user}
                state={state.unit_duration}
                placeholderTxt="Enter unit duration"
                onChange={changeHandler}

              /> */}
              <label>Duration(hour)<span className="mandatoryField">*</span></label>
              <input type="number" name="unit_duration" value={state.unit_duration} onChange={changeHandler} className={css.inputField} />
            </div>
          </div>
          <div style={{ width: "3%" }} >
            
          </div>

        </div>
      </div>
    </Layout1>
  )

};

export default InstructorUnitEditPage;
