import React, { useEffect, useState } from "react";
import Layout1 from "../../../../../components/Layout1/Layout1";
import axios from "axios";
import { CMS_URL } from "../../../../../urlConst";
import ReactMarkdown from "react-markdown";
// import "./QuestionView.css"
const QuestionViewPage = () => {

    const [quesData, setQuesData] = useState("");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        cus_a_answer: false,
        cus_b_answer: false,
        cus_c_answer: false,
        cus_d_answer: false,
        cus_e_answer: false,
    })

    useEffect(() => {
        setLoading(true);
        axios.get(CMS_URL + "questions?filters[id][$eq]=" + sessionStorage.getItem("qsid"), {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then(res => {
                setQuesData(res.data.data);
                setLoading(false);
            })
    }, [])
    const handleSubmit = () => {
        if (state.cus_a_answer === false && state.cus_b_answer === false && state.cus_c_answer === false && state.cus_d_answer === false && state.cus_e_answer === false) {
            alert("Plese select any option to submit !")
        } else {
            setLoading(true)
            axios.put(CMS_URL + "questions/" + quesData[0].id, {
                "data": {
                    "cus_a_answer": state.cus_a_answer,
                    "cus_b_answer": state.cus_b_answer,
                    "cus_c_answer": state.cus_c_answer,
                    "cus_d_answer": state.cus_d_answer,
                    "cus_e_answer": state.cus_e_answer,
                }
            }).then(res => {
                setLoading(false);
            }).catch(err => console.log(err))
        }
    }
    return (
        <Layout1>
            <div style={{ display: loading ? 'block' : 'none' }}>
                <div className={"overlay"}></div>
                <div className={"spinner_wrapper"}>
                    <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span class="sr-only"></span>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-row" style={{ margin: "50px 0" }}>
                <div style={{ width: "3%" }}></div>
                <div style={{ width: "94%" }}>
                    {
                        quesData.length > 0 ? quesData.map((item, index) => {
                            return (
                                <div key={index}>

                                    <h3 className="d-flex justify-content-left"><p style={{ marginRight: "5px" }}>Q{item.id} </p><ReactMarkdown>{item.attributes.question_title}</ReactMarkdown></h3>
                                    {
                                        item.attributes.questiontype === "singleselect" &&
                                        <div className="row" style={{ marginTop: "5px" }}>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_a_attachment != null &&
                                                    <img src={item.attributes.option_a_attachment} alt="OptionImg A" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_a_text}</h6>
                                                <div>
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: true,
                                                                ["cus_b_answer"]: false, ["cus_c_answer"]: false,
                                                                ["cus_d_answer"]: false, ["cus_e_answer"]: false
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option A
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_b_attachment != null &&
                                                    <img src={item.attributes.option_b_attachment} alt="OptionImg B" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_b}</h6>
                                                <div>
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: false,
                                                                ["cus_b_answer"]: true, ["cus_c_answer"]: false,
                                                                ["cus_d_answer"]: false, ["option_e_is_answer"]: false
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option B
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_c_attachment != null &&
                                                    <img src={item.attributes.option_c_attachment} alt="OptionImg C" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_c}</h6>
                                                <div>
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: false,
                                                                ["cus_b_answer"]: false, ["cus_c_answer"]: true,
                                                                ["cus_d_answer"]: false, ["cus_e_answer"]: false
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option C
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv" style={{ marginTop: "50px" }} >
                                                {
                                                    item.attributes.option_d_attachment != null &&
                                                    <img src={item.attributes.option_d_attachment} alt="OptionImg D" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_d}</h6>
                                                <div>
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: false,
                                                                ["cus_b_answer"]: false, ["cus_c_answer"]: false,
                                                                ["cus_d_answer"]: true, ["cus_e_answer"]: false
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option D
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv" style={{ marginTop: "50px" }}>
                                                {
                                                    item.attributes.option_e_attachment != null &&
                                                    <img src={item.attributes.option_e_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_e}</h6>
                                                <div>
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: false,
                                                                ["cus_b_answer"]: false, ["cus_c_answer"]: false,
                                                                ["cus_d_answer"]: false, ["cus_e_answer"]: true
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        <span> Option E</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        item.attributes.questiontype === "multiselect" &&
                                        <div className="row" style={{ marginTop: "100px" }}>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_a_attachment != null &&
                                                    <img src={item.attributes.option_a_attachment} alt="OptionImg A" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_a_text}</h6>
                                                <div>
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: true
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option A
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_b_attachment != null &&
                                                    <img src={item.attributes.option_b_attachment} alt="OptionImg B" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_b}</h6>
                                                <div>
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_b_answer"]: true
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option B
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_c_attachment != null &&
                                                    <img src={item.attributes.option_c_attachment} alt="OptionImg C" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_c}</h6>
                                                <div>
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_c_answer"]: true
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option C
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_d_attachment != null &&
                                                    <img src={item.attributes.option_d_attachment} alt="OptionImg D" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_d}</h6>
                                                <div>
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_d_answer"]: true
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option D
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv" style={{ marginTop: "50px" }}>
                                                {
                                                    item.attributes.option_e_attachment != null &&
                                                    <img src={item.attributes.option_e_attachment} alt="OptionImg E" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_e}</h6>
                                                <div>
                                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_e_answer"]: true
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        <span> Option E</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        item.attributes.questiontype === "truefalse" &&
                                        <div className="row" style={{ marginTop: "100px" }}>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_a_attachment != null &&
                                                    <img src={item.attributes.option_a_attachment} alt="OptionImg A" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_a_text}</h6>
                                                <div>
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_a_answer"]: true,
                                                                ["cus_b_answer"]: false, ["cus_c_answer"]: false,
                                                                ["cus_d_answer"]: false, ["cus_e_answer"]: false
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option A
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check Optiondiv">
                                                {
                                                    item.attributes.option_b_attachment != null &&
                                                    <img src={item.attributes.option_b_attachment} alt="OptionImg B" width={"400px"} height={"250px"} />
                                                }
                                                <h6>{item.attributes.option_b}</h6>
                                                <div>
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                        onChange={(e) => setState((prev) => {
                                                            return {
                                                                ...prev, ["cus_b_answer"]: true,
                                                                ["cus_a_answer"]: false, ["cus_c_answer"]: false,
                                                                ["cus_d_answer"]: false, ["cus_e_answer"]: false
                                                            }
                                                        })} />
                                                    <label class="form-check-label" for="flexRadioDefault1">
                                                        Option B
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {
                                        item.attributes.questiontype === "fillinblank" &&
                                        <div className="row" style={{ marginTop: "100px" }}>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check">
                                                <h6>{item.attributes.option_a_text}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
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
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check">
                                                <h6>{item.attributes.option_b}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: true,
                                                            ["option_b_is_answer"]: false, ["option_c_is_answer"]: false,
                                                            ["option_d_is_answer"]: false, ["option_e_is_answer"]: false
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Option B
                                                </label>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check">
                                                <h6>{item.attributes.option_c}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: true,
                                                            ["option_b_is_answer"]: false, ["option_c_is_answer"]: false,
                                                            ["option_d_is_answer"]: false, ["option_e_is_answer"]: false
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Option C
                                                </label>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check">
                                                <h6>{item.attributes.option_d}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: true,
                                                            ["option_b_is_answer"]: false, ["option_c_is_answer"]: false,
                                                            ["option_d_is_answer"]: false, ["option_e_is_answer"]: false
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    Option D
                                                </label>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-sm-6 form-check" style={{ marginTop: "50px" }}>
                                                <h6>{item.attributes.option_e}</h6>
                                                <input class="form-check-input" type="checkbox" name="flexRadioDefault" id="flexRadioDefault1" value={item.attributes.option_a_text}
                                                    onChange={(e) => setState((prev) => {
                                                        return {
                                                            ...prev, ["option_a_is_answer"]: true,
                                                            ["option_b_is_answer"]: false, ["option_c_is_answer"]: false,
                                                            ["option_d_is_answer"]: false, ["option_e_is_answer"]: false
                                                        }
                                                    })} />
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                    <span> Option E</span>
                                                </label>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })

                            : ""
                    }
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div style={{ width: "10%" }}>

                </div>
            </div>
        </Layout1>
    )
}

export default QuestionViewPage;