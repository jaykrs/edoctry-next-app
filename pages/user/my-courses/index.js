"use client"
import React, { useState, useEffect } from "react";
import Layout1 from "../../components/Layout1/Layout1";
import { useRouter } from "next/navigation";
import css from "./MyCoursesPage.module.css";
import axios from "axios";
import ConstData from "../../../urlConst";
import CourseCardWithOptions from "../../components/CourseCardWithOptions/CourseCardWithOptions";
import PageLoadingComponents from "../../utils/PageLoadingComponent/PageLoadingComponents";
import { ToastContainer } from "react-toastify";
import toastComponent from "../../toastComponent";

const MyCoursesPage = () => {
  const [courseData, setCourseData] = useState("");
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("loginStatus") !== "true") {
      localStorage.clear();
      router.push("/");
    } else {
      if (localStorage.getItem("usertype") === "customer") {
        setLoading(true);
        axios.get(ConstData.CMS_URL + "orders?filters[customeremail][$eq]=" + localStorage.getItem("email") + "&filters[payment_status][$eq]=true", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        })
          .then(res => {
            let data = [...new Set(res.data.data)]
            if(data.length === 0){
              toastComponent("warn","Course Not found!");
            }
            setCourseData(data)
            setLoading(false);
          }).catch(err => {
            console.log(err.message);
            setLoading(false);
          })
      }
    }
  }, []);
  return (
    <Layout1 title={"my-courses"}>
      <ToastContainer />
      <PageLoadingComponents  loading={loading} setLoading={setLoading} />
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
              style={{ textDecoration: "none", color: "#fff", margin: "0" }}
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
              courseData.length > 0 ? courseData.map((item, index) => {
                // let data = {
                //   //  path : "/course/view",
                //   path: "/user/my-courses/individual",
                //   img: item.attributes.course_logo,
                //   id: item.attributes.courseid,
                //   ttl: item.attributes.course_title,
                //   author: item.attributes.instrucctorName,
                //   ratings: 0,
                //   courseCoveredPercent: 0

                // }
                return (
                  <>
                    <CourseCardWithOptions
                      key={index}
                      data={{
                        path: "/user/my-courses/individual",
                        img: item.attributes.course_logo,
                        id: item.attributes.courseid,
                        ttl: item.attributes.course_title,
                        author: item.attributes.instrucctorName,
                        ratings: 0,
                        courseCoveredPercent: 0
                      }}
                      isOptions={true}
                    // options={optionsComps}
                    />
                  </>
                )
              })
                : ""
            }
          </div>

        </div>
      </div>
    </Layout1>
  );
};

export default MyCoursesPage;
