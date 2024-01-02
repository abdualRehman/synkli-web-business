import "../../dashboard-css/auth-css/emailAuth.css";
import AppSidebar from "../../appSidebarComp/AppSidebar";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { DashboardWelcomeCard } from "../../../pages/dashboard/dashboard-cards/DashboardWelcomeCard";
import { BackArrow } from "../../../utills/svgs/BackArrow";
import { BlueGreaterSign } from "../../../utills/svgs/BlueGreaterSign";
import { validateEmail } from "../../../utills/FormValidation";
import Ripples from "react-ripples";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../common/Loader";
import { setLoader } from "../../../store/global/globalReducer";
import {
  authEmailSendOtpThunk,
  authEmailVerifyOtpThunk,
  login,
} from "../../../store/auth/slices";
import _ from "lodash";
const EmailAuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.login);
  const isLoading = useSelector((state) => state.global.isLoading);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState();
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    const hasError = !validateEmail(value);
    setEmailError(hasError);
  };

  const otpData = {
    user_id: data?.user_id,
    type: 5,
    user_type: "employee",
  };

  const sendOTP = async () => {
    dispatch(setLoader(true));
    await dispatch(authEmailSendOtpThunk(otpData))
      .then((response) => {
        console.log(response.payload);
        dispatch(setLoader(false));
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.log(error);
      });

    dispatch(setLoader(false));
  };
  const handleEmailSubmit = () => {
    sendOTP();
  };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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

  const resendOtp = () => {
    setTimeRemaining(67);

    sendOTP();
  };

  function hasNullItem() {
    return otp.some((item) => item === null);
  }
  const verifyOtpData = {
    user_id: data.user_id,
    otp: parseInt(otp.join("")),
    user_type: "employee",
  };
  const handleOtpSubmit = async () => {
    console.log(otp);

    if (otp.length <= 5 || hasNullItem()) {
      return toast.error("Please fill in all OTP inputs");
    }
    const newData = _.cloneDeep(data);
    const updatedUser = {
      ...data,
      email_2fa: true,
    };

    dispatch(setLoader(true));
    await dispatch(authEmailVerifyOtpThunk(verifyOtpData))
      .then((response) => {
        console.log(response.payload);
        dispatch(setLoader(false));
        if (response.payload) {
          console.log(response.payload, "emailauthlogin");
          const newPayload = {
            ...data,
            email_2fa: true,
          };
          dispatch(login.actions.handleUpdate(newPayload));
          localStorage.setItem("email_2fa", true);
          navigate("/email/success");
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.log(error);
      });

    dispatch(setLoader(false));
    // navigate("/email/success");
  };

  return (
    <div className="dashboard-page">
      {isLoading && <Loader />}

      {/* <div>
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div> */}
      <div className="main-grid-container">
        <div className="one"></div>
        <div className="two shadow-md">
          <DashboardWelcomeCard />
        </div>
        <div className="three shadow-md">
          <div className="one-head px-5 pt-5 flex   items-center">
            <div
              onClick={() => navigate("/two/factor/auth")}
              className="arrow-wrapper mt-1 cursor-pointer"
            >
              <BackArrow />
            </div>
            <div>
              {" "}
              <h1>Email Verification</h1>
            </div>
          </div>

          <div className="email-text flex mx-5  gap-1  mt-3">
            <div>
              <div className=" scale-75">
                <BlueGreaterSign />
              </div>
            </div>
            <div>
              <span>
                A message with code will be sent to an authorized email to
                verify your email.
              </span>
            </div>
          </div>

          <div className="email-input add-ann-form px-5 mt-6">
            <div>
              <label> Email</label>
            </div>
            <div>
              <input
                type="email"
                className="px-3"
                placeholder="Enter your email"
                value={data.email}
                required
                onChange={handleEmailChange}
              />
            </div>
            {email && (
              <div className="error-div mt-1">
                {" "}
                {emailError ? <span> Invalid email</span> : ""}{" "}
              </div>
            )}
          </div>

          <div className="send-btn flex justify-center items-center mt-10">
            <Ripples during={2000} color="#979797">
              {" "}
              <button
                onClick={handleEmailSubmit}
                disabled={emailError}
                className="px-14 py-2 text-white"
              >
                Send
              </button>
            </Ripples>
          </div>

          <div className="otp-verification mt-16">
            <div className="otp-title px-5">OTP Verification</div>

            <div className="email-text flex gap-1 mx-5 mt-3">
              <div>
                <div className="scale-75 ">
                  <BlueGreaterSign />
                </div>
              </div>
              <div>
                <span>
                  A 6-digit code is sent to your email. Kindly enter that code
                  here to verify your email.
                </span>
              </div>
            </div>

            <div className="px-5">
              <div className="inputs flex gap-5 items-center justify-center mt-5">
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
                </div>
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

          <div className="email-verify my-next-btn  my-5 flex justify-center items-center">
            <Ripples during={2000} color="#979797">
              <button onClick={handleOtpSubmit} className=" px-12 rounded-md">
                Verify
              </button>
            </Ripples>
          </div>
        </div>
        <div className="four"></div>
      </div>
    </div>
  );
};

export default EmailAuthPage;
