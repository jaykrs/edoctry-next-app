
"use client"
import React, { useEffect, useState } from "react";
import Layout1 from "../../../components/Layout1/Layout1";
import axios from "axios";
import ConstData from "../../../../urlConst";
import { useRouter } from "next/router";
import { FaAngleDoubleLeft } from "react-icons/fa";
import toastComponent from "../../../toastComponent";
import { ToastContainer } from "react-toastify";
import css from "./customerAssesmentPage.module.css";
import PageLoadingComponents from "../../../utils/PageLoadingComponent/PageLoadingComponents";
const CustomerAssesmentPage = () => {
    const navigate = useRouter();
    const [state, setState] = useState("");
    const [loading, setLoading] = useState(false);
    const userType = typeof window !== 'undefined' ? localStorage.getItem("usertype") : "";
    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("loginStatus") !== "true" || localStorage.getItem("jwt") === null) {
            toastComponent("warn", "session expire!")
            setTimeout(() => {
                navigate.push("/");
                setLoading(false);
            }, 1500)
        } else {
            let courseId = sessionStorage.getItem("courseInsId")
            axios.get(ConstData.CMS_URL + "assesments?filters[course][$eq]=" + sessionStorage.getItem("courseAid"), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res => {
                    setState(res.data.data);
                    setLoading(false);
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [])

    const handleCreate = () => {
        navigate.push("/user/profile/assesment/create");
    }
    const handleAddQuestion = (id) => {
        sessionStorage.setItem("assid", id)
        navigate.push("/user/profile/assesment/question")
    }

    return (

        <Layout1 >
            <ToastContainer />
            <PageLoadingComponents loading={loading} />
            <div>
                <div style={{ marginTop: "30px" }} className="d-flex justify-content-start">
                    <button style={{ marginLeft: "3%" }} className="btn " onClick={() => { navigate.push("/user/my-courses/individual") }}><FaAngleDoubleLeft size={40} /></button>

                </div>

                <div className="d-flex justify-content-row">
                    <div style={{ width: "3%" }}></div>

                    <div className="row" style={{ width: "94%", margin: "50px 0" }}>
                        <div className={userType === "instructor" ? "d-flex justify-content-between" : "d-flex justify-content-start"}>
                            <h1>Assesment</h1>
                            {userType === "instructor" &&
                                <button className="btn btn-primary" onClick={handleCreate}>New Assesment</button>
                            }
                        </div>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"> Assesment Title</th>
                                    <th scope="col">Course Title</th>
                                    <th scope="col">Full Marks</th>
                                    <th scope="col">Pass Marks</th>
                                    <th scope="col">View</th>
                                    {/* <th scope="col">publish</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.length > 0 ? state.reverse().map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{item.id}</th>
                                                <td>{item.attributes.assesment_title}</td>
                                                <td dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></td>
                                                <td>{item.attributes.assesment_marks}</td>
                                                <td>{item.attributes.passmarks}</td>
                                                <td>
                                                    <button className="btn btn-secondary" onClick={() => {
                                                        sessionStorage.setItem("assid", item.id);
                                                        navigate.push("/user/my-courses/assessment/questions");
                                                    }} >view</button>
                                                </td>
                                                {/* <td>
                                                    <button className="btn btn-warning" >delete</button>
                                                </td> */}
                                            </tr>
                                        )
                                    })
                                        : <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>No Data found</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                }
                            </tbody>
                        </table>



                    </div>
                    <div style={{ width: "3%" }} ></div>
                </div>
            </div>
        </Layout1>
    )

};

export default CustomerAssesmentPage;
