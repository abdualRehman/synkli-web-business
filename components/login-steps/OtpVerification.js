import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "../../css-steps/signup-css/stepTwo.css";
import { postHttpRequest, putHttpRequest } from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../common/Loader";
import Ripples from "react-ripples";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { StepWizardSecond } from "../../utills/svgs/StepWizardSecond";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/global/globalReducer";
import {
  forgotPasswordThunk,
  verifyForgetPassThunk,
} from "../../store/auth/slices";
import { toastHandler } from "responseHanlder";
import { TOAST_TYPE_ERROR } from "utills/globalVars";

const OtpVerification = (props) => {
  const navigiate = useNavigate();
  const { email } = useParams();
  const forgotPassData = localStorage.getItem("forgotPassData");
  const parsedData = forgotPassData ? JSON.parse(forgotPassData) : {};

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);

  const showForgottenPass = () => {
    navigiate(`/forgot/password`);
  };
  const [timeRemaining, setTimeRemaining] = useState(67);
  const [timerEnded, setTimerEnded] = useState(false);

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

  useEffect(() => {
    timeExecution();
  }, []);

  const handleSubmit = async (e) => {
    const OPT = parseInt(otp.join(""), 10);
    if (!OPT) {
      toastHandler("OTP input cant be empty", TOAST_TYPE_ERROR);
      return;
    }
    e.preventDefault();

    dispatch(setLoader(true));
    await dispatch(
      verifyForgetPassThunk({
        email: parsedData?.email,
        otp: OPT,
        user_type: "employee",
      })
    )
      .then((response) => {
        dispatch(setLoader(false));
        console.log(response.payload);
        if (response.payload) {
          const forgotPassData = {
            email,
            otp: true,
            questions: false,
          };
          localStorage.setItem(
            "forgotPassData",
            JSON.stringify(forgotPassData)
          );
          navigiate(`/login/security/questions/${email}`);
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

  const sendOTPEmail = async (e) => {
    e.preventDefault();
    dispatch(setLoader(true));
    await dispatch(forgotPasswordThunk({ email, user_type: "employee" }))
      .then((response) => {
        dispatch(setLoader(false));
        console.log(response.payload);
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.log(error);
      });
    dispatch(setLoader(false));
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

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
          className="step-two otp relative"
        >
          <div className="text-center title pt-3">
            <h1>OTP verification</h1>
          </div>

          <div className="otp-wrapper px-5 md:px-24">
            <div className="otp-body mt-5">
              <p className="p-1">
                A 6-digit code is sent to your email. Kindly enter that code
                here to continue further. Thanks
              </p>
            </div>

            <div className="otp-inputs flex justify-center items-center">
              <div className="flex gap-3 items-center  ">
                <div>
                  <input
                    ref={inputRefs[0]}
                    onKeyUp={(event) => handleKeyUp(event, 0)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[1]}
                    onKeyUp={(event) => handleKeyUp(event, 1)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[2]}
                    onKeyUp={(event) => handleKeyUp(event, 2)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[3]}
                    onKeyUp={(event) => handleKeyUp(event, 3)}
                    maxLength="1"
                    type="number"
                  />
                </div>
                <div>
                  <input
                    ref={inputRefs[4]}
                    onKeyUp={(event) => handleKeyUp(event, 4)}
                    maxLength="1"
                    type="number"
                  />
                </div>{" "}
                <div>
                  <input
                    ref={inputRefs[5]}
                    onKeyUp={(event) => handleKeyUp(event, 5)}
                    maxLength="1"
                    type="number"
                  />
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

            <div className="otp-btns  mt-28 ">
              <div className="flex justify-between items-center">
                <div>
                  <Ripples during={2000} color="#979797">
                    <button
                      onClick={showForgottenPass}
                      className="btn-1 px-12 "
                    >
                      Back
                    </button>
                  </Ripples>
                </div>

                <div>
                  <Ripples during={2000} color="#979797">
                    <button
                      onClick={(e) => handleSubmit(e)}
                      className="btn-2 px-12 "
                    >
                      Next
                    </button>
                  </Ripples>
                </div>
              </div>
              <div className="svg-wrapper-2 ">
                <StepWizardSecond />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OtpVerification;
