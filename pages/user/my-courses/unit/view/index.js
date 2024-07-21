import React, { useEffect, useState } from "react";
import Layout1 from "../../../../components/Layout1/Layout1";
import axios from "axios";
import { CMS_URL, textConst } from "../../../../urlConst";
import { useRouter } from "next/router";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaAngleDoubleLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { ToastContainer } from "react-toastify";
import toastComponent from "../../../../toastComponent";
import PageLoadingComponents from "../../../../utils/PageLoadingComponent/PageLoadingComponents";
const InstructorUnitViewPage = () => {
    const [data, setData] = useState("");
    const [unitData, setUnitData] = useState("");
    const navigate = useRouter();
    const [chapterList, setChapterList] = useState("");
    const [recordDeleted, setRecordDeleted] = useState(false);
    const [loading,setLoading] = useState(false);
    const [state, setState] = useState({
        currentPage: 1,
        recordsPerPage: 2,
        itemOffset: 0,
        noOfPage: 0,
        pagNextBtn: false,
        pagPreBtn: false
    })
    useEffect(() => {
        SearchData();
    }, [])

    useEffect(() => {
        SearchData();
    }, [recordDeleted])

    const SearchData = () => {
        setLoading(true)
        axios.get(CMS_URL + "courseunits?filters[id][$eq]=" + sessionStorage.getItem("unid"))
            .then(res => {
                setData(res.data.data);
            }).catch(err => console.log(err))

        axios.get(CMS_URL + "chapters?filters[courseunitid][$eq]=" + sessionStorage.getItem("unid"), {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(result => {
                setUnitData(result.data.data);
                let endOffset = state.currentPage * state.recordsPerPage;
                const currentItems = result.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                setChapterList(currentItems);
                let pageCount = Math.ceil(result.data.data.length / state.recordsPerPage);
                setState(prev => {
                    return { ...prev, ["noOfPage"]: pageCount }
                })
                setLoading(false);
            }).catch(err => console.log(err))
    }


    const handleDelete = (id) => {
        if (confirm("Are you sure , you want to delete Chapter")) {
            setLoading(true);
            axios.delete(CMS_URL + "chapters/" + id, {
                headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
            }).then(res => {
                setLoading(false);
                setTimeout(() => {
                    toastComponent("success", textConst.tableDeletedSuccess);
                }, 3000);
                setRecordDeleted(!recordDeleted);
            }).catch(err => {
                toastComponent("error", err.message);
                setTimeout(()=>{
                    setLoading(false);
                  },3000)
            })
        }
    }

    const handlerNext = () => {
        if (state.currentPage < state.noOfPage) {
            let ccPage = state.currentPage + 1;
            let endOffset = ccPage * state.recordsPerPage;
            const currentItems = unitData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
            setChapterList(currentItems);
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
            setChapterList(currentItems);
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
            setChapterList(currentItems);
            setState(prev => {
                return { ...prev, ["currentPage"]: pageNo }
            })
        }
    }

    return (
        <>
            <Layout1 >
                <ToastContainer />
                <PageLoadingComponents loading={loading} />
                <div className="" style={{ margin: "20px 0" }}>
                    {
                        data.length > 0 ? data.map((item, index) => {
                            return (
                                <div key={index} className="d-flex justify-content-row">
                                    <div style={{ width: "3%" }}>
                                        <button className="btn" style={{ marginLeft: "40px" }} onClick={() => { navigate.push("/user/my-courses/view") }}><FaAngleDoubleLeft size={40} /></button>
                                    </div>
                                    <div style={{ width: "94%", marginTop: "65px" }}  >
                                        <h3 >Unit Details</h3>
                                        <div className="row">
                                            <ReactMarkdown>{item.attributes.unit_title}</ReactMarkdown>
                                        </div>
                                        <div className="row">
                                            <ReactMarkdown>{item.attributes.unit_brief}</ReactMarkdown>
                                        </div>
                                        <div className="row">
                                            <ReactMarkdown>{item.attributes.labproject}</ReactMarkdown>
                                        </div>
                                        {
                                            localStorage.getItem("usertype") === "instructor" &&
                                            <div className="d-flex justify-content-end">
                                                <button className="btn btn-primary" onClick={() => {
                                                    navigate.push("/user/my-courses/chapter/new");
                                                }}>New Chapter</button>
                                            </div>
                                        }
                                        <div style={{ marginTop: "30px" }}>
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col"> Title</th>
                                                        <th scope="col">Chapter Duration</th>

                                                        <th scope="col">View</th>
                                                        {localStorage.getItem("usertype") === "instructor" &&
                                                            <th scope="col">Delete</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        chapterList.length > 0 ? chapterList.map((item, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td dangerouslySetInnerHTML={{ __html: item.attributes.chapter_title }}></td>
                                                                    <td>{item.attributes.chapter_duration}</td>
                                                                    {/* <td>{item.attributes.marks}</td> */}
                                                                    <td>
                                                                        <button className="btn" onClick={() => {
                                                                            sessionStorage.setItem("unitViewid", item.id);
                                                                            if (localStorage.getItem("usertype") === "instructor") {
                                                                                navigate.push("/user/my-courses/chapter/view");
                                                                            }
                                                                            //else if (localStorage.getItem("usertype") === "customer") {
                                                                            //     navigate.push("/user/profile/viewChapter");
                                                                            // }

                                                                        }} ><MdEdit size={25} /></button>

                                                                    </td>
                                                                    {localStorage.getItem("usertype") === "instructor" &&
                                                                        <td>
                                                                            <button className="btn" onClick={() => { handleDelete(item.id) }}><MdDelete size={25} /></button>
                                                                        </td>
                                                                    }
                                                                    {/* <td>
                                                    <button className="btn btn-warning" >delete</button>
                                                </td> */}
                                                                </tr>
                                                            )
                                                        })
                                                            : <tr>No data found</tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div style={{ width: "3%" }}></div>

                                </div>
                            )
                        })

                            : ""
                            // <img
                            //     src="/publicContent/images/progress-circle.gif"
                            //     alt="progress"
                            // />
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

export default InstructorUnitViewPage;