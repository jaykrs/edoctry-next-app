import React from "react";
import TagUtil from "../../utils/Tags/TAG1/TAG1";
import Button2 from "../../utils/Buttons/Button2/Button2";
import css from "./CheckoutCourseCard.module.css";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../reducers/cartSlicer";
import Cookie from "js-cookie";
const CheckoutCourseCard = (props) => {
  const { data, extraCss, index,setRefresh=(()=>{}) } = props;

  let dispatch = useDispatch();
  const handleRemoveFromCart = (id) => {
    if (confirm("Are you sure you want to remove?")) {
      console.log("remove item from cart",id);
      let CookieData = Cookie.get("cart");
      CookieData = CookieData ? JSON.parse(CookieData) : [];
      let index = CookieData.indexOf(id);
      if (index !== -1) {
        CookieData.splice(index, 1);
      }
      Cookie.set("cart", JSON.stringify(CookieData), { expires: 30 });
      setRefresh(true);
    }
  }
  let bestSeller = false;
  let level = "All";
  return (
    <div className={css.outerDiv} style={extraCss}>
      {/* {  data.length > 0 ?
        <> */}
      <div className={css.box1}>
        <div className={css.imgBox}>
          <img src={data.attributes.course_logo} alt="course thumbnail" className={css.img} />
        </div>
        <div className={css.det}>
          <div className={css.ttl}>{data.attributes.course_title}</div>
          {/* <div className={css.authors}>
            By {authors?.join(", ")?.toString()}
          </div> */}
          <div className={css.ratings}>
            {bestSeller ? <TagUtil /> : ""}
            {/* <div className={css.rats}>
              <span className={css.num}>{ratings.totalratings}</span>
              <span className={css.count}>({ratings.count} ratings)</span>
            </div> */}
          </div>
          <div className={css.crsDet}>
            <span className={css.crsDet}>{data.attributes.duration} total hours</span>
            {/* <span className={[css.crsDet, css.mid].join(" ")}>
              {lectures} lectures
            </span> */}
            <span className={css.crsDet}>{level} Levels</span>
          </div>
        </div>
      </div>
      <div className={css.box23}>
        <div
          className={css.box2}
          onClickCapture={(e) => {
            e.preventDefault();
          }}
        >

          {/* <Button2
            txt="Save for Later"
            hovBck=""
            extraCss={{
              fontWeight: "400",
              fontSize: "0.9rem",
              color: "var(--purple)",
              margin: "0.2rem",
              padding: "0",
            }}
          /> */}
        </div>
        <div className={css.box3}>
          <div className={css.priceDet}>
            <div className={css.price}>
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(data.attributes.course_fee)}
            </div>
            <img src={"/publicContent/icons/label.png"} alt="price tag" className={css.icon} />
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
      {/* </>
        : <div> keep shoping </div>
      } */}
    </div>

  );
};

export default CheckoutCourseCard;
