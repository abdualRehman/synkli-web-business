import "./css/lostTwoFa.css";
import Header from "../../../Header";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../../utills/FormValidation";
import { useState } from "react";

const LostTwoFaPage = () => {
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
      <Header />
      <div className="flex justify-center items-center">
        <div className="lost-login">
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
                            onChange={(e) => handleEmailChange(e)}
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
                            minLength={8}
                            required
                          />
                        </div>

                        <div className=" relative">
                          <div className="">
                            <div className="flex gap-2">
                              <span>
                                {" "}
                                <input
                                  type="checkbox"
                                  className="check "
                                  required
                                />{" "}
                              </span>{" "}
                              <span className="mt-2 remember-check">
                                Remember me
                              </span>{" "}
                            </div>
                          </div>
                          <div></div>
                          <div
                            onClick={() => navigate("/lost/google/auth")}
                            className="absolute right-2 top-2 forgot-pass cursor-pointer"
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
                            <span className="signup-redirect cursor-pointer">
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
      </div>
    </div>
  );
};

export default LostTwoFaPage;
