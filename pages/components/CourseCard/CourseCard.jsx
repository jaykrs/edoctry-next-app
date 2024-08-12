import React, { useEffect, useState } from "react";
import css from "./CourseCard.module.css";
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
const CourseCard = ({data={},extraCss={}}) => {
  const router = useRouter();
  const [userType,setUserType] = useState("");
  useEffect(()=>{
    let userTypes = typeof window !== 'undefined' ? localStorage.getItem("usertype") : "";
    setUserType(userTypes);
  },[])
  
  const handleOnClick = () => {

    if (userType === "instructor") {
      sessionStorage.setItem("courseInsId", data.id);
      sessionStorage.setItem("courseTitle", data.attributes.course_title);
      router.push("/user/my-courses/courseView/card");
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
        <div className={css.imgBox}>
          <img src={data.attributes.course_logo !== null ? data.attributes.course_logo : ""} alt="course thumbnail" className={css.courseImg} />
        </div>
        <div className={css.cardBdy}>
          <div className={css.ttl}>
            <div  dangerouslySetInnerHTML={{ __html: data.attributes.course_title.substring(0, 30) + " ..." }} ></div>
          </div>
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
            <button className="btn btn-outline-primary btn-sm" style={{marginLeft:"2px"}}  onClick={handleOnClick}>View <MdArrowOutward size={20}  /></button>
          </div>
          {/* <div className={css.tags}>
            
          </div> */}
        </div>
        {/* </Link> */}
        {/* <div className={css.hovCard}>
          <div className={css.innerBox}> */}
            {/* <div className="d-flex justify-content-between">
              {/* <div className={css.ttl} dangerouslySetInnerHTML={{__html : data.attributes.course_title}} > </div> */}
              {/* <div className={css.ttl}>
                <div dangerouslySetInnerHTML={{ __html: data.attributes.course_title }} ></div>
              </div>
              <button className="btn btn-primary" onClick={handleOnClick}>View</button> */}
            {/* </div>  */}
           
            {/* <div className={css.shrtDet}>
              <div className={css.tags}>
                <TAG1 />
              </div>
              <div className={css.lstUpdt}>
                Updated <b>{data.attributes.updatedAt}</b>
              </div>
            </div> */}
            {/* <div className={css.btns}>
              {
                localStorage.getItem("usertype") != "instructor" &&
                <>
                  <Button1
                    onClick={addToCartHandler}
                    txt="Add to cart"
                    color="#fff"
                    bck="#a435f0"
                    hovBck="#8710d8"
                    extraCss={{ width: "100%", border: "none" }}
                  />
                  <CircleButton onClick={addToWishListHandler} img={heartIcon} />
                </>
              }

            </div> */}
          {/* </div>
        </div> */}
      </div> : ""
      }
    </>
  );
};

export default CourseCard;
