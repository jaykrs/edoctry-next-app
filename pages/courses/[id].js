import React from "react";
import css from "./couresview.module.css";
import { MdModeEditOutline, MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/router";
import Layout1 from "../components/Layout1/Layout1";
import ReactMarkdown from "react-markdown";

function CoursesPost({posts={}}){
    const router = useRouter();
    const handleView = (id, title) => {
        // if (localStorage.getItem("usertype") === "instructor") {
        //     sessionStorage.setItem("courseInsId", id); 
        //     sessionStorage.setItem("courseTitle", title)
        // } else {
        //     localStorage.setItem("courseId", id);
        // }

        router.push("/coursedetails/" + id)
    }
    return (
        <>
         <Layout1 title="courses">
            {
                Object.keys(posts).length > 0 ?
                    <div className={css.outerDiv}>
                        <div className={css.div1}></div>
                        <div className="row" style={{ width: "90%" }}>

                            {
                                posts.data.map((item, index) => {
                                    // let createdOn = DateFormat(item.attributes.createdAt);
                                    return (
                                        <div key={index} className="col-lg-6 p-2" >
                                            <div className={css.cardDiv} >
                                                <div>
                                                    <img src={item.attributes.course_logo} width={"70px"} height={"70px"} alt="image" />

                                                </div>
                                                <div>
                                                    <ReactMarkdown className={"p"}>{item.attributes.course_title.substring(0, 25)}</ReactMarkdown>
                                                    <p className="p">Fee: {item.attributes.course_fee} <span className={css.oldPrc}>{item.attributes.course_fee} </span></p>
                                                </div>
                                                <div>
                                                    <p className="p">Enrollment: {item.attributes.enrollment_count}</p>
                                                    {/* <p className="p"> {createdOn}</p> */}
                                                    <button className="btn btn-outline-primary btn-sm" style={{ marginLeft: "2px" }} onClick={() => handleView(item.id, item.attributes.course_title)}>View <MdArrowOutward size={20} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={css.div1}></div>
                    </div>
                    : <img
                        src="/publicContent/images/progress-circle.gif"
                        alt="progress"
                    />
            }
         </Layout1>
        </>
    )
}



export async function getStaticProps({ params }) {
    const templateId = params.id;
    let posts = {};
    posts = await getCachedTemplates(templateId);
    return {
        props: {
            posts
        },
    }
}

export async function getCachedTemplates(templateId) { 
    const endpointUrl = process.env.API_HOST + 'courses?filters[metadata][$contains]=' + templateId;
    let templateData = [];
    await fetch(endpointUrl, { next: { revalidate: 3600 } }).then(async (response) => { if (response.status === 200) templateData = await response.json(); }).catch((error) => console.error("Error " + error));
    return templateData;
};

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { id: '' } },
//         ],
//         fallback: true
//     }
// }

export async function getStaticPaths() {
    const allPosts = await fetchAllPosts();
    const paths = allPosts.map(post => ({
      params: { id: post.id.toString() },
    }));
  
    return {
      paths,
      fallback: true,
    };
  }
  
  async function fetchAllPosts() {
    const endpointUrl = `${process.env.API_HOST}courses`;
    let posts = [];
  
    try {
      const response = await fetch(endpointUrl);
      if (response.status === 200) {
        const data = await response.json();
        posts = data.data.map(post => ({ id: post.id }));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  
    return posts;
  }

export default CoursesPost;