import InputUtil from "../../../../../utils/FormUtils/InputUtil/InputUtil";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ConstData from "../../../../../../urlConst";
import { useRouter } from "next/navigation";
import { FaAngleDoubleLeft } from "react-icons/fa";
import toastComponent from "../../../../../toastComponent";
import { ToastContainer } from "react-toastify";
import Layout1 from "../../../../../components/Layout1/Layout1";
import MarkdownEditor from "../../../../../utils/MarkdownTextareaUtils/MarkdownTextareaUtils";
const CreateNewAssesment = () => {
  const navigate = useRouter();
  const [assTlt, setAssTlt] = useState("");
  const [assDes, setAssDes] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    assesment_marks: 0,
    passmarks: 0,
    instructor: "",
    course: "",
    course_title: ""
  })

  useEffect(() => {

  }, [])

  const handleCreate = () => {
    setLoading(true);
    if (assTlt === "" || state.assesment_marks === 0 || state.passmarks === 0 || assDes === "") {
      toastComponent("error", ConstData.textConst.enterMandatoryField);
    } else {
      axios.post(ConstData.CMS_URL + "assesments", {
        "data": {
          assesment_title: assTlt,
          assesment_marks: state.assesment_marks,
          passmarks: state.passmarks,
          assesment_description: assDes,
          instructor: localStorage.getItem("email"),
          course: sessionStorage.getItem("courseInsId"),
          course_title: sessionStorage.getItem("courseTitle")
        }
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      }
      ).then(result => {
        setLoading(false);
        toastComponent("success","new unit created successfully")
        setTimeout(() => {
          navigate.push("/user/my-courses/ins/assessment")
        }, 3000)

      }).catch(err => {
        toastComponent("error", err.message);
      })
    }
  }

  const handleChange = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
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
        <div className="d-flex justify-content-row">
          <div style={{ width: "10%" }} className="d-flex justify-content-center align-item-start" >
            <button className="btn" onClick={() => { navigate.push("/user/my-courses/ins/assessment") }}><FaAngleDoubleLeft size={40} /></button>
          </div>
          <div className="row" style={{ width: "80%", marginTop: "80px" }}>
            <div className=" row d-flex justify-content-start">
              <h1 className="col-xl-6 collg-6 col-md-6 col-sm-12 col-xs-12">New Assessment</h1>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ padding: "30px" }}>
              <MarkdownEditor
               title="Title"
               model={assTlt}
               setModel={setAssTlt}
               required={true}
              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12" style={{ padding: "30px" }}>
              <MarkdownEditor
               title="Description"
               model={assDes}
               setModel={setAssDes}
               required={true}
              />
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ padding: "30px" }}>
              <InputUtil
                label="Full Marks"
                type="number"
                name="assesment_marks"
                icon={"/publicContent/icons/user.png"}
                state={state.assesment_marks}
                placeholderTxt="Assment full marks"
                onChange={handleChange}
                required={true}

              />
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ padding: "30px" }}>
              <InputUtil
                label="Pass Marks"
                type="number"
                name="passmarks"
                icon={"/publicContent/icons/user.png"}
                state={state.passmarks}
                placeholderTxt="assesment pass marks"
                onChange={handleChange}
                required={true}

              />
            </div>
          </div>
          <div style={{ width: "10%", marginTop: "80px" }} >
            <button className="btn btn-primary" onClick={handleCreate}>Create</button>
          </div>

        </div>
      </div>
    </Layout1>
  )

};

export default CreateNewAssesment;
