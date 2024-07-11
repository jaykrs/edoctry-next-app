import React, { useEffect, useState } from "react";
import Layout1 from "../../../../components/Layout1/Layout1";
import axios from "axios";
import { CMS_URL } from "../../../../urlConst";
import { useDispatch, useSelector } from "react-redux";
import { AddCusAns, UpdateCusAns, RemoveAllCusAns } from "../../../../reducers/cusAnsSlicer";
import { setQuestionReview } from "../../../../reducers/questionTestReviewSlicer";
import ReviewMenuBar from "../../../../components/ReviewMenuBar/ReviewMenuBar";

const CustomerQuestionReviewPage = () => {
    const dispatch = useDispatch();
    const cusAnsData = useSelector(store => store.cusAns.cusAns);
    const qsReviewData = useSelector(store => store.qsReview.qsReview);
    const [quesData, setQuesData] = useState("");
    const [currentIndex, setNextIndex] = useState(0);  
    const [scoreData, setScoreData] = useState("");
    const [totalScore,setTotalScore] = useState(0);
    const [state, setState] = useState({
        cus_a_answer: false,
        cus_b_answer: false,
        cus_c_answer: false,
        cus_d_answer: false,
        cus_e_answer: false,
        answer_a: false,
        answer_b: false,
        answer_c: false,
        answer_d: false,
        answer_e: false,
        questiontype: ""
    })
    const [enableBtn, setEnableBtn] = useState(false);

    useEffect(() => {
        axios.get(CMS_URL + "scores?filters[id][$eq]=" + sessionStorage.getItem("scoreId"), {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(async score => {
                setTotalScore(score.data.data[0].attributes.totalScored)
                const AnsData = JSON.parse(score.data.data[0].attributes.customerAnswer);
                setScoreData(AnsData);
                await axios.get(CMS_URL + "questions?filters[assesment_id][$eq]=" + score.data.data[0].attributes.assesmentid, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("jwt")
                    }
                })
                    .then(res => {
                        setQuesData(res.data.data);
                        let quesAnsData = res.data.data;
                        setState(prev => {
                            return {
                                ...prev, ["cus_a_answer"]: AnsData[currentIndex].Answer.cus_a_answer,
                                ["cus_b_answer"]: AnsData[currentIndex].Answer.cus_b_answer,
                                ["cus_c_answer"]: AnsData[currentIndex].Answer.cus_c_answer,
                                ["cus_d_answer"]: AnsData[currentIndex].Answer.cus_d_answer,
                                ["cus_e_answer"]: AnsData[currentIndex].Answer.cus_e_answer,
                                ["answer_a"]: quesAnsData[currentIndex].attributes.option_a_is_answer,
                                ["answer_b"]: quesAnsData[currentIndex].attributes.option_b_is_answer,
                                ["answer_c"]: quesAnsData[currentIndex].attributes.option_c_is_answer,
                                ["answer_d"]: quesAnsData[currentIndex].attributes.option_d_is_answer,
                                ["answer_e"]: quesAnsData[currentIndex].attributes.option_e_is_answer,
                                ["questiontype"]: quesAnsData[currentIndex].attributes.questiontype
                            }
                        })
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err))

    }, []);

    useEffect(()=>{
        currentState()
    },[currentIndex])
    const handleNext = () => {
        if (currentIndex < scoreData.length - 1) {
            //  dispatch(setQuestionReview({index:currentIndex + 1,Answer:state}))
            setState(prev => {
                return {
                    ...prev, ["cus_a_answer"]: scoreData[currentIndex + 1].Answer.cus_a_answer,
                    ["cus_b_answer"]: scoreData[currentIndex + 1].Answer.cus_b_answer,
                    ["cus_c_answer"]: scoreData[currentIndex + 1].Answer.cus_c_answer,
                    ["cus_d_answer"]: scoreData[currentIndex + 1].Answer.cus_d_answer,
                    ["cus_e_answer"]: scoreData[currentIndex + 1].Answer.cus_e_answer,
                    ["answer_a"]: quesData[currentIndex + 1].attributes.option_a_is_answer,
                    ["answer_b"]: quesData[currentIndex + 1].attributes.option_b_is_answer,
                    ["answer_c"]: quesData[currentIndex + 1].attributes.option_c_is_answer,
                    ["answer_d"]: quesData[currentIndex + 1].attributes.option_d_is_answer,
                    ["answer_e"]: quesData[currentIndex + 1].attributes.option_e_is_answer,
                    ["questiontype"]: quesData[currentIndex + 1].attributes.questiontype
                }
            })

            setNextIndex(currentIndex + 1)
        }


    }
    const handlePrevious = () => {
        if (currentIndex > 0) {
            setState(prev => {
                return {
                    ...prev, ["cus_a_answer"]: scoreData[currentIndex - 1].Answer.cus_a_answer,
                    ["cus_b_answer"]: scoreData[currentIndex - 1].Answer.cus_b_answer,
                    ["cus_c_answer"]: scoreData[currentIndex - 1].Answer.cus_c_answer,
                    ["cus_d_answer"]: scoreData[currentIndex - 1].Answer.cus_d_answer,
                    ["cus_e_answer"]: scoreData[currentIndex - 1].Answer.cus_e_answer,
                    ["answer_a"]: quesData[currentIndex - 1].attributes.option_a_is_answer,
                    ["answer_b"]: quesData[currentIndex - 1].attributes.option_b_is_answer,
                    ["answer_c"]: quesData[currentIndex - 1].attributes.option_c_is_answer,
                    ["answer_d"]: quesData[currentIndex - 1].attributes.option_d_is_answer,
                    ["answer_e"]: quesData[currentIndex - 1].attributes.option_e_is_answer,
                    ["questiontype"]: quesData[currentIndex - 1].attributes.questiontype
                }
            })
            // dispatch(setQuestionReview({index:currentIndex - 1,Answer:state}))
            setNextIndex(currentIndex - 1)
        }
    }
    const currentState = () => {
        if (currentIndex <= scoreData.length - 1) {
            //  dispatch(setQuestionReview({index:currentIndex + 1,Answer:state}))
            setState(prev => {
                return {
                    ...prev, ["cus_a_answer"]: scoreData[currentIndex].Answer.cus_a_answer,
                    ["cus_b_answer"]: scoreData[currentIndex].Answer.cus_b_answer,
                    ["cus_c_answer"]: scoreData[currentIndex].Answer.cus_c_answer,
                    ["cus_d_answer"]: scoreData[currentIndex].Answer.cus_d_answer,
                    ["cus_e_answer"]: scoreData[currentIndex].Answer.cus_e_answer,
                    ["answer_a"]: quesData[currentIndex].attributes.option_a_is_answer,
                    ["answer_b"]: quesData[currentIndex].attributes.option_b_is_answer,
                    ["answer_c"]: quesData[currentIndex].attributes.option_c_is_answer,
                    ["answer_d"]: quesData[currentIndex].attributes.option_d_is_answer,
                    ["answer_e"]: quesData[currentIndex].attributes.option_e_is_answer,
                    ["questiontype"]: quesData[currentIndex].attributes.questiontype
                }
            })

            setNextIndex(currentIndex)
        }


    }
    let style1 = {backgroundColor:"green",color:"#fff",marginBottom:"10px",padding:"10px 30px",border: "solid 3px #9d9393",borderRadius: "5px"} ;
    let style2 = {backgroundColor:"red",color:"#000",marginBottom:"10px",padding:"10px 30px",border: "solid 3px #9d9393",borderRadius: "5px"};
    let style3 = {color:"#000",marginBottom:"10px",padding:"10px 30px"};
    return (
        <Layout1>
           <ReviewMenuBar  setNextIndex={setNextIndex} setState={setState} quesData={quesData} scoreData={scoreData} />
            <div className="d-flex justify-content-row" style={{ margin: "50px 0" }}>
                <div style={{ width: "3%" }}></div>
                <div style={{ width: "90%" ,height:"610px"}}>
                    {
                        quesData.length > 0 ?
                            <div>

                                <div className="d-flex justify-content-start flex-column">
                                    <p style={{ marginRight: "5px" }}>Q {currentIndex + 1} of {quesData.length} </p>
                                    <h3><span dangerouslySetInnerHTML={{ __html: quesData[currentIndex].attributes.question_title }}></span></h3>
                                </div>
                                {
                                    quesData[currentIndex].attributes.questiontype === "singleselect" &&
                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_a === true ? style1 :state.cus_a_answer === true ? style2: style3} >
                                            <input class="form-check-input qsOption1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer}/>
                                            <h6  >{quesData[currentIndex].attributes.option_a_text}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_b === true ? style1 :state.cus_b_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer}/>
                                            <h6  >{quesData[currentIndex].attributes.option_b}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start w-100" style={state.answer_c === true ? style1 :state.cus_c_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_c_answer} />
                                            <h6  >{quesData[currentIndex].attributes.option_c}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_d === true ? style1 :state.cus_d_answer === true ? style2: style3}>
                                            
                                            <input class="form-check-input qsOption1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_d_answer} />
                                            <h6  >{quesData[currentIndex].attributes.option_d}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_e === true ? style1 :state.cus_e_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_e_answer}/>
                                            <h6  >{quesData[currentIndex].attributes.option_e}</h6>
                                        </div>
                                    </div>
                                }
                                {
                                    quesData[currentIndex].attributes.questiontype === "multiselect" &&
                                    <div className="row" style={{ marginTop: "100px" }}>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_a === true ? style1 :state.cus_a_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer}
                                            />
                                            <h6>{quesData[currentIndex].attributes.option_a_text}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_b === true ? style1 :state.cus_b_answer === true ? style2: style3} >
                                           
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer}
                                            />
                                             <h6>{quesData[currentIndex].attributes.option_b}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_c === true ? style1 :state.cus_c_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_c_answer}
                                            />
                                            <h6>{quesData[currentIndex].attributes.option_c}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_d === true ? style1 :state.cus_d_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_d_answer}
                                            />
                                            <h6>{quesData[currentIndex].attributes.option_d}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_e === true ? style1 :state.cus_e_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_e_answer}
                                            />
                                            <h6>{quesData[currentIndex].attributes.option_e}</h6>
                                        </div>
                                    </div>
                                }
                                {
                                    quesData[currentIndex].attributes.questiontype === "truefalse" &&
                                    <div className="row" style={{ marginTop: "100px" }}>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_a === true ? style1 :state.cus_a_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer}
                                            />
                                            <h6>{quesData[currentIndex].attributes.option_a_text}</h6>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_b === true ? style1 :state.cus_b_answer === true ? style2: style3} >
                                            
                                            <input class="form-check-input qsOption1" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer} value={state.cus_b_answer}
                                            />
                                            <h6>{quesData[currentIndex].attributes.option_b}</h6>
                                        </div>
                                    </div>
                                }
                                {
                                    quesData[currentIndex].attributes.questiontype === "fillinblank" &&
                                    <div className="row" style={{ marginTop: "100px" }}>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_e === true ? style1 :state.cus_e_answer === true ? style2: style3} >
                                            <h6>{quesData[currentIndex].attributes.option_a_text}</h6>
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_a_answer}
                                            />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Option A
                                            </label>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_e === true ? style1 :state.cus_e_answer === true ? style2: style3} >
                                            <h6>{quesData[currentIndex].attributes.option_a}</h6>
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_b_answer}
                                            />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Option B
                                            </label>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_e === true ? style1 :state.cus_e_answer === true ? style2: style3} >
                                            <h6>{quesData[currentIndex].attributes.option_c}</h6>
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_c_answer}
                                            />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Option C
                                            </label>
                                        </div>
                                        <div className="form-check d-flex justify-content-start" style={state.answer_e === true ? style1 :state.cus_e_answer === true ? style2: style3} >
                                            <h6>{quesData[currentIndex].attributes.option_d}</h6>
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_d_answer}
                                            />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Option D
                                            </label>
                                        </div>
                                        <div className="form-check d-flex justify-content-start m-10">
                                            <h6>{quesData[currentIndex].attributes.option_e}</h6>
                                            <input class="form-check-input qsOption1" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" checked={state.cus_e_answer}
                                            />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                <span> Option E</span>
                                            </label>
                                        </div>
                                    </div>
                                }
                            </div>

                            : <img
                            src="../../../../src/publicContent/images/progress-circle.gif"
                            alt="progress"
                        />
                    }
                    <div className="d-flex justify-content-between p-2 m-3" style={ scoreData[currentIndex] === undefined ? {backgroundColor:"#fff",color:"#000"} :state.cus_a_answer === state.answer_a && state.cus_b_answer === state.answer_b && state.cus_c_answer === state.answer_c &&
                                state.cus_d_answer === state.answer_d && state.cus_e_answer === state.answer_e ? {backgroundColor:"green",color:"#fff",border: "solid 3px #9d9393",borderRadius: "5px"} : {backgroundColor:"red",border: "solid 3px #9d9393",borderRadius: "5px"} }>
                        {
                            state.cus_a_answer === state.answer_a && state.cus_b_answer === state.answer_b && state.cus_c_answer === state.answer_c &&
                                state.cus_d_answer === state.answer_d && state.cus_e_answer === state.answer_e ? 
                                <h6><input type="checkbox" checked={true} className="qsOption1" />Your Answer is correct, you scored {quesData.length > 0 ? quesData[currentIndex].attributes.marks : ""}</h6>
                                : <h6><input type="checkbox" checked={true} className="qsOption1" />Your Answer is Incorrect, you scored <span style={{color:"#fff"}}>0</span> </h6>
                        }
                        <h6 style={{textAlign:"center"}}>Overall Correct <br/> {totalScore}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={handlePrevious}>Previous</button>

                        <button className="btn btn-primary" onClick={handleNext} disabled={enableBtn}>Next</button>
                    </div>
                </div>
                <div style={{ width: "7%" }}>

                </div>
            </div>
        </Layout1>
    )
}

export default CustomerQuestionReviewPage;