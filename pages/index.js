import Layout1 from "./components/Layout1/Layout1";
import VerticalCategoryMenuBar from "./components/VerticalCategoryMenuBar/VerticalCategoryMenuBar";
import VerticalCourseDraftCard from "./utils/VerticalCourseDraftCard/VerticalCourseDraftCard";
import css from "./index.module.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseCard from "./components/CourseCard/CourseCard";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import RichTextComp from "./components/RichTextComp/RichTextComp";
export default function Page(props) {
  const [slug, setSlug] = useState("topCourses");
  const [CourseData, setCourseData] = useState([]);
  const jsonData = [
    {
      id: "tab-1",
      ttl: "Top Courses",
      slug: "topCourses",
      linkTxt: 'Top Courses'
    },
    {
      id: "tab-2",
      ttl: "Popular Trending courses",
      slug: "popularTrending",
      linkTxt: "Popular Courses"
    },
    {
      id: "tab-3",
      ttl: "java popular course",
      slug: "java",
      linkTxt : "java trak"
    },
  ];

  useEffect(() => {
    if (slug === 'topCourses') {
      setCourseData(props.coursesSet1);
    } else if (slug === 'popularTrending') {
      setCourseData(props.coursesSet2);
    } else {
      setCourseData(props.coursesSet3);
    }
  }, [slug]);
  return (
    <>
      <Layout1 title="Home Page" metadata={"home,courses,web,server"}>
        <VerticalCategoryMenuBar />
        <div className={css.ma}>
          <div className={css.banner}>
            <HeroBanner />
          </div>
          <div className={css.banner}>
            <RichTextComp richTextName="homesection1" />
          </div>
          <div className="coursecontainerbg">
            <div className="coursecontainer">
              <div className="columntitle">
                <div className={"tabs"}>
                  {jsonData?.map((item) => (
                    <p
                      // href={item.slug}
                      className={({ isActive }) =>
                        isActive ? ["tab", "tabActive"].join(" ") : "tab"
                      }
                      key={item.id}
                      onClick={() => setSlug(item.slug)}
                      style={{ color: item.slug === slug ? "blue" : "", cursor: "pointer", borderBottom: item.slug === slug ? "solid 3px blue" : "" }}
                    >
                      {item.ttl}
                    </p>
                  ))}
                </div>
              </div>


              {
                  <VerticalCourseDraftCard
                    ttl= {slug=="topCourses"? jsonData[0]?.ttl : slug =='popularTrending'? jsonData[1]?.ttl : jsonData[2]?.ttl}
                    link="/coursesDetails"
                    linkTxt={slug=="topCourses"? jsonData[0]?.linkTxt : slug =='popularTrending'? jsonData[1]?.linkTxt : jsonData[2]?.linkTxt}
                    data={CourseData}
                  />
              }
              {/* {
                slug === "topCourses" ?
                  <VerticalCourseDraftCard
                    ttl=""
                    link="/coursesDetails"
                    linkTxt="Top Courses"
                    data={props.coursesSet1}
                  /> : slug === "popularTrending" ?
                    <VerticalCourseDraftCard
                      ttl="Popular Trending"
                      link="/coursesDetails"
                      linkTxt="Popular Courses"
                      data={props.coursesSet2}
                    /> : slug === "java" ?
                      <VerticalCourseDraftCard
                        ttl="java popular course"
                        link="/coursesDetails"
                        linkTxt="java trak"
                        data={props.coursesSet3}
                      /> : ""
              } */}


            </div>
          </div>

        </div>
      </Layout1>

    </>
  )
}

export async function getServerSideProps() {
  let homePageData = "Emtpy Data";
  const coursesSet1 = await getCachedCoursesForHomepage('web');
  const coursesSet2 = await getCachedCoursesForHomepage('server');
  const coursesSet3 = await getCachedCoursesForHomepage('java');
  return {
    props: {
      homePageData,
      coursesSet1,
      coursesSet2,
      coursesSet3
    },
  }
}

export async function getCachedCoursesForHomepage(metadata) {
  const endpointUrl = process.env.API_HOST + 'courses?filters[metadata][$contains]=' + metadata;
  let coursesData = [];
  await fetch(endpointUrl, { next: { revalidate: 3600 } })
    .then(async (response) => {
      if (response.status === 200) {
        coursesData = await response.json();
        coursesData = coursesData.data;
      }
    })
    .catch((error) => console.error("Error " + error));
  return coursesData;
};
