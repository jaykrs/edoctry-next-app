import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InstructorLayout from "../../../../components/InstructorLayout/InstructorLayout";
import css from "./InstructorAssesmentCardPage.module.css";
import { FaAngleDoubleLeft } from "react-icons/fa";
import StepOneComp from "../../../../components/InstructorComponents/StepComponents/StepOneComp/StepOneComp";
import Layout1 from "../../../../components/Layout1/Layout1";
const InstructorAssesmentCardPage = () => {
  const navigate = useRouter();
  // if(location != undefined){
  //   sessionStorage.setItem("cardDetails",JSON.stringify(location));
  // }else{
   //  location = JSON.parse(sessionStorage.getItem("cardDetails"));
  // }
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
      link:"/user/profile/assesment/list",
    },
    {
      box: 3,
      id: 3,
      icon: "/publicContent/icons/tv.png",
      ttl: "Interview Preparation",
      desc: "", //location.title ,
      link:"/page?pageid=interview-prep",
    },
    {
      box: 4,
      id: 4,
      icon: "/publicContent/icons/tv.png",
      ttl: "Job Opportunity",
      desc: "", //location.title ,
      link:"/page?pageid=oppertunity-job",
    },
  ];
  return (
    <Layout1>
      <div className={css.outerDiv}>
        <div className={css.topBar}>
          <div className={css.btnStyle}> <button className="btn mt-3" style={{ marginLeft: "40px" }} onClick={() => { navigate.push("/user/my-courses/courseView") }} ><FaAngleDoubleLeft size={40} /></button></div>
          <div className={css.topBarTtl}>Course</div>

        </div>
        <div className={css.cardOuter}>
          <div className={css.outDiv}></div>
          <div className={css.innerDiv} >
            {/* <NavLink to={"/user/profile/course/view"} className={css.navlink}>
              <div className="card">
                <h3 className="card-header">Course Content</h3>
                <img src={courseImg} alt="Courses" className={css.cardImg} />
              </div>
            </NavLink>
            <NavLink to={"/user/profile/assesment/list"} className={css.navlink}>
              <div className="card">
                <h3 className="card-header">Assesment</h3>
                <img src={assImg} alt="assesment" className={css.cardImg} />
              </div>
            </NavLink> */}
            <div className={css.outerDiv1}>
              {/* <CreateCourseHeader currentStep={currentStep} totalSteps={totalSteps} /> */}
              <div className={css.stepsContent}>
                <StepOneComp  StepCardData={StepCardData} />
              </div>
              {/* <CreateCourseFooter
        currentStep={currentStep}
        totalSteps={totalSteps}
        setCurrentStep={changeStepHandler}
        moveToCreatePage={moveToCreatePage}
      /> */}
              {/* <StepCard
                box={1}
                active={active}
                setActive={setActive}
                key={1}
                icon={"/publicContent/icons/tv.png"}
                ttl={"Course Content"}
                desc={"course title"}
              /> */}
            </div>
          </div>
          <div style={{ width: "10%" }} ></div>
        </div>
      </div>
    </Layout1>
  );
};

export default InstructorAssesmentCardPage;
