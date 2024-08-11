import React from "react";
import TagUtil from "../../utils/Tags/TAG1/TAG1";
import Button2 from "../../utils/Buttons/Button2/Button2";
import css from "./CheckoutCourseCard.module.css";
import Cookie from "js-cookie";

const CheckoutCourseCard = ({ data = {}, extraCss = {}, index, setRefresh = () => { } }) => {
  const handleRemoveFromCart = (id) => {
    if (window.confirm("Are you sure you want to remove?")) {
      let cookieData = Cookie.get("cart");
      cookieData = cookieData ? JSON.parse(cookieData) : [];
      const itemIndex = cookieData.indexOf(id);
      if (itemIndex !== -1) {
        cookieData.splice(itemIndex, 1);
      }
      Cookie.set("cart", JSON.stringify(cookieData), { expires: 30 });
      setRefresh(true);
    }
  };

  const bestSeller = false;
  const level = "All";

  return (
    <>
      {
        Object.keys(data).length > 0 ?
          <div className={css.outerDiv} style={extraCss}>
            <div className={css.box1}>
              <div className={css.imgBox}>
                <img src={data.attributes.course_logo} alt="course thumbnail" className={css.img} />
              </div>
              <div className={css.det}>
                <div className={css.ttl}>{data.attributes.course_title}</div>
                <div className={css.ratings}>
                  {bestSeller && <TagUtil />}
                </div>
                <div className={css.crsDet}>
                  <span className={css.crsDet}>{data.attributes.duration} total hours</span>
                  <span className={css.crsDet}>{level} Levels</span>
                </div>
              </div>
            </div>
            <div className={css.box23}>
              <div className={css.box2}>
                {/* Optional Save for Later Button */}
              </div>
              <div className={css.box3}>
                <div className={css.priceDet}>
                  <div className={css.price}>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(data.attributes.course_fee)}
                  </div>
                  <img src="/icons/label.png" alt="price tag" className={css.icon} />
                </div>
                <div className={css.dis}>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(data.attributes.course_fee_premium)}
                </div>
              </div>
            </div>
            <Button2
              txt="Remove"
              hovBck=""
              onClick={() => handleRemoveFromCart(data.id)}
              extraCss={{
                fontWeight: "400",
                fontSize: "0.9rem",
                color: "var(--purple)",
                margin: "0.2rem",
                padding: "0",
              }}
            />
          </div>
          : ""
      }
    </>
  );
};

export default CheckoutCourseCard;
