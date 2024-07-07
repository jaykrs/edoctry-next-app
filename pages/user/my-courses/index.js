 "use client"
import React , {useState, useEffect} from "react";
import Layout1 from "../../components/Layout1/Layout1";
import { useRouter } from "next/navigation";
import css from "./MyCoursesPage.module.css";
import axios from "axios";
import { CMS_URL } from "../../urlConst";
import CourseCardWithOptions from "../../components/CourseCardWithOptions/CourseCardWithOptions";

const MyCoursesPage = () => {
  const [courseData,setCourseData] = useState("");
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem("loginStatus") !== "true"){
        localStorage.clear();
        router.push("/");
    }else{
      if (localStorage.getItem("usertype") === "customer") {
        axios.get(CMS_URL + "orders?filters[customeremail][$eq]=" + localStorage.getItem("email") + "&filters[payment_status][$eq]=true", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        })
          .then(res => {
            let data = [...new Set(res.data.data)]
            setCourseData(data)
          }).catch(err => {
            console.log(err);
          })
      }
    }
  }, []);
  return (
    <Layout1 title={"my-courses"}>
      <div className={css.outerDiv}>
        <div className={css.topBar}>
          <div className={css.topBarTtl}>My Learning</div>
        </div>
        <div className={css.menuBar}>
          <div className={css.links}>
            {/* {tabs?.map((item) => ( */}
            <p
              // key={item.name}
              // href={item.link}
              style={{ textDecoration: "none", color: "#fff",margin:"0" }}
            >
              All Courses
            </p>
            {/* ))} */}
          </div>
        </div>
        <div className={css.outletBdy}>
          {/* <Outlet /> */}

          <div className={css.bdy}>
        {
          courseData.length > 0 ? courseData.map((item,index)=>{
            let data = {
             //  path : "/course/view",
              path:"/user/my-courses/individual",
              img : item.attributes.course_logo,
              id : item.attributes.courseid,
              ttl:item.attributes.course_title,
              author:item.attributes.instrucctorName,
              ratings:0,
              courseCoveredPercent:0

            }
            return (
              <>
               <CourseCardWithOptions
                key={index}
                data={data}
                isOptions={true}
                // options={optionsComps}
               />
              </>
            )
          })
          : <img
          src="/publicContent/images/progress-circle.gif"
          alt="progress"
      />
        }
      </div>

        </div>
      </div>
    </Layout1>
  );
};

export default MyCoursesPage;
