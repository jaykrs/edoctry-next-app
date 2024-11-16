import React, { useEffect, useState } from "react";
import Link from "next/link";
// import Slider from "react-slick";
import CourseCard from "../CourseCard/CourseCard";
import ArrowsComp from "../ArrowComp/ArrowsComp";
import css from "./CourseCarouselComp.module.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
const CourseCarouselComp = ({ ttl, link = null, linkTxt = "", coursesData=[],from }) => {
  // const { ttl, link = null, linkTxt = "", coursesData } = props;
  const [stateList, setStateList] = useState([]);
  const [state, setState] = useState({
    currentPage: 1,
    recordsPerPage: 12,
    itemOffset: 0,
    noOfPage: 0,
    pagNextBtn: false,
    pagPreBtn: false,
  })
  useEffect(() => {
    let endOffset = state.currentPage * state.recordsPerPage;
    const currentItems = coursesData.slice((state.currentPage - 1) * state.recordsPerPage, endOffset);
    setStateList(currentItems);
    let pageCount = Math.ceil(coursesData.length / state.recordsPerPage);
    setState(prev => {
      return { ...prev, ["noOfPage"]: pageCount }
    })
  }, [])
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    lazyLoad: true,
    nextArrow: <ArrowsComp img={"/publicContent/icons/next.png"} />,
    prevArrow: <ArrowsComp img={"/publicContent/icons/back.png"} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handlerNext = () => {
    if (state.currentPage < state.noOfPage) {
      let ccPage = state.currentPage + 1;
      let endOffset = ccPage * state.recordsPerPage;
      const currentItems = coursesData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
      const currentItems = coursesData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
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
      const currentItems = coursesData.slice((ccPage - 1) * state.recordsPerPage, endOffset);
      setStateList(currentItems);
      setState(prev => {
        return { ...prev, ["currentPage"]: pageNo }
      })
    }
  }
  return (
    <div className={css.scrollBox}>
      {ttl ? (
        <h2 className={css.ttl}>
          {ttl}
          <Link className={css.linkTxt} href={link}>
            {linkTxt}
          </Link>
        </h2>
      ) : null}
      {/* <Slider {...settings} > */}
      <div className={css.courseListView}>
        {stateList?.map((item, id) => {
          return <CourseCard key={id} data={item} link={link} from={from} />;
        })}
      </div>
      {/* </Slider> */}
      {  coursesData.length >= 12 &&
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
      }
    </div>
  );
};

export default CourseCarouselComp;
