import React from "react";

export const PrimaryBtn = ({ text, atClick, isDisabled, px, styles, type }) => {
  return (
    <div>
      <button
        style={styles}
        disabled={isDisabled ? true : false}
        onClick={atClick}
        className={` ${type} ${px} rounded-md`}
      >
        {text}{" "}
      </button>
    </div>
  );
};
