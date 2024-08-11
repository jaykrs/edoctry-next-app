import { useState, useEffect } from "react";
import css from "./CommentViewUtil.module.css";
const CommentViewUtil = ({ data = {} }) => {
  const {
    id = "00",
    img = "",
    name = "",
    rating = 0,
    date = new Date(),
    comment = "",
    like = "",
  } = data;

  const [liked, setLiked] = useState(like || "");

  const likeHandler = (value) => {
    setLiked((prev) => (prev === value ? "" : value));
  };

  useEffect(() => {
    // Example: If you need to access `navigator` or `window`, do it here
  }, []);

  const formattedDate = date instanceof Date ? date.toLocaleDateString() : date;

  return (
    <div className={css.outerDiv}>
      <div className={css.leftBar}>
        <img src={img} alt="profile pic" className={css.img} />
      </div>
      <div className={css.rightBar}>
        <div className={css.ttl}>{name}</div>
        <div className={css.ratingBox}>
          <div className={css.rating}>
            {Array.from(new Array(rating), (_, i) => (
              <img
                src={"/publicContent/icons/star.png"}
                key={`star-${i}`}
                alt="star"
                className={css.starIcon}
              />
            ))}
          </div>
          <div className={css.time}>{formattedDate}</div>
        </div>
        <div className={css.cnt}>{comment}</div>
        <div className={css.fdbkBox}>
          <div className={css.box1}>Was this review helpful?</div>
          <div className={css.box2}>
            <img
              onClick={() => likeHandler("liked")}
              src={liked === "liked" ? "/publicContent/icons/like-hand-symbol-in-a-circle.png" : "/publicContent/icons/like-hand-symbol-in-a-circle-white.png"}
              alt="thumbs down"
              className={css.fdbkIcon}
            />
            <img
              onClick={() => likeHandler("disliked")}
              src={liked === "disliked" ? "/publicContent/icons/like-hand-symbol-in-a-circle.png" : "/publicContent/icons/like-hand-symbol-in-a-circle-white.png"}
              alt="thumbs up"
              className={css.fdbkIconR}
            />
            <div className={css.fdbkRptTxt}>Report</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentViewUtil;
