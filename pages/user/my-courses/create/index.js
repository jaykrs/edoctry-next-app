'use client'
import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import css from "./CreateCourse.module.css";
import React, { useState , useEffect} from "react";
import InstructorLayout from "../../../components/InstructorLayout/InstructorLayout";
import axios from "axios";
import { CMS_URL, textConst } from "../../../urlConst";
import { useRouter } from "next/navigation";
import SelectDropdownUtil from "../../../utils/FormUtils/SelectDropdownUtil/SelectDropdownUtil";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import toastComponent from "../../../toastComponent";
import Layout1 from "../../../components/Layout1/Layout1";
import MarkdownTextareaUtils from "../../../utils/MarkdownTextareaUtils/MarkdownTextareaUtils";
import PageLoadingComponents from "../../../utils/PageLoadingComponent/PageLoadingComponents";
const CreateCourse = () => {
  let langOption = [
    { key: "Select Language", value: "" },
    { key: "English", value: "english" },
    { key: "Hindi", value: "hindi" }
  ]
  const navigate = useRouter();
  const [loading,setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [courseTlt, setCourseTlt] = useState("");
  const [courseBrief, setCourseBrief] = useState("");
  const [courseOutline, setCourseOutline] = useState("");
  const [state, setState] = useState({
    course_title: "",
    course_fee: 0,
    course_fee_premium: 0,
    duration: 0,
    language: "",
    course_outline: "",
    course_brief: "",
    instructor: typeof window !== 'undefined' ? localStorage.getItem("email") : "",
    instructorName: typeof window !== 'undefined' ? localStorage.getItem("username") : "",
    metadata: [],
    metadataValue: "",
    fileData: "",
    course_logo: "",
    introductory_video: "",
    videoPath: ""
  })
  const [value, setValue] = useState("");
  const [courseRequirement, setCourseRequirement] = useState("");

  useEffect(() => {
    import('froala-editor/js/plugins/markdown.min.js');
  });

  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCreate = () => {
    
    if (courseTlt === "" || state.course_fee === 0 || state.course_fee_premium === 0 || state.duration === 0 || state.language.value === undefined || courseBrief === "" || courseOutline === "" || state.course_logo === "") {
      toastComponent("error", textConst.enterMandatoryField);
      return;
    } else {
      setLoading(true);
      axios.post(CMS_URL + "courses", {
        "data": {
          "course_title": courseTlt,
          "course_fee": Number(state.course_fee),
          "course_fee_premium": Number(state.course_fee_premium),
          "duration": Number(state.duration),
          "language": state.language.value,
          "course_outline": courseOutline,
          "course_brief": courseBrief,
          "course_logo": state.course_logo,
          "instructor": state.instructor,
          instrucctorName: state.instructorName,
          metadata: state.metadata.toString(),
          course_requirement: courseRequirement,
          introductory_video: state.introductory_video
        }
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => {
          setLoading(false);
          toastComponent("success", "Successfully created!");
          navigate.push("/user/my-courses/courseView");
        }).catch(err => {
          toastComponent("error", err.message);
          setTimeout(()=>{
            setLoading(false);
          },3000)
        })

    }
  }
  const handleNewClick = () => {
    let arr = state.metadata;
    arr.push(state.metadataValue);
    setState(prev => {
      return { ...prev, ["metadata"]: arr, ["metadataValue"]: "" };
    })
  }
  const updateState = (name, value) => {
    setState(prev => {
      return { ...prev, [`${name}`]: value };
    })
  }
  const fileHandler = (e) => {
    stateHandler("fileData", e.target.files[0]);

  }
  const handleUpload = () => {
    setLoading(true);
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
        setLoading(false);
        stateHandler("course_logo", result.thumbnailUrl);
        toastComponent("success", textConst.logoUploadSuccess);
      })
      .catch((error) => {
        toastComponent("error", "Logo" + textConst.uploadFailed)
        setTimeout(()=>{
          setLoading(false);
        },3000)
  });
  }

  const videoHandler = (e) => {
    stateHandler("videoPath", e.target.files[0]);

  }
  const videoUpload = () => {
    setLoading(true);
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
        setLoading(false);
        stateHandler("introductory_video", result.url);
        toastComponent("success", textConst.videoUploadSuccess)
      })
      .catch((error) => {
        toastComponent("error", "Video" + textConst.uploadFailed)
        setTimeout(()=>{
          setLoading(false);
        },3000)
  });
  }
  const stateHandler = (name, value) => {
    setState(prev => {
      return { ...prev, [`${name}`]: value }
    })
  }
  return (

    <Layout1 >
      <ToastContainer />
      <PageLoadingComponents loading={loading} />
      <div>
        <button className="btn mt-3" style={{ marginLeft: "40px" }} onClick={() => { navigate.push("/user/my-courses/courseView") }} ><FaAngleDoubleLeft size={40} /></button>
        <div style={{ margin: "10px  3% 0 3%", }} className="d-flex justify-content-between">
          <h1>Courses</h1>
          <button className="btn btn-primary btnStyle1" onClick={handleCreate}>Create</button>
        </div>

        <div className="d-flex justify-content-row">

          <div style={{ width: "3%" }}></div>
          <div className="row" style={{ width: "94%" }}>

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "20px" }}>
              <InputUtil
                label="Course Fee"
                type="number"
                name="course_fee"
                icon={"/publicContent/icons/user.png"}
                state={state.course_fee}
                placeholderTxt="Enter course fee"
                onChange={changeHandler}

              />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "20px" }}>
              <InputUtil
                label="Course Premium Fee"
                type="number"
                name="course_fee_premium"
                icon={"/publicContent/icons/user.png"}
                state={state.course_fee_premium}
                placeholderTxt="course premium fee"
                onChange={changeHandler}

              />
            </div>

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "20px" }}>
              <InputUtil
                label="Course Duration(hours)"
                type="number"
                name="duration"
                state={state.duration}
                icon={"/publicContent/icons/user.png"}
                placeholderTxt="course duration"
                onChange={changeHandler}

              />
            </div>
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "20px" }}>
              <p style={{ color: "#000", fontSize: "1rem", fontWeight: "700" }}>Language</p>
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
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>

              <MarkdownTextareaUtils
               title="Course Title"
               model={courseTlt}
               setModel={setCourseTlt}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <MarkdownTextareaUtils
               title="Course Brief"
               model={courseBrief}
               setModel={setCourseBrief}
              />
            </div>


            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <MarkdownTextareaUtils
               title="Course Outline"
               model={courseOutline}
               setModel={setCourseOutline}
              />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <MarkdownTextareaUtils
               title="Course Requirement"
               model={courseRequirement}
               setModel={setCourseRequirement}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" style={{ padding: "20px" }}>
              <p style={{ color: "#000", fontSize: "1rem", fontWeight: "700" }}>Search keywords</p>
              <input type="text" className={css.metainput} name="metadataValue" value={state.metadataValue} id="searchInput" placeholder="Add new" onChange={changeHandler}
              />
              <button className="btn btn-primary" onClick={handleNewClick} style={{ width: "57px", height: "44px", margin: "-9px 0 0 -60px" }}>add</button>
              <div className={css.addItemStyle}>
                {state.metadata.length > 0 ? state.metadata.map((item, index) => {
                  return (
                    <>
                      <p key={index}>{item}</p><button className={css.p2Style} onClick={() => {
                        let arr = state.metadata; arr.splice(index, 1); updateState("metadata", arr);
                      }}>X</button>
                    </>
                  )
                })
                  : ""}
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "20px" }}>
              <label style={{ marginBottom: "5px" }}><strong>course Logo</strong></label> <br />
              <input type="file" onChange={(e) => fileHandler(e)} />
              <button className="btn btn-secondary" onClick={handleUpload}> upload</button>
              <br />
              <label style={{ marginBottom: "5px" }}><strong>Introdoctry Video</strong></label> <br />
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

export default CreateCourse;
