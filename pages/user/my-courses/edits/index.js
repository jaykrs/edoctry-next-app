
import React, { useEffect, useState } from "react";
import Layout1 from "../../../components/Layout1/Layout1";
import axios from "axios";
import { CMS_URL, textConst } from "../../../urlConst";
import { useRouter } from "next/router";
import SelectDropdownUtil from "../../../utils/FormUtils/SelectDropdownUtil/SelectDropdownUtil";
import css from "./CourseEditPage.module.css"
// import MDEditor, { commands } from '@uiw/react-md-editor';
import { IoIosCloseCircle } from "react-icons/io";
import toastComponent from "../../../toastComponent";
import { ToastContainer } from "react-toastify";
const CourseEditPage = () => {
  let langOption = [
    { key: "Select Language", value: "" },
    { key: "English", value: "english" },
    { key: "Hindi", value: "hindi" }
  ]
  const navigate = useRouter();
  const [message, setMessage] = useState("");
  const [courseTlt,setCourseTlt] = useState("");
  const [courseBrief,setCourseBrief] = useState("");
  const [courseOuline,setCourseOutline] = useState("");
  const [courseRequirement,setCourseRequirements] = useState("");
  const [state, setState] = useState({
    course_title: "",
    course_fee: 0,
    course_fee_premium: 0,
    duration: 0,
    language: "",
    course_outline: "",
    course_brief: "",
    instructor: "",
    metadata: [],
    metadataValue: "",
    fileData: "",
    course_logo:"",
    introductory_video:"",
    videoPath:""
  })

  useEffect(() => {
    axios.get(CMS_URL + "courses?filters[id][$eq]=" + sessionStorage.getItem("courseEditId"))
      .then(res => {
        let data = res.data.data[0];
        setCourseTlt(data.attributes.course_title);
        setCourseBrief(data.attributes.course_brief);
        setCourseOutline(data.attributes.course_outline);
        setCourseRequirements(data.attributes.course_requirement)
        setState(prev => {
          return {
            ...prev, ["course_logo"]: data.attributes.course_logo, ["course_fee"]: data.attributes.course_fee,
            ["course_fee_premium"]: data.attributes.course_fee_premium, ["duration"]: data.attributes.duration,
            ["language"]: data.attributes.language, ["course_outline"]: data.attributes.course_outline,
            ["introductory_video"]: data.attributes.introductory_video,["metadata"]:data.attributes.metadata.split(","),["instructor"]:localStorage.getItem("email")
          }
          
        })
      }).catch(err => {
        console.log(err)
      })
  }, [])
  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const stateHandler = (name,value)=>{
    setState(prev=>{
      return {...prev,[`${name}`]: value}
    })
  }
  const handleNewClick = () => {
    let arr = state.metadata;
    arr.push(state.metadataValue);
    setState(prev => {
      return { ...prev, ["metadata"]: arr, ["metadataValue"]: "" };
    })
  }

  const handleCreate = () => {
    if (courseTlt === "" || state.course_fee === 0 || state.course_fee_premium === 0 || state.language.value === "" || courseBrief === "" || courseOuline === "") {
      return toastComponent("warn",textConst.enterMandatoryField);
    } else {
      axios.put(CMS_URL + "courses/" + sessionStorage.getItem("courseEditId"), {
        "data": {
          "course_title": courseTlt,
          "course_fee": state.course_fee,
          "course_fee_premium": state.course_fee_premium,
          "duration": state.duration,
          "language": state.language.value,
          "course_outline": courseOuline,
          "course_brief": courseBrief,
          "course_logo": state.course_logo,
          "instructor": state.instructor,
          "introductory_video":state.introductory_video,
          "metadata":state.metadata.toString(),
          "course_requirement":courseRequirement
        }
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => {
          toastComponent("success",textConst.tableUpdatedSuccess);
          setTimeout(()=>{
            navigate.push("/user/my-courses/view")
          },3000)
        }).catch(err => {
          toastComponent("error",err.message);
        })

    }
  }

  const fileHandler = (e) => {
    stateHandler("fileData", e.target.files[0]);

  }
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("file", state.fileData);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch(CMS_URL + "onboard/fileupload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        stateHandler("course_logo",result.thumbnailUrl);
        toastComponent("success",textConst.videoUploadSuccess);
      })
      .catch((error) => toastComponent("error",error.message));
  }

  const videoHandler = (e) => {
    stateHandler("videoPath", e.target.files[0]);

  }
  const videoUpload = () => {
    const formdata = new FormData();
    formdata.append("file", state.videoPath);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch(CMS_URL + "onboard/fileupload", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        stateHandler("introductory_video",result.url);
        toastComponent("success",textConst.videoUploadSuccess);
      })
      .catch((error) => ctoastComponent("error",error.message));
  }


  return (

    <Layout1 >
      <ToastContainer />
      <div>
        <div style={{ margin: "50px 5% 0 5%" }} className="d-flex justify-content-between">
          <h1>Courses</h1>
          <button className="btn btn-primary btnStyle1"  onClick={handleCreate}>Update</button>
        </div>

        <div className="d-flex justify-content-row">

          <div style={{ width: "3%" }}></div>
          <div className="row" style={{ width: "94%" }}>


            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "5px 30px" }}>
              <label for={"courseFee"}><strong>Fee<span className="mandatoryField">*</span></strong></label>
              <input type="number" name="course_fee" value={state.course_fee} onChange={changeHandler} className={css.inputField} />

            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "5px 30px" }}>
              <label for={"courseFee"}><strong>Premium Fee<span className="mandatoryField">*</span></strong></label>
              <input type="number" name="course_fee_premium" value={state.course_fee_premium} onChange={changeHandler} className={css.inputField} />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "5px 30px" }}>

              <label for={"courseFee"}><strong>Duration<span className="mandatoryField">*</span></strong></label>
              <input type="number" name="duration" value={state.duration} onChange={changeHandler} className={css.inputField} />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "5px 30px" }}>
              <label for={"courseFee"}><strong>Language<span className="mandatoryField">*</span></strong></label>
              <SelectDropdownUtil
                id="language"
                filterType="language"
                defaultValue={langOption[0]}
                value={state.language}
                multipleOptions={false}
                options={langOption}
                selectBoxCss={{ height: "auto" }}
                setValue={setState}
              />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Title<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={courseTlt}
                onChange={setCourseTlt}
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
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <p style={{ color: "#000", fontSize: "1rem", fontWeight: "700" }}>Search keywords<span className="mandatoryField">*</span></p>
              <input type="text" className={css.metainput} name="metadataValue" value={state.metadataValue} id="searchInput" placeholder="Add new" onChange={changeHandler}
              />
              {
                state.metadataValue !== "" ? 
                <button className="btn btn-primary" onClick={handleNewClick} style={{ width: "81px", height: "53px", margin: "-7px 0 0 -80px" }}  >Add</button>
                : <button className="btn btn-secondary"  style={{ width: "81px", height: "53px", margin: "-7px 0 0 -80px" }} disabled >Add</button>
              }
              <div className={"addItemStyle"}>
                {state.metadata.length > 0 ? state.metadata.map((item, index) => {
                  return (
                    <>
                      <p key={index}>{item}</p><button className={css.p2Style} onClick={() => {
                        let arr = state.metadata; arr.splice(index, 1); stateHandler("metadata", arr);
                      }}><IoIosCloseCircle size={25}  className={"closeBTn"}/></button>
                    </>
                  )
                })
                  : ""}
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Brief<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={courseBrief}
                onChange={setCourseBrief}
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
              <label style={{ marginBottom: "5px" }}><strong>Outline<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={courseOuline}
                onChange={setCourseOutline}
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
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Requirement<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={courseRequirement}
                onChange={setCourseRequirements}
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
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Logo<span className="mandatoryField">*</span></strong></label> <br />
              <input type="file" accept="image/*" onChange={(e) => fileHandler(e)} />
              <button className="btn btn-secondary" onClick={handleUpload}> upload</button>
               <br/>
              <label style={{ marginBottom: "5px" }}><strong>Introdoctry Video<span className="mandatoryField">*</span></strong></label> <br />
              <input type="file" accept="video/*" onChange={(e) => videoHandler(e)} />
              <button className="btn btn-secondary" onClick={videoUpload}>upload</button>
            </div>



          </div>
          <div style={{ width: "3%" }} >
            
          </div>

        </div>
      </div>
    </Layout1>
  )

};

export default CourseEditPage;
