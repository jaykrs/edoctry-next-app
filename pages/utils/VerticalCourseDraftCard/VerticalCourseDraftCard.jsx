import React, { useEffect, useState } from "react";
import CourseCarouselComp from "../../components/CourseCarouselComp/CourseCarouselComp";
const VerticalCourseDraftCard = (props) => {
  console.log("props vertical draft card data",props);
  const {
    courseName = "xxxxx",
    courseType = "xxxxx",
    courseVisible = "public",
    courseFillP = 0.6,
    link = "#",
    data = "",
    ttl = "",
    linkTxt = ""
  } = props;
 
  return (
    <>
     <div className="{css.courseviewflex}">
        {  data.length > 0 ? 
        <CourseCarouselComp
        ttl={ttl}
        link={link}
        linkTxt={linkTxt}
        coursesData={data}
      />
      
      // data.map((item,index)=>{
      //   return  <CourseCardTemp key={index} data={item} />
      // })

      : <img
      src="/publicContent/images/progress-circle.gif"
      alt="progress"
  />

        }

      </div>
    </>
  );
};

export default VerticalCourseDraftCard;
