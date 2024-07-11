import InputUtil from "../../../../utils/FormUtils/InputUtil/InputUtil";
import React, { useState } from "react";
import axios from "axios";
import { CMS_URL, textConst } from "../../../../urlConst"; 
import { useRouter } from "next/router";
import Layout1 from "../../../../components/Layout1/Layout1";
//import MDEditor, { commands } from '@uiw/react-md-editor';
import { MdOutlineCancelPresentation } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import toastComponent from "../../../../toastComponent";
const InstructorChapterNew = () => {
  let langOption = [
    { key: "Select Language", value: "" },
    { key: "English", value: "english" },
    { key: "Hindi", value: "hindi" }
  ]
  const navigate = useRouter();
  const [message, setMessage] = useState("");
  const [chapterTlt,setChapterTlt] = useState("");
  const [chapterBrief,setChapterBrief] = useState("");
  const [chapterContent,setChapterContent] = useState("");
  const [state, setState] = useState({
    chapter_duration: 0,
    courseid: localStorage.getItem("courseId"),
    courseunitid: sessionStorage.getItem("unid"),
    chapter_author: localStorage.getItem("email"),
    introductory_video:[],
    videoPath:""
  })
  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
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
        let arr = state.introductory_video;
        arr.push(result.url);
        stateHandler("introductory_video", arr);
        toastComponent("success","video uploaded successfilly");
      })
      .catch((error) => {
        toastComponent("error",error.message);
      });

  }

  const handleCreate = () => {
    if (chapterTlt === "" || chapterBrief === "" || chapterContent === "" || chapterContent === "") {
       toastComponent("error","All the mandatory field are required");
    } else {
      axios.post(CMS_URL + "chapters", {
        "data": {
          "chapter_title": chapterTlt,
          "chapter_duration": state.chapter_duration,
          "chapter_brief": chapterBrief,
          "courseunitid": state.courseunitid,
          "chapter_video" : state.introductory_video.toString(), 
          "chapter_author" : state.chapter_author,
          "chapter_content" : chapterContent

        }
      },{
        headers: {
          Authorization : "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => {
          toastComponent("success",textConst.tableCreatedSuccess);
           setTimeout(()=>{
            navigate.push("/user/my-courses/unit/view");
           },3000);
         
        }).catch(err => {
          toastComponent("error",err.message);
        })

    }
  }

  const handleVideoCancel = (i) => {
    if (confirm("Are you sure, you want to remove video !")) {
      let arr = state.introductory_video;
      arr.splice(i, 1);
      stateHandler("introductory_video", arr);
    }
  }
  const stateHandler = (name, value) => {
    setState(prev => {
      return { ...prev, [`${name}`]: value }
    })
  }

  return (

    <Layout1 >
      <ToastContainer />
      <div>
        <div  className="d-flex justify-content-between m-4">
          <h1>New Unit</h1>
          <button className="btn btn-primary btnUpdate"  onClick={handleCreate}>Create</button>
        </div>

        <div className="d-flex justify-content-row">

          <div style={{ width: "3%" }}></div>
          <div className="row" style={{ width: "94%" }}>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Chapter Title<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={chapterTlt}
                onChange={setChapterTlt}
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{ padding: "20px" }}>
              <InputUtil
                label="Chapter Duration(hour)"
                type="number"
                name="chapter_duration"
                icon={"/publicContent/icons/user.png"}
                state={state.unit_duration}
                placeholderTxt="Enter chapter duration"
                onChange={changeHandler}
                required={true}

              />
              <br/>
              <label style={{ marginBottom: "5px" }}><strong>Introdoctry Video</strong></label> <br />
              <input type="file" accept="video/*" onChange={(e) => videoHandler(e)} />
              <button className="btn btn-secondary" onClick={videoUpload}>upload</button>

              <p className="d-flex flex-direction-row flex-wrap justify-content-start">
                {
                  state.introductory_video.length > 0 ? state.introductory_video.map((it, index) => {
                    return (
                      <div key={index} className="d-flex justify-content-start" style={{ margin: "17px 5px 0 0", color: "blue", fontSize: "20px" }} >
                        <p>Video{index + 1}</p>
                        
                          <span onClick={() => handleVideoCancel(index)} style={{ margin: "-13px 10px 0 0" }}>
                            <MdOutlineCancelPresentation size={20} color="#000" />
                          </span>
                      </div>
                    )
                  })
                    : ""
                }
              </p>

            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px"}}>
              <label style={{ marginBottom: "5px" }}><strong>Chapter Brief<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={chapterBrief}
                onChange={setChapterBrief}
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
              <label style={{ marginBottom: "5px" }}><strong>Chapter Content<span className="mandatoryField">*</span></strong></label>
              {/* <MDEditor
                value={chapterContent}
                onChange={setChapterContent}
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

            
          </div>
          <div style={{ width: "3%" }} >
            
          </div>

        </div>
      </div>
    </Layout1>
  )

};

export default InstructorChapterNew;
