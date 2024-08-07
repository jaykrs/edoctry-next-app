import { createPortal } from "react-dom";

import InputUtil from "../../../utils/FormUtils/InputUtil/InputUtil";
import CircleButton from "../../../utils/Buttons/CircleButton/CircleButton";
import css from "./ShareCourseCard.module.css";
const ShareCourseCard = (props) => {
  const {
    ttl = "",
    txt = "",
    btnTxt = "",
    btnClick = () => {},
    closeModal = () => {},
  } = props;

  let shareHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Copied!");
    return closeModal();
  };

  return createPortal(
    <div className={css.outerDiv}>
      <div className={css.innerDiv}>
        <div className={css.box1}>
          <div className={css.ttl}>{ttl}</div>
          <img src={"/publicContent/icons/close.png"} onClick={closeModal} className={css.icon} />
        </div>
        <div className={css.box2}>
          <InputUtil
            state={txt}
            btnTxt={btnTxt}
            btnClick={shareHandler}
            btnCss={{ padding: "20px" }}
          />
        </div>
        <div className={css.box3}>
          <span className={css.icons}>
            <CircleButton img={"/publicContent/icons/socialMedia/facebook.png"} />
          </span>
          <span className={css.icons}>
            <CircleButton img={"/publicContent/icons/socialMedia/twitter.png"} />
          </span>
          <span className={css.icons}>
            <CircleButton img={"/publicContent/icons/socialMedia/email.png"} />
          </span>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default ShareCourseCard;
