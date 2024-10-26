import { useState } from "react";
import css from "./SelectUtil.module.css";
import downArrowIcon from "../../../publicContent/icons/down-arrow.svg";

const SelectUtil = (props) => {
  const [state, setState] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    img = null,
    label = "",
    txt = null,
    options = [],
    value = "",
    setValue = () => { },
  } = props;

  const dropdownHandler = () => {
    setState((prev) => !prev);
  };

  const optionHandler = (value) => {
    setValue(value);
    dropdownHandler();
  };

  const filteredOptions = options.filter(option =>
    option.txt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={css.outerDiv}>
      <div className={css.innerBox}>
        <div className={css.labelBox}>
          <label htmlFor="" className={css.labelTxt}>
            {label}
          </label>
          <div className={css.txt}>{txt}</div>
        </div>
        <div className={css.selectBox}>
          <div className={css.select} onClick={dropdownHandler} id="selectDiv">
            <div className={css.selectLeft}>
              {img ? <img className={css.img} src={img} alt="icon" /> : null}
              {value}
            </div>
            <img className={css.icon} src={downArrowIcon} alt="down arrow" />
          </div>
          <div className={[css.optionsBox, state ? null : css.dnone].join(" ")}>
            <input
              type="text"
              className={css.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, id) => (
                <div
                  onClick={() => optionHandler(option.value)}
                  key={id}
                  className={css.option}
                  value={option.value}
                  selected={option.value === value}
                >
                  {option.txt}
                </div>
              ))
            ) : (
              <div className={css.noOptions}>No options found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectUtil;
