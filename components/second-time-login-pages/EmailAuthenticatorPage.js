import "./css/emailAuthenticator.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import {
  authEmailSendOtpThunk,
  authEmailVerifyOtpThunk,
  resendOtpThunk,
} from "store/auth/slices";
import { Loader } from "components/common/Loader";
import { toastHandler } from "responseHanlder";
import { ACCESS_TOKEN, TOAST_TYPE_ERROR } from "utills/globalVars";
import { StepWizardSecond } from "utills/svgs/StepWizardSecond";

const EmailAuthenticatorPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const { data: loginData } = useSelector((state) => state.login);
  const user = localStorage.getItem("loggedInUser");
  const { data } = useSelector((state) => state.login);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otp, setOtp] = useState([null, null, null, null, null, null]);

  const [timeRemaining, setTimeRemaining] = useState(67);
  const [timerEnded, setTimerEnded] = useState(false);

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

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const resendOtpData = {
    user_id: data?.user_id,
    type: 5,
    user_type: "employee",
  };

  const resendOtp = () => {
    setTimeRemaining(67);
    console.log(data?.email);

    dispatch(setLoader(true));
    dispatch(authEmailSendOtpThunk(resendOtpData))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const verifyEmailData = {
    user_id: data?.user_id,
    otp: otp.join(""),
    user_type: "employee",
  };

  const handleOtp = () => {
    console.log(loginData?.access_token, "useraccess");
    const newOtp = otp.join("");
    if (!newOtp || newOtp.length < 6) {
      toastHandler("OTP inputs cant be empty", TOAST_TYPE_ERROR);
      return;
    }

    dispatch(setLoader(true));
    dispatch(authEmailVerifyOtpThunk(verifyEmailData))
      .then((response) => {
        if (response.payload) {
          localStorage.setItem(ACCESS_TOKEN, loginData?.access_token);

          navigate("/login/success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  useEffect(() => {
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
  }, [timeRemaining]);

  useEffect(() => {
    resendOtp();
  }, []);

  useEffect(() => {
    localStorage.setItem(ACCESS_TOKEN, "");
  }, []);
  return (
    <div>
      <div className="flex justify-center items-center">
        {isLoading && <Loader />}
        <NotificationContainer />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="email-authenticator relative"
        >
          <div className="auth-inner email-auth  px-5">
            <div className="flex gap-2 justify-center items-center mt-3">
              <div
                onClick={() => navigate("/signup")}
                className="flex  justify-center items-center cursor-pointer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.1199 0.447335C12.6462 1.02223 12.6231 1.93037 12.0683 2.47572L4.85611 9.56522L22.6154 9.56521C23.3801 9.56521 24 10.2076 24 11C24 11.7924 23.3801 12.4348 22.6154 12.4348L4.85611 12.4348L12.0683 19.5243C12.6231 20.0696 12.6462 20.9778 12.1199 21.5527C11.5936 22.1276 10.7173 22.1515 10.1625 21.6061L0.431695 12.0409C0.156086 11.77 1.99213e-06 11.3937 1.9233e-06 11C1.85447e-06 10.6063 0.156085 10.23 0.431695 9.95906L10.1625 0.393848C10.7173 -0.151504 11.5936 -0.127558 12.1199 0.447335Z"
                    fill="url(#paint0_linear_2369_10798)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2369_10798"
                      x1="13.1776"
                      y1="0.273216"
                      x2="13.1625"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="0.998509" stop-color="#0D1B37" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-center title">
                <h1>OTP verification</h1>
              </div>
              {/* <div className="authenticator-title ">
                <h1>Email Verification</h1>
              </div> */}
            </div>

            <div className="flex gap-2 authenticator-text">
              <div className="mt-10">
                A 6-digit code is sent to your email. Kindly enter that code
                here to continue further. Thanks
              </div>
            </div>

            <div>
              <div className="otp-inputs ">
                <div className=" flex gap-3 items-center justify-center">
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

                <div className="resend mt-5">
                  <div className="resend-confirmation mt-5">
                    <p>
                      {" "}
                      <span className="text-blue-600 cursor-pointer">
                        {timerEnded ? (
                          <span
                            onClick={resendOtp}
                            className={`my-element ${
                              timeRemaining > 0 ? "hidden" : ""
                            }`}
                          >
                            Resend
                          </span>
                        ) : (
                          " "
                        )}{" "}
                      </span>
                      ( {minutes}:{seconds < 10 ? `0${seconds}` : seconds} )
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-28 pb-12">
              <div className="flex justify-between items-center px-1-">
                <div>
                  <button
                    onClick={() => navigate("/signup")}
                    className="btn-1 px-10 py-2"
                  >
                    Back
                  </button>
                </div>

                <div>
                  <button onClick={handleOtp} className="btn-2 px-10 py-2">
                    Next
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <StepWizardSecond />
              </div>
            </div>
            {/* <div className="flex justify-center items-center w-full verify-btn-ab">
              <div className="text-center pr-10">
                <button
                  onClick={handleOtp}
                  className="px-16 py-2 ann-btn rounded-md"
                >
                  verify
                </button>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailAuthenticatorPage;
