import { useEffect, useRef, useState } from "react";
import { Calendar, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { formateDateTime } from "utills/moment";
import { PickDate } from "utills/svgs/PickDate";
import "./css/global-components.css";
const DatePickerComponent = (props) => {
  const {
    type,
    style,
    onDateChange,
    isOpen,
    setVisible,
    date,
    showIcon,
    start,
    sidebarDate,
    minDate,
    range,
  } = props;
  const modalRef = useRef(null);

  function handleClickOutside(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setVisible(false);
    }
  }

  const onChange = (date) => {
    if (type == "DateRange") {
      onDateChange(date);

      return;
    }
    onDateChange(date);
  };
  useEffect(() => {
    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleChange = (date) => {
    onDateChange(date?.selection);
    // console.log(date?.selection, "dateeecv");
  };
  if (type == "DateRange") {
    return (
      <div onClick={() => !isOpen && setVisible(true)}>
        {" "}
        <DateRangePicker
          className="date-range-pick"
          ranges={[range]}
          onChange={handleChange}
        />
      </div>
    );
  } else {
    return (
      <div className={`date-ranger-picker-wraper`} style={style}>
        <div
          onClick={() => !isOpen && setVisible(true)}
          className={`date-selector-div justify-between gap-4 px-2 `}
        >
          <div>{date ? formateDateTime(date) : "Select date"}</div>
          <div>
            <PickDate />
          </div>
        </div>
        <div
          className={`${sidebarDate ? "sidebarPicker" : "picker "}`}
          ref={modalRef}
        >
          {isOpen && (
            <div className="border rounded-md overflow-hidden shadow-md mt-2">
              <Calendar date={new Date()} onChange={(date) => onChange(date)} />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default DatePickerComponent;
