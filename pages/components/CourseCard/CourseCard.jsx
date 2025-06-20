
import React, { useEffect, useState } from "react";
import css from "./CourseCard.module.css";
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CourseCard = ({data={},extraCss={},from=""}) => {

  const router = useRouter();
  const [userType,setUserType] = useState("");
  useEffect(()=>{
    let userTypes = typeof window !== 'undefined' ? localStorage.getItem("usertype") : "";
    setUserType(userTypes);
  },[])
  
  const handleOnClick = () => {

    if (userType === "instructor" && from=== "insHome") {
      sessionStorage.setItem("courseInsId", data.id);
      sessionStorage.setItem("courseTitle", data.attributes.course_title);
      router.replace("/user/my-courses/courseView/card");
      return;
  
    } else {
      localStorage.setItem("courseId", data.id);
    }
    router.push(`/coursedetails/${data.id}`)
    
  }
  return (
    <>
      {
        Object.keys(data).length > 0 ? 
        <div className={css.outerDiv} id={data.id} style={extraCss}>
        <div className={css.itemBox} onClick={handleOnClick}>
           <div className={css.imgBox}>
            <img src={data.attributes.course_logo !== null ? data.attributes.course_logo : 'https://api.edoctry.com'+'/uploads/acadamy_eb826cf7af.jpg'} alt="course thumbnail" className={css.courseImg} />
           </div>      
  <div className={css.cardBdy}>
          <div className={css.ttl}>
            <div  dangerouslySetInnerHTML={{ __html: data.attributes.course_title.substring(0, 100) }} ></div>
          </div>
            <span  className={css.instructor} dangerouslySetInnerHTML={{ __html: data.attributes.instrucctorName !== null ? data.attributes.instrucctorName : 'admin' }} ></span>
          <div className={css.prc}>
            <span className={css.newPrc}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data.attributes.course_fee)}
            </span>
            <span className={css.oldPrc}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data.attributes.course_fee_premium)}
            </span>
            
          </div>
          
        </div>
        </div>
        
      </div> : ""
      }
    </>
  );
};

export default CourseCard;
