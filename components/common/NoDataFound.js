import React from "react";
import "./css/noDataFound.css";
import { MultipleUsers } from "utills/svgs/MultipleUsers";
export const NoDataFound = (props) => {
  return (
    <div className="no-team">
      <div>
        {" "}
        <MultipleUsers />
      </div>
      <div> {props.message}</div>
    </div>
  );
};
