import { useRouter } from 'next/router';
import Layout1 from '../components/Layout1/Layout1';
import CourseFloatingBuyCard from "../components/CourseFloatingBuyCard/CourseFloatingBuyCard";
import { FaGlobe, FaBookTanakh, FaPlay, FaCircle } from "react-icons/fa";
import { FaFileCircleExclamation } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";

const CourseDetails = ({ posts }) => {
    const router = useRouter();

    // Handle fallback state
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout1 title={posts.attributes?.course_title || "Course Details"}>
            {
                Object.keys(posts).length > 0 ?
                    <div>
                        <CourseFloatingBuyCard data={posts} />
                        <div className="d-flex justify-content-center" style={{ backgroundColor: "blanchedalmond", width: "100%", height: "auto", padding: "20px" }}>
                            <div style={{ width: "10%" }}></div>
                            <div style={{ width: "60%" }}>
                                <h1>
                                    <ReactMarkdown>{posts.attributes?.course_title}</ReactMarkdown>
                                </h1>
                                <p style={{ marginRight: "20px" }}>Total Enrollment: {posts.attributes?.enrollment_count}</p>
                                <p style={{ marginRight: "20px" }}>Created by: {posts.attributes?.instrucctorName}</p>
                                <div className="d-flex justify-content-start">
                                    {/* Optional: Include other data points */}
                                </div>
                            </div>
                            <div style={{ width: "20%" }}></div>
                        </div>
                        <div>
                            <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                <h1 className="card-header">What you'll learn</h1>
                                <div className="card-body">
                                    <ReactMarkdown>{posts.attributes?.course_brief}</ReactMarkdown>
                                </div>
                            </div>
                            <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                <h1 className="card-header">This Course includes:</h1>
                                <div className="card-body">
                                    <p><FaPlay /> {posts.attributes?.duration} Hours on-demand video</p>
                                    <p><FaFileCircleExclamation /> Assessment</p>
                                </div>
                            </div>
                            <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                <h1 className="card-header">Course Content</h1>
                                <div className="card-body">
                                    <ReactMarkdown>{posts.attributes?.course_outline}</ReactMarkdown>
                                </div>
                            </div>
                            <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                <h1 className="card-header">Requirements</h1>
                                <div className="card-body">
                                    <ReactMarkdown>{posts.attributes?.course_requirement}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div>No course details available.</div>
            }
        </Layout1>
    );
};


export async function getStaticProps({ params }) {
    const templateId = params.id;
    let posts = null;

    try {
        posts = await getCachedTemplate(templateId);
    } catch (error) {
        console.error("Error fetching course details:", error);
    }

    return {
        props: {
            posts: posts || {}, // Ensure `posts` is always an object
        },
        revalidate: 3600, // Revalidate every hour
    };
}

export async function getCachedTemplate(templateId) {
    const endpointUrl = `${process.env.API_HOST}/courses/${templateId}`;
    let courseData = {};

    try {
        const response = await fetch(endpointUrl);
        if (response.ok) {
            const data = await response.json();
            courseData = data.data || {}; // Ensure `courseData` has a default value
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return courseData;
}


export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '' } },
        ],
        fallback: true
    }
}

export default CourseDetails;