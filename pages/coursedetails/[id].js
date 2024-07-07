import { useRouter } from 'next/router'
import Layout1 from '../components/Layout1/Layout1';
import CourseFloatingBuyCard from "../components/CourseFloatingBuyCard/CourseFloatingBuyCard";
import { FaGlobe, FaBookTanakh, FaPlay, FaFileCircleExclamation, FaCircle } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
export default function Page(props) {
    const router = useRouter()
    return (
        <>
            {
                props.posts != undefined ?
                    <Layout1 title={props.posts.attributes.course_title}>

                        <div>
                            <CourseFloatingBuyCard data={props.posts} />
                            <div className=" d-flex justify-content-center" style={{ backgroundColor: "blanchedalmond", width: "100%", height: "auto", padding: "20px" }}>
                                <div style={{ width: "10%" }}></div>
                                <div style={{ width: "60%" }}>
                                    <h1 className="">
                                        <ReactMarkdown>{props.posts.attributes.course_title}</ReactMarkdown>
                                    </h1>
                                    <p style={{ marginRight: "20px" }}>Total Enrollment :  {props.posts.attributes.enrollment_count}</p>
                                    <p style={{ marginRight: "20px" }} >Created by :  {props.posts.attributes.instrucctorName}</p>
                                    <div className="d-flex justify-content-start">
                                        {/* <p><FaBookTanakh /> Last updated : {moment(props.posts.attributes.updatedAt).format('DD-MMM-YYYY')} </p> */}

                                        {/* <p> <FaGlobe /> {props.posts.attributes.language ? props.posts.attributes.language.toUpperCase() : "ENGLISH"}</p>  */}
                                    </div>
                                </div>
                                <div style={{ width: "20%" }}></div>
                            </div>
                            <div>
                                <div className="card " style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">What you'll learn</h1>
                                    <div className="card-body">
                                        <div>
                                            <ReactMarkdown>{props.posts.attributes.course_brief}</ReactMarkdown>
                                        </div>

                                    </div>
                                </div>
                                <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">This Course includes : </h1>
                                    <div className="card-body">
                                        <p><FaPlay />{props.posts.attributes.duration} Hours on-demand video </p>
                                        <p><FaFileCircleExclamation /> Assesment</p>
                                    </div>

                                </div>
                                <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">Course Content </h1>
                                    <div className="card-body">
                                        <ReactMarkdown>{props.posts.attributes.course_outline}</ReactMarkdown>

                                    </div>

                                </div>
                                <div className="card" style={{ margin: "30px 0 0 15%", width: "50%", position: "static" }}>
                                    <h1 className="card-header">Requirements </h1>
                                    <div className="card-body">
                                        <ReactMarkdown>{props.posts.attributes.course_requirement}</ReactMarkdown>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Layout1>
                    : <img
                        src="/publicContent/images/progress-circle.gif"
                        alt="progress"
                    />
            }
        </>
    )
}
export async function getStaticProps({ params }) {
    const templateId = params.id;
    let posts = "Error";
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

export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: '' } },
        ],
        fallback: true
    }
}