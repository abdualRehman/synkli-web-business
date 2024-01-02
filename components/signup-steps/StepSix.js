import { motion } from "framer-motion";
import "../../css-steps/signup-css/stepSix.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
const StepSix = (props) => {
  const { email } = useParams();
  const navigate = useNavigate();
  const dummyText =
    "Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,";
  const showStepFour = () => {
    navigate(`/signup/setPassword/${email}`);
  };
  return (
    <div className="flex justify-center items-center min-h-screen overflow-y-scroll">
      <motion.div
        initial={{ scale: 0.9, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
        className="user-step-5"
      >
        <div className="terms-and-conditions">
          <div className="tearms">
            <h1 className="pl-20 s5-title">Terms and conditions</h1>
            <p className=" s5-date">Updated February, 2022</p>
          </div>

          <div className="tc-text px-16 mt-5">
            <div>{dummyText}</div>
            <div className="mt-3">{dummyText}</div>
            <div className="mt-3">{dummyText}</div>
            <div className="mt-3">{dummyText}</div>
          </div>
        </div>

        <div className="backBtn mt-1">
          <button onClick={showStepFour} className="px-10  py-2">
            Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StepSix;
