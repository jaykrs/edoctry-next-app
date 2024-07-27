"use client"
import { useEffect, useState } from "react";
import css from "./Cart.module.css";
import Layout1 from "../components/Layout1/Layout1";
import Button1 from "../utils/Buttons/Button1/Button1";
import CheckoutCourseCard from "../components/CheckoutCourseCard/CheckoutCourseCard";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import store from "../store";

const Cart = () => {
  const navigate = useRouter();
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  //const cart = useSelector((state) => state.cart.cart);
  let dispatch = useDispatch();
  let [cart, setCart] = useState("");
  let [price, setPrice] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [pricePremium, setPricePremium] = useState(0);
  
  console.log("cart",cart);
  useEffect(() => {
    loadCardtData()

  }, [])
  // let price = cart.reducer((a,b)=> a + b.attributes.course_fee,0)
  // console.log('price', price)
  let loadCardtData = async () => {
    // let carts = await useSelector((state) => state.cart.cart);
    //   setCart(carts);
    if (cart.length > 0) {

      price = 0;
      for (let i = 0; i < cart.length; i++) {
        price += cart[i].attributes.course_fee;
      }
      pricePremium = 0;
      for (let i = 0; i < cart.length; i++) {
        pricePremium += cart[i].attributes.course_fee_premium;
      }
      discount = (((pricePremium - price) / pricePremium) * 100).toFixed(2);
      // console.log('cart Price', price, pricePremium, discount)
    } else {
      price = 0;
      pricePremium = 0;
      discount = 0;
    }
  }
  const cartData = [
    // {
    //   id: 1,
    //   img: cardImg,
    //   link: "/course/python",
    //   ttl: "Learn Python: The complete python programming course",
    //   authors: ["Koushil", "Nani"],
    //   ratings: { totalratings: 4.3, count: 3445 },
    //   duration: 10000,
    //   lectures: 146,
    //   level: "All",
    //   price: 649,
    //   discount: 3399,
    //   couponApplied: "koushil mankali",
    //   bestSeller: true,
    // },
  ];

  const whitlistedCourses = [
    {
      id: 1,
      img: '/publicContent/images/card.jpg',
      link: "/course/python",
      ttl: "Learn Python: The complete python programming course",
      authors: ["Koushil", "Nani"],
      ratings: { totalratings: 4.3, count: 3445 },
      duration: 10000,
      lectures: 146,
      level: "All",
      price: 649,
      discount: 3399,
      couponApplied: "koushil mankali",
      bestSeller: true,
    },
    {
      id: 2,
      img: "/publicContent/images/card.jpg",
      link: "/course/python",
      ttl: "Learn Python: The complete python programming course",
      authors: ["Koushil", "Nani"],
      ratings: { totalratings: 4.3, count: 3445 },
      duration: 10000,
      lectures: 146,
      level: "All",
      price: 649,
      discount: 3399,
      couponApplied: "koushil mankali",
      bestSeller: true,
    },
  ];

  let clearCouponHandler = () => {
    setAppliedCoupon("");
  };

  let setCouponHandler = (e) => {
    setCoupon(e.target.value);
  };

  let submitCoupon = () => {
    setAppliedCoupon(coupon);
    console.log(coupon, "coupon");
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
        <div className={css.outerDiv}>
          <div className={css.innerDiv}>
            <div className={css.ttl}>Shopping Cart</div>
            {cart.length > 0 ?
              <div className={css.boxs}>
                <div className={css.box1}>
                  <div className={css.cnt}>{cart.length} Course in Cart</div>
                  <div className={css.courses}>
                    {cart?.map((item, index) => {
                      return <CheckoutCourseCard data={item} key={index} index={index} />;
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
