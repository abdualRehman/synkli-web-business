import Header from "../../../Header";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { authEmailSendOtpThunk, authEmailVerifyOtpThunk } from "store/auth/slices";
import { Loader } from "components/common/Loader";


const EmailALternatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {data} = useSelector((state) => state.login)
  const isLoading = useSelector((state) => state.global.isLoading)

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

  const resendOtpData = {
    user_id : data?.user_id,
   type : 5,
   user_type : "employee"
 }

  const resendOtp = () => {
    setTimeRemaining(67);
      dispatch(setLoader(true))
    dispatch(authEmailSendOtpThunk(resendOtpData)).then((response) => {
       console.log(response.payload)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
        dispatch(setLoader(false))
    })
  };

  const verifyEmailData = {
    user_id : data?.user_id,
    otp : otp.join(''),
    user_type : "employee"
  }

  const handleOtp = () => {
    const newOtp = otp.join("");
    if (!newOtp || newOtp.length < 6) {
      NotificationManager.error("OTP inputs cant be empty");
      return
    } 

  
    dispatch(setLoader(true))
    dispatch(authEmailVerifyOtpThunk(verifyEmailData)).then((response) => {
        if(response.payload) {
           navigate('/security/questions/alternate')
        }
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
        dispatch(setLoader(false))
    })
  };

  useEffect(() => {
     resendOtp()
  }, [])

  return (
    <div>
      {isLoading && <Loader />}
      <NotificationContainer />
      <Header />
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="email-authenticator relative"
        >
          <div className="auth-inner px-5">
            <div className="flex gap-2 mt-3">
              <div className="flex justify-center items-center">
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
              <div className="authenticator-title ">
                <h1>Email Verification</h1>
              </div>
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
                Enter a 6-digit code that is sent to your email address
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

            <div className="verify-section absolute bottom-10 ">
              <div className="text-center">
                <button onClick={handleOtp} className="px-12 py-2 rounded-md">
                  verify
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EmailALternatePage;
