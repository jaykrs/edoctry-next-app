import InputUtil from "../../../../utils/FormUtils/InputUtil/InputUtil";
import React, { useState } from "react";
import Layout1 from "../../../../components/Layout1/Layout1";
import axios from "axios";
import { CMS_URL, textConst } from "../../../../urlConst";
import { useRouter } from "next/navigation";
// import MDEditor, { commands } from '@uiw/react-md-editor';
import toastComponent from "../../../../toastComponent";
import { ToastContainer } from "react-toastify";
import MarkdownTextareaUtils from "../../../../utils/MarkdownTextareaUtils/MarkdownTextareaUtils";
const InstructorUnitNew = () => {
  
  let langOption = [
    { key: "Select Language", value: "" },
    { key: "English", value: "english" },
    { key: "Hindi", value: "hindi" }
  ]
  const navigate = useRouter();
  const [loading,setLoading] = useState(false);
  const [message, setMessage] = useState("")
  const [unit, setUnit] = useState("");
  const [unitBrief, setUnitBrief] = useState("");
  const [labProject, setLabProject] = useState("");
  const [state, setState] = useState({
    unit_duration: 0,
    courseid: "",
    lapproject_attachment: "",
    unit_introductory_video: "",
  })
  let changeHandler = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCreate = () => {
    setLoading(true);
    if (unit === "" || state.unit_duration === "" || labProject === "" || unitBrief === "") {
      return toastComponent("error", textConst.enterMandatoryField);
    } else {
      axios.post(CMS_URL + "courseunits", {
        "data": {
          "unit_title": unit,
          "unit_duration": state.unit_duration,
          "labproject": labProject,
          "unit_brief": unitBrief,
          "courseid": sessionStorage.getItem("courseInsId"),
          "unit_introductory_video": state.unit_introductory_video

        }
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => {
          toastComponent("success", textConst.tableCreatedSuccess);
          setTimeout(() => {
            navigate.push("/user/my-courses/view");
          }, 3000);
          setLoading(false);
        }).catch(err => {
          toastComponent("error", err.message);
          setTimeout(()=>{
            setLoading(false);
          },3000);
        })

    }
  }

  return (

    <Layout1 >
      <ToastContainer />
      <div style={{ display: loading ? 'block' : 'none' }}>
        <div className={"overlay"}></div>
        <div className={"spinner_wrapper"}>
          <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span class="sr-only"></span>
          </div>
        </div>
      </div>
      <div>
        <div style={{ margin: "40px  3% 0 3%", }} className="d-flex justify-content-between">
          <h1>New Unit</h1>
          <button className="btn btn-primary btnStyle1" onClick={handleCreate}>Create</button>
        </div>

        <div className="d-flex justify-content-row">

          <div style={{ width: "3%" }}></div>
          <div className="row" style={{ width: "94%" }}>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 20px" }}>
              <MarkdownTextareaUtils
               title="Title"
               model={unit}
               setModel={setUnit}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 20px" }}>
              <MarkdownTextareaUtils
               title="Brief"
               model={unitBrief}
               setModel={setUnitBrief}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12" style={{ padding: "5px 20px" }}>
              <label style={{ marginBottom: "5px" }}><strong>Project<span className="mandatoryField">*</span></strong></label>
              <MarkdownTextareaUtils
               title="Project"
               model={labProject}
               setModel={setLabProject}
              />
            </div>

            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" style={{ padding: "5px 20px" }}>
              <InputUtil
                label="Unit Duration(hour)"
                type="number"
                name="unit_duration"
                icon={"/publicContent/icons/user.png"}
                state={state.unit_duration}
                placeholderTxt="Enter unit duration"
                onChange={changeHandler}
                required={true}

              />
            </div>
          </div>
          <div style={{ width: "3%" }} >

          </div>

        </div>
      </div>
    </Layout1>
  )

};

export default InstructorUnitNew;
