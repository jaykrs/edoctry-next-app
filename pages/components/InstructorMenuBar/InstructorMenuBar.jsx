'use client'
import { useEffect, useState } from "react";
import css from "./InstructorMenuBar.module.css";
import { FaCircleUser } from "react-icons/fa6";
const InstructorMenuBar = (props) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(typeof window !== 'undefined' ? localStorage.getItem("username") : "")
  },[])
  const { cusAnsData = [], setNextIndex, setState, quesData = [] } = props;
  const handleCurrState = (index) => {
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
                    <p className={css.pCircleWithoutHover} style={{
                      backgroundColor: cusAnsData.length === 0 ? "" : cusAnsData[index] !== undefined ? "green" : ""
                    }} onClick={() => handleCurrState(index)}>{index + 1}</p>
                  }
                  <p className={css.pCircle} style={{
                    backgroundColor: cusAnsData.length === 0 ? "" : cusAnsData[index] !== undefined ? "green" : ""
                  }} onClick={() => handleCurrState(index)}>{index + 1}</p>

                </>
              )
            })
              : ""
          }

          {/* <Link to="/" className={css.iconBox}>
          <img className={css.icon} src={smallLogoIcon} alt="icon" />
        </Link>
      </div>
      <div className={css.menuBox}>

        <NavLink
          to="/user/profile/courses"
          className={({ isActive }) =>
            isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
          }
        >
          <div className={css.iconBox}>
            <img className={css.icon} src={playTvIcon} alt="icon" />
          </div>
          <div className={css.menuTxt}>Courses</div>
        </NavLink>
        {/* <NavLink
          to="/user/profile/assesment"
          className={({ isActive }) =>
            isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
          }
        >
          <div className={css.iconBox}>
            <img className={css.icon} src={playTvIcon} alt="icon" />
          </div>
          <div className={css.menuTxt}>Assessment</div>
        </NavLink> */}
          {/* <NavLink
          to="/user/profile/communication"
          className={({ isActive }) =>
            isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
          }
        >
          <div className={css.iconBox}>
            <img className={css.icon} src={captionIcon} alt="icon" />
          </div>
          <div className={css.menuTxt}>Communication</div>
        </NavLink>
        <NavLink
          to="/user/profile/performance"
          className={({ isActive }) =>
            isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
          }
        >
          <div className={css.iconBox}>
            <img className={css.icon} src={analyticsIcon} alt="icon" />
          </div>
          <div className={css.menuTxt}>Performance</div>
        </NavLink>
        <NavLink
          to="/user/profile/tools"
          className={({ isActive }) =>
            isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
          }
        >
          <div className={css.iconBox}>
            <img className={css.icon} src={settingsIcon} alt="icon" />
          </div>
          <div className={css.menuTxt}>Settings</div>
        </NavLink>
        <NavLink
          to="/user/profile/resources"
          className={({ isActive }) =>
            isActive ? [css.menuItem, css.activeLink].join(" ") : css.menuItem
          }
        >
          <div className={css.iconBox}>
            <img className={css.icon} src={queryIcon} alt="icon" />
          </div>
          <div className={css.menuTxt}>Resources</div>
        </NavLink>
       */}
        </div>
        <div className={css.checkBox} >
          <div>
            <p></p> <span>ANSWERED</span>
          </div>
          <div>
            <p style={{ backgroundColor: "#fff" }} ></p> <span>Not ANSWERED</span>
          </div>

        </div>
      </div>
    </>
  );
};

export default InstructorMenuBar;
