"use client"
import { useEffect, useState } from "react";
import DetailDPComponent from "../../../components/CourseVideoComponents/DetailDPComponent/DetailDPComponent";
import CourseContentComponent from "../../../components/CourseVideoComponents/CourseContentComponent/CourseContentComponent";
import CourseViewTabComponent from "../../../components/CourseVideoComponents/CourseViewTabComponents/CourseViewTabComponent/CourseViewTabComponent";
import CourseVideoNavbar from "../../../components/CourseVideoComponents/CourseVideoNavbar/CourseVideoNavbar";
import Footer from "../../../components/Footer/Footer";
import css from "./CourseViewPage.module.css";
import axios from "axios";
import { CMS_URL } from "../../../urlConst";
const CourseViewPage = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [playerFullWidth, setPlayerFullWidth] = useState(false);
  const [coursesData, setCoursesData] = useState("");
  const [btnStyle, setBtnStyle] = useState(false);
  const [state, setState] = useState({
    unitBrief: "",
    unitLabProject: "",
    chapterBrief: "",
    chapterContent: "",
    chapterResourses: ""
  })
  
  useEffect(() => {
    axios.get(CMS_URL + "courses?filters[id][$eq]=" + sessionStorage.getItem("coursePlayerID"))
      .then(res => {
        setCoursesData(res.data.data);
        if (videoUrl === "") {
          setVideoUrl(res.data.data[0].attributes.introductory_video)
        }
      }).catch(err => {
        console.log(err);
      });


  }, [])
  const getdata = (url) => {
    setVideoUrl(url);
  }
  const updateCourseViewContent = (unitBrief, unitLabProject, chapterBrief, chapterContent, chapterResourses) => {
    setState(prev => {
      return { ...prev, ["unitBrief"]: unitBrief, ["unitLabProject"]: unitLabProject, ["chapterBrief"]: chapterBrief, ["chapterContent"]: chapterContent, ["chapterResourses"]: chapterResourses }
    })
  }
  console.log("coursesData",coursesData);
  return (
    <>
      {
        coursesData.length > 0 ? coursesData.map((item, index) => {
          return (
            <>
              <div className={css.outterDiv} key={index} >
                <CourseVideoNavbar cTitle={item.attributes.course_title} />
                <div className={css.bdy}>
                  <div
                    className={css.left}
                    style={{ width: playerFullWidth ? "100%" : "100%" }}
                  >
                    <div
                      className={css.content}
                      style={{
                        height: playerFullWidth ? "700px" : "600px",
                      }}
                    >
                      {/* <VideoPlayer
                        data={{ autoplay: true }}
                        playerWidthState={playerFullWidth}
                        playerWidthSetter={setPlayerFullWidth}
                        url={videoUrl}
                      /> */}
                      <div className={css.outVideoDiv}>
                        <div className={css.innerVideoDiv}>
                          <div>
                            <video
                              src={videoUrl}
                              width='100%'
                              height='100%'
                              controls
                              autoPlay={btnStyle}
                              muted={btnStyle}
                              playsInline
                              loop
                            />
                          </div>
                        </div>
                      </div>

                    </div>


                    <CourseViewTabComponent data = {state} />
                    <div className={css.footer}>
                      <Footer />
                    </div>
                  </div>
                  <div
                    className={css.right}
                    style={{ display: playerFullWidth ? "none" : "block" }}
                  >
                    <DetailDPComponent
                      title="Take a Edoctry Assessment to check your skills"
                      desc="Made by Edoctry, this generalized assessment is a great way to check in on your skills."
                      btnTxt="Launch Assessment"
                    />
                    <CourseContentComponent
                      title="Course Content"
                      id={item.id}
                      playerWidthSetter={setPlayerFullWidth}
                      getdata={getdata}
                      updateCourseViewContent={updateCourseViewContent}
                    />
                  </div>
                </div>
              </div>
            </>
          )
        })

          : ""

      }
    </>
  );
};

export default CourseViewPage;
