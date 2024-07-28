import { useState } from "react";
import css from "./CourseFloatingBuyCard.module.css";
import Button1 from "../../utils/Buttons/Button1/Button1";
import InputUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import axios from "axios";
import { CMS_URL, textConst } from "../../urlConst";
// import { config } from "../../../utils/config";
import { CiPlay1 } from "react-icons/ci";
import toastComponent from "../../toastComponent";
import { ToastContainer } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartSlicer";
import Cookie from "js-cookie";
const CourseFloatingBuyCard = (props) => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [state, setState] = useState('https://ik.imagekit.io/jaykrs/file_example_MP4_640_3MG_men2_9EcU.mp4');
  const [btnStyle, setBtnStyle] = useState(false);
  let data = props.data.attributes;
  let discount = ((data.course_fee_premium - data.course_fee) / data.course_fee_premium) * 100;
  const { scrolled, setCoupon, applyCoupon, setApplyCoupon, setShareModal } = props;

  const styleGuide = {
    display: "none",
  };
  const outStyleGuide = {
    position: "fixed",
    top: 0,
    right: "12%",
  };
  const handleAddToCart = () => {
    // console.log('jwt' + localStorage.getItem("jwt"), "loginStatus" + localStorage.getItem("loginStatus"))

    //alert("Added to cart");
    let cartData = Cookie.get("cart");
    cartData = cartData ? JSON.parse(cartData) : [];
    cartData.push(props.data.id);
    Cookie.set("cart", JSON.stringify(cartData), { expires: 30 });
    toastComponent("warn", textConst.addToCart);
    setTimeout(() => {
      // dispatch(addToCart({
      //   id: props.data.id,
      //   attributes: data
      // }))
      navigate.push("/cart");
    }, 2000);
  }


  const handleBuy = () => {
    if (null != localStorage.getItem("jwt") && localStorage.getItem("loginStatus")) {
      sessionStorage.setItem("courseData", JSON.stringify(props.data))
      navigate.push("/user/checkout")
    } else {
      localStorage.setItem("buyItem", "backToCourseDetails")
      navigate.push("/user/login");
    }
  }
  const handleVideoPlayer = () => {
    setBtnStyle(true);
    setState(props.data.attributes.introductory_video);
  }
 
  return (
    <>
      <ToastContainer />
      <div className={css.outModelDiv} style={{ display: btnStyle ? "flex" : "none" }}>
        {/* <div className="innerModelDiv"><ReactPlayer url='https://ik.imagekit.io/jaykrs/file_example_MP4_640_3MG_men2_9EcU.mp4' /></div> */}
        <div className={css.innerModelDiv}>
          <button onClick={() => setBtnStyle(false)}>X</button>
          <div>
            <video
              src={state}
              // poster='https://ik.imagekit.io/ikmedia/example_video.mp4/ik-thumbnail.jpg?tr=w-1200,h-680'
              width='100%'
              height='100%'
              controls
              autoPlay={btnStyle}
              muted={btnStyle}
              playsInline
              loop
            />
          </div>
        </div>
      </div>
      <div className={css.outerDiv} style={scrolled ? outStyleGuide : {}}>
        <div className={css.innRightDiv} style={scrolled ? styleGuide : {}}>
          <div className={css.imgBox}>
            <img src={props.data.attributes.course_logo} alt="course thumbnail" className={css.crsThumb} />
          </div>
          <div className={css.maskDiv}></div>
          <div className={css.imgMask}>
            {/* <div className={css.imgODiv}>
              
            </div> */}
            <p onClick={handleVideoPlayer}><CiPlay1 size={50} color="#fff" /></p>
            <div className={css.maskTxt}>Preview</div>
          </div>
        </div>
        <div className={css.crsePmtDt}>
          <div className={css.prcDet}>
            <div className={css.prc}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(props.data.attributes.course_fee.toFixed(2))}
            </div>
            <div className={css.dscPrc}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(props.data.attributes.course_fee_premium.toFixed(2))}
            </div>
            <div className={css.desc}>{discount.toFixed(2)}% off</div>
          </div>
          <div className={css.tmLeft}>
            <img src={"/publicContent/icons/alarm.png"} alt="clock icon" className={css.cicon} />
            <span>
              <b>{2} hours</b> left at this price!
            </span>
          </div>
          <div className={css.btns}>
            <div className={css.btnsSec1}>
              <Button1
                txt="Add To Cart"
                color="#fff"
                bck="#a435f0"
                hovBck="#8710d8"
                onClick={handleAddToCart}
                extraCss={{
                  width: "83%",
                  padding: "0.7rem",
                  margin: "0",
                  border: "1px solid var(--purple)",
                }}
              />
              <Button1
                txt={null}
                img={"/publicContent/icons/heart.png"}
                extraCss={{
                  width: "15%",
                  margin: "0",
                  padding: "0.7rem",
                }}
              />
            </div>
            <div className={css.btnsSec2}>
              <Button1
                txt="Buy now"
                onClick={handleBuy}
                extraCss={{
                  width: "100%",
                  padding: "0.7rem",
                  margin: "0.5rem 0",
                }}
              />
            </div>
          </div>
          <div className={css.crsePmtDtTxt}>30-Day Money-Back Guarantee</div>
          <div className={css.crsePmtDtTxt}>Full Lifetime Access</div>
          {/* <div className={css.crsePmtDtExSec}>
            <div
              className={css.innCrsePmtDtExSec}
              onClick={() => setShareModal((prev) => !prev)}
            >
              Share
            </div>
            <div className={css.innCrsePmtDtExSec}>Gift this course</div>
            <div
              className={css.innCrsePmtDtExSec}
              onClick={() => setApplyCoupon((prev) => !prev)}
            >
              Apply the Coupon
            </div>
          </div> */}
          <div className={css.inptBox}>
            {applyCoupon ? (
              <InputUtil
                btnTxt="Apply"
                onChange={(e) => setCoupon(e.target.value)}
                btnClick={() => console.log(coupon, "coupon")}
                extraCss={{ height: "42px" }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <hr />
        <div className={css.footerSec}>
          <div className={css.fooTtl}>Training 5 or more people?</div>
          <div className={css.fooDesc}>
            Get your team access to 1,000+ top Edoctry courses anytime, anywhere.
          </div>
          <Button1
            txt="Try Edoctry Business"
            extraCss={{ width: "100%", padding: "0.7rem", margin: 0 }}
            onClick={() => { navigate.push("/bussiness") }}
          />
        </div>

      </div>

    </>
  );
};

export default CourseFloatingBuyCard;
