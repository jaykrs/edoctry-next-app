import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Button1 from "../../../utils/Buttons/Button1/Button1";
import css from "./CourseRatingsCard.module.css";

const CourseRatingsCard = ({ ttl = "", closeModal = () => {} }) => {
  const [isClient, setIsClient] = useState(false);
  const [selectedRatingNumber, setSelectedRatingNumber] = useState(0);
  const [hoverStarNum, setHoverStarNum] = useState(0);
  const [selectedRating, setSelectedRating] = useState("Select Rating");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Ensure component is only rendered on client side

  const ratings = [
    "Select Rating",
    "One Star",
    "Two Star",
    "Three Star",
    "Four Star",
    "Five Star",
  ];

  const mouseOverHandler = (currentStarNum) => {
    if (selectedRatingNumber <= 0) {
      setSelectedRating(ratings[currentStarNum]);
    }
    setHoverStarNum(currentStarNum);
  };

  const mouseLeaveHandler = () => {
    if (selectedRatingNumber <= 0) {
      setSelectedRating(ratings[0]);
    }
    setHoverStarNum(0);
  };

  const clickHandler = (currentStarNum) => {
    setSelectedRatingNumber(currentStarNum);
    setSelectedRating(ratings[currentStarNum]);
  };

  const submitHandler = () => {
    console.log("selectedRatingNumber", ratings[selectedRatingNumber]);
    closeModal();
  };

  return createPortal(
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.box1}>
          <div className={css.ttl}>{ttl}</div>
          <img src={"/publicContent/icons/close.png"} onClick={closeModal} className={css.crossIcon} />
        </div>
        <div className={css.box2}>{selectedRating}</div>
        <div className={css.box3}>
          {/* Star icons */}
        </div>
        <div className={css.box4}>
          <Button1
            onClick={submitHandler}
            txt="Save and continue"
            bck="var(--gray)"
            hovBck="var(--light-gray2)"
            color="var(--white)"
          />
        </div>
      </div>
    </div>,
    document.getElementById("modal") // Ensure this element exists
  );
};

export default CourseRatingsCard;
