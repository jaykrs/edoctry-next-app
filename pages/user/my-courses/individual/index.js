"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout1 from "../../../components/Layout1/Layout1";
import css from "./courseAssesmentCardPage.module.css";
import axios from "axios";
import { FaAngleDoubleLeft } from "react-icons/fa";
import StepCard from "../../../components/StepCard/StepCard";
import { ToastContainer } from "react-toastify";
import toastComponent from "../../../toastComponent";
import ConstData from "../../../../urlConst";
const CourseAssesmentCardPage = () => {
  const tabs = [
    { name: "All Courses", link: "learning" },
  ];
  const navigate = useRouter();
  const [data, setData] = useState("");
  const [courseUnit, setCourseunit] = useState([]);
  const [messBtn, setMessBtn] = useState(false);
  const [active, setActive] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
  });
  useEffect(() => {
    if (localStorage.getItem("loginStatus") !== "true") {

    } else {
      if (localStorage.getItem("usertype") === "customer") {

        axios.get(ConstData.CMS_URL + "courses?filters[id][$eq]=" + sessionStorage.getItem("courseVid"))
          .then(res => {
            setData(res.data.data)

            axios.get(ConstData.CMS_URL + "courseunits?filters[courseid][$eq]=" + res.data.data[0].id)
              .then(cUnit => {
                setCourseunit(cUnit.data.data)
              }).catch(err => {
                console.log(err);
              })
          }).catch(err => console.log(err))
      }
    }
  }, [])

  return (
    <Layout1 title="card">
      <ToastContainer />
      <div className={css.outerDiv}>
        <div className={css.topBar}>
          <div> <button className="btn" onClick={() => { navigate.push("/user/my-courses") }}><FaAngleDoubleLeft size={40} color="red"/></button></div>
          <div className={css.topBarTtl}>Course</div>
        </div>

        <div className={css.cardOuter}>
          <div className={css.outDiv}>

          </div>

          {
            data.length > 0 ? data.map((item, index) => {
              return (
                <div className={css.innerDiv} key={index} >

                  <div onClick={() => {
                    if (courseUnit.length > 0) {
                      navigate.push("/user/my-courses/courseDetails")
                      sessionStorage.setItem("coursePlayerID", sessionStorage.getItem("courseVid"));
                      sessionStorage.setItem("courseInsId",sessionStorage.getItem("courseVid"));
                    } else {
                      toastComponent("warn", "No Content");
                    }
                  }}>
                    <div >
                      <StepCard
                        box={1}
                        active={active}
                        setActive={setActive}
                        key={1}
                        icon={"/publicContent/icons/tv.png"}
                        ttl={"Course Content"}
                        desc={item.attributes.course_title}
                        link={"/course/view"}
                      />
                    </div>
                  </div>
                  <div onClick={() => {
                    navigate.push("/user/my-courses/assessment")
                    sessionStorage.setItem("courseAid", sessionStorage.getItem("courseVid"))
                  }} >
                    <StepCard
                      box={2}
                      active={active}
                      setActive={setActive}
                      key={2}
                      icon={"/publicContent/icons/tv.png"}
                      ttl={"Practice Test"}
                      desc={item.attributes.course_title}
                      link={"/user/my-courses/assesment/list"}
                    />
                  </div>
                  <div >
                    <StepCard
                      box={3}
                      active={active}
                      setActive={setActive}
                      key={3}
                      icon={"/publicContent/icons/tv.png"}
                      ttl={"Interview Preparation"}
                      desc={item.attributes.course_title}
                      link={"/blog/interview-prep"}
                    />
                  </div>
                  <div >
                    <StepCard
                      box={4}
                      active={active}
                      setActive={setActive}
                      key={4}
                      icon={"/publicContent/icons/tv.png"}
                      ttl={"Job Opportunity"}
                      desc={item.attributes.course_title}
                      link={"/blog/oppertunity-job"}
                    />
                  </div>
                </div>
              )
            })
              : ""
          }
          <div style={{ width: "10%" }} ></div>
        </div>
      </div>
      <div style={{ position: "absolute", top: "100px", width: "100%", display: messBtn ? "" : "none" }}>
        <div className="d-flex justify-content-center"><p style={{ color: "#fff", fontSize: "20px" }}>No Content</p></div>
      </div>
    </Layout1>
  );
};

export default CourseAssesmentCardPage;
