
import Layout1 from '../components/Layout1/Layout1';
import CourseFloatingBuyCard from "../components/CourseFloatingBuyCard/CourseFloatingBuyCard";
import { FaGlobe, FaBookTanakh, FaPlay, FaFileCircleExclamation, FaCircle } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
 function CourseDetails({posts={}}){
    return (
        <>
            {
               Object.keys(posts).length > 0  ?
                    <Layout1 title={posts.attributes.course_title}>

                        <div>
                            <CourseFloatingBuyCard data={posts} />
                            <div className=" d-flex justify-content-center" style={{ backgroundColor: "blanchedalmond", width: "100%", height: "auto", padding: "20px" }}>
                                <div style={{ width: "10%" }}></div>
                                <div style={{ width: "60%" }}>
                                    <h1 className="">
                                        <ReactMarkdown>{posts.attributes.course_title}</ReactMarkdown>
                                    </h1>
                                    <p style={{ marginRight: "20px" }}>Total Enrollment :  {posts.attributes.enrollment_count}</p>
                                    <p style={{ marginRight: "20px" }} >Created by :  {posts.attributes.instrucctorName}</p>
                                    <div className="d-flex justify-content-start">
                                        {/* <p><FaBookTanakh /> Last updated : {moment(posts.attributes.updatedAt).format('DD-MMM-YYYY')} </p> */}

                                        {/* <p> <FaGlobe /> {posts.attributes.language ? posts.attributes.language.toUpperCase() : "ENGLISH"}</p>  */}
                                    </div>
                                </div>
                                <div style={{ width: "20%" }}></div>
                            </div>
                            <div>
                                <div className="card " style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">What you'll learn</h1>
                                    <div className="card-body">
                                        <div>
                                            <ReactMarkdown>{posts.attributes.course_brief}</ReactMarkdown>
                                        </div>

                                    </div>
                                </div>
                                <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">This Course includes : </h1>
                                    <div className="card-body">
                                        <p><FaPlay />{posts.attributes.duration} Hours on-demand video </p>
                                        <p><FaFileCircleExclamation /> Assesment</p>
                                    </div>

                                </div>
                                <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">Course Content </h1>
                                    <div className="card-body">
                                        <ReactMarkdown>{posts.attributes.course_outline}</ReactMarkdown>

                                    </div>

                                </div>
                                <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">Requirements </h1>
                                    <div className="card-body">
                                        <ReactMarkdown>{posts.attributes.course_requirement}</ReactMarkdown>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Layout1>
                    : ""
            }
        </>
    )
}
export async function getStaticProps({ params }) {
    const templateId = params.id;
    let posts = {};
    posts = await getCachedTemplate(templateId);
    return {
        props: {
            posts,
            templateId
        },
    }
}

export async function getCachedTemplate(templateId) {
    const endpointUrl = process.env.API_HOST + 'courses/' + templateId;
    let templateData = "";
    await fetch(endpointUrl, { next: { revalidate: 3600 } })
        .then(async (response) => {
            if (response.status === 200) {
                templateData = await response.json();
                templateData = templateData.data;
            }
        })
        .catch((error) => console.error("Error " + error));
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

  export default CourseDetails;