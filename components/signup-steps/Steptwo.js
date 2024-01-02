import { motion } from "framer-motion";
import "../../css-steps/signup-css/stepTwo.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "../common/Loader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Ripples from "react-ripples";
import { StepWizardSecond } from "../../utills/svgs/StepWizardSecond";

import { useSelector, useDispatch } from "react-redux";

import { otpVerificationThunk, resendOtpThunk } from "../../store/auth/slices";
import { setLoader } from "../../store/global/globalReducer";
import Cookies from "js-cookie";
import { toastHandler } from "responseHanlder";
import { hasNullOrEmpty } from "utills/dataValidation";
const StepTwo = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userP = JSON.parse(localStorage.getItem("signupUser"));

  const [userData, setUserData] = useState([]);

  const [timeRemaining, setTimeRemaining] = useState(67);
  const [timerEnded, setTimerEnded] = useState(false);

  const isLoading = useSelector((state) => state.global.isLoading);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState([null, null, null, null, null, null]);

  const handleKeyUp = (event, index) => {
    const input = inputRefs[index].current;
    let value = input.value;

    if (value.length > 1) {
      value = value.charAt(0); // Keep only the first character
      input.value = value; // Update the input's value
    }

    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (event.keyCode === 8 && value.length === 0 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    console.log(otp);
    if (hasNullOrEmpty(otp)) {
      toastHandler("OTP inputs cant be empty", "error");
      return;
    }
    const opt = parseInt(otp.join(""));

    const otpData = {
 
      email: userP?.email,
      otp: opt,
      user_type: "employee",
    };
    dispatch(setLoader(true));
    await dispatch(otpVerificationThunk(otpData))
      .then((response) => {
        dispatch(setLoader(false));
        console.log(response.payload);
        if (response.payload) {
          navigate(`/signup/security/questions/${userP?.email}`);
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.log(error);
      });
    dispatch(setLoader(false));
  };

  const timeExecution = () => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          setTimerEnded(true);
          clearInterval(intervalId);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };

  const resendData = {
    email: userP?.email,
    type: 1,
    user_type: "employee",
    socket_id: localStorage.getItem("socket_id"),
  };

  const sendOTPEmail = async (e) => {
    e.preventDefault();

    dispatch(setLoader(true));

    await dispatch(resendOtpThunk(resendData))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(setLoader(false));
  };

  useEffect(() => {
    const userData = localStorage.getItem("signupUser");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
    timeExecution();
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const showPageOne = () => {
    navigate("/signup");
  };

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className="flex justify-center opt-screen items-center">
        <NotificationContainer />
        <motion.div
          initial={{ scale: 0.9, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
          className="otp relative"
        >
          <div className="text-center title pt-3">
            <h1>OTP Verification</h1>
          </div>

          <div className="otp-wrapper px-5 md:px-24">
            <div className="otp-body ">
              <p className="p-1">
                A 6-digit code is sent to your email. Kindly enter that code
                here to continue further. Thanks
              </p>
            </div>
            <div className=" flex justify-center items-center">
              <div className="otp-inputs ">
                <div className="flex gap-3 items-center  ">
                  <div>
                    <input
                      ref={inputRefs[0]}
                      onKeyUp={(event) => handleKeyUp(event, 0)}
                      maxLength="1"
                      type="text"
                    />
                  </div>
                  <div>
                    <input
                      ref={inputRefs[1]}
                      onKeyUp={(event) => handleKeyUp(event, 1)}
                      maxLength="1"
                      type="text"
                    />
                  </div>
                  <div>
                    <input
                      ref={inputRefs[2]}
                      onKeyUp={(event) => handleKeyUp(event, 2)}
                      maxLength="1"
                      type="text"
                    />
                  </div>
                  <div>
                    <input
                      ref={inputRefs[3]}
                      onKeyUp={(event) => handleKeyUp(event, 3)}
                      maxLength="1"
                      type="text"
                    />
                  </div>
                  <div>
                    <input
                      ref={inputRefs[4]}
                      onKeyUp={(event) => handleKeyUp(event, 4)}
                      maxLength="1"
                      type="text"
                    />
                  </div>{" "}
                  <div>
                    <input
                      ref={inputRefs[5]}
                      onKeyUp={(event) => handleKeyUp(event, 5)}
                      maxLength="1"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="resend-confirmation mt-5">
              <p>
                {timerEnded ? (
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={sendOTPEmail}
                  >
                    Resend
                  </span>
                ) : (
                  !timerEnded &&
                  `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                )}
              </p>
            </div>

            <div className="mt-40 mb-5">
              <div className="flex justify-between items-center px-1-">
                <div>
                  <button onClick={showPageOne} className="btn-1 px-10 py-2">
                    Back
                  </button>
                </div>

                <div>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="btn-2 px-10 py-2"
                  >
                    Next
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <StepWizardSecond />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StepTwo;
