import React from "react";
import "./addtask.css";
import { motion } from "framer-motion";
import { BgTimes } from "utills/svgs/BgTimes";

export const CheckListModal = ({ toggleAddChecklist }) => {
  return (
    <div className="checklist-modal shadow-md p-5 rounded-md bg-white">
      <div className="flex justify-end  ">
        {" "}
        <div onClick={toggleAddChecklist}>
          <BgTimes />{" "}
        </div>
      </div>
      CheckListModal
    </div>
  );
};
