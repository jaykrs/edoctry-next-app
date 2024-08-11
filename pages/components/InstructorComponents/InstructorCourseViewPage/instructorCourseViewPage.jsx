import React, { useEffect, useState } from "react";
import axios from "axios";
import ConstData from "../../../../urlConst";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import Layout1 from "../../Layout1/Layout1";

const InstructorCourseViewPage = () => {
    const [data, setData] = useState("");
    const [unitData, setUnitData] = useState("");
    const navigate = useRouter();
    const [stateList, setStateList] = useState("");
    const [recordDeleted,setRecordDeleted] = useState(false);
    const [state, setState] = useState({
        currentPage: 1,
        recordsPerPage: 2,
        itemOffset: 0,
        noOfPage: 0,
        pagNextBtn: false,
        pagPreBtn: false
    })
    useEffect(() => {
        searchData();
    }, [])
    useEffect(() => {
        searchData();
    }, [recordDeleted]);

    const searchData = ()=>{
        if (localStorage.getItem("usertype") === "instructor") {
            axios.get(ConstData.CMS_URL + "/api/courses?filters[id][$eq]=" + sessionStorage.getItem("courseInsId"))
                .then(res => {
                    setData(res.data.data);
                }).catch(err => console.log(err))
            axios.get(ConstData.CMS_URL + "/api/courseunits?filters[courseid][$eq]=" + sessionStorage.getItem("courseInsId"))
                .then(result => {

                    setUnitData(result.data.data)
                    let endOffset = state.currentPage * state.recordsPerPage;
                    const currentItems = result.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                    setStateList(currentItems);
                    let pageCount = Math.ceil(result.data.data.length / state.recordsPerPage);
                    setState(prev => {
                        return { ...prev, ["noOfPage"]: pageCount }
                    })
                }).catch(err => console.log(err))
        } else if (localStorage.getItem("usertype") === "customer") {
            axios.get(ConstData.CMS_URL + "/api/courses?filters[id][$eq]=" + sessionStorage.getItem("courseInsId"))
                .then(res => {
                    setData(res.data.data);
                }).catch(err => console.log(err))
            axios.get(ConstData.CMS_URL + "/api/courseunits?filters[courseid][$eq]=" + sessionStorage.getItem("courseInsId"))
                .then(result => {
                    setUnitData(result.data.data)
                    let endOffset = state.currentPage * state.recordsPerPage;
                    const currentItems = result.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                    setStateList(currentItems);
                    let pageCount = Math.ceil(result.data.data.length / state.recordsPerPage);
                    setState(prev => {
                        return { ...prev, ["noOfPage"]: pageCount }
                    })
                }).catch(err => console.log(err))
        }
    }

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this course unit?")) {
            axios.delete(ConstData.CMS_URL + "/api/courseunits/" + id, {
                headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
            })
                .then(res => {
                    setTimeout(()=>{
                        toastComponent("success",textConst.tableDeletedSuccess);
                    },3000);
                    setRecordDeleted(!recordDeleted);
                }).catch(err => { console.log(err) })
        }
    }
    const handlerNext = () => {
        if (state.currentPage < state.noOfPage) {
            let ccPage = state.currentPage + 1;
            let endOffset = ccPage * state.recordsPerPage;
            const currentItems = unitData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
            const currentItems = unitData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
            const currentItems = unitData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
            setStateList(currentItems);
            setState(prev => {
                return { ...prev, ["currentPage"]: pageNo }
            })
        }
    }

    return (
        <>
            <Layout1 >
               <ToastContainer />
                <div className="" style={{ margin: "30px 0" }}>
                    {
                        data.length > 0 ? data.map((item, index) => {
                            return (
                                <div key={index} className="d-flex justify-content-row">
                                    <div style={{ width: "3%", marginBottom: "10px" }}>
                                        <button className="btn " onClick={() => { navigate.push("/user/profile/course/cardpage") }} ><FaAngleDoubleLeft size={40} /></button>
                                    </div>
                                    <div style={{ width: "94%" }}  >
                                        <div className="d-flex justify-content-end">
                                            {localStorage.getItem("usertype") === "instructor" &&
                                                <button className="btn btn-secondary" onClick={() => {
                                                    sessionStorage.setItem("courseEditId", item.id)
                                                    navigate.push("/course/edit")
                                                }}>Edit</button>}
                                        </div>
                                        <div className="d-flex justify-content-left mt-5">
                                            <h3 >Course Details</h3>
                                        </div>
                                        <div className="row">
                                            <h6 className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xm-6"><span dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></span></h6>
                                            <p className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xm-6" >Fee : {item.attributes.course_fee}</p>
                                            <p className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xm-6">Premium Fee : {item.attributes.course_fee_premium}</p>
                                            <p className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xm-6">Enrollment: {item.enrollment_count}</p>
                                            <p className="col-lg" style={{ fontSize: "14px", textAlign: "justify" }}><ReactMarkdown>{item.attributes.course_brief?.substring(0, 196)}</ReactMarkdown></p>
                                        </div>
                                        <div className="d-flex justify-content-end" style={{ marginTop: "5px" }} >
                                            {localStorage.getItem("usertype") === "instructor" &&
                                                <button className="btn btn-primary" onClick={() => {
                                                    navigate.push("/course/unit/new");
                                                }}>New Unit</button>
                                            }
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col"> Unit</th>
                                                        <th scope="col">Unit Duration</th>

                                                        <th scope="col">View</th>
                                                        {localStorage.getItem("usertype") === "instructor" &&
                                                            <th scope="col">Update</th>
                                                        }
                                                        {localStorage.getItem("usertype") === "instructor" &&
                                                            <th scope="col">Delete</th>
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        stateList.length > 0 ? stateList.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td dangerouslySetInnerHTML={{ __html: item.attributes.unit_title }}></td>
                                                                    <td>{item.attributes.unit_duration}</td>
                                                                    {/* <td>{item.attributes.marks}</td> */}
                                                                    <td>
                                                                        <button className="btn" onClick={() => {
                                                                            sessionStorage.setItem("unid", item.id);
                                                                            if (localStorage.getItem("usertype") === "instructor") {
                                                                                navigate.push("/user/profile/unit/view");
                                                                            } else if (localStorage.getItem("usertype") === "customer") {
                                                                                navigate.push("/user/profile/unit/view");
                                                                            }

                                                                        }} ><MdEdit size={25} /></button>
                                                                    </td>
                                                                    {localStorage.getItem("usertype") === "instructor" &&
                                                                        <td>
                                                                            <button className="btn" onClick={() => {
                                                                                sessionStorage.setItem("unitEditId", item.id);
                                                                                navigate.push("/instructor/unit/edit");
                                                                            }} ><MdEdit size={25} /></button>
                                                                        </td>}
                                                                    {
                                                                        localStorage.getItem("usertype") === "instructor" &&
                                                                        <td>
                                                                            <button className="btn" onClick={() => {
                                                                                handleDelete(item.id)
                                                                            }} ><MdDelete size={25} /></button>
                                                                        </td>
                                                                    }
                                                                </tr>
                                                            )
                                                        })
                                                            : <tr>No data found</tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div style={{ width: "3%" }}>
                                    </div>

                                </div>
                            )
                        })

                            : <img
                                src="../../../../src/publicContent/images/progress-circle.gif"
                                alt="progress"
                            />
                    }
                    {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">View Course Details</button> */}
                </div>



                <div className="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                    <div className="offcanvas-header">
                        <h5 id="offcanvasTopLabel" style={{ margin: "20px 0 0 30px" }} >Course Details </h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body" style={{ margin: "5px 40px", height: "400px" }}>

                    </div>
                </div>

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
            </Layout1>



        </>
    )
}

export default InstructorCourseViewPage;