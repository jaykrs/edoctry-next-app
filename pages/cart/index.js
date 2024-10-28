"use client"
import { useEffect, useState } from "react";
import css from "./Cart.module.css";
import Layout1 from "../components/Layout1/Layout1";
import Button1 from "../utils/Buttons/Button1/Button1";
import CheckoutCourseCard from "../components/CheckoutCourseCard/CheckoutCourseCard";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import axios from "axios";
import ConstData from "../../urlConst";
import PageLoadingComponents from "../utils/PageLoadingComponent/PageLoadingComponents";
import toastComponent from "../toastComponent";
import { ToastContainer } from "react-toastify";
const Cart = () => {
  const navigate = useRouter();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  let [cart, setCart] = useState("");
  let [price, setPrice] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [pricePremium, setPricePremium] = useState(0);
  let CookieData = Cookie.get("cart");
  CookieData = CookieData ? JSON.parse(CookieData) : [];
  const [loading,setLoading] = useState(false);
  const [refresh,setRefresh] = useState(false);
  useEffect(() => {
    setLoading(true);
   axios.get(ConstData.CMS_URL + "courses")
   .then(res=>{
     let filteredCourses = res.data.data.filter(course => CookieData.includes(course.id));
     setCart(filteredCourses);
     setLoading(false);
   }).catch(err=>{
    toastComponent("error",err.message);
    setTimeout(()=>{
      setLoading(false);
    },5000)
  })
  }, [])
  useEffect(() => {
    setLoading(true);
   axios.get(ConstData.CMS_URL + "courses")
   .then(res=>{
     let filteredCourses = res.data.data.filter(course => CookieData.includes(course.id));
     setCart(filteredCourses);
     setLoading(false);
   }).catch(err=>{
    toastComponent("error",err.message);
    setTimeout(()=>{
      setLoading(false);
    },5000)
  })
  }, [refresh])
  useEffect(()=>{
      loadCardtData()
  },[cart])
  let loadCardtData = async () => {
    if (cart.length > 0) {
     let iPrice = 0,iPricePremium=0;
      for (let i = 0; i < cart.length; i++) {
        
        iPrice += cart[i].attributes.course_fee;
        iPricePremium += cart[i].attributes.course_fee_premium;
      }
      setPrice(iPrice);
      setPricePremium(iPricePremium);
      let discounts = (((iPricePremium - iPrice) / iPricePremium) * 100).toFixed(2);
      setDiscount(discounts);
    } 
  }

  let clearCouponHandler = () => {
    setAppliedCoupon("");
  };

  let setCouponHandler = (e) => {
    setCoupon(e.target.value);
  };

  let submitCoupon = () => {
    setAppliedCoupon(coupon);
  };

  const handleCheckout = () => {
    if (null != localStorage.getItem("jwt") && localStorage.getItem("loginStatus")) {
      navigate.push("/user/checkouts")
    } else {
      localStorage.setItem("orderPage", "backToOrderPage");
      navigate.push("/user/login")
    }
  }
  return (
    <>
      <Layout1>
        <ToastContainer />
        <PageLoadingComponents  loading={loading} setLoading={setLoading} />
        <div className={css.outerDiv}>
          <div className={css.innerDiv}>
            <div className={css.ttl}>Shopping Cart</div>
            {cart.length > 0 ?
              <div className={css.boxs}>
                <div className={css.box1}>
                  <div className={css.cnt}>{cart.length} Course in Cart</div>
                  <div className={css.courses}>
                    {cart?.map((item, index) => {
                      return <CheckoutCourseCard data={item} key={index} index={index} setRefresh={setRefresh} />;
                    })}
                  </div>
                  {/* <div>keep shopping div</div> */}
                </div>
                <div className={css.box2}>
                  <div className={css.totalTxt}>Total:</div>
                  <div className={css.currrency}>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(price)}
                  </div>
                  <div className={css.totalDiscount}>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(pricePremium)}
                  </div>
                  <div className={css.ttlDisPer}>{discount}%</div>
                  <Button1
                    txt="proceed to Order"
                    bck="var(--purple)"
                    hovBck="var(--purple-dark)"
                    onClick={handleCheckout}
                    extraCss={{
                      width: "100%",
                      margin: "1rem 0",
                      padding: "1rem",
                      border: "none",
                      color: "var(--white)",
                    }}
                  />
                  {/* <div className={css.ctxt}>Coupon code</div>
                  {appliedCoupon ? (
                    <div className={css.cpnBox}>
                      <img
                        src={crossIcon}
                        alt="close icon"
                        className={css.icon}
                        onClick={clearCouponHandler}
                      />
                      <div className={css.cpnCode}>
                        <b>{appliedCoupon}</b> is applied
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <InputUtil
                    type="text"
                    btnTxt="Apply"
                    onChange={setCouponHandler}
                    btnClick={submitCoupon}
                  /> */}
                </div>
              </div>
              :
              <div className={css.emptyBdy}>
                <div className={css.cartItemsLen}>
                  <span>{cart.length}</span>
                  <span>Courses in Cart</span>
                </div>
                <div className={css.cartBox}>
                  <img
                    src={"/publicContent/images/empty-shopping-cart.jpg"}
                    alt="empty cart"
                    className={css.emptyCartImg}
                  />
                  <div className={css.emptyCartTxt}>
                    Your cart is empty. Keep shopping to find a course!
                  </div>
                  <Button1
                    onClick={() => navigate.push("/")}
                    txt="Keep Shopping"
                    color="var(--white)"
                    hovBck="var(--purple-dark)"
                    extraCss={{
                      backgroundColor: "var(--purple)",
                      width: "150px",
                      height: "50px",
                      border: "none",

                    }}

                  />
                </div>
                {/* <div className={css.whitlistedCourses}>
                  <div className={css.whTtl}>Recently wishlisted</div>
                  {whitlistedCourses?.map((item) => {
                    return (
                      <CheckoutCourseCard
                        data={item}
                        key={item.id}
                        extraCss={{
                          margin: "1rem 0",
                          border: "none",
                          borderTop: "1px solid var(--gray86)",
                          justifyContent: "space-between",
                        }}
                      />
                    );
                  })}
                </div> */}
              </div>
            }
          </div>
        </div>
      </Layout1>
    </>
  );
};

export default Cart;

export async function getServerSideProps() {
  // Fetch server-side data here
  const serverData = 'This is server-side data';

  return {
    props: {
      serverData,
    },
  };
}
