import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import css from "./InstructorAssesmentCardPage.module.css";
import { FaAngleDoubleLeft } from "react-icons/fa";
import StepOneComp from "../../../../components/InstructorComponents/StepComponents/StepOneComp/StepOneComp";
import Layout1 from "../../../../components/Layout1/Layout1";
import PageLoadingComponents from "../../../../utils/PageLoadingComponent/PageLoadingComponents";
const InstructorAssesmentCardPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  
  useEffect(()=>{
    if(localStorage.getItem("usertype") !== "instructor" || localStorage.getItem("loginStatus") === "false" || localStorage.getItem("email") === "" ){
      localStorage.clear();
      sessionStorage.clear();
      navigate.push("/");
      setLoading(false);
    }else{
      setLoading(false);
    }
    
  },[])
  const tabs = [
    { name: "All Courses", link: "learning" },
    // { name: "My Lists", link: "lists" },
    // { name: "Wishlist", link: "wishlist" },
    // { name: "Archived", link: "archived" },
  ];
  const [active, setActive] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
  });
  const [data, setData] = useState("");
  const StepCardData = [
    {
      box: 1,
      id: 1,
      icon: "/publicContent/icons/tv.png",
      ttl: "Course Content",
      desc: "" ,// location.title ,
      link:"/user/my-courses/view",
    },
    {
      box: 2,
      id: 2,
      icon: "/publicContent/icons/tv.png",
      ttl: "Practice Test",
      desc:  "" , //location.title ,
      link:"/user/my-courses/ins/assessment",
    },
    {
      box: 3,
      id: 3,
      icon: "/publicContent/icons/tv.png",
      ttl: "Interview Preparation",
      desc: "", //location.title ,
      link:"/blog/interview-prep",
    },
    {
      box: 4,
      id: 4,
      icon: "/publicContent/icons/tv.png",
      ttl: "Job Opportunity",
      desc: "", //location.title ,
      link:"/blog/opportunity-job",
    },
  ];
  return (
    <Layout1>
      <PageLoadingComponents loading={loading} />
      <div className={css.outerDiv}>
        <div className={css.topBar}>
          <div className={css.btnStyle}> <button className="btn mt-3" style={{ marginLeft: "40px" }} onClick={() => { navigate.push("/user/my-courses/courseView") }} ><FaAngleDoubleLeft size={40} /></button></div>
          <div className={css.topBarTtl}>Course</div>

        </div>
        <div className={css.cardOuter}>
          <div className={css.outDiv}></div>
          <div className={css.innerDiv} >
            <div className={css.outerDiv1}>
              {/* <CreateCourseHeader currentStep={currentStep} totalSteps={totalSteps} /> */}
              <div className={css.stepsContent}>
                <StepOneComp  StepCardData={StepCardData} />
              </div>
            </div>
          </div>
          <div style={{ width: "10%" }} ></div>
        </div>
      </div>
    </Layout1>
  );
};

export default InstructorAssesmentCardPage;
