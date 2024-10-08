import { useState } from "react";
import Link from "next/link";
import css from "./AnnouncementCommentUtil.module.css";
import flagReportIcon from "../../publicContent/icons/flag-report.png";
import flagReportFilledIcon from "../../publicContent/icons/flag-report-filled.png";

const AnnouncementCommentUtil = ({data={}}) => {
  const {
    id = 0,
    name = "",
    img = "",
    date = new Date(),
    comment = "",
  } = data;

  const [flagState, setFlagState] = useState(false);

  return (
    <div className={css.outerDiv}>
      <div className={css.imgBox}>
        <img src={img} alt="profile pic" className={css.img} />
      </div>
      <div className={css.cntBox}>
        <div className={css.leftBox}>
          <Link href={id} className={css.ttl}>
            {name}
          </Link>
          <div className={css.date}>{new Date(date)?.toLocaleDateString()}</div>
          <div className={css.flag} onClick={() => setFlagState((p) => !p)}>
            <img
              src={flagState ? flagReportFilledIcon : flagReportIcon}
              alt="flag"
              className={css.icon}
            />
          </div>
        </div>
        <div className={css.rightBox}>
          <span className={css.comment}>{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCommentUtil;
