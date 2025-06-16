import React, { useEffect, useState } from "react";
import CourseCarouselComp from "../../components/CourseCarouselComp/CourseCarouselComp";
const VerticalCourseDraftCard = (props) => {
  const {
    courseName = "xxxxx",
    courseType = "xxxxx",
    courseVisible = "public",
    courseFillP = 0.6,
    link = "#",
    data = "",
    ttl = "",
    linkTxt = "",
    from=""
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
        from={from}
      />
      
      // data.map((item,index)=>{
      //   return  <CourseCardTemp key={index} data={item} />
      // })

      : ""

        }

      </div>
    </>
  );
};

export default VerticalCourseDraftCard;
