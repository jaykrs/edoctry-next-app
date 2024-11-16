import InputUtil from "../../../../utils/FormUtils/InputUtil/InputUtil";
import { FaEnvelopeOpenText } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ConstData from "../../../../../urlConst";
import { useRouter } from "next/navigation";
import Layout1 from "../../../../components/Layout1/Layout1";
import css from "./InstructorUnitEditPage.module.css";
import toastComponent from "../../../../toastComponent";
import MarkdownTextareaUtils from "../../../../utils/MarkdownTextareaUtils/MarkdownTextareaUtils";
import PageLoadingComponents from "../../../../utils/PageLoadingComponent/PageLoadingComponents";
import { ToastContainer } from "react-toastify";
const InstructorUnitEditPage = () => {
  let langOption = [
    { key: "Select Language", value: "" },
    { key: "English", value: "english" },
    { key: "Hindi", value: "hindi" }
  ]
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [unitTlt, setUnitTlt] = useState("");
  const [unitBrief, setUnitBrief] = useState("");
  const [labProject, setLabProject] = useState("");
  const [state, setState] = useState({
    unit_duration: 0,
    courseid: 0,
    labproject_attachment: "",
    unit_introductory_video: "",
    id: 0
  })

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("usertype") !== "instructor" || localStorage.getItem("loginStatus") === "false" || localStorage.getItem("email") === "") {
      localStorage.clear();
      sessionStorage.clear();
      navigate.push("/");
      setLoading(false);
    }
    let courseId = localStorage.getItem("courseId");
    setState((prev) => {
      return { ...prev, ["courseid"]: courseId };
    });
    
    axios.get(ConstData.CMS_URL + "courseunits?filters[id][$eq]=" + sessionStorage.getItem("unitEditId"))
      .then(res => {
        let data = res.data.data[0].attributes;
        setUnitTlt(data.unit_title);
        setUnitBrief(data.unit_brief);
        setLabProject(data.labproject);
        setState(prev => {
          return {
            ...prev, ["unit_duration"]: data.unit_duration, ["id"]: res.data.data[0].id
          }
        })
        setLoading(false);
      })
  }, [])
  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCreate = () => {
    if (unitTlt === "" || unitBrief === "" || labProject === "") {
      return toastComponent("error", ConstData.textConst.enterMandatoryField);
    } else {
      setLoading(true);
      axios.put(ConstData.CMS_URL + "courseunits/" + state.id, {
        "data": {
          "unit_title": unitTlt,
          "unit_duration": state.unit_duration,
          "labproject": labProject,
          "unit_brief": unitBrief,
          //  "courseid": state.courseid,
          "unit_introductory_video": state.unit_introductory_video
        }
      }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      })
        .then(res => {
          setLoading(false);
          toastComponent("success", ConstData.textConst.tableUpdatedSuccess);
          setTimeout(() => {
            navigate.push("/user/my-courses/view");
          }, 3000);

        }).catch(err => {
          toastComponent("error", err.message);
          setTimeout(() => {
            setLoading(false);
          }, 3000)
        })

    }
  }

  return (

    <Layout1 >
      <ToastContainer />
      <PageLoadingComponents loading={loading} />
      <div>
        <div style={{ margin: "40px  4% 0 4%" }} className="d-flex justify-content-between">
          <h1>Unit</h1>
          <button className="btn btn-primary btnStyle1" onClick={handleCreate}>Update</button>
        </div>

        <div className="d-flex justify-content-row">

          <div style={{ width: "3%" }}></div>
          <div className="row" style={{ width: "94%" }}>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px" }}>
              <MarkdownTextareaUtils
                title="Title"
                model={unitTlt}
                setModel={setUnitTlt}
                required={true}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px" }}>
              <MarkdownTextareaUtils
                title="Brief"
                model={unitBrief}
                setModel={setUnitBrief}
                required={true}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 30px" }}>
              <MarkdownTextareaUtils
                title="Lab project"
                model={labProject}
                setModel={setLabProject}
                required={true}
              />
            </div>

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "5px 30px" }}>
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
