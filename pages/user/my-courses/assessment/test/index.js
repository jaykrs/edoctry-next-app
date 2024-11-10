'use client'
import React, { useEffect, useState } from "react";
import Layout1 from "../../../../components/Layout1/Layout1";
import axios from "axios";
import ConstData from "../../../../../urlConst";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AddCusAns, RemoveAllCusAns } from "../../../../../reducers/cusAnsSlicer";
// import  css from "./customerAssesmentTest.css";
import InstructorMenuBar from "../../../../components/InstructorMenuBar/InstructorMenuBar";
import toastComponent from "../../../../toastComponent";
import { ToastContainer } from "react-toastify";
import PageLoadingComponents from "../../../../utils/PageLoadingComponent/PageLoadingComponents";
const CustomerAssesmentTestPage = () => {
    const navigate = useRouter();
    // const dispatch = useDispatch();
    // useSelector(store => store.cusAns.cusAns);
    const [cusAnsData, setCusAnsData] = useState([])
    const [quesData, setQuesData] = useState("");
    const [currentIndex, setNextIndex] = useState(0);
    const [currState, setCurrState] = useState();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        cus_a_answer: false,
        cus_b_answer: false,
        cus_c_answer: false,
        cus_d_answer: false,
        cus_e_answer: false,
    })
    const [enableBtn, setEnableBtn] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(ConstData.CMS_URL + "questions?filters[assesment_id][$eq]=" + sessionStorage.getItem("testId"), {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => {
                setQuesData(res.data.data);
                if (cusAnsData.length > 0) {
                    setState(prev => {
                        return {
                            ...prev, ["cus_a_answer"]: cusAnsData[currentIndex].Answer.cus_a_answer, ["cus_b_answer"]: cusAnsData[currentIndex].Answer.cus_b_answer, ["cus_c_answer"]: cusAnsData[currentIndex].Answer.cus_c_answer, ["cus_d_answer"]: cusAnsData[currentIndex].Answer.cus_d_answer, ["cus_e_answer"]: cusAnsData[currentIndex].Answer.cus_e_answer
                        }
                    })

                }
                setLoading(false);
            }).catch(err => console.log(err))
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        const assesDetails = JSON.parse(sessionStorage.getItem("assesmentDetails"));
        if (cusAnsData.length > 0) {
            let scoreMark = 0
            for (let i = 0; i < cusAnsData.length; i++) {
                if (cusAnsData[i].qsid === quesData[i].id && cusAnsData[i].Answer.cus_a_answer === quesData[i].attributes.option_a_is_answer &&
                    cusAnsData[i].Answer.cus_b_answer === quesData[i].attributes.option_b_is_answer && cusAnsData[i].Answer.cus_c_answer === quesData[i].attributes.option_c_is_answer &&
                    cusAnsData[i].Answer.cus_d_answer === quesData[i].attributes.option_d_is_answer && cusAnsData[i].Answer.cus_e_answer === quesData[i].attributes.option_e_is_answer) {
                    scoreMark += quesData[i].attributes.marks
                }
                if (cusAnsData.length - 1 === i) {
                    await axios.post(ConstData.CMS_URL + "scores", {
                        "data": {
                            "customeremail": localStorage.getItem("email"),
                            "customerAnswer": JSON.stringify(cusAnsData),
                            "instructor": assesDetails.attributes.instructor,
                            "fullMarks": assesDetails.attributes.assesment_marks,
                            "passMarks": assesDetails.attributes.passmarks,
                            "assesmentid": `${assesDetails.id}`,
                            "courseid": assesDetails.attributes.course,
                            "assesment_title": assesDetails.attributes.assesment_title,
                            "totalScored": scoreMark
                        }
                    }, {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("jwt")
                        }
                    }).then(res => {
                        setLoading(false);
                        // dispatch(RemoveAllCusAns())
                        toastComponent("success", ConstData.textConst.testSubmit);
                        setTimeout(() => {
                            navigate.push("/user/my-courses/assessment/questions");
                        }, 1500)

                    }).catch(err => {
                        toastComponent("error", "Something went wrong, please try again")
                        setTimeout(() => {
                            setLoading(false);
                            navigate.push("/user/my-courses/assessment/questions");
                        }, 3000)
                    })
                }
            }

        }
    }
    const handleNext = () => {
        if (state.cus_a_answer === false && state.cus_b_answer === false && state.cus_c_answer === false && state.cus_d_answer === false && state.cus_e_answer === false) {
            toastComponent("warn", "Please Select Answer!");
        } else {
            let arr = cusAnsData;
            let obj = { index: currentIndex, qsid: quesData[currentIndex].id, Answer: state };
            let index = arr.findIndex(item => item.qsid === obj.qsid);
            if(index !== -1){
                arr[index] = obj;
            }else{
                arr.push(obj);
            }
            setCusAnsData(arr);
            // dispatch(AddCusAns({ index: currentIndex, qsid: quesData[currentIndex].id, Answer: state }))


            if (currentIndex < quesData.length - 1) {
                setNextIndex(currentIndex + 1)

                if (cusAnsData[currentIndex + 1] === undefined) {
                    setState(prev => {
                        return {
                            ...prev, ["cus_a_answer"]: false, ["cus_b_answer"]: false, ["cus_c_answer"]: false, ["cus_d_answer"]: false, ["cus_e_answer"]: false
                        }
                    })
                } else {
                    setState(prev => {
                        return {
                            ...prev, ["cus_a_answer"]: cusAnsData[currentIndex].Answer.cus_a_answer, ["cus_b_answer"]: cusAnsData[currentIndex].Answer.cus_b_answer, ["cus_c_answer"]: cusAnsData[currentIndex].Answer.cus_c_answer, ["cus_d_answer"]: cusAnsData[currentIndex].Answer.cus_d_answer, ["cus_e_answer"]: cusAnsData[currentIndex].Answer.cus_e_answer
                        }
                    })
                }

            }
            if (currentIndex === quesData.length - 1) {
                setEnableBtn(!enableBtn);
            }
        }

    }
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setState(prev => {
                return {
                    ...prev, ["cus_a_answer"]: cusAnsData[currentIndex - 1].Answer.cus_a_answer, ["cus_b_answer"]: cusAnsData[currentIndex - 1].Answer.cus_b_answer, ["cus_c_answer"]: cusAnsData[currentIndex - 1].Answer.cus_c_answer, ["cus_d_answer"]: cusAnsData[currentIndex - 1].Answer.cus_d_answer, ["cus_e_answer"]: cusAnsData[currentIndex - 1].Answer.cus_e_answer
                }
            })
            setNextIndex(currentIndex - 1)
            setEnableBtn(false)
        }
    }

    return (
        <Layout1>
            <>
                <ToastContainer />
                <PageLoadingComponents loading={loading} />
                <InstructorMenuBar cusAnsData={cusAnsData} setNextIndex={setNextIndex} setState={setState} quesData={quesData} />
                <div className="d-flex justify-content-row" style={{ margin: "50px 0" }}>
                    <div style={{ width: "3%" }}></div>
                    <div className={"content"}>

                        {
                            quesData.length > 0 ?
                                <div>
                                    <div className="d-flex justify-content-between">
                                        <h3 className="d-flex justify-content-left"><p style={{ marginRight: "5px" }}>Q{currentIndex + 1} </p><span dangerouslySetInnerHTML={{ __html: quesData[currentIndex].attributes.question_title }}></span></h3>
                                        <div className="d-flex justify-content-end">
                                            <button className="btn btn-primary btnUpdate" style={{ marginRight: "15px" }} onClick={handlePrevious}>Previous</button>
                                            <div className="d-flex flex-direction-row">
                                                <button className="btn btn-primary btnUpdate" style={{ marginRight: "15px" }} onClick={handleNext} disabled={enableBtn}>Next</button>
                                                <button className="btn btn-primary btnUpdate" style={enableBtn ? { display: "block" } : { display: "none" }} onClick={handleSubmit} >Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        quesData[currentIndex].attributes.questiontype === "singleselect" &&
                                        <div className="d-flex justify-content-start flex-direction-row flex-wrap" style={{ marginTop: "5px" }}>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer} value={state.cus_a_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: !state.cus_a_answer,
                                                                ["cus_b_answer"]: state.cus_a_answer, ["cus_c_answer"]: state.cus_a_answer,
                                                                ["cus_d_answer"]: state.cus_a_answer, ["cus_e_answer"]: state.cus_a_answer
                                                            }
                                                        })} />
                                                    <label className="form-check-label labelMargin" for="flexRadioDefault1">
                                                        {quesData[currentIndex].attributes.option_a_text}
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_a_attachment != "" && quesData[currentIndex].attributes.option_a_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_a_attachment} alt="OptionImg A" className="imgStyle" />
                                                }

                                            </div>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start" >
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer} value={state.cus_b_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: state.cus_b_answer,
                                                                ["cus_b_answer"]: !state.cus_b_answer, ["cus_c_answer"]: state.cus_b_answer,
                                                                ["cus_d_answer"]: state.cus_b_answer, ["option_e_is_answer"]: state.cus_b_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label labelMargin" for="flexRadioDefault1">
                                                        {quesData[currentIndex].attributes.option_b}
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_b_attachment != "" && quesData[currentIndex].attributes.option_b_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_b_attachment} alt="OptionImg B" className="imgStyle" />
                                                }

                                            </div>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start" >
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_c_answer} value={state.cus_c_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: state.cus_c_answer,
                                                                ["cus_b_answer"]: state.cus_c_answer, ["cus_c_answer"]: !state.cus_c_answer,
                                                                ["cus_d_answer"]: state.cus_c_answer, ["cus_e_answer"]: state.cus_c_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label labelMargin" for="flexRadioDefault1">
                                                        {quesData[currentIndex].attributes.option_c}
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_c_attachment != "" && quesData[currentIndex].attributes.option_c_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_c_attachment} alt="OptionImg C" className="imgStyle" />
                                                }

                                            </div>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_d_answer} value={state.cus_d_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: state.cus_d_answer,
                                                                ["cus_b_answer"]: state.cus_d_answer, ["cus_c_answer"]: state.cus_d_answer,
                                                                ["cus_d_answer"]: !state.cus_d_answer, ["cus_e_answer"]: state.cus_d_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label labelMargin" for="flexRadioDefault1">
                                                        {quesData[currentIndex].attributes.option_d}
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_d_attachment != "" && quesData[currentIndex].attributes.option_d_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_d_attachment} alt="OptionImg A" className="imgStyle" />
                                                }

                                            </div>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start" >
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_e_answer} value={state.cus_e_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: state.cus_e_answer,
                                                                ["cus_b_answer"]: state.cus_e_answer, ["cus_c_answer"]: state.cus_e_answer,
                                                                ["cus_d_answer"]: state.cus_e_answer, ["cus_e_answer"]: !state.cus_e_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label labelMargin" for="flexRadioDefault1">
                                                        {quesData[currentIndex].attributes.option_e}
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_e_attachment != null && quesData[currentIndex].attributes.option_a_attachment != "" &&
                                                    <img src={quesData[currentIndex].attributes.option_e_attachment} alt="OptionImg E" className="imgStyle" />
                                                }

                                            </div>
                                        </div>
                                    }
                                    {
                                        quesData[currentIndex].attributes.questiontype === "multiselect" &&
                                        <div className="row" style={{ marginTop: "100px" }}>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start" >
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: !state.cus_a_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option A
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_a_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_a_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{quesData[currentIndex].attributes.option_a_text}</h6>

                                            </div>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start">
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_b_answer"]: !state.cus_b_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option B
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_b_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_b_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{quesData[currentIndex].attributes.option_b}</h6>

                                            </div>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start">
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_c_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_c_answer"]: !state.cus_c_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option C
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_c_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_c_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{quesData[currentIndex].attributes.option_c}</h6>

                                            </div>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start">
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_d_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_d_answer"]: !state.cus_d_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option D
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_d_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_d_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{quesData[currentIndex].attributes.option_d}</h6>

                                            </div>
                                            <div className="Optiondiv" style={{ marginTop: "50px" }}>
                                                <div className="d-flex justify-conent-start" >
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_e_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_e_answer"]: !state.cus_e_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        <span> Option E</span>
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_e_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_e_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{quesData[currentIndex].attributes.option_e}</h6>

                                            </div>
                                        </div>
                                    }
                                    {
                                        quesData[currentIndex].attributes.questiontype === "truefalse" &&
                                        <div className="row" style={{ marginTop: "100px" }}>
                                            <div className="Optiondiv">
                                                <div className="d-flex justify-conent-start" >
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer} value={state.cus_a_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: !state.cus_a_answer,
                                                                ["cus_b_answer"]: state.cus_a_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option A
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_a_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_a_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{quesData[currentIndex].attributes.option_a_text}</h6>

                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-sm-6 form-check">
                                                <div className="d-flex justify-conent-start">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer} value={state.cus_b_answer}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_b_answer"]: !state.cus_b_answer,
                                                                ["cus_a_answer"]: state.cus_b_answer
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option B
                                                    </label>
                                                </div>
                                                {
                                                    quesData[currentIndex].attributes.option_b_attachment != null &&
                                                    <img src={quesData[currentIndex].attributes.option_b_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{quesData[currentIndex].attributes.option_b}</h6>

                                            </div>
                                        </div>
                                    }
                                    {
                                        quesData[currentIndex].attributes.questiontype === "fillinblank" &&
                                        <div className="row" style={{ marginTop: "100px" }}>
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-sm-6 form-check">
                                                <h6>{quesData[currentIndex].attributes.option_a_text}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: !state.cus_a_answer,
                                                            ["option_b_is_answer"]: state.cus_a_answer, ["option_c_is_answer"]: state.cus_a_answer,
                                                            ["option_d_is_answer"]: state.cus_a_answer, ["option_e_is_answer"]: state.cus_a_answer
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Option A
                                                </label>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-sm-6 form-check">
                                                <h6>{quesData[currentIndex].attributes.option_a}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: state.cus_b_answer,
                                                            ["option_b_is_answer"]: !state.cus_b_answer, ["option_c_is_answer"]: state.cus_b_answer,
                                                            ["option_d_is_answer"]: state.cus_b_answer, ["option_e_is_answer"]: state.cus_b_answer
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Option B
                                                </label>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-sm-6 form-check">
                                                <h6>{quesData[currentIndex].attributes.option_c}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_c_answer}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: state.cus_c_answer,
                                                            ["option_b_is_answer"]: state.cus_c_answer, ["option_c_is_answer"]: !state.cus_c_answer,
                                                            ["option_d_is_answer"]: state.cus_c_answer, ["option_e_is_answer"]: state.cus_c_answer
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Option C
                                                </label>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-sm-6 form-check">
                                                <h6>{quesData[currentIndex].attributes.option_d}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_d_answer}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: state.cus_d_answer,
                                                            ["option_b_is_answer"]: state.cus_d_answer, ["option_c_is_answer"]: state.cus_d_answer,
                                                            ["option_d_is_answer"]: !state.cus_d_answer, ["option_e_is_answer"]: state.cus_d_answer
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Option D
                                                </label>
                                            </div>
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-sm-6 form-check" style={{ marginTop: "50px" }}>
                                                <h6>{quesData[currentIndex].attributes.option_e}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_e_answer}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: state.cus_e_answer,
                                                            ["option_b_is_answer"]: state.cus_e_answer, ["option_c_is_answer"]: state.cus_e_answer,
                                                            ["option_d_is_answer"]: state.cus_e_answer, ["option_e_is_answer"]: !state.cus_e_answer
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    <span> Option E</span>
                                                </label>
                                            </div>
                                        </div>
                                    }

                                </div>
                                : ""
                        }

                    </div>
                    <div style={{ width: "7%" }}>
                    </div>
                </div>
            </>
        </Layout1>
    )
}

export default CustomerAssesmentTestPage;