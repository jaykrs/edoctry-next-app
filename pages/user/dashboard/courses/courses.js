import React, { useState, useEffect } from "react";
import css from "./Courses.module.css";
import { MdModeEditOutline } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";
import ConstData from "../../../../urlConst";
const CoursesList = (props) => {
    const { loading = false, setLoading = (() => { }) } = props;
    const [insdata, setInsData] = useState("");
    const [CourseEnrollmentCount, setCourseEnrollmentCount] = useState(0);
    const navigate = useRouter();
    const [stateList, setStateList] = useState("");
    const [courseData, setCourseData] = useState("");
    const [state, setState] = useState({
        currentPage: 1,
        recordsPerPage: 5,
        itemOffset: 0,
        noOfPage: 0,
        pagNextBtn: false,
        pagPreBtn: false,
    })
    useEffect(() => {
        setLoading(true);
        if (localStorage.getItem("usertype") === "instructor") {
            axios.get(ConstData.CMS_URL + "courses?filters[instructor][$eq]=" + localStorage.getItem("email"))
                .then(res => {
                    setCourseData(res.data.data);
                    let CourseEnrollment = 0;
                    res.data.data.forEach(element => {
                        CourseEnrollment += element.attributes.enrollment_count;
                    });
                    setCourseEnrollmentCount(CourseEnrollment);
                    let endOffset = state.currentPage * state.recordsPerPage;
                    const currentItems = res.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                    setStateList(currentItems);
                    let pageCount = Math.ceil(res.data.data.length / state.recordsPerPage);
                    setState(prev => {
                        return { ...prev, ["noOfPage"]: pageCount }
                    })
                    setLoading(false);

                }).catch(err => {
                    ToastComponents("error", error.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
        } else if (localStorage.getItem("usertype") === "customer") {
            axios.get(ConstData.CMS_URL + "orders?filters[customeremail][$eq]=" + localStorage.getItem("email"), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res => {
                    setCourseData(res.data.data);
                    let endOffset = state.currentPage * state.recordsPerPage;
                    const currentItems = res.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                    setStateList(currentItems);
                    let pageCount = Math.ceil(res.data.data.length / state.recordsPerPage);
                    setState(prev => {
                        return { ...prev, ["noOfPage"]: pageCount }
                    })
                    setLoading(false);
                }).catch(err => {
                    ToastComponents("error", error.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
        }

    }, [])
    const handlerNext = () => {
        if (state.currentPage < state.noOfPage) {
            let ccPage = state.currentPage + 1;
            let endOffset = ccPage * state.recordsPerPage;
            const currentItems = courseData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
            setStateList(currentItems);
            setState(prev => {
                return { ...prev, ["currentPage"]: state.currentPage + 1 }
            })
        }
    }
    const handlerPrev = () => {
        if (state.currentPage > 1) {
            let ccPage = state.currentPage - 1;
            let endOffset = ccPage * state.recordsPerPage;
            const currentItems = courseData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
            setStateList(currentItems);
            setState(prev => {
                return { ...prev, ["currentPage"]: state.currentPage - 1 }
            })
        }
    }
    const handleCurrentState = (pageNo) => {
        if (pageNo <= state.noOfPage) {
            let ccPage = pageNo;
            let endOffset = ccPage * state.recordsPerPage;
            const currentItems = courseData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
            setStateList(currentItems);
            setState(prev => {
                return { ...prev, ["currentPage"]: pageNo }
            })
        }
    }
    const DateFormat = function (dateString) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = new Date(dateString);
        return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    }
    return (
        <div className={css.outerDiv}>
            <div className={css.div1}></div>
            <div className="row" style={{ width: "94%" }}>
                <table className="table table-hover" style={{ fontSize: "14px" }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            {/* <th scope="col">course Id</th> */}
                            <th scope="col">Course Title</th>
                            <th scope="col" >Standard Fee</th>
                            <th scope="col" id={css.tableItem} >Premium Fee</th>
                            <th scope="col"  >Enrollment No</th>
                            <th scope="col">Created On</th>
                            <th scope="col" >Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            stateList.length > 0 ? stateList.map((item, index) => {
                                let createdOn = DateFormat(item.attributes.createdAt);
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        {/* <td scope="col"> {item.id}</td> */}
                                        <td scope="col"><span dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></span></td>
                                        <td scope="col"  >{item.attributes.course_fee}</td>
                                        <td scope="col" id={css.tableItem}>{item.attributes.course_fee_premium}</td>
                                        <td scope="col"  >{item.attributes.enrollment_count}</td>
                                        <td scope="col" >{createdOn}</td>
                                        <td scope="col"><button className="btn btn" onClick={() => {
                                            if (localStorage.getItem("usertype") === "instructor") {
                                                navigate.push("/user/profile/course/cardpage")
                                                sessionStorage.setItem("courseInsId", item.id)
                                            } else if (localStorage.getItem("usertype") === "customer") {
                                                navigate.push("/user/my-courses/individual");
                                                sessionStorage.setItem("courseVid", item.attributes.courseid)
                                            }
                                        }}><MdModeEditOutline size={25} /></button></td>

                                    </tr>
                                )
                            })
                                : ""
                        }
                    </tbody>
                </table>
            </div>
            <div className={css.div1}></div>
            <div className="outerDiv3">
                <div className="paginationDiv">
                    <button className="paginationBtn" onClick={handlerPrev}>Prev</button>
                    {
                        (state.currentPage - 2) >= 1 &&
                        <p onClick={() => { handleCurrentState(state.currentPage - 2) }}>{state.currentPage - 2}</p>
                    }
                    {
                        (state.currentPage - 1) >= 1 &&
                        <p onClick={() => { handleCurrentState(state.currentPage - 1) }} >{state.currentPage - 1}</p>
                    }
                    <p style={{ backgroundColor: "#dcdcdc" }}>{state.currentPage}</p>
                    {
                        (state.currentPage + 1) <= state.noOfPage &&
                        <p onClick={() => { handleCurrentState(state.currentPage + 1) }} >{state.currentPage + 1}</p>
                    }
                    {
                        (state.currentPage + 2) <= state.noOfPage &&
                        <p onClick={() => { handleCurrentState(state.currentPage + 2) }} >{state.currentPage + 2}</p>
                    }
                    <button className="paginationBtn" onClick={handlerNext} >Next</button>
                </div>
            </div>
        </div>
    )
}

export default CoursesList;