import React, { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label
} from "recharts";

const BargraphView = (props) => {
  const { scData = [], quesData = [] } = props;
  let data = [];
  scData.length > 0 ? scData.forEach(async (element, index) => {
    let eleData = JSON.parse(element.attributes.customerAnswer);
    let corrAns = 0, wrgAns = 0, notAns = 0;
    await eleData.forEach(async el => {
      let quesEle = await quesData.find(els => els.id == Number(el.qsid));
      if (el.Answer.cus_a_answer === quesEle.attributes.option_a_is_answer && el.Answer.cus_b_answer === quesEle.attributes.option_b_is_answer &&
        el.Answer.cus_c_answer === quesEle.attributes.option_c_is_answer && el.Answer.cus_d_answer === quesEle.attributes.option_d_is_answer && el.Answer.cus_e_answer === quesEle.attributes.option_e_is_answer) {
        corrAns += 1;
      } else {
        wrgAns += 1;
      }
    })
    notAns = quesData.length - (corrAns + wrgAns);
    data.push({ name: `Atmpt ${index + 1} C-${corrAns}/W-${wrgAns}`, fullMarks: quesData.length, correct: corrAns, wrong: wrgAns, notAnswered: notAns })
  }) : "";
  // const data = [
  //   { name: "Attempt 1", fullMarks: 100, correct: 60, wrong: 40,notAnswered:10 },
  //   { name: "Attempt 2", fullMarks: 100, correct: 50, wrong: 50 ,notAnswered:0},
  //   { name: "Attempt 3", fullMarks: 100, correct: 80, wrong: 20 , notAnswered:5 },
  //   { name: "Attempt 4", fullMarks: 100, correct: 90, wrong: 10 ,notAnswered:10},
  //   { name: "Attempt 5", fullMarks: 100, correct: 60, wrong: 40,notAnswered:20 },
  // ];

  return (
    <>
      <div className="d-flex justify-content-center align-content-center">

        <div className="d-flex justify-content-space-between"><p>Correct Answer: </p><p className="bargraphStyle2"></p></div>
        <div className="d-flex justify-content-space-between" ><p>Wrong Answer: </p><p className="bargraphStyle3"></p></div>
        <div className="d-flex justify-content-space-between"><p>Not Answered: </p><p className="bargraphStyle4"></p></div>
      </div>
      <div className="d-flex justify-content-center">
        {
          // data.length > 0 ? 
          <ResponsiveContainer width={'80%'} height={300} >
            <BarChart data={data}>
              <Bar dataKey="fullMarks" fill="#fff" barSize={20} />
              <Bar dataKey="correct" fill="green" barSize={20} />
              <Bar dataKey="wrong" fill="red" barSize={20} />
              <Bar dataKey="notAnswered" fill="#D5CDCD" barSize={20} />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
            </BarChart>
          </ResponsiveContainer>
        }
      </div>
    </>
  )
}

export default BargraphView;