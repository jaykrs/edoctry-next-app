import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout1 from "../components/Layout1/Layout1";
// import css from "./courseWithoutLoginDetails.css";
import { FaGlobe, FaBookTanakh, FaPlay, FaFileCircleExclamation, FaCircle } from "react-icons/fa6";
import CourseFloatingBuyCard from "../components/CourseFloatingBuyCard/CourseFloatingBuyCard";
import ReactMarkdown from "react-markdown";
import moment from 'moment';
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import ConstData from "../../urlConst";
function CourseWithoutLoginDetails(props) {
    const [data, setData] = useState(null);
    const [unitData, setUnitData] = useState(null);
    const router = useRouter();
    useEffect(() => {
        axios({ method: "GET", url: ConstData.CMS_URL + "/api/courses/" + localStorage.getItem("courseId") })
            .then(res => {
                setData(res.data.data);

                axios({ method: "GET", url: ConstData.CMS_URL + "/api/courseunits?filters[courseid][$eq]=" + res.data.data.id })
                    .then(response => {
                        setUnitData(response.data.data);
                    })
            })

    }, [])
    const handleAddToCart = (data) => {
        // console.log('jwt' + localStorage.getItem("jwt"), "loginStatus" + localStorage.getItem("loginStatus"))
    
        //alert("Added to cart");
        toastComponent("warn", textConst.addToCart);
        setTimeout(() => {
            router.push("/cart");
        },2000)
      }
    return (
        <>
            <Layout1>
                <div>
                    {
                        data != null ?
                            <div className="">
                                {
                                    localStorage.getItem("usertype") != "instructor" &&
                                    <CourseFloatingBuyCard data={data} />

                                }
                                <div className=" d-flex justify-content-center course_heading">
                                    <div style={{ width: "10%" }}></div>
                                    <div style={{ width: "60%" }}>
                                        <h1 className="">
                                            <ReactMarkdown>{data.attributes.course_title}</ReactMarkdown>
                                        </h1>
                                        <p>Total Enrollment :  {data.attributes.enrollment_count}</p>
                                        <p >Created by :  {data.attributes.instrucctorName}</p>
                                        <div className="d-flex justify-content-start">
                                            <p><FaBookTanakh /> Last updated : {moment(data.attributes.updatedAt).format('DD-MMM-YYYY')} </p>

                                            <p> <FaGlobe /> {data.attributes.language ? data.attributes.language.toUpperCase() : "ENGLISH"}</p>
                                        </div>
                                    </div>
                                    <div style={{ width: "20%" }}></div>
                                </div>
                                <div>
                                    <div className="card ">
                                        <h1 className="card-header">What you'll learn</h1>
                                        <div className="card-body">
                                            <div>
                                                <ReactMarkdown>{data.attributes.course_brief}</ReactMarkdown>
                                                {/* <div dangerouslySetInnerHTML={{__html:data.attributes.course_brief}}></div> */}
                                                {/* <MDEditor.Markdown source={data.attributes.course_brief} style={{ whiteSpace: 'pre-wrap' }} /> */}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="card card1">
                                        <h1 className="card-header">This Course includes : </h1>
                                        <div className="card-body">
                                            <p><FaPlay />{data.attributes.duration} Hours on-demand video </p>
                                            <p><FaFileCircleExclamation /> Assesment</p>
                                        </div>

                                    </div>
                                    <div className="card card1">
                                        <h1 className="card-header">Course Content </h1>
                                        <div className="card-body">
                                            <ReactMarkdown>{data.attributes.course_outline}</ReactMarkdown>
                                            {/* <div dangerouslySetInnerHTML={{__html:data.attributes.course_outline}}></div> */}

                                        </div>

                                    </div>
                                    <div className="card card1">
                                        <h1 className="card-header">Requirements </h1>
                                        <div className="card-body">
                                            <ReactMarkdown>{data.attributes.course_requirement}</ReactMarkdown>
                                            {/* <div dangerouslySetInnerHTML={{__html:data.attributes.course_requirement}}></div> */}
                                        </div>

                                    </div>
                                </div>

                            </div>
                            : <img
                                src="/publicContent/images/progress-circle.gif"
                                alt="progress"
                            />
                    }
                </div>

            </Layout1>
        </>
    )

}

export default CourseWithoutLoginDetails