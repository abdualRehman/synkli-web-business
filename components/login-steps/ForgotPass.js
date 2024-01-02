import { motion } from "framer-motion";
import { useState } from "react";
import "../../css-steps/login-css/forgotPass.css";

import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utills/FormValidation";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { Loader } from "../common/Loader";
import { StepWizardSecond } from "../../utills/svgs/StepWizardSecond";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../store/global/globalReducer";
import { forgotPasswordThunk } from "../../store/auth/slices";
import { toastHandler } from "responseHanlder";
const ForgotPass = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const [email, setEmail] = useState("");

  const { data } = useSelector((state) => state.login);

  const handleSubmit = async (e) => {
    if (email === "") {
      toastHandler("Please enter email", "error");
      return;
    } else if (!validateEmail(email)) {
      toastHandler("Invalid format", "error");
      return;
    }
    e.preventDefault();
    const forgotPassData = {
      email,
      user_type: "employee",
    };
    dispatch(setLoader(true));
    await dispatch(forgotPasswordThunk(forgotPassData))
      .then((response) => {
        dispatch(setLoader(false));
        console.log(response.payload);
        if (response.payload) {
          const forgotPassData = {
            email,
            otp: false,
            questions: false,
          };
          localStorage.setItem(
            "forgotPassData",
            JSON.stringify(forgotPassData)
          );
          navigate(`/otp/verification/${email}`);
          console.log(data);
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.log(error);
      });

    dispatch(setLoader(false));
  };

  return (
    <div className="forgot-pass-wrapper  ">
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <NotificationContainer />
      <motion.div
        initial={{ scale: 0.9, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
        className="login-step-two px-5 md:px-16 relative pb-5"
      >
        <div className="forgotten-title pt-5 pl-5 md:pl-10">
          Forgotten password
        </div>
        <div className="forgotten-text mt-3">
          Please enter your email address to reset your password! A message with
          code will be sent to an authorized email to reset the password.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="for-email mt-5 md:mt-10">
            <div>
              <label>Email</label> <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-2 px-3"
                placeholder="Enter your email "
                required
                maxLength={30}
              />
            </div>
          </div>

          <div className="mt-28 pb-10">
            <div className="flex justify-between items-center ">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="btn-1 px-12 py-2"
              >
                Back
              </button>
              <button type="submit" className=" px-12 rounded-md py-2 btn-2">
                Next
              </button>
            </div>

            <div className="flex justify-center items-center ">
              <div className="svg-wrapper scale-70">
                <StepWizardSecond />
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPass;
