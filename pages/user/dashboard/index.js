import css from "./Dashboard.module.css";
import React, { useEffect, useState } from "react";
import Layout1 from "../../components/Layout1/Layout1";
import ProfileSettingsComponent from "./ProfileSettingsComponent/ProfileSettingsComponent";
import PageLoadingComponents from "../../utils/PageLoadingComponent/PageLoadingComponents";
import ToastComponents from "../../toastComponent";
import axios from "axios";
import ConstData from "../../../urlConst";
const Dashboard = () => {
    const [state, setState] = useState("");
    const [insdata, setInsData] = useState("");
    const [CourseEnrollmentCount, setCourseEnrollmentCount] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("usertype") === "instructor") {
            axios.get(ConstData.CMS_URL + "courses?filters[instructor][$eq]=" + localStorage.getItem("email"))
                .then(res => {
                    setState(res.data.data)
                    let CourseEnrollment = 0;
                    res.data.data.forEach(element => {
                        CourseEnrollment += element.attributes.enrollment_count;
                    });
                    setCourseEnrollmentCount(CourseEnrollment);
                }).catch(err => {
                    ToastComponents("error", err.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
            axios.get(ConstData.CMS_URL + "instructors?filters[instructoremail][$eq]=" + localStorage.getItem("email"), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(result => {
                    setInsData(result.data.data);
                    setLoading(false);
                }).catch(err => {
                    ToastComponents("error", err.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
        } else if (localStorage.getItem("usertype") === "customer") {
            axios.get(ConstData.CMS_URL + "orders?filters[customeremail][$eq]=" + localStorage.getItem("email"),{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res => {
                    setState(res.data.data)
                }).catch(err => {
                    ToastComponents("error", err.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
            axios.get(ConstData.CMS_URL + "customers?filters[customeremail][$eq]=" + localStorage.getItem("email"), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(result => {
                    setInsData(result.data.data);
                    setLoading(false);
                }).catch(err => {
                    ToastComponents("error", err.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
        }

    }, [])

    return (
        <Layout1>
            <PageLoadingComponents loading={loading} setLoading={setLoading} />
            {
                insdata.length > 0 && localStorage.getItem("usertype") === "instructor" ? insdata.map((item, index) => {
                    // let totalEnrollment = state.length;
                    return (
                        <div className={css.topDiv} key={index}>
                            <p>Name:  {item.attributes.display_name}</p>
                            <p>Email:  {item.attributes.instructoremail}</p>
                            {/* <p>Phone Num:</p> */}
                            <p>Qualification: {item.attributes.qualification}</p>
                            <p>Experience: {item.attributes.work_exp_yr} year</p>
                            <p>Linkedin: {item.attributes.linkedin_url}</p>
                            <p>Education: {item.attributes.education_institute}</p>
                            <p>Course Enrollment: <strong>{CourseEnrollmentCount}</strong></p>
                            <div><strong>Inroduction</strong> : <span dangerouslySetInnerHTML={{ __html: item.attributes.introduction_brief }}></span></div>

                        </div>
                    )
                })
                    : insdata.length > 0 && localStorage.getItem("usertype") === "customer" ? insdata.map((item, index) => {
                        // let totalEnrollment = state.length;
                        return (
                            <div className={css.topDiv} key={index}>
                                <p>Name:  {item.attributes.customername}</p>
                                <p>Email:  {item.attributes.customeremail}</p>
                                {/* <p>Phone Num:</p> */}
                                <p>Phone No: {item.attributes.customerphone}</p>
                                <p>City: {item.attributes.customercity}</p>
                                <p>Country: {item.attributes.customercountry}</p>
                                <p>Address: {item.attributes.work_exp_yr} year</p>
                                <div><strong>Remarks</strong> : <span dangerouslySetInnerHTML={{ __html: item.attributes.customerremarks }}></span></div>

                            </div>
                        )
                    })
                        : <div className={css.topDiv}></div>
            }


            <ProfileSettingsComponent loading={loading} setLoading={setLoading} />

        </Layout1>
    )
}

export default Dashboard;