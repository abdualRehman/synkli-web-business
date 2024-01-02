import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Header";
import { motion } from "framer-motion";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const LostGoogleAuthPage = () => {
  const navigate = useNavigate();

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
    const value = input.value;
    if (input.value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (event.keyCode === 8 && index > 0) {
      inputRefs[index - 1].current.focus();
    }
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

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const resendOtp = () => {
    setTimeRemaining(67);
  };

  const handleGoogleAuthenticate = () => {
    const newOtp = otp.join("");

    if (!newOtp || newOtp.length < 6) {
      NotificationManager.error("OTP inputs cant be empty");
    }
  };

  return (
    <div>
      <NotificationContainer />
      <Header />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="flex justify-center items-center"
      >
        <div className="google-authenticator relative">
          <div className="auth-inner px-5">
            <div className="top-wrapper">
              <div className="authenticator-title pt-3">
                <h1>Google Authenticator</h1>
              </div>

              <div className="flex gap-2 authenticator-text">
                <div className="flex justify-center items-center">
                  <svg
                    width="5"
                    height="10"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.433859 2.66497C-0.486076 1.68906 0.154012 0 1.44378 0C1.82265 0 2.18628 0.161092 2.45593 0.448399L7.57503 5.90261C8.14166 6.50634 8.14166 7.49366 7.57503 8.09739L2.45593 13.5516C2.18628 13.8389 1.82265 14 1.44378 14C0.154012 14 -0.486078 12.3109 0.433856 11.335L4.52022 7L0.433859 2.66497Z"
                      fill="url(#paint0_linear_2369_13447)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_2369_13447"
                        x1="4.39252"
                        y1="0.173866"
                        x2="4.37418"
                        y2="14"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#101828" />
                        <stop offset="0.998509" stop-color="#0D1B37" />
                        <stop offset="1" stop-color="#0A1E46" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="mt-2">
                  Enter the 6-digit code provided by your Authentication app
                </div>
              </div>

              <div>
                <div className="otp-inputs pr-10">
                  <div className="grid grid-cols-6 ">
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
            </div>

            <div className="verify-section absolute bottom-10">
              <div className="text-center">
                <button
                  onClick={handleGoogleAuthenticate}
                  className="px-12 py-2 rounded-md"
                >
                  verify
                </button>
              </div>
              <div className="mt-3 text-center">
                <p
                  onClick={() => navigate("/alternate/method")}
                  className="cursor-pointer"
                >
                  {" "}
                  Need Another Way To Authenticate?
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LostGoogleAuthPage;
