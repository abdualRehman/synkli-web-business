import "../second-time-login-pages/css/stLogin.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { validateEmail } from "../../utills/FormValidation";
import { useState } from "react";
const STloginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (value.trim().length === 0) {
      setEmailError(false);
    } else if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(value);
  };
  return (
    <div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="flex justify-center items-center"
      >
        <div className="login-page">
          <div>
            <div className="login">
              <div className="text-center fira-sans  pt-10">Login</div>
              <div className="login-body">
                <div className="login-welcome mt-5">
                  Welcome to Kalculator, please put your login credentials below
                  to start using the app
                </div>
                <div className="login-form mt-5 ">
                  <div>
                    <div>
                      <form>
                        <div className="email-div">
                          <label>Email</label> <br />
                          <input
                            onChange={handleEmailChange}
                            type="email"
                            className="px-3 mt-2"
                            placeholder="Enter your email"
                            required
                          />
                          <div className="error-div mt-1">
                            {" "}
                            {emailError && (
                              <span> Invalid email format </span>
                            )}{" "}
                          </div>
                        </div>
                        <div className="password-div mt-2">
                          <label>Password</label> <br />
                          <input
                            type="password"
                            className="px-3 mt-2"
                            placeholder="Enter your Password"
                            minlength="8"
                            required
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex gap-2 items-center">
                              <div>
                                {" "}
                                <input
                                  type="checkbox"
                                  className="check "
                                  required
                                />{" "}
                              </div>

                              <div className=" remember-check">Remember me</div>
                            </div>
                          </div>

                          <div
                            onClick={() => navigate("/google/authenticator")}
                            className="forgot-pass cursor-pointer"
                          >
                            Forgot password ?
                          </div>
                        </div>

                        <div>
                          <div className="login-btn flex justify-center items-center">
                            <button className=" px-14 rounded-md py-2 mt-16">
                              Login
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-center items-center mt-2">
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
                      </form>
                    </div>
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
export default STloginPage;
