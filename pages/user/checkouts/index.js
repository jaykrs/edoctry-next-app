import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button1 from "../../utils/Buttons/Button1/Button1";
import SelectUtil from "../../utils/FormUtils/SelectUtil/SelectUtil";
import ImportUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import { useSelector } from "react-redux";
import css from "./Checkout.module.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import toastComponent from "../../toastComponent";
import Cookie from "js-cookie";
import ConstData from "../../../urlConst";
import PageLoadingComponents from "../../utils/PageLoadingComponent/PageLoadingComponents";

const Checkout = () => {
  const randomString = Date.now() * Math.floor(Math.random() * 800);
  const navigate = useRouter();
  const [cartData, setCartData] = useState([]);
  const [pricePremium, setPricePremium] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  //const cartData = useSelector((state) => state.cart.cart);
  let CookieData = Cookie.get("cart");
  const [inputData, setInputData] = useState({
    country: "",
    state: "",
    address: "",
    courseid: "",
    orderid: randomString,
    instructor: "",
    customeremail: "",
    amount: 0,
    payment_status: false,
    course_logo: "",
    course: "title",

  })

  useEffect(() => {
    setLoading(true);
    axios.get(ConstData.CMS_URL + "courses")
      .then(res => {
        let filteredCourses = res.data.data.filter(course => CookieData.includes(course.id));
        setCartData(filteredCourses);
        setLoading(false);
      }).catch(err => {
        toastComponent("error", err.message);
        setTimeout(() => {
          setLoading(false);
        }, 5000)
      })
  }, [])

  useEffect(() => {
    loadData()
  }, [cartData])

  let loadData = () => {
    let iPrice = 0, iPricePremium = 0, iDiscount = 0, courseid, course_logo, course_title, instructor;
    if (cartData.length > 0) {
      for (let i = 0; i < cartData.length; i++) {
        iPrice += cartData[i].attributes.course_fee;
        iPricePremium += cartData[i].attributes.course_fee_premium;
      }
      iDiscount = (((iPricePremium - iPrice) / iPricePremium) * 100).toFixed(2);
      setPrice(iPrice);
      setPricePremium(iPricePremium);
      setDiscount(iDiscount);
    }
  }



  const [state, setState] = useState({
    country: "India",
    state: "Please select...",
  });

  const selectHandler = (value) => {
    console.log("value", value);


  };
  let changeHanlder = (e) => {
    setInputData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const createEnrollment = async (orderDetails, amount) => {
    let courseIdList = [];
    for (let i = 0; i < cartData.length; i++) {
      courseIdList.push(cartData[i].id)
      let body = {
        "customeremail": localStorage.getItem("email"),
        "courseid": `${cartData[i].id}`,
        "amount": cartData[i].attributes.course_fee,
        "payment_status": true,
        "course_logo": cartData[i].attributes.course_logo,
        "course_title": cartData[i].attributes.course_title,
        "oderid": `${orderDetails.razorpay_order_id}`,
        "country": inputData.country,
        "state": inputData.state,
        "address": inputData.address,
        "instructor": cartData[i].attributes.instructor
      }
      await axios.post(ConstData.CMS_URL + "orders", {
        "data": body
      },{
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      }).then(async od => {

        await axios.put(ConstData.CMS_URL + "courses/" + cartData[i].id, {
          "data": { "enrollment_count": cartData[i].attributes.enrollment_count + 1 }
        }, {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        }).then(result => { })
          .catch(err => console.log(err))
        let CookieData = Cookie.get("cart");
        CookieData = CookieData ? JSON.parse(CookieData) : [];
        let index = CookieData.indexOf(cartData[i].id);
        if (index !== -1) {
          CookieData.splice(index, 1);
        }
        Cookie.set("cart", JSON.stringify(CookieData), { expires: 30 });
        //setRefresh(true);
        // dispatch(removeItemFromCart(i));
      }).catch(err => {
        toastComponent("error",err.message);
      })
    }
    await axios.post(ConstData.CMS_URL + "enrollments", {
      "data": {
        "customeremail": localStorage.getItem("email"),
        "course": `${courseIdList}`,
        "enrollment_date": new Date(),
        "is_paid": "standard",
        "orderid": `${orderDetails.razorpay_order_id}`,
        order_transaction: JSON.stringify(orderDetails),
        "payment_status": true,
        "amount": amount
      }
    }).then(res => {
      navigate.push("/user/my-courses");
    }).catch(err => {
      console.log(err)
    })
  }
  const handleCompleteOrder = () => {

    if (confirm("are you sure , you want to proceed?")) {
      if (inputData.country === "" || inputData.state === "" || inputData.address === "") {
        toastComponent("error", ConstData.textConst.enterMandatoryField);
        return;
      } else {

        axios.post(ConstData.CMS_URL + "onboard/payment", {
          amount: price,
          currency: "INR"
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        })
          .then(res => {
            let paymentResData = res.data.data
            var options = {
              "key": ConstData.payKeyConfig.key_secret,
              "amount": paymentResData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
              "currency": paymentResData.currency,
              "name": ConstData.payKeyConfig.name, //your business name
              "description": ConstData.payKeyConfig.description,
              "image": ConstData.payKeyConfig.logo,
              "order_id": paymentResData.id,
              "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                // "name": localStorage.getItem("username"), //your customer's name
                "email": localStorage.getItem("email"),
                // "contact": "1234567890" //Provide the customer's phone number for better conversion rates 
              },
              handler: async (response) => {
                try {
                  axios.post(ConstData.CMS_URL + "onboard/payment/verify", response,
                    {
                      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
                    })
                    .then(result => {
                      createEnrollment(response, paymentResData.amount / 100);

                    }).catch(err => {
                      toastComponent("error",err.message);
                    })
                } catch (err) {
                  toastComponent("error",err.message);
                }
              },
              "notes": {
                "address": "Razorpay Corporate Office"
              },
              "theme": {
                "color": "#3399cc"
              }
            };
            const rzp1 = window.Razorpay(options);
            rzp1.open();
          }).catch(err => {
            toastComponent("error",err.message);
          })
      }
    }

  }

  return (
    <>
      {/* <Navbar2 /> */}
      <ToastContainer />
      <PageLoadingComponents loading={loading} setLoading={setLoading} />
      <div className={css.outerDiv}>
        <div className={css.bdy}>
          <div className={css.leftDiv}>
            <h2 className={css.ttl}>Checkout</h2>
            <div className={css.cbdy}>
              <div className={css.bx}>
                <h2 className={css.cbdyTtl}>Billing Address</h2>
                <div className={css.formBox}>
                  <div className="w-50">
                    <SelectUtil
                      name="country"
                      label="Country"
                      txt="Required"
                      options={ConstData.countryJson}
                      value={inputData.country}
                      setValue={(value) => {
                        setInputData((prev) => {
                          return { ...prev, ["country"]: value }
                        })
                      }}
                      img={"/publicContent/icons/globe.png"}
                    />
                  </div>
                  {/* <SelectUtil
                    name="state"
                    label="State / Union Territory"
                    txt="Required"
                    options={stateOptions}
                    value={inputData.state}
                    setValue={(value) => {
                      setInputData((prev) => {
                        return { ...prev, ["state"]: value }
                      })
                    }}
                    img={"/publicContent/icons/globe.png"}
                  /> */}

                  <div style={{ width: "50%", marginTop: "-4px" }}>
                    <ImportUtil
                      label="State"
                      placeholderTxt="state name"
                      name="state"
                      state={inputData.state}
                      onChange={changeHanlder}
                      icon={"/publicContent/icons/globe.png"}
                      extraCss={{ width: "50%",height:"50%" }}
                    />
                  </div>

                </div>

                <ImportUtil
                  label="Address"
                  placeholderTxt="Enter your address"
                  name="address"
                  state={inputData.address}
                  onChange={changeHanlder}
                />
                <div className={css.note}>
                  Edoctry is required by law to collect applicable transaction
                  taxes for purchases made in certain tax jurisdictions.
                </div>
              </div>
              <div className={css.bx}>
                <h2 className={css.cbdyTtl}>
                  <span>Payment Method</span>
                  <span>
                    Secured connection
                    <img src={"/publicContent/icons/lock2.png"} alt="lock icon" className={css.icon} />
                  </span>
                </h2>
              </div>
              <div className={css.bx}>
                <h2 className={css.cbdyTtl}>Order</h2>
                <div className={css.crsBox}>
                  {cartData?.map((item, index) => {
                    return (
                      <div className={css.cres} key={index}>
                        <div className={css.crsebx1}>
                          <img src={item.attributes.course_logo} className={css.img} />
                          <div className={css.crsTtl}>
                            <div dangerouslySetInnerHTML={{ __html: item.attributes.course_title }}></div>
                          </div>
                        </div>
                        <div className={css.crsPrc}>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item.attributes.course_fee)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={css.rightDiv}>
            <div className={css.innerRightDiv}>
              <div className={css.cbdyTtl}>Summary</div>
              <div className={css.p1}>
                <span>Original price:</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(pricePremium)}
                </span>
              </div>
              <div className={css.p1}>
                <span>Discount:</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(pricePremium - price)}
                </span>
              </div>
              <hr className={css.hr} />
              <div className={css.p2}>
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(price)}
                </span>
              </div>
              <div className={css.note}>
                By completing your purchase you agree to these
                <Link href="/blog/termsOfUseAndPrivacy" className={css.noteLink}>
                  Terms of Service
                </Link>
                .
              </div>
              <Button1
                txt="Complete Order"
                bck="var(--purple)"
                hovBck="var(--purple-dark)"
                color="var(--white)"
                onClick={handleCompleteOrder}
                extraCss={{
                  fontSize: "1rem",
                  border: "none",
                  borderRadius: "5px",
                  width: "100%",
                  margin: "0.5rem 0",
                  padding: "1rem",
                }}
              />
              {/* <div className={[css.note, css.mc].join(" ")}>
                30-Day Money-Back Guarantee
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
