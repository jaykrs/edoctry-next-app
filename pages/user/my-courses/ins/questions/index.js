
import { FaEnvelopeOpenText } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CMS_URL, textConst } from "../../../../urlConst";
import { useRouter } from "next/navigation";
import { FaAngleDoubleLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import toastComponent from "../../../../toastComponent";
import { ToastContainer } from "react-toastify";
import Layout1 from "../../../../components/Layout1/Layout1";
const CreateNewAssesmentQuestion = () => {
    const navigate = useRouter();
    const [loading,setLoading] = useState(false);
    const [state, setState] = useState({
        assesment_title: "",
        assesment_marks: 0,
        passmarks: 0,
        assesment_description: "",
        instructor: "",
        course: "",
        course_title: "",
        currentPage: 1,
        recordsPerPage: 2,
        itemOffset: 0,
        noOfPage: 0,
        pagNextBtn: false,
        pagPreBtn: false
    })
    const [stateList, setStateList] = useState("");
    const [userType,setUserType] = useState("");

    const [assData, setAssData] = useState("");
    const [insData, setInsData] = useState("");
    const [quesData, setQuesData] = useState("");
    const [recordDeleted, setRecordDeleted] = useState(false);

    useEffect(() => {
        SearchData();

    }, [])

    useEffect(() => {
        SearchData();
    }, [recordDeleted]);

    const SearchData = () => {
        setState((prev) => {
            return { ...prev, ["instructor"]: localStorage.getItem("email"),["course"]:sessionStorage.getItem("courseInsId"),["course_title"]:sessionStorage.getItem("courseTitle")
                
             }
        })
        setUserType(localStorage.getItem("usertype"));
        setLoading(true);
        axios.get(CMS_URL + "assesments?filters[id][$eq]=" + sessionStorage.getItem("assid"), {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => {
                setAssData(res.data.data)
                let date = new Date(res.data.data[0].attributes.createdAt);
                console.log('date', date);
                axios.get(CMS_URL + "instructors?filters[instructoremail][$eq]=" + res.data.data[0].attributes.instructor, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                })
                    .then(result => {
                        setInsData(result.data.data)
                        
                    }).catch(err => {
                        console.log(err);
                    })
                axios.get(CMS_URL + "questions?filters[assesment_id][$eq]=" + sessionStorage.getItem("assid"), {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                })
                    .then(ques => {
                        setQuesData(ques.data.data);
                        let endOffset = state.currentPage * state.recordsPerPage;
                        const currentItems = ques.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                        setStateList(currentItems);
                        let pageCount = Math.ceil(ques.data.data.length / state.recordsPerPage);
                        setState(prev => {
                            return { ...prev, ["noOfPage"]: pageCount }
                        })
                        setLoading(false);
                    }).catch(err => console.log(err))
            }).catch(err => {
                console.log(err)
            })

    }

    const handleCreate = () => {
        navigate.push("/user/my-courses/ins/questions/new");
    }

    const handleChange = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleDelete = (id) => {
        if (confirm("Are you sure, you want to delete Question")) {
            setLoading(true);
            axios.delete(CMS_URL + "questions/" + id, { headers: { Authorization: "Bearer " + localStorage.getItem("jwt") } })
                .then(res => {
                    setTimeout(() => {
                        setRecordDeleted(true);
                    }, 3000);
                    setLoading(false);
                    toastComponent("success", textConst.tableDeletedSuccess);
                    
                }).catch(err => {
                    toastComponent("error", err.message);
                })
        }

    }

    const handlerNext = () => {
        if (state.currentPage < state.noOfPage) {
            let ccPage = state.currentPage + 1;
            let endOffset = ccPage * state.recordsPerPage;
            const currentItems = quesData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
            const currentItems = quesData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
            const currentItems = quesData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
            setStateList(currentItems);
            setState(prev => {
                return { ...prev, ["currentPage"]: pageNo }
            })
        }
    }

    return (

        <Layout1 >
            <ToastContainer />
            <div style={{ display: loading ? 'block' : 'none' }}>
                <div className={"overlay"}></div>
                <div className={"spinner_wrapper"}>
                    <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span class="sr-only"></span>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#f3e7e70f", marginTop: "10px" }} >
                <button className="btn" onClick={() => { navigate.push("/user/my-courses/ins/assessment") }}><FaAngleDoubleLeft size={40} /></button>
                {
                    assData.length > 0 ? assData.map((item, index) => {
                        return (
                            <div className=" d-flex justify-content-center" key={index}>
                                <div style={{ width: "3%" }} className=" d-flex justify-content-center" > </div>
                                <div style={{ width: "94%" }} className="mt-3">
                                    <h4 className="d-flex flex-direction-row"><ReactMarkdown>{item.attributes.assesment_title}</ReactMarkdown></h4>
                                    <div className="row">
                                        <p className="col-xl-5 col-lg-3 col-md-4 col-sm-6 col-xs-6"><ReactMarkdown>{item.attributes.course_title}</ReactMarkdown></p>
                                        <p className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-4" >Full Mark : {item.attributes.assesment_marks}</p>
                                        <p className="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-xs-4" > Pass Mark : {item.attributes.passmarks}</p>
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
                                            {/* <h6>Description</h6> */}
                                            <ReactMarkdown>{item.attributes.assesment_description}</ReactMarkdown>

                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: "3%" }}></div>

                            </div>
                        )
                    })

                        : ""
                        // <img
                        //     src="../../../../src/publicContent/images/progress-circle.gif"
                        //     alt="progress"
                        // />
                }

            </div>
            <div>
                <div className="d-flex justify-content-row">
                    <div style={{ width: "3%" }}></div>
                    <div className="row mt-2" style={{ width: "94%" }}>
                        {
                            userType === "instructor" &&
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary btnStyle1" onClick={handleCreate}>New </button>
                            </div>
                        }
                        <table class="table table-hover mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"> Question</th>
                                    <th scope="col">Question Type</th>
                                    <th scope="col">Mark</th>

                                    <th scope="col">View</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userType === "instructor" && stateList.length > 0 ? stateList.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td dangerouslySetInnerHTML={{ __html: item.attributes.question_title }}></td>
                                                <td>{item.attributes.questiontype}</td>
                                                <td>{item.attributes.marks}</td>
                                                <td>
                                                    <button className="btn" onClick={() => {
                                                        sessionStorage.setItem("qsid", item.id);
                                                        if (localStorage.getItem("usertype") === "instructor") {
                                                            navigate.push("/user/my-courses/ins/questions/view");
                                                        } else if (localStorage.getItem("usertype") === "customer") {
                                                            navigate.push("/user/profile/assesment/question/view");
                                                        }

                                                    }} ><MdEdit size={25} /></button>
                                                </td>
                                                <td>
                                                    <button className="btn" onClick={() => {
                                                        handleDelete(item.id)
                                                    }} ><MdDelete size={25} /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        : <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>No data Found</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                }
                            </tbody>
                        </table>

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
                    <div style={{ width: "3%" }}></div>
                </div>
            </div>

        </Layout1>
    )

};

export default CreateNewAssesmentQuestion;
