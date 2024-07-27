import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar2 from "../../components/Navbar2/Navbar2";
import Button1 from "../../utils/Buttons/Button1/Button1";
import SelectUtil from "../../utils/FormUtils/SelectUtil/SelectUtil";
import ImportUtil from "../../utils/FormUtils/InputUtil/InputUtil";
import css from "./Checkout.module.css";
import axios from "axios";
import { CMS_URL, countryJson, textConst } from "../../urlConst";
import { config } from "../../utils/config";
import toastComponent from "../../toastComponent";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Markdown from "react-markdown";
const CheckoutPage = () => {
    const navigate = useRouter();
    useEffect(() => {
        let courseData1 = JSON.parse(sessionStorage.getItem("courseData"));
        let id = courseData1.id;
        let courses = courseData1.attributes;
        let discount1 = (((courses.course_fee_premium - courses.course_fee) / courses.course_fee_premium) * 100).toFixed(2)
        setInputData((prev) => {
            return { ...prev, ["courseData"]: courses, ["price"]: courses.course_fee, ["pricePremium"]: courses.course_fee_premium, ["discount"]: discount1,["id"]:id }
        })
    }, [])

    const [inputData, setInputData] = useState({
        courseData: {},
        country: "",
        state: "",
        address: "",
        courseid: "",
        orderid: "",
        instructor: "",
        customeremail: "",
        amount: 0,
        payment_status: false,
        course_logo: "",
        course: "title",
        price: 0,
        pricePremium: 0,
        discount: 0,
        id:0

    })
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
        let body = {
            "customeremail": localStorage.getItem("email"),
            "courseid": `${inputData.id}`,
            "amount": amount,
            "payment_status": true,
            "course_logo": inputData.courseData.course_logo,
            "course_title": inputData.courseData.course_title,
            "oderid": `${orderDetails.razorpay_order_id}`,
            "country": inputData.country,
            "state": inputData.state,
            "address": inputData.address,
            "instructor": inputData.courseData.instructor
        }
        await axios.post(CMS_URL + "orders", {
            "data": body
        }).then(od => {

        }).catch(err => console.log("order err", i, err))

        await axios.post(CMS_URL + "enrollments", {
            "data": {
                "customeremail": localStorage.getItem("email"),
                "course": `${inputData.id}`,
                "enrollment_date": new Date(),
                "is_paid": "standard",
                "orderid": `${orderDetails.razorpay_order_id}`,
                "order_transaction": JSON.stringify(orderDetails),
                "payment_status": true,
                "amount": amount
            }
        }).then(res => {
            navigate.push("/user/my-courses");
        }).catch(err => {
            console.log(err)
        })
        await axios.put(CMS_URL + "courses/" + inputData.id, {
            "data": {
                enrollment_count: inputData.courseData.enrollment_count + 1
            }
        }, {
            headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
        }).then(result => {

        }).catch(err => {
            console.log(err)
        })
    }
    const handleCompleteOrder = () => {

        if (inputData.country === "" || inputData.state === "" || inputData.address === "") {
            toastComponent("warn", textConst.enterMandatoryField);
        }
        else {

            if (confirm("Are you sure you want to proceed?")) {
                axios.post(CMS_URL + "onboard/payment", {
                    amount: inputData.courseData.course_fee,
                    currency: "INR"
                })
                    .then(res => {
                        // console.log(res.data.data)
                        let paymentResData = res.data.data
                        var options = {
                            "key": config.key_secret,
                            "amount": paymentResData.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                            "currency": paymentResData.currency,
                            "name": config.name, //your business name
                            "description": config.description,
                            "image": config.logo,
                            "order_id": paymentResData.id,
                            // "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                            //     "name": localStorage.getItem("username"), //your customer's name
                            //     "email": localStorage.getItem("email") //Provide the customer's phone number for better conversion rates 
                            // },
                            handler: async (response) => {
                                try {
                                    axios.post(CMS_URL + "onboard/payment/verify", response)
                                        .then(result => {
                                            createEnrollment(response, paymentResData.amount / 100);

                                        }).catch(err => {
                                            console.log(err)
                                        })
                                } catch (err) {
                                    console.log(err)
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
                        toastComponent("error", err.message);
                    })
            }
        }



    }
    console.log("courseData1",inputData.courseData);
    return (
        <>
            {/* <Navbar2 /> */}
            <ToastContainer />
            {
                Object.keys(inputData.courseData).length > 0 ?
                    <div className={css.outerDiv}>
                        <div className={css.bdy}>
                            <div className={css.leftDiv}>
                                <h2 className={css.ttl}>Checkout</h2>
                                <div className={css.cbdy}>
                                    <div className={css.bx}>
                                        <h2 className={css.cbdyTtl}>Billing Address</h2>
                                        <div className={css.formBox}>
                                            <div style={{ width: "50%" }}>
                                                <SelectUtil
                                                    name="country"
                                                    label="Country"
                                                    txt="Required"
                                                    options={countryJson}
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
                                                    extraCss={{ width: "100%" }}
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
                                            <div className={css.cres}>
                                                <div className={css.crsebx1}>
                                                    <img src={inputData.courseData.course_logo} className={css.img} />
                                                    <div className={css.crsTtl}>
                                                        <Markdown>{inputData.courseData.course_title }</Markdown>
                                                    </div>
                                                </div>
                                                <div className={css.crsPrc}>
                                                    {new Intl.NumberFormat("en-IN", {
                                                        style: "currency",
                                                        currency: "INR",
                                                    }).format(inputData.courseData.course_fee)}
                                                </div>
                                            </div>
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
                                            }).format(inputData.pricePremium)}
                                        </span>
                                    </div>
                                    <div className={css.p1}>
                                        <span>Discount:</span>
                                        <span>
                                            {new Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            }).format(inputData.pricePremium - inputData.price)}
                                        </span>
                                    </div>
                                    <hr className={css.hr} />
                                    <div className={css.p2}>
                                        <span>Total:</span>
                                        <span>
                                            {new Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            }).format(inputData.price)}
                                        </span>
                                    </div>
                                    <div className={css.note}>
                                        By completing your purchase you agree to these
                                        <Link href="/" className={css.noteLink}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""
            }
        </>
    );
};

export default CheckoutPage;
