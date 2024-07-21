import InputUtil from "../../../../../utils/FormUtils/InputUtil/InputUtil";
import TextAreaUtil from "../../../../../utils/FormUtils/TextAreaUtil/TextAreaUtil";
import { FaEnvelopeOpenText } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import { CMS_URL, textConst } from "../../../../../urlConst";
import { useRouter } from "next/navigation";
import SelectDropdownUtil from "../../../../../utils/FormUtils/SelectDropdownUtil/SelectDropdownUtil";
import { FaAngleDoubleLeft } from "react-icons/fa";
// import MDEditor, { commands } from '@uiw/react-md-editor';
import { FaRegWindowClose } from "react-icons/fa";
import toastComponent from "../../../../../toastComponent";
import { ToastContainer } from "react-toastify";
import Layout1 from "../../../../../components/Layout1/Layout1";
import MarkdownEditor from "../../../../../utils/MarkdownTextareaUtils/MarkdownTextareaUtils";
import PageLoadingComponents from "../../../../../utils/PageLoadingComponent/PageLoadingComponents";
const QuestionNew = () => {
    let questionOption = [
        { key: "Select Question Type", value: "" },
        { key: "Single_Select", value: "singleselect" },
        { key: "Multi_Select", value: "multiselect" },
        { key: "True/False", value: "truefalse" },
      //  { key: "Fill_In_Blank", value: "fillinblank" }

    ];
    let questionTrueOption = [
        { txt: "True", value: "True" },
        { txt: "False", value: "False" }
    ]

    const navigate = useRouter();
    const [loading,setLoading] = useState(false);
    const [quesTlt, setQuesTlt] = useState("");
    const [remarks, setRemarks] = useState("");
    const [state, setState] = useState({
        questiontype: "",
        option_a_text: "",
        option_a_is_answer: false,
        option_b: "",
        option_b_is_answer: false,
        option_c: "",
        option_c_is_answer: false,
        option_d: "",
        option_d_is_answer: false,
        option_e: "",
        option_e_is_answer: false,
        marks: 0,
        question_title: "",
        assesment_id: "",
        course: "",
        course_title: "",
        remarks: "",
        optionA_img: "", optionB_img: "", optionC_img: "", optionD_img: "", optionE_img: "",
        imgPath_A: "", imgPath_B: "", imgPath_C: "", imgPath_D: "", imgPath_E: "", imgD: "", btnClose: false,
    })

    const handleCreate = () => {
        if (state.questiontype.value === "") {
            toastComponent("warn","Please select question type");
        } else if (state.questiontype.value === "singleselect") {
            if (quesTlt === "" || state.option_a_text === "" || state.option_b === "" || state.option_c === "" || state.marks <= 0 ) {
                toastComponent("warn",textConst.enterMandatoryField)
            } else if (state.option_a_is_answer === false && state.option_b_is_answer === false && state.option_c_is_answer === false && state.option_d_is_answer === false && state.option_e_is_answer === false) {
                toastComponent("warn","Please select respective question answer");
            } else {
                setLoading(true);
                axios.post(CMS_URL + "questions", {
                    "data": {
                        "questiontype": state.questiontype.value,
                        "question_title": quesTlt,
                        "option_a_text": state.option_a_text,
                        "option_b": state.option_b,
                        "option_c": state.option_c,
                        "option_d": state.option_d,
                        "option_e": state.option_e,
                        "option_a_is_answer": state.option_a_is_answer,
                        "option_b_is_answer": state.option_b_is_answer,
                        "option_c_is_answer": state.option_c_is_answer,
                        "option_d_is_answer": state.option_d_is_answer,
                        "option_e_is_answer": state.option_e_is_answer,
                        "marks": state.marks,
                        "course": sessionStorage.getItem("courseInsId"),
                        "course_title": sessionStorage.getItem("courseTitle"),
                        "assesment_id": sessionStorage.getItem("assid"),
                        "suggestion_remarks": remarks,
                        "option_a_attachment": state.optionA_img,
                        "option_b_attachment": state.optionB_img,
                        "option_c_attachment": state.optionC_img,
                        "option_d_attachment": state.optionD_img,
                        "option_e_attachment": state.optionE_img
                    }
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                }).then(res => {
                    setLoading(false);
                    toastComponent("success",textConst.tableCreatedSuccess);
                    setTimeout(()=>{
                      navigate.push("/user/profile/assesment/question");
                    },3000);
                    
                }).catch(err => {
                    toastComponent("error",err.message);
                    setTimeout(()=>{
                        setLoading(false);
                      },3000)
                })
            }
        } else if (state.questiontype.value === "multiselect") {
            if (quesTlt === "" || state.option_a_text === "" || state.option_b === "" || state.option_c === "" || state.marks <= 0 ) {
                toastComponent("warn",textConst.enterMandatoryField)
            } else if (state.option_a_is_answer === false && state.option_b_is_answer === false && state.option_c_is_answer === false && state.option_d_is_answer === false && state.option_e_is_answer === false) {
                toastComponent("warn","Please select respective question answer")
            } else {
                setLoading(true);
                axios.post(CMS_URL + "questions", {
                    "data": {
                        "questiontype": state.questiontype.value,
                        "question_title": quesTlt,
                        "option_a_text": state.option_a_text,
                        "option_b": state.option_b,
                        "option_c": state.option_c,
                        "option_d": state.option_d,
                        "option_e": state.option_e,
                        "option_a_is_answer": state.option_a_is_answer,
                        "option_b_is_answer": state.option_b_is_answer,
                        "option_c_is_answer": state.option_c_is_answer,
                        "option_d_is_answer": state.option_d_is_answer,
                        "option_e_is_answer": state.option_e_is_answer,
                        "marks": state.marks,
                        "course": sessionStorage.getItem("courseInsId"),
                        "course_title": sessionStorage.getItem("courseTitle"),
                        "assesment_id": sessionStorage.getItem("assid"),
                        "suggestion_remarks": remarks,
                        "option_a_attachment": state.optionA_img,
                        "option_b_attachment": state.optionB_img,
                        "option_c_attachment": state.optionC_img,
                        "option_d_attachment": state.optionD_img,
                        "option_e_attachment": state.optionE_img
                    },

                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                }).then(res => {
                    setLoading(false);
                    toastComponent("success",textConst.tableCreatedSuccess);
                    setTimeout(()=>{
                        navigate.push("/user/profile/assesment/question");
                    },3000);
                    
                }).catch(err => {
                    toastComponent("error",err.message);
                    setTimeout(()=>{
                        setLoading(false);
                      },3000)
                })
            }
        } else if (state.questiontype.value === "truefalse") {
            if (quesTlt === "" || state.option_a_text === "" || state.option_b === "" || state.option_c === "" || state.marks <= 0 ) {
                toastComponent("warn",textConst.enterMandatoryField)
            } else if (state.option_a_is_answer === false && state.option_b_is_answer === false && state.option_c_is_answer === false && state.option_d_is_answer === false && state.option_e_is_answer === false) {
                toastComponent("warn","Please select respective question answer");
            } else {
                setLoading(true);
                axios.post(CMS_URL + "questions", {
                    "data": {
                        "questiontype": state.questiontype.value,
                        "question_title": quesTlt,
                        "option_a_text": state.option_a_text,
                        "option_b": state.option_b,
                        "option_a_is_answer": state.option_a_is_answer,
                        "option_b_is_answer": state.option_b_is_answer,
                        "marks": state.marks,
                        "course": sessionStorage.getItem("courseInsId"),
                        "course_title": sessionStorage.getItem("courseTitle"),
                        "assesment_id": sessionStorage.getItem("assid"),
                        "suggestion_remarks": remarks,
                        "option_a_attachment": state.optionA_img,
                        "option_b_attachment": state.optionB_img
                    },
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                }).then(res => {
                    setLoading(false);
                    toastComponent("success",textConst.tableCreatedSuccess);
                    setTimeout(()=>{
                        navigate.push("/user/profile/assesment/question")
                    },3000);
                    
                }).catch(err => {
                    toastComponent("error",err.message);
                    setTimeout(()=>{
                        setLoading(false);
                      },3000)
                })
            }
        } else if (state.questiontype.value === "fillinblank") {
            if (quesTlt === "" || state.option_a_text === "" || state.option_b === "" || state.option_c === "" || state.marks <= 0 ) {
                toastComponent("warn",textConst.enterMandatoryField)
            } else if (state.option_a_is_answer === false && state.option_b_is_answer === false && state.option_c_is_answer === false && state.option_d_is_answer === false && state.option_e_is_answer === false) {
                toastComponent("warn","Please select respective question answer")
            } else {
                setLoading(true);
                axios.post(CMS_URL + "questions", {
                    "data": {
                        "questiontype": state.questiontype.value,
                        "question_title": state.question_title,
                        "option_a_text": state.option_a_text,
                        "option_b": state.option_b,
                        "option_c": state.option_c,
                        "option_d": state.option_d,
                        "option_e": state.option_e,
                        "option_a_is_answer": state.option_a_is_answer,
                        "option_b_is_answer": state.option_b_is_answer,
                        "option_c_is_answer": state.option_c_is_answer,
                        "option_d_is_answer": state.option_d_is_answer,
                        "option_e_is_answer": state.option_e_is_answer,
                        "marks": state.marks,
                        "course": sessionStorage.getItem("courseInsId"),
                        "course_title": sessionStorage.getItem("courseTitle"),
                        "assesment_id": sessionStorage.getItem("assid"),
                        "suggestion_remarks": state.remarks
                    },
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                }).then(res => {
                    setLoading(false);
                    toastComponent("success",textConst.tableCreatedSuccess);
                    setTimeout(()=>{
                        navigate.push("/user/profile/assesment/question");
                    },1500);
                    
                }).catch(err => {
                    toastComponent("error",err.message);
                    setTimeout(()=>{
                        setLoading(false);
                      },3000)
                })
            }
        }
    }

    const handleChange = (e) => {
        setState((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const stateHandler = (name, value) => {
        setState(prev => {
            return { ...prev, [`${name}`]: value }
        })
    }

    const fileHandler = (e) => {
        stateHandler(e.target.name, e.target.files[0]);

    }
    const fileUpload = (option) => {
        let filePath = option === "optionA" ? state.imgPath_A : option === "optionB" ? state.imgPath_B : option === "optionC" ? state.imgPath_C
            : option === "optionD" ? state.imgPath_D : state.imgPath_E;
            setLoading(true);
        const formdata = new FormData();
        formdata.append("file", filePath);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        fetch(CMS_URL + "onboard/fileupload", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (option === "optionA") {
                    stateHandler("optionA_img", result.url);
                } else if (option === "optionB") {
                    stateHandler("optionB_img", result.url);
                } else if (option === "optionC") {
                    stateHandler("optionC_img", result.url);
                } else if (option === "optionD") {
                    stateHandler("optionD_img", result.url);
                } {
                    stateHandler("optionE_img", result.url);
                }
                setLoading(false);
                toastComponent("success",textConst.videoUploadSuccess);
            })
            .catch((error) => {
                toastComponent("error",error.message);
                setTimeout(()=>{
                    setLoading(false);
                  },3000)
            });
    }

    const imageViewhandler = (option) => {
        let img = option === "optionA" ? state.optionA_img : option === "optionB" ? state.optionB_img : option === "optionC" ? state.optionC_img
            : option === "optionD" ? state.optionD_img : state.optionE_img;
        console.log(option, img);
        if (state.btnClose === true) {
            stateHandler("btnClose", false);
            stateHandler("imgD", "");
        } else {

            if (img === "" || img === null) {
                alert("No Content");
                stateHandler("btnClose", false);
                stateHandler("imgD", "");
            } else {
                stateHandler("btnClose", true);
                stateHandler("imgD", img);
            }
        }
    }

    return (

        <Layout1 >
            <ToastContainer />
            <PageLoadingComponents loading={loading} />
            <div>
                <div style={{ width: "10%" }} className="d-flex justify-content-center mt-5 mb-5">
                    <button className="btn" onClick={() => { navigate.push("/user/my-courses/ins/questions") }}><FaAngleDoubleLeft size={40} /></button>
                </div>
                <div style={{ width: "100%", margin: "0 0 -75px 5%" }} className="d-flex justify-content-start ">
                    <h1>New Question</h1>
                </div>

                <div className="d-flex justify-content-row ">

                    <div className="row" style={{ width: "80%", margin: "20px 5%" }}>
                        <div className="col-12 d-flex justify-content-center" >

                            <div style={{ width: "300px" }}>
                                <SelectDropdownUtil
                                    id="questiontype"
                                    filterType="questiontype"
                                    defaultValue={questionOption[0]}
                                    value={state.questiontype}
                                    multipleOptions={false}
                                    options={questionOption}
                                    selectBoxCss={{ height: "auto" }}
                                    setValue={setState}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "10%" }} >
                        <button className="btn btn-primary" onClick={handleCreate} >Create</button>
                    </div>

                </div>
                {
                    state.questiontype.value === "singleselect" &&
                    <div className="d-flex justify-content-row">
                        <div style={{ width: "5%" }}></div>
                        <div className="row" style={{ width: "90%" }}>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                <MarkdownEditor
                                    title="Description"
                                    model={quesTlt}
                                    setModel={setQuesTlt}
                                    required={true}
                                />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <MarkdownEditor
                                    title="Remarks"
                                    model={remarks}
                                    setModel={setRemarks}
                                    required={true}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5" >

                                <TextAreaUtil
                                    label="Option A"
                                    type="text"
                                    name="option_a_text"
                                    state={state.option_a_text}
                                    placeholderTxt="enter option A text"
                                    onChange={handleChange}
                                    required={true}

                                />

                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Option A Img</strong></label> <br />
                                <input type="file" name="imgPath_A" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionA") }}> upload</button>
                                {
                                    (state.optionA_img !== "" && state.optionA_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionA")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option B"
                                    type="text"
                                    name="option_b"
                                    state={state.option_b}
                                    placeholderTxt="enter option B text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image B</strong></label> <br />
                                <input type="file" name="imgPath_B" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionB") }}> upload</button>
                                {
                                    (state.optionB_img !== "" && state.optionB_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionB")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option C"
                                    type="text"
                                    name="option_c"
                                    state={state.option_c}
                                    placeholderTxt="enter option B text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image C</strong></label> <br />
                                <input type="file" name="imgPath_C" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionC") }}> upload</button>{
                                    (state.optionC_img !== "" && state.optionC_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionC")}>Image</button>
                                }

                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option D"
                                    type="text"
                                    name="option_d"
                                    state={state.option_d}
                                    placeholderTxt="enter option B text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image D</strong></label> <br />
                                <input type="file" name="imgPath_D" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionD") }}> upload</button>
                                {
                                    (state.optionD_img !== "" && state.optionD_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionD")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option E"
                                    type="text"
                                    name="option_e"
                                    state={state.option_e}
                                    placeholderTxt="enter option E text"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image E</strong></label> <br />
                                <input type="file" name="imgPath_E" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionE") }}> upload</button>
                                {
                                    (state.optionE_img !== "" && state.optionE_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionE")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-5">

                                <InputUtil
                                    label="Marks"
                                    type="number"
                                    name="marks"
                                    icon={"/publicContent/icons/user.png"}
                                    state={state.marks}
                                    placeholderTxt="Enter question marks"
                                    onChange={handleChange}
                                    required={true}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-5">
                                <h3> Right Answer is<span className="mandatoryField">*</span></h3>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={state.option_a_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return {
                                                ...prev, ["option_a_is_answer"]: true,
                                                ["option_b_is_answer"]: false, ["option_c_is_answer"]: false,
                                                ["option_d_is_answer"]: false, ["option_e_is_answer"]: false
                                            }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Option A
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_b_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return {
                                                ...prev, ["option_a_is_answer"]: false,
                                                ["option_b_is_answer"]: true, ["option_c_is_answer"]: false,
                                                ["option_d_is_answer"]: false, ["option_e_is_answer"]: false
                                            }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option B
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_c_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return {
                                                ...prev, ["option_a_is_answer"]: false,
                                                ["option_b_is_answer"]: false, ["option_c_is_answer"]: true,
                                                ["option_d_is_answer"]: false, ["option_e_is_answer"]: false
                                            }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option C
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_d_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return {
                                                ...prev, ["option_a_is_answer"]: false,
                                                ["option_b_is_answer"]: false, ["option_c_is_answer"]: false,
                                                ["option_d_is_answer"]: true, ["option_e_is_answer"]: false
                                            }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option D
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_e_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return {
                                                ...prev, ["option_a_is_answer"]: false,
                                                ["option_b_is_answer"]: false, ["option_c_is_answer"]: false,
                                                ["option_d_is_answer"]: false, ["option_e_is_answer"]: true
                                            }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option E
                                    </label>
                                </div>

                            </div>

                        </div>
                        <div style={{ width: "5%" }} >
                        </div>

                    </div>
                }
                {
                    state.questiontype.value === "multiselect" &&
                    <div className="d-flex justify-content-row">
                        <div style={{ width: "5%" }}></div>
                        <div className="row" style={{ width: "90%" }}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                <MarkdownEditor
                                    title="Description"
                                    model={quesTlt}
                                    setModel={setQuesTlt}
                                    required={true}
                                />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <MarkdownEditor
                                    title="Remarks"
                                    model={remarks}
                                    setModel={setRemarks}
                                    required={true}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5" >

                                <TextAreaUtil
                                    label="Option A"
                                    type="text"
                                    name="option_a_text"
                                    state={state.option_a_text}
                                    placeholderTxt="enter option A text"
                                    onChange={handleChange}
                                    required={true}

                                />

                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Option A Img</strong></label> <br />
                                <input type="file" name="imgPath_A" onChange={(e) => fileHandler(e)} /> <br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionA") }}> upload</button>
                                {
                                    (state.optionA_img !== "" && state.optionA_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionA")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option B"
                                    type="text"
                                    name="option_b"
                                    state={state.option_b}
                                    placeholderTxt="enter option B text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image B</strong></label> <br />
                                <input type="file" name="imgPath_B" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionB") }}> upload</button>
                                {
                                    (state.optionB_img !== "" && state.optionB_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionB")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option C"
                                    type="text"
                                    name="option_c"
                                    state={state.option_c}
                                    placeholderTxt="enter option B text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image C</strong></label> <br />
                                <input type="file" name="imgPath_C" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionC") }}> upload</button>
                                {
                                    (state.optionC_img !== "" && state.optionC_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionC")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option D"
                                    type="text"
                                    name="option_d"
                                    state={state.option_d}
                                    placeholderTxt="enter option B text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image D</strong></label> <br />
                                <input type="file" name="imgPath_D" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionD") }}> upload</button>
                                {
                                    (state.optionD_img !== "" && state.optionD_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionD")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option E"
                                    type="text"
                                    name="option_e"
                                    state={state.option_e}
                                    placeholderTxt="enter option E text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image E</strong></label> <br />
                                <input type="file" name="imgPath_E" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionE") }}> upload</button>
                                {
                                    (state.optionE_img !== "" && state.optionE_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionE")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-5">

                                <InputUtil
                                    label="Marks"
                                    type="number"
                                    name="marks"
                                    icon={"/publicContent/icons/user.png"}
                                    state={state.marks}
                                    placeholderTxt="Enter question marks"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-5">
                                <h3>Right Answer is<span className="mandatoryField">*</span></h3>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={state.option_a_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return { ...prev, ["option_a_is_answer"]: e.target.checked }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Option A
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_b_is_answer}
                                        onChange={(e) => setState((prev) => { return { ...prev, ["option_b_is_answer"]: e.target.checked } })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option B
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_c_is_answer}
                                        onChange={(e) => setState((prev) => { return { ...prev, ["option_c_is_answer"]: e.target.checked } })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option C
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_d_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return {
                                                ...prev,
                                                ["option_d_is_answer"]: e.target.checked
                                            }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option D
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_e_is_answer}
                                        onChange={(e) => setState((prev) => { return { ...prev, ["option_e_is_answer"]: e.target.checked } })} onCheck />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option E
                                    </label>
                                </div>
                            </div>


                        </div>
                        <div style={{ width: "5%" }} >
                        </div>

                    </div>
                }
                {
                    state.questiontype.value === "truefalse" &&
                    <div className="d-flex justify-content-row">
                        <div style={{ width: "10%" }}></div>
                        <div className="row" style={{ width: "80%" }}>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                                <MarkdownEditor
                                    title="Description"
                                    model={quesTlt}
                                    setModel={setQuesTlt}
                                    required={true}
                                />
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <MarkdownEditor
                                    title="Remarks"
                                    model={remarks}
                                    setModel={setRemarks}
                                    required={true}
                                />
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5" >

                                <TextAreaUtil
                                    label="Option A"
                                    type="text"
                                    name="option_a_text"
                                    state={state.option_a_text}
                                    placeholderTxt="enter option A text"
                                    onChange={handleChange}
                                    required={true}

                                />

                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Option A Img</strong></label> <br />
                                <input type="file" name="imgPath_A" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionA") }}> upload</button>
                                {
                                    (state.optionA_img !== "" && state.optionA_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionA")}>Image</button>
                                }
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 mt-5">

                                <TextAreaUtil
                                    label="Option B"
                                    type="text"
                                    name="option_b"
                                    state={state.option_b}
                                    placeholderTxt="enter option B text"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6 mt-5" >
                                <label style={{ marginBottom: "5px" }}><strong>Image B</strong></label> <br />
                                <input type="file" name="imgPath_B" onChange={(e) => fileHandler(e)} /><br />
                                <button className="btn btn-secondary mt-4" onClick={() => { fileUpload("optionB") }}> upload</button>
                                {
                                    (state.optionB_img !== "" && state.optionB_img !== null) &&
                                    <button className="btn  mt-4" style={{ marginLeft: "10px" }} onClick={() => imageViewhandler("optionB")}>Image</button>
                                }
                            </div>
                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-5">

                                <InputUtil
                                    label="Marks"
                                    type="number"
                                    name="marks"
                                    icon={"/publicContent/icons/user.png"}
                                    state={state.marks}
                                    placeholderTxt="Enter question marks"
                                    onChange={handleChange}
                                    required={true}

                                />
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 mt-5">
                                <h3>Right Answer is<span className="mandatoryField">*</span></h3>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={state.option_a_is_answer}
                                        onChange={(e) => setState((prev) => {
                                            return { ...prev, ["option_a_is_answer"]: e.target.checked, ["option_b_is_answer"]: !e.target.checked }
                                        })} />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Option A
                                    </label>
                                </div>
                                <div class="form-check" style={{ margin: "10px 0" }}>
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_b_is_answer}
                                        onChange={(e) => setState((prev) => { return { ...prev, ["option_b_is_answer"]: e.target.checked, ["option_a_is_answer"]: !e.target.checked } })} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Option B
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "10%" }} >
                        </div>

                    </div>
                }
                {
                    // state.questiontype.value === "fillinblank" &&
                    // <div className="d-flex justify-content-row">
                    //     <div style={{ width: "10%" }}></div>
                    //     <div className="row" style={{ width: "80%" }}>
                    //         <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12">
                    //             <label style={{ marginBottom: "5px" }}><strong>Question Description</strong></label>
                    //             <CKEditor
                    //                 editor={ClassicEditor}
                    //                 data="<p>Question Description Write here</p>"
                    //                 onReady={editor => {
                    //                 }}
                    //                 onChange={(event, editor) => {
                    //                     let data = editor.getData();
                    //                     setState((prev) => {
                    //                         return { ...prev, ["question_title"]: data }
                    //                     })
                    //                 }}
                    //                 onBlur={(event, editor) => {
                    //                 }}
                    //                 onFocus={(event, editor) => {
                    //                 }}

                    //             />
                    //         </div>
                    //         <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">

                    //             <TextAreaUtil
                    //                 label="Option A"
                    //                 type="text"
                    //                 name="option_a_text"
                    //                 state={state.option_a_text}
                    //                 placeholderTxt="enter option A text"
                    //                 onChange={handleChange}

                    //             />
                    //         </div>
                    //         <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">

                    //             <TextAreaUtil
                    //                 label="Option B"
                    //                 type="text"
                    //                 name="option_b"
                    //                 state={state.option_b}
                    //                 placeholderTxt="enter option B text"
                    //                 onChange={handleChange}

                    //             />
                    //         </div>
                    //         <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">

                    //             <TextAreaUtil
                    //                 label="Option C"
                    //                 type="text"
                    //                 name="option_c"
                    //                 state={state.option_c}
                    //                 placeholderTxt="enter option B text"
                    //                 onChange={handleChange}

                    //             />
                    //         </div>
                    //         <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">

                    //             <TextAreaUtil
                    //                 label="Option D"
                    //                 type="text"
                    //                 name="option_d"
                    //                 state={state.option_d}
                    //                 placeholderTxt="enter option B text"
                    //                 onChange={handleChange}

                    //             />
                    //         </div>
                    //         <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">

                    //             <TextAreaUtil
                    //                 label="Option E"
                    //                 type="text"
                    //                 name="option_e"
                    //                 state={state.option_e}
                    //                 placeholderTxt="enter option E text"
                    //                 onChange={handleChange}

                    //             />
                    //         </div>
                    //         <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">

                    //             <InputUtil
                    //                 label="Marks"
                    //                 type="number"
                    //                 name="marks"
                    //                 icon={user}
                    //                 state={state.marks}
                    //                 placeholderTxt="Enter question marks"
                    //                 onChange={handleChange}

                    //             />
                    //         </div>

                    //         <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6">
                    //             <h3>Right Answer is</h3>
                    //             <div class="form-check" style={{ margin: "10px 0" }}>
                    //                 <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={state.option_a_is_answer}
                    //                     onChange={(e) => setState((prev) => {
                    //                         return { ...prev, ["option_a_is_answer"]: e.target.checked }
                    //                     })} />
                    //                 <label class="form-check-label" for="flexRadioDefault1">
                    //                     Option A
                    //                 </label>
                    //             </div>
                    //             <div class="form-check" style={{ margin: "10px 0" }}>
                    //                 <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_b_is_answer}
                    //                     onChange={(e) => setState((prev) => { return { ...prev, ["option_b_is_answer"]: e.target.checked } })} />
                    //                 <label class="form-check-label" for="flexRadioDefault2">
                    //                     Option B
                    //                 </label>
                    //             </div>
                    //             <div class="form-check" style={{ margin: "10px 0" }}>
                    //                 <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_c_is_answer}
                    //                     onChange={(e) => setState((prev) => { return { ...prev, ["option_c_is_answer"]: e.target.checked } })} />
                    //                 <label class="form-check-label" for="flexRadioDefault2">
                    //                     Option C
                    //                 </label>
                    //             </div>
                    //             <div class="form-check" style={{ margin: "10px 0" }}>
                    //                 <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_d_is_answer}
                    //                     onChange={(e) => setState((prev) => {
                    //                         return {
                    //                             ...prev,
                    //                             ["option_d_is_answer"]: e.target.checked
                    //                         }
                    //                     })} />
                    //                 <label class="form-check-label" for="flexRadioDefault2">
                    //                     Option D
                    //                 </label>
                    //             </div>
                    //             <div class="form-check" style={{ margin: "10px 0" }}>
                    //                 <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault2" value={state.option_e_is_answer}
                    //                     onChange={(e) => setState((prev) => { return { ...prev, ["option_e_is_answer"]: e.target.checked } })} onCheck />
                    //                 <label class="form-check-label" for="flexRadioDefault2">
                    //                     Option E
                    //                 </label>
                    //             </div>
                    //         </div>

                    //         <div className="col-xl-6 col-lg-6 col-md-8 col-sm-12 col-xs-12">
                    //             <label style={{ marginBottom: "5px" }}><strong>Remarks</strong></label>
                    //             <CKEditor
                    //                 editor={ClassicEditor}
                    //                 data="<p>remarks</p>"
                    //                 onReady={editor => {
                    //                 }}
                    //                 onChange={(event, editor) => {
                    //                     let data = editor.getData();
                    //                     setState((prev) => {
                    //                         return { ...prev, ["remarks"]: data }
                    //                     })
                    //                 }}
                    //                 onBlur={(event, editor) => {
                    //                 }}
                    //                 onFocus={(event, editor) => {
                    //                 }}

                    //             />
                    //         </div>

                    //     </div>
                    //     <div style={{ width: "10%" }} >
                    //     </div>

                    // </div>
                }

                <div style={{ position: "absolute", top: "180px", left: "61px", width: "100%", display: state.btnClose ? "" : "none" }}>
                    <div className="d-flex justify-content-start">
                        <img src={state.imgD !== "" ? state.imgD : ""} alt="image" width={"650"} height={"300"} className="cover" />
                        <button className="btnClose btn"><FaRegWindowClose size={40} onClick={() => stateHandler("btnClose", false)} /></button>
                    </div>
                </div>
            </div>
        </Layout1>
    )

};

export default QuestionNew;
