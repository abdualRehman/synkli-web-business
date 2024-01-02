import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../css-steps/login-css/stepOne.css";
import eye from "../../files/eye.png.svg";
import hideEye from "../../files/hideEye.png.svg";
import "react-notifications/lib/notifications.css";
import { validateEmail } from "../../utills/FormValidation";
import { Loader } from "../common/Loader";

import { loginThunk } from "../../store/auth/slices";
import { setLoader } from "../../store/global/globalReducer";

import { toastHandler } from "../../responseHanlder";
// import { getFcmToken } from "../../utills/fb-messages";

import Cookies from "js-cookie";
import {
  ACCESS_TOKEN,
  BUSINESS_ID,
  REFRESH_TOKEN,
  TOAST_TYPE_ERROR,
} from "utills/globalVars";
const StepOne = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupComplete, setSignupComplete] = useState(true);
  const [email, setEmail] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data } = useSelector((state) => state.login);
  const token = localStorage.getItem("access_token");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [showPasswordError, setShowPasswordError] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [emailError, setEmailError] = useState("");
  const isLoading = useSelector((state) => state.global.isLoading);
  // getFcmToken().then((token) => {
  //   setFcmToken(token);
  //   console.log({ token });
  // });

  const handleValidate = (e) => {
    const value = e.target.value;
    if (value?.length > 30) {
      return;
    }
    setEmail(value);
    if (value.trim().length === 0) {
      setEmailError("");
    } else if (!validateEmail(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const loginData = {
    email,
    password,
    user_type: "employee",
    fcm_token: "dummy sts",
    old_fcm_token: "old_fcm_token",
  };

  const handleNavigation = (payload) => {
    if (payload?.business?.onboarded) {
      localStorage.setItem("onboarding", true);
    } else {
      localStorage.setItem("onboarding", false);
    }
    if (payload?.email_2fa) {
      localStorage.setItem("email_2fa", true);
    } else {
      localStorage.setItem("email_2fa", false);
    }
    console.log(payload, "responsePayload");
    if (!payload.is_employee && !payload.user_security_question) {
      navigate(`/signup/security/questions/${payload.user_id}`);
      // toastHandler("Please complete signup steps", "error");
      return;
    }
    // if (!payload.is_password_set) {
    //   navigate(`/signup/setPassword/${payload.user_id}`);
      // toastHandler("Please complete signup steps", "error");
    //   return;
    // }

    if (!payload.email_2fa) {
      navigate("/dashboard");
    } else if (payload.email_2fa && payload.google_authenticator_2fa) {
      navigate("/google/authenticator");
    } else if (payload.email_2fa && !payload.google_authenticator_2fa) {
      navigate("/email/authenticator");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      return;
    }
    if (!email || !password || !validateEmail(email)) {
      toastHandler("Please enter valid credentials", TOAST_TYPE_ERROR);
      return;
    }

    dispatch(setLoader(true));
    await dispatch(loginThunk(loginData))
      .then((response) => {
        if (response.payload) {
          const payload = response.payload;

          if (payload.access_token && payload.refresh_token) {
            const access_token = payload.access_token;
            const refresh_token = payload.refresh_token;

            localStorage.setItem("loggedInUser", payload);
            localStorage.setItem(ACCESS_TOKEN, access_token);
            localStorage.setItem(REFRESH_TOKEN, refresh_token);
            localStorage.setItem(BUSINESS_ID, payload?.business?.business_id);
          }

          handleNavigation(payload);
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const showSteptwo = () => {
    navigate(`/forgot/password`);
  };

  useEffect(() => {
    console.log(data, "loiginddd");
    if (token) {
      if (!data?.email_2fa) {
        navigate("/dashboard");
        return;
      }
      if (data.email_2fa && !data.business.onboarded) {
        navigate("/onboarding");
        return;
      }
      navigate("/settings");
    }
  }, []);

  useEffect(() => {
    if (showPasswordError) {
      setTimeout(() => {
        setShowPasswordError(false);
      }, 5000);
    }
  }, [showPasswordError]);
  return (
    <div className="login-layer relative">
      <motion.div
        initial={{ scale: 0.9, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
        className="login-step-1"
      >
        {isLoading && <Loader />}
        <div className="login-step-one">
          <div className="login">
            <div className="text-center fira-sans  pt-5">Login</div>
            <div className="login-body">
              <div className="login-welcome mt-5">
                Welcome to SYNKLI, please put your login credentials below to
                start using the app
              </div>
              <div className="login-form mt-5 ">
                <div>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="email-div">
                        <label>Email</label> <br />
                        <input
                          type="email"
                          className={`px-3 mt-2 ${
                            emailError && email ? "add-error-border" : ""
                          }`}
                          placeholder="Enter your email"
                          onChange={handleValidate}
                          required
                          maxLength={30}
                        />
                        <div className="error-div mt-1">
                          {emailError && <span> {emailError} </span>}
                        </div>
                      </div>
                      <div className="password-div mt-2">
                        <label>Password</label> <br />
                        <div className="passowrd-input-wrap">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`password-input px-3 ${
                              showPasswordError ? "add-error-border" : ""
                            }`}
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            maxLength={30}
                          />
                          <span
                            className="password-eye cursor-pointer"
                            onClick={togglePasswordVisibility}
                          >
                            <img src={showPassword ? eye : hideEye} />
                          </span>
                        </div>
                        <div className="error-div mt-1">
                          {showPasswordError && <span> {passwordMsg} </span>}
                        </div>
                      </div>

                      <div className=" flex h-4 mt-2  justify-between items-center">
                        <div>
                          <div className="flex gap-2 items-center">
                            <span>
                              <input
                                type="checkbox"
                                className="check"
                                onChange={(e) => setRemember(e.target.checked)}
                              />
                            </span>
                            <span className="remember-check">Remember me</span>{" "}
                          </div>
                        </div>

                        <div
                          onClick={showSteptwo}
                          className="forgot-pass cursor-pointer "
                        >
                          Forgot password ?
                        </div>
                      </div>

                      <div>
                        <div>
                          <div className="login-btn flex justify-center items-center">
                            <button
                              type="submit"
                              className=" px-14 rounded-md py-2 mt-16"
                            >
                              Login
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-center pb-8  items-center mt-2">
                          <p className="dont-have-account">
                            Dont have an account ?{" "}
                            <span
                              onClick={() => navigate("/signup")}
                              className="signup-redirect cursor-pointer"
                            >
                              Sign Up
                            </span>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StepOne;
