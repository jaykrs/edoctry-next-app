
import React, { useEffect, useState } from 'react';
import css from "./PaymentHistory.module.css";
import axios from 'axios';
import ConstData from '../../../../urlConst';
const PaymentHistory = ({ loading = false, setLoading = (() => { }) }) => {
    //const { loading = false, setLoading = (() => { }) } = props;
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [orderData, setOrderData] = useState("");
    const [indOrderData, setIndOrderData] = useState("");
    const [cusDetails, setCusDetails] = useState("");
    const [hideModel, showModel] = useState(true);
    const [stateList, setStateList] = useState("");
    const [userType,setUserType] = useState("");
    const [state, setState] = useState({
        currentPage: 1,
        recordsPerPage: 5,
        itemOffset: 0,
        noOfPage: 0,
        pagNextBtn: false,
        pagPreBtn: false
    })
    useEffect(() => {
        setLoading(true);
        setUserType(localStorage.getItem("usertype"))
        if (localStorage.getItem("usertype") === "instructor") {
            axios.get(ConstData.CMS_URL + "orders?filters[instructor][$eq]=" + localStorage.getItem("email"), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res => {
                    setData(res.data.data)
                    let endOffset = state.currentPage * state.recordsPerPage;
                    const currentItems = res.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                    setStateList(currentItems);
                    let pageCount = Math.ceil(res.data.data.length / state.recordsPerPage);
                    setState(prev => {
                        return { ...prev, ["noOfPage"]: pageCount }
                    })
                    setLoading(false);
                }).catch(err => {
                    ToastComponents("error", err.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
            OrderList();

        }
        if (localStorage.getItem("usertype") === "customer") {
            axios.get(ConstData.CMS_URL + "orders?filters[customeremail][$eq]=" + localStorage.getItem("email"), {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                }
            })
                .then(res => {
                    setData(res.data.data)
                    let endOffset = state.currentPage * state.recordsPerPage;
                    const currentItems = res.data.data.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
                    setStateList(currentItems);
                    let pageCount = Math.ceil(res.data.data.length / state.recordsPerPage);
                    setState(prev => {
                        return { ...prev, ["noOfPage"]: pageCount }
                    })
                    setLoading(false);
                }).catch(err => {
                    ToastComponents("error", err.message);
                    setTimeout(() => {
                        setLoading(false);
                    }, 5000);
                })
        }
    }, []);
    const getCustomerDetails = (email) => {
        showModel(!hideModel);
        setLoading(true);
        axios.get(ConstData.CMS_URL + "customers?filters[customeremail][$eq]=" + email, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => {
                setCusDetails(res.data.data);
                setLoading(false);
            }).catch(err => {
                ToastComponents("error", err.message);
                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })

    }
    const OrderList = () => {
        setLoading(true);
        axios.get(ConstData.CMS_URL + "courses?filters[instructor][$eq]=" + localStorage.getItem("email"))
            .then(res => {
                setOrderData(res.data.data)
                setLoading(false);
            }).catch(err => {
                ToastComponents("error", err.message);
                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
    }
    const handlePaymentList = (id) => {
        setToggle(false);
        setLoading(true);
        axios.get(ConstData.CMS_URL + "orders?filters[courseid][$eq]=" + id,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => {
                setIndOrderData(res.data.data);
                setLoading(false);
            }).catch(err => {
                ToastComponents("error", err.message);
                setTimeout(() => {
                    setLoading(false);
                }, 5000);
            })
    }
    const handlerNext = () => {
        if (state.currentPage < state.noOfPage) {
            let ccPage = state.currentPage + 1;
            let endOffset = ccPage * state.recordsPerPage;
            const currentItems = data.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
            const currentItems = data.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
            const currentItems = data.slice((ccPage - 1) * state.recordsPerPage, endOffset);
            setStateList(currentItems);
            setState(prev => {
                return { ...prev, ["currentPage"]: pageNo }
            })
        }
    }
    const DateFormat =  function (dateString) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let date = new Date(dateString);
        return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    }
    return (
        <>
            <div className={css.outerDiv}>
                <div className={css.div1}></div>
                <div className="row" id={css.div2}>
                    <div className="d-flex justify-content-left mb-3">
                        <p onClick={() => {
                            setToggle(true);
                        }}>All <input type='radio' checked={toggle} /></p>
                        {userType === "instructor" &&
                            <div className="dropdown" id={css.drobdownBtn}>
                                <button type="button" className="btn btn dropdown-toggle mi-5" data-bs-toggle="dropdown">
                                    Select Courses
                                </button>
                                <ul className="dropdown-menu">
                                    {
                                        orderData.length > 0 ? orderData.map((item, index) => {

                                            return (
                                                <li key={index}><p className="dropdown-item" onClick={() => handlePaymentList(item.id)}><span dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></span></p></li>
                                            )
                                        })
                                            : <li><a className="dropdown-item" href="#">No Record</a></li>
                                    }
                                </ul>
                            </div>}
                    </div>
                    <div className={css.tableDiv}>
                        <table className="table table-hover" style={{ fontSize: "14px" }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Course Title</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col"  >Order Id</th>
                                    <th scope="col">Payment On</th>
                                    {userType === "instructor" &&
                                        <th scope="col" >Student Details</th>}
                                </tr>
                            </thead>
                            {toggle &&
                                <tbody >

                                    {
                                        stateList.length > 0 ? stateList.map((item, index) => {
                                            let createdOn = DateFormat(item.attributes.createdAt);
                                            let l = (state.currentPage - 1) * state.recordsPerPage + index + 1;
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{l}</th>
                                                    <td scope="col"><span dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></span></td>
                                                    <td scope="col">{item.attributes.amount}</td>
                                                    <td scope="col"  >{item.attributes.oderid}</td>
                                                    <td scope="col" >{createdOn}</td>
                                                    {userType === "instructor" &&
                                                        <td scope="col"><button className="btn btn-primary" onClick={() => getCustomerDetails(item.attributes.customeremail)}>View</button></td>}

                                                </tr>
                                            )
                                        })
                                            : ""
                                    }
                                </tbody>}
                            {!toggle &&
                                <tbody>

                                    {
                                        indOrderData.length > 0 ? indOrderData.map((item, index) => {
                                            let createdOn = DateFormat(item.attributes.createdAt);
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td scope="col"><span dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></span></td>
                                                    <td scope="col">{item.attributes.amount}</td>
                                                    <td scope="col"  >{item.attributes.oderid}</td>
                                                    <td scope="col" >{createdOn}</td>
                                                    <td scope="col"><button className="btn btn-primary">View</button></td>

                                                </tr>
                                            )
                                        })
                                            : ""
                                    }
                                </tbody>}
                        </table>
                    </div>
                </div>
                <div className={css.div1}></div>
            </div>
            <div className={css.model} style={{ display: hideModel ? "none" : "block" }}>
                <h1>Details</h1>
                {
                    cusDetails.length > 0 ? cusDetails.map((item, index) => {
                        let items = item.attributes
                        return (
                            <div key={index} className='d-flex flex-direction-row justify-content-around align-content-end flex-wrap text-white'>
                                <p style={{ width: "30%" }}>Email: {items.customeremail}</p>
                                <p style={{ width: "30%" }} >Name: {items.customername}</p>
                                <p style={{ width: "30%" }} >Phone No: {items.customerphone}</p>
                                <p style={{ width: "30%" }} >Address: {items.customeraddress}</p>
                                <p style={{ width: "30%" }} >City: {items.customercity}</p>
                                <p style={{ width: "30%" }} >Country: {items.customercountry}</p>
                            </div>
                        )
                    })
                        : <div>No content found</div>
                }
                <div className='w-100 d-flex justify-content-end'>
                    <button className='btn btn-secondary' onClick={() => showModel(true)}>Close</button>
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
        </>
    )
}

export default PaymentHistory;