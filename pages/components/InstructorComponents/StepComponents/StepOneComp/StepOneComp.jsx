import { useState } from "react";
import StepCard from "../../Cards/StepCard/StepCard";
import css from "./StepOneComp.module.css";

const StepOneComp = (props) => {
  const { currentStep = 1,data ="",StepCardData=[] } = props;

  const [active, setActive] = useState({
    box1: false,
    box2: false,
  });
  
  
 
  return (
    <div className={css.outerDiv}>
      {/* <div className={css.txt}>
        First, let's find out what type of course you're making.
      </div> */} 
      <div className={css.boxes}>
        {StepCardData?.map((item) => {
          return (
            <StepCard
              box={item.box}
              active={active}
              setActive={setActive}
              key={item.id}
              icon={item.icon}
              ttl={item.ttl}
              desc={item.desc}
              link={item.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StepOneComp;
