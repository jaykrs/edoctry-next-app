import { useState } from "react";
import css from "./StepCard.module.css";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
const  StepCard = (props) => {
  const navigate = useRouter();
  const {
    box = 0,
    icon = "",
    ttl = "",
    desc = "",
    active = false,
    setActive = () => {},
    link = ""
  } = props;
  return (
    <div
      onClick={() =>
        localStorage.getItem("usertype") === "customer"? "" :
        router.push(link)
      }
      className={css.outerDiv}
      style={{
        border: active[box] ? "4px solid black" : "2px solid #d1d7dc",
      }}
    >
      <div className={css.iconBox}>
        <img src={icon} className={css.icon} />
      </div>
      <div className={css.ttl}><ReactMarkdown>{ttl}</ReactMarkdown></div>
      <div className={css.desc}>{desc}</div>
    </div>
  );
};

export default StepCard;
