"use client"
import InputUtil from "../../../../utils/FormUtils/InputUtil/InputUtil";
import TextAreaUtil from "../../../../utils/FormUtils/TextAreaUtil/TextAreaUtil";
import { FaEnvelopeOpenText } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Layout1 from "../../../../components/Layout1/Layout1";
import axios from "axios";
import { CMS_URL } from "../../../../urlConst";
import { useRouter } from "next/router";
import css from "./CustomerQuestionPage.module.css";
import { FaChevronDown } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Label
} from "recharts";
import PageLoadingComponents from "../../../../utils/PageLoadingComponent/PageLoadingComponents";

const CustomerQuestionPage = () => {
    const userType = typeof window !== 'undefined' ? localStorage.getItem("usertype") : "";
    const navigate = useRouter();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        assesment_title: "",
        assesment_marks: 0,
        passmarks: 0,
        assesment_description: "",
        instructor: typeof window !== 'undefined' ? localStorage.getItem("email") : "",
        course: typeof window !== 'undefined' ? localStorage.getItem("courseInsId") : "",
        course_title: typeof window !== 'undefined' ? localStorage.getItem("courseTitle") : ""
    })
    const [assData, setAssData] = useState("");
    const [insData, setInsData] = useState("");
    const [quesData, setQuesData] = useState("");
    const [scData, setScData] = useState("");
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(CMS_URL + "assesments?filters[id][$eq]=" + sessionStorage.getItem("assid"), {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(async res => {
                setAssData(res.data.data)
                let date = new Date(res.data.data[0].attributes.createdAt);
                sessionStorage.setItem("assesmentDetails", JSON.stringify(res.data.data[0]))
                axios.get(CMS_URL + "instructors?filters[instructoremail][$eq]=" + res.data.data[0].attributes.instructor, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                })
                    .then(result => {
                        setInsData(result.data.data)
                        setLoading(false);
                    }).catch(err => {
                        console.log(err);
                    })
                await axios.get(CMS_URL + "questions?filters[assesment_id][$eq]=" + sessionStorage.getItem("assid"), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                })
                    .then(async ques => {
                        setQuesData(ques.data.data);

                        await axios.get(CMS_URL + "scores?filters[customeremail][$eq]=" + localStorage.getItem("email") + "&filters[assesmentid][$eq]=" + sessionStorage.getItem("assid"), {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("jwt")
                            }
                        })
                            .then(async sc => {
                                setScData(sc.data.data)
                                // BarGraph();

                                let data = [];
                                await sc.data.data.forEach(async (element, index) => {
                                    let eleData = JSON.parse(element.attributes.customerAnswer);
                                    let corrAns = 0, wrgAns = 0, notAns = 0;
                                    await eleData.forEach(async el => {
                                        let quesEle = await ques.data.data.find(els => els.id == Number(el.qsid));
                                        if (quesEle !== undefined) {
                                            if (el.Answer.cus_a_answer === quesEle.attributes.option_a_is_answer && el.Answer.cus_b_answer === quesEle.attributes.option_b_is_answer &&
                                                el.Answer.cus_c_answer === quesEle.attributes.option_c_is_answer && el.Answer.cus_d_answer === quesEle.attributes.option_d_is_answer && el.Answer.cus_e_answer === quesEle.attributes.option_e_is_answer) {
                                                corrAns += 1;
                                            } else {
                                                wrgAns += 1;
                                            }
                                        }
                                    })
                                    notAns = ques.data.data.length - (corrAns + wrgAns);
                                    data.push({ name: `A-${index + 1} C-${corrAns} W-${wrgAns}`, fullMarks: ques.data.data.length, correct: corrAns, wrong: wrgAns, notAnswered: notAns })
                                })
                                setGraphData(data);
                                setLoading(false);

                            }).catch(err => {
                                console.log(err);
                            })

                    }).catch(err => console.log(err))

            }).catch(err => {
                console.log(err)
            })


    }, [])

    let BarGraph = async () => {
        let data = [];
        let funcCall = () => {
            scData.length > 0 ? scData.forEach(async (element, index) => {
                let eleData = JSON.parse(element.attributes.customerAnswer);
                let corrAns = 0, wrgAns = 0, notAns = 0;
                await eleData.forEach(async el => {
                    let quesEle = await quesData.find(els => els.id == Number(el.qsid));
                    if (el.Answer.cus_a_answer === quesEle.attributes.option_a_is_answer && el.Answer.cus_b_answer === quesEle.attributes.option_b_is_answer &&
                        el.Answer.cus_c_answer === quesEle.attributes.option_c_is_answer && el.Answer.cus_d_answer === quesEle.attributes.option_d_is_answer && el.Answer.cus_e_answer === quesEle.attributes.option_e_is_answer) {
                        corrAns += 1;
                    } else {
                        wrgAns += 1;
                    }
                })
                notAns = quesData.length - (corrAns + wrgAns);
                data.push({ name: `Atmpt ${index + 1} C-${corrAns}/W-${wrgAns}`, fullMarks: quesData.length, correct: corrAns, wrong: wrgAns, notAnswered: notAns })
            }) : "";
        }
        await funcCall();
        setGraphData(data);
    }

    const handleCreate = () => {
        navigate.push("/user/profile/assesment/question/new")
    }

    const handleChange = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleTest = (id) => {
        sessionStorage.setItem("testId", id);
        navigate.push("/user/my-courses/assessment/test")
    }
    const handleReviewPage = (id) => {
        sessionStorage.setItem("scoreId", id);
        navigate.push("/user/my-courses/assessment/reviews")
    }
    let graphList = {
        A: "A => Attempt",
        C: "C => Correct",
        W: "W => Wrong"
    }
    console.log("scData", scData);
    return (

        <Layout1 className="course view">
            <PageLoadingComponents loading={loading} />
            <div style={{ backgroundColor: "#f3e7e70f;", marginTop: "50px" }} >

                {
                    assData.length > 0 ? assData.map((item, index) => {
                        return (
                            <div className=" d-flex justify-content-center w-100" key={index}>
                                <div className={css.menuDiv1}><button className="btn" style={{ marginLeft: "10%" }} onClick={() => { navigate.push("/user/my-courses/assessment") }}><FaAngleDoubleLeft size={40} /></button></div>
                                <div className={css.menuDiv2}>
                                    <h4 className="">{item.attributes.assesment_title}</h4>
                                    <div className="row">
                                        <p className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6"><span dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></span> </p>
                                        <p className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" >Full Mark : {item.attributes.assesment_marks}</p>
                                        <p className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" > Pass Mark : {item.attributes.passmarks}</p>
                                        {
                                            insData.length > 0 && localStorage.getItem("usertype") != "instructor" ?
                                                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6" >
                                                    <h6>Author</h6>
                                                    <p>Name : {insData[0].attributes.display_name}</p>
                                                    <p>Email : {insData[0].attributes.instructoremail}</p>
                                                </div>
                                                : ""
                                        }
                                        <div className="col-12" >
                                            <h6>Description</h6>
                                            <div dangerouslySetInnerHTML={{ __html: item.attributes.assesment_description }}></div>

                                        </div>
                                    </div>
                                </div>
                                <div className={css.menuDiv3}>
                                    <button className={css.menuBtn1} onClick={() => { handleTest(item.id) }}>Start</button>
                                    {/* <button className="btn btn-primary" style={{margin:"20px" }} onClick={()=>{handleTest(item.id)}}>Review</button> */}
                                    <div className={`${css.menuSubDiv3} dropdown`}>
                                        <button type="button" className={css.subDivBtn} data-bs-toggle="dropdown">
                                            Review <FaChevronDown size={15} />
                                        </button>
                                        <ul className="dropdown-menu">
                                            {scData.length > 0 ? (
                                                scData.map((item, index) => (
                                                    <li key={index}>
                                                        <button
                                                            className="dropdown-item d-flex justify-content-between"
                                                            onClick={() => handleReviewPage(item.id)}
                                                        >
                                                            <p>Attempt {index + 1}</p>
                                                            Score - {item.attributes.totalScored}
                                                        </button>
                                                    </li>
                                                ))
                                            ) : (
                                                <li>No items found</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        )
                    })

                        : ""
                    //  <img
                    //     src="/publicContent/images/progress-circle.gif"
                    //     alt="progress"
                    // />
                }

            </div>


            {/* <RadialBarChart width={500}
                height={500} data={dataG}>
                <RadialBar minAngle={15} dataKey="x" />
            </RadialBarChart> */}

            {/* <BargraphView scData={scData} quesData={quesData} /> */}

            <div className="d-flex justify-content-center align-content-center">

                <div className="d-flex justify-content-space-between"><p>Correct Answer: </p><p className="bargraphStyle2"></p></div>
                <div className="d-flex justify-content-space-between" ><p>Wrong Answer: </p><p className="bargraphStyle3"></p></div>
                <div className="d-flex justify-content-space-between"><p>Not Answered: </p><p className="bargraphStyle4"></p></div>
            </div>
            <div className="d-flex justify-content-center">
                {
                    // data.length > 0 ? 
                    <ResponsiveContainer width={'80%'} height={300} >
                        <BarChart data={graphData}>
                            <Bar dataKey="fullMarks" fill="#fff" barSize={20} />
                            <Bar dataKey="correct" fill="green" barSize={20} />
                            <Bar dataKey="wrong" fill="red" barSize={20} />
                            <Bar dataKey="notAnswered" fill="#D5CDCD" barSize={20} />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                        </BarChart>
                    </ResponsiveContainer>
                }
            </div>
            <div className="d-flex justify-content-center align-content-center">

                <div className="d-flex justify-content-space-between m-3">{graphList.A}</div>
                <div className="d-flex justify-content-space-between m-3" >{graphList.C}</div>
                <div className="d-flex justify-content-space-between m-3">{graphList.W}</div>
            </div>


        </Layout1>
    )

};

export default CustomerQuestionPage;
