
import { useState } from "react";
import css from "./ReviewMenuBar.module.css";
import { FaCircleUser } from "react-icons/fa6";
const ReviewMenuBar = (props) => {
    const { cusAnsData = [], setNextIndex, setState, quesData = [], scoreData = {} } = props;
    const [userName,setUserName] = useState("");
    const handleCurrState = (index) => {
        setUserName(localStorage.getItem("username"));
        setNextIndex(index);
        if (cusAnsData[index] !== undefined) {
            setState(prev => {
                return {
                    ...prev, ["cus_a_answer"]: cusAnsData[index].Answer.cus_a_answer, ["cus_b_answer"]: cusAnsData[index].Answer.cus_b_answer, ["cus_c_answer"]: cusAnsData[index].Answer.cus_c_answer, ["cus_d_answer"]: cusAnsData[index].Answer.cus_d_answer, ["cus_e_answer"]: cusAnsData[index].Answer.cus_e_answer
                }
            })

        } else {
            setState(prev => {
                return {
                    ...prev, ["cus_a_answer"]: false, ["cus_b_answer"]: false, ["cus_c_answer"]: false, ["cus_d_answer"]: false, ["cus_e_answer"]: false
                }
            })
        }
    }
    console.log("scoreData", scoreData);
    console.log("quesData", quesData);
    return (
        <>
            <div className={css.outerDiv}>
                <div>
                    <p className={css.userStyle1}><FaCircleUser size={20} />{userName.substring(0, 6).toUpperCase()}</p>
                    <p className={css.userStyle2} ><FaCircleUser size={30} style={{ marginRight: "5px" }} />{userName.toUpperCase()}</p>
                </div>
                <div className={css.menuItem}>

                    {
                        quesData?.length > 0 ? quesData?.map((item, index) => {
                            return (
                                <>
                                    {
                                        index < 10 &&
                                        <p className={css.pCircleWithoutHover} style={
                                            scoreData[index] === undefined ? {} :
                                                quesData[index].attributes.option_a_is_answer === scoreData[index].Answer.cus_a_answer && quesData[index].attributes.option_b_is_answer === scoreData[index].Answer.cus_b_answer &&
                                                    quesData[index].attributes.option_c_is_answer === scoreData[index].Answer.cus_c_answer && quesData[index].attributes.option_d_is_answer === scoreData[index].Answer.cus_d_answer &&
                                                    quesData[index].attributes.option_e_is_answer === scoreData[index].Answer.cus_e_answer ? { backgroundColor: "green", color: "#fff" } : { backgroundColor: "red", color: "#000" }
                                        } onClick={() => handleCurrState(index)}>{index + 1}</p>
                                    }
                                    <p className={css.pCircle} style={
                                        scoreData[index] === undefined ? {} :
                                            quesData[index].attributes.option_a_is_answer === scoreData[index].Answer.cus_a_answer && quesData[index].attributes.option_b_is_answer === scoreData[index].Answer.cus_b_answer &&
                                                quesData[index].attributes.option_c_is_answer === scoreData[index].Answer.cus_c_answer && quesData[index].attributes.option_d_is_answer === scoreData[index].Answer.cus_d_answer &&
                                                quesData[index].attributes.option_e_is_answer === scoreData[index].Answer.cus_e_answer ? { backgroundColor: "green", color: "#fff" } : { backgroundColor: "red", color: "#000" }
                                    } onClick={() => handleCurrState(index)}>{index + 1}</p>

                                </>
                            )
                        })
                            : ""
                    }

                </div>
                <div className={css.checkBox} >
                    <div>
                        <p></p> <span>CORRECT ANSWER</span>
                    </div>
                    <div>
                        <p style={{backgroundColor:"red"}} ></p> <span>WRONG ANSWER</span>
                    </div>
                    <div>
                        <p style={{backgroundColor:"#fff"}} ></p> <span>Not ANSWERED</span>
                    </div>
                   
                </div>
            </div>
        </>
    );
};

export default ReviewMenuBar;
