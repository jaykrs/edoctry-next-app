
import React, { useEffect, useState } from "react";
import Layout1 from "../../../components/Layout1/Layout1";
import axios from "axios";
import ConstData from "../../../../urlConst";
import { useRouter } from "next/router";
import { FaAngleDoubleLeft } from "react-icons/fa";
import toastComponent from "../../../toastComponent";
import { ToastContainer } from "react-toastify";
const AssesmentList = () => {
    const navigate = useRouter();
    const [state, setState] = useState("");
    const [recordDeleted,setRecordDeleted] = useState(false);
   const [userType,setUserType] = useState("");
    useEffect(() => {
        SearchData()
        setUserType(localStorage.getItem("email"));
    },[]);

    useEffect(() => {
        SearchData()
    },[recordDeleted]);

    useEffect(()=>{
        if(!localStorage.getItem("usertype") && !localStorage.getItem("jwt") && !localStorage.getItem("loginStatus")){
          router.push("/");
        }
      },[])
    
const SearchData = ()=>{
    let courseId = sessionStorage.getItem("courseInsId")
        axios.get(ConstData.CMS_URL + "/api/assesments?filters[course][$eq]=" + courseId, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => {
                setState(res.data.data);
            }).catch(err => {
                console.log(err)
            })
}
    const handleCreate = () => {
        navigate.push("/user/profile/assesment/create");
    }
    const handleAddQuestion = (id) => {
        console.log(id)
        sessionStorage.setItem("assid", id)
        navigate.push("/user/profile/assesment/question")
    }

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this assessment?")) {
            axios.delete(ConstData.CMS_URL + "/api/assesments/" + id, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res => {
                    toastComponent("success",ConstData.textConst.tableDeletedSuccess);
                    setRecordDeleted(!recordDeleted);
                }).catch(err => {
                    toastComponent("error",err.message);
                })
        }
    }

    return (

        <Layout1 >
            <ToastContainer />
            <div>
                <button className="btn mt-3" onClick={() => { navigate.push("/user/profile/course/cardpage") }}><FaAngleDoubleLeft size={40} /></button>
                <div style={{ margin: "50px 3% 10px  3%" }} className={userType === "instructor" ? "d-flex justify-content-between" : "d-flex justify-content-start"}>
                    <h1>Assesment</h1>
                    {
                        userType === "instructor" &&
                        <button className="btn btn-primary btnStyle1" onClick={handleCreate}>New</button>
                    }

                </div>
                <div className="d-flex justify-content-row">
                    <div style={{ width: "3%" }} className="d-flex justify-content-center">

                    </div>
                    <div className="row" style={{ width: "94%" }}>

                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"> Assesment Title</th>
                                    <th scope="col">Course Title</th>
                                    <th scope="col">Full Marks</th>
                                    <th scope="col">Pass Marks</th>
                                    <th scope="col">View</th>
                                    <th scope="col">publish</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userType === "instructor" && state.length > 0 ? state.reverse().map((item, index) => {
                                        let stateLength = state.length;
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{stateLength - index}</th>
                                                <td>{item.attributes.assesment_title}</td>
                                                <td dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></td>
                                                <td>{item.attributes.assesment_marks}</td>
                                                <td>{item.attributes.passmarks}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => {
                                                        sessionStorage.setItem("assid", item.id);
                                                        navigate.push("/user/profile/assesment/question");
                                                    }} >view</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-warning" onClick={() => {
                                                        handleDelete(item.id)
                                                    }} >delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        : <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>No Data Found</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                }
                            </tbody>
                        </table>



                    </div>
                    <div style={{ width: "3%" }} >

                    </div>

                </div>
            </div>
        </Layout1>
    )

};

export default AssesmentList;
