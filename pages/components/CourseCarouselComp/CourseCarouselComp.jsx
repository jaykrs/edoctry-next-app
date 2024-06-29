import React from "react";
import Link from "next/link";
import Slider from "react-slick";
import CourseCard from "../CourseCard/CourseCard";

import ArrowsComp from "../ArrowComp/ArrowsComp";

import css from "./CourseCarouselComp.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CourseCarouselComp = (props) => {
  const { ttl, link = null, linkTxt = "", coursesData } = props;
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

  //console.log('courses data',coursesData)
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
      <Slider {...settings} >
        {coursesData?.map((item, id) => {
          return <CourseCard key={id} data={item} link={link} />;
        })}
      </Slider>
    </div>
  );
};

export default CourseCarouselComp;
