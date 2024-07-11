

import React, { useEffect, useState } from "react";
import axios from "axios";
import { CMS_URL, textConst } from "../../../../urlConst";
import { useRouter } from "next/navigation";
// import MDEditor, { commands } from '@uiw/react-md-editor';
import css from "./InstructorChapterViewPage.module.css";
import { MdOutlineCancelPresentation } from "react-icons/md";
import toastComponent from "../../../../toastComponent";
import { ToastContainer } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
import Layout1 from "../../../../components/Layout1/Layout1";
const InstructorChapterViewPage = () => {
  let langOption = [
    { key: "Select Language", value: "" },
    { key: "English", value: "english" },
    { key: "Hindi", value: "hindi" }
  ]
  const navigate = useRouter();
  const [enable, setEnable] = useState(true);
  const [chapterTlt, setChapterTlt] = useState("");
  const [chapterBrief, setChapterBrief] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [state, setState] = useState({
    chapter_duration: 0,
    chapter_brief: "",
    courseunitid: sessionStorage.getItem("unid"),
    chapter_author: localStorage.getItem("email"),
    chapter_content: "",
    id: 0,
    introductory_video: [],
    videoPath: "",
    video:"",
    btnState: false,
  })
  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  useEffect(() => {
    axios.get(CMS_URL + "chapters?filters[id][$eq]=" + sessionStorage.getItem("unitViewid"), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => {
        console.log('chapter', res.data.data)
        let data = res.data.data[0].attributes;
        setChapterTlt(data.chapter_title);
        setChapterBrief(data.chapter_brief);
        setChapterContent(data.chapter_content);
        setState(prev => {
          return {
            ...prev, ["chapter_duration"]: data.chapter_duration, ["chapter_brief"]: data.chapter_brief,
            ["chapter_content"]: data.chapter_content, ["id"]: res.data.data[0].id, ["introductory_video"]: data.chapter_video.split(","),
          }
        })
      }).catch(err => { console.log(err) })
  }, [])

  const handleCreate = () => {
    if (state.unit_title === "" || chapterTlt === "" || chapterBrief === "" || chapterContent === "" || state.chapter_duration === 0) {
       toastComponent("error",textConst.enterMandatoryField);
    } else {
      axios.put(CMS_URL + "chapters/" + state.id, {
        "data": {
          "chapter_title": chapterTlt,
          "chapter_duration": state.chapter_duration,
          "chapter_brief": chapterBrief,
          "chapter_video": state.introductory_video.toString(),
          "chapter_content": chapterContent

        }
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => {
          toastComponent("success",textConst.tableUpdatedSuccess);
          setTimeout(()=>{
            navigate.push("/user/my-courses/unit/view");
          },3000);
        }).catch(err => {
          toastComponent("error",err.message);
        })

    }
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
        toastComponent("success",textConst.videoUploadSuccess);
      })
      .catch((error) => {
        toastComponent("error",error.message);
      });
  }
  const stateHandler = (name, value) => {
    setState(prev => {
      return { ...prev, [`${name}`]: value }
    })
  }
  const handleVideoCancel = (i) => {
    if (confirm("Are you sure, you want to remove video !")) {
      let arr = state.introductory_video;
      arr.splice(i, 1);
      stateHandler("introductory_video", arr);
    }
  }
  const handleVideoPlayer = (url)=>{
     stateHandler("video",url);
     stateHandler("btnState",true);
  }
  return (

    <Layout1 >
      <ToastContainer />
      <div>
        <div style={{ marginTop: "60px", width: "100%", padding: "0 3%" }} className="d-flex justify-content-between">
          <h1>Chapter</h1>
          {
            enable ? <button className="btn btn-secondary" style={{ height: "45px" }} onClick={() => { setEnable(!enable) }}>Edit</button>
              : <div className="d-flex justify-content-between">
                <button className="btn btn-primary" style={{ height: "45px",marginRight:"15px" }} onClick={handleCreate}>Update</button>
                <button className="btn btn-secondary" style={{ height: "45px" }} onClick={() => setEnable(!enable)}>Cancel</button>
              </div>
          }
        </div>

        <div className="d-flex justify-content-row">

          <div style={{ width: "3%" }}></div>
          <div className="row" style={{ width: "94%" }}>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: " 5px 20px" }} >
              <label style={{ marginBottom: "5px" }}><strong>Title<span className="mandatoryField">*</span></strong></label>
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
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6" style={{ padding: " 5px 20px" }}>

              <label for={"chapterD"}><strong>Duration<span className="mandatoryField">*</span></strong></label>
              <input type="text" name="chapter_duration" value={state.chapter_duration} onChange={changeHandler} className={css.inputField} disabled={enable} />

              <br /><br />
              <label style={{ marginBottom: "5px" }}><strong>Video Content</strong></label> <br />
              <input type="file" accept="video/*" onChange={(e) => videoHandler(e)} disabled={enable} />
              <button className="btn btn-secondary" onClick={videoUpload} disabled={enable} >upload</button>
              <p className="d-flex flex-direction-row flex-wrap justify-content-start">
                {
                  state.introductory_video.length > 0 ? state.introductory_video.map((it, index) => {
                    return (
                      <div key={index} className="d-flex justify-content-start addItemStyle"  >  
                        <p onClick={()=> handleVideoPlayer(it)}>Video{index + 1}</p>
                        {!enable && (
                          <span onClick={() => handleVideoCancel(index)}>
                            <IoIosCloseCircle size={25}  className="closeBTn" />
                          </span>
                        )}
                      </div>
                    )
                  })
                    : ""
                }
              </p>

            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: " 5px 20px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Brief<span className="mandatoryField">*</span></strong></label>
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
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: " 5px 20px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Content<span className="mandatoryField">*</span></strong></label>
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
      <div className="outModelDiv" style={{ display: state.btnState ? "" : "none" }}>
        {/* <div className="innerModelDiv"><ReactPlayer url='https://ik.imagekit.io/jaykrs/file_example_MP4_640_3MG_men2_9EcU.mp4' /></div> */}
        <div className="innerModelDiv">
          <button onClick={()=> stateHandler("btnState",false)}><MdOutlineCancelPresentation size={30} /></button>
          <div>
            <video
              src={state.video}
              // poster='https://ik.imagekit.io/ikmedia/example_video.mp4/ik-thumbnail.jpg?tr=w-1200,h-680'
              width='100%'
              height='100%'
              controls
              autoPlay={state.btnState}
              muted={state.btnState}
              onPause={state.btnState}
              playsInline
              loop
            />
          </div>
        </div>
      </div>
    </Layout1>
  )

};

export default InstructorChapterViewPage;
