import { useEffect, useState } from "react";
import Link from "next/link";
import CustomCheckboxUtil from "../../../utils/FormUtils/CustomCheckboxUtil/CustomCheckboxUtil";
import axios from "axios";
import { CMS_URL } from "../../../urlConst";
import css from "./CourseContentComponent.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AddChapterToCart, RemoveChapterFromCart } from "../../../reducers/chapterSlicer";
import { RiVideoFill } from "react-icons/ri";
import ReactMarkdown from "react-markdown";
const CourseContentComponent = (props) => {
  const { title = "", id = 0, data = [], playerWidthSetter = () => { } } = props;
  const [toggleBox, setToggleBox] = useState({});
  const [toggleDrpDwn, setToggleDrpDwn] = useState({});
  const [courseUnitData, setCourseUnitData] = useState("");
  const [chapterData, setChapterData] = useState({
    data: []
  })

  const dispatch = useDispatch();
  const chapterCart = useSelector(store => store.chapter.chapter);
  useEffect(() => {
    (async () => {
      await axios.get(CMS_URL + "courseunits?filters[courseid][$eq]=" + id)
        .then(res => {
          let data = res.data.data;
          setCourseUnitData(res.data.data);

          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              axios.get(CMS_URL + "chapters?filters[courseunitid][$eq]=" + data[i].id, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("jwt")
                }
              })
                .then(result => {
                  dispatch(AddChapterToCart({ index: i, courseUnitid: data[i].id, chapterData: result.data.data }))
                })
                .catch(err => console.log(err))
            }
          }
        })
        .catch(err => console.log(err))

    })()
  }, [])
  return (
    <div className={css.outterDiv}>
      <div className={css.innerDiv}>
        {title ? (
          <div className={css.titleBox}>
            <span className={css.ttl}>{title}</span>
            {/* <span
              className={css.imgBox}
              onClick={() => playerWidthSetter((p) => !p)}
            >
              <img src={closeIcon} alt="close icon" className={css.closeIcon} />
            </span> */}
          </div>
        ) : null}

        <div className={css.bdy}>
          {courseUnitData.length > 0 ? courseUnitData.map((item, id) => {
            return (
              <div className={css.tab} key={`tab-${id}`}>
                <div
                  className={css.tabTitleBox}
                  onClick={() =>
                    setToggleBox((p) => {
                      return { ...p, [id]: !p[id] };
                    })

                  }
                >
                  <div className={css.tabTitleLeft}>
                    <div className={css.tabTtl} onClick={() => props.updateCourseViewContent(item.attributes.unit_brief, item.attributes.labproject, "", "", "")}>Section {id + 1} :<ReactMarkdown>{item.attributes.unit_title}</ReactMarkdown></div>
                    {/* <div className={css.tabDesc}>
                      <span>10/10</span>
                      <span></span>
                      <span>40 min</span>
                    </div> */}
                  </div>
                  <div className={css.tabTitleRight}  >
                    <img
                      src={"/publicContent/icons/down-arrow.svg"}
                      alt="down arrow"
                      className={[
                        css.icon,
                        toggleBox[id] ? css.iconReverse : null,
                      ].join(" ")}
                    />
                  </div>
                </div>
                {toggleBox[id] ? (
                  <Link href="" className={css.tabBdy}>
                    {
                      chapterCart.length > 0 ? chapterCart.map((v, i) => {

                        if (v.courseUnitid === item.id) {
                          return (
                            <div key={i}>
                              {v.chapterData.length > 0 ? v.chapterData.map((ch, ih) => {
                                return (
                                  <div
                                    className={css.descBdy}
                                    key={`subItem-${ih}`}
                                  >
                                    <div className={css.descBdyLeft}>
                                      <CustomCheckboxUtil
                                        state={toggleDrpDwn[ch.id] ?? false}
                                        name={ch.id}
                                        id={ch.id}
                                        onChange={(e) => {
                                          setToggleDrpDwn((prev) => {
                                            return {
                                              ...prev,
                                              [e.target?.name]: !prev[e.target?.name],
                                            };
                                          });
                                        }}
                                        extraCss={{
                                          width: "40px",
                                          gap: "0",
                                          margin: "0.5rem",
                                        }}
                                      />
                                    </div>
                                    <div className={css.descBdyRight} >
                                      <div className="d-flex justify-content-between">
                                        <div className={css.sbTtl} >
                                          <ReactMarkdown>{ch.attributes.chapter_title}</ReactMarkdown>
                                        </div>
                                      </div>
                                      <div className={css.sbBox}>
                                        {
                                          ch.attributes.chapter_video.split(",").map((video, vi) => {
                                            return (
                                              <div className="d-flex justify-content-start" onClick={() => props.updateCourseViewContent(item.attributes.unit_brief, item.attributes.labproject, ch.attributes.chapter_brief, ch.attributes.chapter_content, ch.attributes.chapter_resource)}>
                                                {
                                                  video !== "" && <RiVideoFill size={20} style={{ marginTop: "4px" }} />
                                                }
                                                <p key={vi} onClick={() => props.getdata(video)}>{video.split("/").pop().substring(0, 40)}</p>
                                              </div>

                                            )
                                          })
                                        }
                                      </div>
                                    </div>
                                  </div>
                                )
                              })
                                : ""

                              }
                            </div>
                          )
                        }
                      })


                        : ""
                    }
                  </Link>
                ) : null}
              </div>
            );
          })
            : ""
          }
        </div>
      </div>
    </div>

  );
};

export default CourseContentComponent;
