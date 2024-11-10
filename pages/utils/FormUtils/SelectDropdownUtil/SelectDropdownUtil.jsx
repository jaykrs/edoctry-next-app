import { useState, useRef, useEffect } from "react";
import css from "./SelectDropdownUtil.module.css";

const SelectDropdownUtil = ({
  id = "",
  label = null,
  filterType = "",
  defaultValue = "",
  value = null,
  setValue = () => {},
  multipleOptions = false,
  options = [],
  selectBoxCss = {},
  extraCss = {},
}) => {
  const [dpToggle, setDPToggle] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown container

  // Function to handle option selection
  const optionHandler = (option) => {
    setValue((prev) => {
      return {
        ...prev,
        [filterType]: { key: option.key, value: option.value },
      };
    });
    setDPToggle(false); // Close the dropdown after selection
  };

  // Close dropdown when clicking outside the dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDPToggle(false); // Close the dropdown if clicked outside
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.outerDiv} style={extraCss}>
      <div className={css.selectBox} style={selectBoxCss} ref={dropdownRef}>
        {label ? <label className={css.label}>{label}</label> : null}
        <div
          data-id={id}
          className={css.selectedDP}
          onClickCapture={() => setDPToggle((prev) => !prev)} // Toggle the dropdown visibility
        >
          <span data-id={id}>
            {value !== null
              ? value.key
              : defaultValue !== ""
              ? defaultValue.key
              : ""}
          </span>
          <img
            data-id={id}
            src={"/publicContent/icons/down-arrow.svg"}
            alt="arrow icon"
            className={css.icon}
          />
        </div>

        {(multipleOptions ? options?.map((optionArr) => optionArr) : options) && (
          <div
            className={css.options}
            style={{ display: dpToggle ? "block" : "none" }} // Toggle visibility of options
          >
            {(multipleOptions ? options : options?.map((option) => option)).map(
              (option) => (
                <div
                  className={css.option}
                  key={option.value}
                  val={option.value}
                  onClick={() => optionHandler(option)} // Select an option
                >
                  {option.key}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectDropdownUtil;
