import { motion } from "framer-motion";
import { SideTimes } from "../../../utills/svgs/SideTimes";
import { LockIcon } from "../../../utills/svgs/LockIcon";
import { useState } from "react";
import Ripples from "react-ripples";
import { CHnagePasswordInputs } from './CHnagePasswordInputs';
import { ChangePasswordOtp } from "./ChangePasswordOtp";
const ChangePasswordSide = ({ togglePassSide }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [condition, setCondition] = useState(1)
  
  const handleCondition = (condition) => {
    setCondition(condition);
  };

  const handlePasswordValidate = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    if (value.length < 8) {
      setValidationMessage("Password must be greater than 8 characters.");
    } else {
      setValidationMessage("");
    }
  };

  const handlePassword = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    if (value !== newPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  function hideSide() {
    togglePassSide();
  }
  return (
    <div className="add-p-side grid grid-cols-6">
      <div className="col-span-4 left-side"></div>
      <div className="right-side col-span-2 ">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div className="top-pass">
            <div
              onClick={hideSide}
              className="absolute text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Change Password</div>

              <div className="jumbo-dir mt-2">
             Profile{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Change Password
                </span>
              </div>
              {condition === 1 ?   <CHnagePasswordInputs handleCondition={handleCondition} /> : <ChangePasswordOtp />}

            </div>
          </div>

    
        </motion.div>
      </div>
    </div>
  );
};

export default ChangePasswordSide;
