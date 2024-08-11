import React from "react";
import css from "./CourseCard.module.css";
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";
const CourseCard = ({data={},extraCss={}}) => {
  //let data = props.data;
  //const extraCss = props.extraCss;
  const router = useRouter();
  const userType = typeof window !== 'undefined' ? localStorage.getItem("usertype") : "";
  // let totalRating = (
  //   (1 * stars?.a + 2 * stars?.b + 3 * stars?.c + 4 * stars?.d + 5 * stars?.e) /
  //     stars?.a +
  //   stars?.b +
  //   stars?.c +
  //   stars?.d +
  //   stars?.e
  // ).toFixed(2);

  // let duration = new Date(courseDuration * 1000);
  // let hours = duration.getUTCHours();
  // let minutes = duration.getUTCMinutes();

  // let durationInHrs =
  //   hours?.toString().padStart(2, "0") +
  //   "." +
  //   minutes?.toString().padStart(1, "0");

  
  let handleOnClick = () => {

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
            <button className="btn btn-outline-primary btn-sm" style={{marginLeft:"2px"}} onClick={handleOnClick}>View <MdArrowOutward size={20}  /></button>
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
