"use client"
import Link from "next/link";
import css from "./HeroBanner.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ConstData from "../../../urlConst";
const HeroBanner = (props) => {
  const [cState, setCState] = useState(1);
  const [bannData, setBannData] = useState("");
  useEffect(() => {
    handleBanner();
  }, []);

  const handleBanner = async () => {
    //  if (bannerStoreData.length === 0) {
    await axios.get(ConstData.CMS_URL + "templates?filters[name][$eq]=heroBanner")
      .then(res => {
        setBannData(res.data.data[0].attributes.json);
      }).catch(err => {
        console.log(err);
      })
  }
  

  return (
    <div>
      {
        bannData.length > 0 && (
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" data-bs-interval="20000">
                <a href={bannData[cState]?.link} className={css.outerDiv}>
                  <img src={bannData[0]?.img} className="d-block w-100" alt="image-1" />
                  <div className={css.box}>
                    <div className={css.ttl}>{bannData[0]?.boxData?.ttl}</div>
                    <div className={css.desc}>{bannData[0]?.boxData?.desc}</div>
                  </div>
                </a>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <a href={bannData[cState]?.link} className={css.outerDiv}>
                  <img src={bannData[1]?.img} className="d-block w-100" alt="image-1" />
                  <div className={css.box}>
                    <div className={css.ttl}>{bannData[1]?.boxData?.ttl}</div>
                    <div className={css.desc}>{bannData[1]?.boxData?.desc}</div>
                  </div>
                </a>
              </div>
              <div className="carousel-item" data-bs-interval="3000">
                <a href={bannData[cState]?.link} className={css.outerDiv}>
                  <img src={bannData[2]?.img} className="d-block w-100" alt="image-1" />
                  <div className={css.box}>
                    <div className={css.ttl}>{bannData[2]?.boxData?.ttl}</div>
                    <div className={css.desc}>{bannData[2]?.boxData?.desc}</div>
                  </div>
                </a>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )
      }

      {}
    </div>
  );
};

export default HeroBanner;
