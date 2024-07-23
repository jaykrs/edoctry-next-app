import { useEffect, useState } from "react";
import css from "./BasicSettingsComponent.module.css";
import axios from "axios";
import { CMS_URL } from "../../../urlConst";
import MarkdownEditor from "../../../utils/MarkdownTextareaUtils/MarkdownTextareaUtils";
import ToastComponents from "../../../toastComponent";
const BasicSettingsComponent = (props) => {
  const { loading = false, setLoading = (() => { }) } = props;
  const [textEditorState, setTextEditorState] = useState("");
  const options = [
    { value: "ss", txt: "see" },
    { value: "ss", txt: "see" },
  ];
  let [data, setData] = useState("");
  const [enableBtn, setEnableBtn] = useState(false);
  const [profileDes, setProfileDes] = useState("");
  const [remarks,setRemarks] = useState("");
  const [state, setState] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    remarks: "",
    dob: "",
    attachment: "",
    id: 0,
    qualification: "",
    education_institute: "",
    linkedin_url: "",
    copyright_hold: "",
    intro_video_url: "",
    work_exp_yr: 0,
    average_rating: 0,
    enrollment_student_count: 0,
    published_course_count: 0

  });

  useEffect(() => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("jwt"));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    if (localStorage.getItem("usertype") === "customer") {
      fetch(CMS_URL + "customers?filters[customeremail][$eq]=" + localStorage.getItem("email"), requestOptions)
        .then(response => response.text())
        .then(result => {

          let d = JSON.parse(result)
          let cusdata = d.data[0].attributes
          setRemarks(cusdata.customerremarks);
          setData(d.data)
          setState(prev => {
            return {
              ...prev, ["name"]: cusdata.customername, ["email"]: cusdata.customeremail, ['address']: cusdata.customeraddress, ["city"]: cusdata.customercountry,
              ["phone"]: cusdata.customerphone, ["dob"]: cusdata.dob, ["attachments"]: cusdata.attachments, ["id"]: d.data[0].id
            }
          })
          setLoading(false);
        })
        .catch(error => {
          ToastComponents("error", error.message);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        });
    }
    if (localStorage.getItem("usertype") === "instructor") {
      fetch(CMS_URL + "instructors?filters[instructoremail][$eq]=" + localStorage.getItem("email"), requestOptions)
        .then(response => response.text())
        .then(result => {
          let d = JSON.parse(result)
          let cusdata = d.data[0].attributes;
          setProfileDes(cusdata.introduction_brief);
          setData(d.data)
          setState(prev => {
            return {
              ...prev, ["name"]: cusdata.display_name, ["email"]: cusdata.instructoremail, ['qualification']: cusdata.qualification, ["education_institute"]: cusdata.education_institute,
              ["linkedin_url"]: cusdata.linkedin_url, ["copyright_hold"]: cusdata.copyright_hold, ["intro_video_url"]: cusdata.intro_video_url, ["id"]: d.data[0].id,
              ["work_exp_yr"]: cusdata.work_exp_yr, ["average_rating"]: cusdata.average_rating, ["enrollment_student_count"]: cusdata.enrollment_student_count, ["published_course_count"]: cusdata.published_course_count
            }
          })
          setLoading(false);
        })
        .catch(error => {
          ToastComponents("error", error.message);
          setTimeout(() => {
            setLoading(false);
          }, 5000);

        });
    }

  }, [])

  const handleChange = (e) => {
    setState(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleUpdate = () => {
    if (localStorage.getItem("usertype") === "customer") {
      axios.put(CMS_URL + "customers/" + state.id, {
        "data": {
          "customername": state.name,
          "customeraddress": state.address,
          "customercity": state.city,
          "customercountry": state.country,
          "customerphone": state.phone,
          "customerremarks": remarks,
        }
      }).then(res => {
        console.log(res)
        setEnableBtn(false);
        alert("successfully updated")
      }).catch(err => {
        console.log(err);
      })
    }
    if (localStorage.getItem("usertype") === "instructor") {
      axios.put(CMS_URL + "instructors/" + state.id, {
        "data": {
          "customername": state.name,
          "qualification": state.qualification,
          "education_institute": state.education_institute,
          "introduction_brief": profileDes,
          "linkedin_url": state.linkedin_url,
          "work_exp_yr": state.work_exp_yr,
          "average_rating": state.average_rating,
          "enrollment_student_count": state.enrollment_student_count,
          "published_course_count": state.published_course_count
        }
      }).then(res => {
        console.log(res)
        setEnableBtn(false);
        alert("successfully updated")
      }).catch(err => {
        console.log(err);
      })
    }
  }
  return (
    <div className={"d-flex justify-content-center"}>
      <div style={{ width: "3%" }}></div>
      <div style={{ width: "94%" }}>
        {data.length > 0 ? data.map((item, index) => {
          return (
            <div className={css.outerDiv} key={index}>

              <div className={css.profileDiv}>
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={state.name}
                  onChange={handleChange}
                  id="name"
                  className={css.inputFieldCss}
                  style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                  disabled={!enableBtn}
                />
              </div>
              <div className={css.profileDiv}>
                <label for="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={state.email}
                  onChange={handleChange}
                  id="email"
                  className={css.inputFieldCss}
                  style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                  disabled
                />
              </div>
              {localStorage.getItem("usertype") === "customer" &&
                <div className={css.profileDiv}>
                  <label for="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    value={state.address === null ? "" : state.address}
                    onChange={handleChange}
                    id="address"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "customer" &&
                <div className={css.profileDiv}>
                  <label for="city">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    value={state.city === null ? "" : state.city}
                    onChange={handleChange}
                    id="city"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "customer" &&
                <div className={css.profileDiv}>
                  <label for="country">Country</label>
                  <input
                    type="text"
                    name="country"
                    placeholder="select your country"
                    value={state.country === null ? "" : state.country}
                    onChange={handleChange}
                    id="country"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "customer" &&
                <div className={css.profileDiv}>
                  <label for="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={state.phone === null ? "" : state.phone}
                    onChange={handleChange}
                    id="phone"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}

              {localStorage.getItem("usertype") === "customer" &&
                <div className={css.profileDiv}>
                  <label for="dob">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    placeholder="select date"
                    value={state.dob === null ? "" : state.dob}
                    onChange={handleChange}
                    id="dob"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "customer" &&
                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-xs-6" style={{ margin: "10px 30px" }}>
                  <MarkdownEditor
                    title="Remarks"
                    model={remarks}
                    setModel={setRemarks}
                    required={true}
                  />
                </div>}


              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv}>
                  <label for="qualification">Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    placeholder="your qualification"
                    value={state.qualification}
                    onChange={handleChange}
                    id="qualification"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv}>
                  <label for="work_exp_yr">Work Experience</label>
                  <input
                    type="number"
                    name="work_exp_yr"
                    placeholder="your work experience"
                    value={state.work_exp_yr}
                    onChange={handleChange}
                    id="work_exp_yr"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv}>
                  <label for="education_institute">Educational Institute Name</label>
                  <input
                    type="text"
                    name="education_institute"
                    placeholder="Educational Institute name"
                    value={state.education_institute}
                    onChange={handleChange}
                    id="education_institute"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}

              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv}>
                  <label for="linkedin_url">Linkedin Url</label>
                  <input
                    type="text"
                    name="linkedin_url"
                    placeholder="linkedin url"
                    value={state.linkedin_url}
                    onChange={handleChange}
                    id="linkedin_url"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv}>
                  <label for="average_rating">Avg Rating</label>
                  <input
                    type="number"
                    name="average_rating"
                    placeholder="Average rating"
                    value={state.average_rating}
                    onChange={handleChange}
                    id="average_rating"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv}>
                  <label for="enrollment_student_count">Enrollment No.</label>
                  <input
                    type="number"
                    name="enrollment_student_count"
                    placeholder="Enrollment count"
                    value={state.enrollment_student_count}
                    onChange={handleChange}
                    id="enrollment_student_count"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv}>
                  <label for="published_course_count">Publist Course No.</label>
                  <input
                    type="number"
                    name="published_course_count"
                    placeholder="publish course no."
                    value={state.published_course_count}
                    onChange={handleChange}
                    id="published_course_count"
                    className={css.inputFieldCss}
                    style={{ border: !enableBtn ? "none" : "1px solid #000" }}
                    disabled={!enableBtn}
                  />
                </div>}
              {localStorage.getItem("usertype") === "instructor" &&
                <div className={css.profileDiv} style={{ width: "70%" }}>
                  <MarkdownEditor
                    title="Profile Description"
                    model={profileDes}
                    setModel={setProfileDes}
                    required={true}
                  />
                </div>}


              <div className=" d-flex justify-content-end" style={{ margin: "30px" }}>
                <button className={"paginationBtn m-3"} onClick={() => { setEnableBtn(false) }} disabled={!enableBtn}>Cancel</button>
                {enableBtn ? <button className={"btnUpdate mt-3"} onClick={handleUpdate}>Update</button> : <button className={"paginationBtn mt-3"} onClick={() => { setEnableBtn(true) }}>Edit</button>}
              </div>


            </div>
          )
        })
          : ""

        }
      </div>
      <div style={{ width: "3%" }}></div>
    </div>
  );
};

export default BasicSettingsComponent;
