import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch, useSelector } from "react-redux";
import Ripples from "react-ripples";
import { useNavigate, useParams } from "react-router-dom";
import "../../css-steps/signup-css/stepFour.css";
import eye from "../../files/eye.png.svg";
import hideEye from "../../files/hideEye.png.svg";
import {
  getPasswordProficiency,
  hasLowercaseLetter,
  hasMinimumLength,
  hasNumber,
  hasSpecialCharacter,
  hasUppercaseLetter,
  validatePasswords,
} from "../../utills/FormValidation";
import { StepWizardThree } from "../../utills/svgs/StepWizardThree";
import { Loader } from "../common/Loader";
import { ValidateLoader } from "../common/ValidateLoader";
import { ValidatePass } from "../common/ValidatePass";

import {
  setEmployeePasswordThunk,
  setPasswordThunk,
} from "../../store/auth/slices";
import { setLoader } from "../../store/global/globalReducer";
import { toastHandler } from "responseHanlder";
import { stopHeartbeatInterval } from "utills/socketEvents";

const UpdateEmployeePassword = (props) => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { intervalId } = useSelector((state) => state.global);
  const isLoading = useSelector((state) => state.global.isLoading);

  const showStepThree = () => {
    navigate(`/signup/security/questions/${user_id}`);
  };

  const showStepSix = () => {
    navigate(`/terms/and/conditions/${user_id}`);
  };
  const showStepSeven = () => {
    navigate(`/privacy/policy/${user_id}`);
  };

  const InitialValues = {
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  };

  const [userPassword, setUserPassword] = useState(InitialValues);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [passwordProficiency, setPasswordProficiency] = useState("");

  const [showValidator, setShowValidator] = useState(false);

  const [atleastEightChar, setAtleastEightChar] = useState(false);
  const [oneSmallLetter, setOneSmallLetter] = useState(false);
  const [onecapitalLetter, setOneCapitalLetter] = useState(false);
  const [oneNumber, setOneNumber] = useState(false);
  const [oneSpecialCharacter, setOneSpecialCharacter] = useState(false);
  const [setEye, setSetEye] = useState(false);
  const [confirmEye, setConfirmEye] = useState(false);

  const user = localStorage.getItem("signupUser");
  const securityQuestions = localStorage.getItem("questions");
  const register = user ? JSON.parse(user) : {};
  const questions = securityQuestions ? JSON.parse(securityQuestions) : {};

  const toggleConfirmEye = () => {
    if (userPassword.confirmPassword) {
      setConfirmEye(!confirmEye);
    }
  };
  const toggleSetEye = () => {
    if (userPassword?.password) {
      setSetEye(!setEye);
    }
  };
  const [errors, setErrors] = useState(true);

  useEffect(() => {
    setErrors(
      !(
        atleastEightChar ||
        oneSmallLetter ||
        onecapitalLetter ||
        oneNumber ||
        oneSpecialCharacter
      )
    );
  }, [
    atleastEightChar,
    oneSmallLetter,
    onecapitalLetter,
    oneNumber,
    oneSpecialCharacter,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      if (
        !validatePasswords(value, userPassword.confirmPassword) &&
        userPassword.confirmPassword
      ) {
        setPasswordMismatch(true);
      } else {
        setPasswordMismatch(false);
      }
      setAtleastEightChar(hasMinimumLength(value));
      setOneSmallLetter(hasLowercaseLetter(value));
      setOneCapitalLetter(hasUppercaseLetter(value));
      setOneNumber(hasNumber(value));
      setOneSpecialCharacter(hasSpecialCharacter(value));
      setPasswordProficiency(getPasswordProficiency(value));
      console.log(getPasswordProficiency(value));
      if ("strong" === getPasswordProficiency(value)) {
        setShowValidator(false);
      } else {
        setShowValidator(true);
      }
    }
    if (name === "confirmPassword") {
      if (value.trim().length === 0) {
        setPasswordMismatch(false);
        console.log("no success");
      } else if (!validatePasswords(userPassword.password, value)) {
        setPasswordMismatch(true);
      } else if (validatePasswords) {
        console.log("success");
        console.log(validatePasswords(value));
        setPasswordMismatch(false);
      }
    }
    setUserPassword({
      ...userPassword,
      [name]: value,
    });
    if (!value) {
      setPasswordProficiency("");
      setShowValidator(false);
    }
  };

  const handleCheckboxChange = (event) => {
    setUserPassword({
      ...userPassword,
      agreedToTerms: event.target.checked,
    });
  };

  // const handleFocus = () => {
  //   setShowValidator(true);
  // };

  const handleBlur = () => {
    setShowValidator(false);
  };

  const userData = {
    user_id: user_id,
    password: userPassword.confirmPassword,
    agreed_to_term: userPassword.agreedToTerms,
    user_type: "employee",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userPassword.password || !userPassword.confirmPassword) {
      toastHandler("Please fill required fields to proceed", "error");
      return;
    }
    if (passwordMismatch) {
      toastHandler(
        "New passowrd and confirm password should be matched",
        "error"
      );
      return;
    }

    const formData = {
      password: userPassword.confirmPassword,
      confirm_password: userPassword.confirmPassword,
      user_id,
    };

    console.log(formData);

    dispatch(setLoader(true));
    dispatch(setEmployeePasswordThunk(formData))
      .then((response) => {
        if (response.payload) {
          navigate("/main/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  return (
    <div>
      {isLoading && (
        <div className="loader-overlay">
          <Loader />
        </div>
      )}
      <div className="flex justify-center items-center ">
        <NotificationContainer />
        <motion.div
          initial={{ scale: 0.9, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
          className="users-sign-up"
        >
          <div className="text-center pt-3">
            <h1 className=" title ">Update password</h1>
          </div>
          <div className="user-sign-up-body px-5 ">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Password</label>

                  <div className="password-wrapper">
                    <div className="pass-eyes">
                      {" "}
                      <span onClick={toggleSetEye}>
                        {" "}
                        <img src={!setEye ? eye : hideEye} alt="eye" />{" "}
                      </span>
                    </div>
                    <input
                      // onFocus={handleFocus}
                      onBlur={handleBlur}
                      type={setEye ? "text" : "password"}
                      className={`px-3 validation-password`}
                      placeholder="Enter your password"
                      name="password"
                      value={userPassword.password}
                      onChange={handleChange}
                      required
                    />

                    <div className="profiency">
                      {" "}
                      <span
                        className={` ${
                          passwordProficiency === "weak"
                            ? "week-password"
                            : passwordProficiency === "medium"
                            ? "medium-password"
                            : "strong-password"
                        } `}
                      >
                        {" "}
                        {passwordProficiency === "" ? (
                          ""
                        ) : (
                          <span> {passwordProficiency} </span>
                        )}{" "}
                      </span>{" "}
                    </div>

                    {showValidator && (
                      <div className="password-validator shadow">
                        <div className="flex justify-between items-center">
                          <div className="validate-text">
                            {" "}
                            At least{" "}
                            <span className="validate-special">
                              {" "}
                              8 character{" "}
                            </span>{" "}
                          </div>

                          <div>
                            {atleastEightChar ? (
                              <ValidatePass />
                            ) : (
                              <ValidateLoader />
                            )}
                          </div>
                        </div>
                        <div className=" border-t mt-1"></div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="validate-text">
                            {" "}
                            At least{" "}
                            <span className="validate-special">
                              {" "}
                              one small letters
                            </span>{" "}
                          </div>

                          <div>
                            {oneSmallLetter ? (
                              <ValidatePass />
                            ) : (
                              <ValidateLoader />
                            )}
                          </div>
                        </div>
                        <div className=" border-t mt-2"></div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="validate-text">
                            {" "}
                            At least{" "}
                            <span className="validate-special">
                              {" "}
                              one capital letter{" "}
                            </span>{" "}
                          </div>

                          <div>
                            {onecapitalLetter ? (
                              <ValidatePass />
                            ) : (
                              <ValidateLoader />
                            )}
                          </div>
                        </div>
                        <div className=" border-t mt-2"></div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="validate-text">
                            {" "}
                            At least{" "}
                            <span className="validate-special">
                              {" "}
                              one number{" "}
                            </span>{" "}
                          </div>

                          <div>
                            {oneNumber ? <ValidatePass /> : <ValidateLoader />}
                          </div>
                        </div>
                        <div className=" border-t mt-2"></div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="validate-text">
                            {" "}
                            At least{" "}
                            <span className="validate-special">
                              {" "}
                              one special character
                            </span>{" "}
                          </div>

                          <div>
                            {oneSpecialCharacter ? (
                              <ValidatePass />
                            ) : (
                              <ValidateLoader />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 ">
                  <div>
                    <label className={`${showValidator ? "mx-2" : ""}`}>
                      Confirm Password
                    </label>
                    <div className={`${showValidator ? "mx-5" : ""}`}>
                      <div className="confirm-password-wrap ">
                        {" "}
                        {userPassword.confirmPassword ===
                          userPassword.password &&
                          userPassword.confirmPassword && (
                            <div className="matched-pass ">
                              {" "}
                              <span className="strong-password">
                                Matched
                              </span>{" "}
                            </div>
                          )}
                        <div className="pass-eyes">
                          {" "}
                          <span onClick={toggleConfirmEye}>
                            {" "}
                            <img
                              src={!confirmEye ? eye : hideEye}
                              alt="eye"
                            />{" "}
                          </span>
                        </div>
                        <input
                          type={confirmEye ? "text" : "password"}
                          className={`px-3 `}
                          placeholder="Confirm password"
                          name="confirmPassword"
                          value={userPassword.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="error-div mt-1">
                        {" "}
                        {passwordMismatch && (
                          <span>
                            Confirm Password does not match with password{" "}
                          </span>
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5  flex justify-end items-center">
                  <div>
                    <Ripples during={2000} color="#979797">
                      <button type="submit" className="user-btn-2">
                        Next
                      </button>
                    </Ripples>
                  </div>
                </div>
              </form>
            </div>

            <div className="text-center us-a">
              Already have an account ?{" "}
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer us-ab"
              >
                Sign In
              </span>
            </div>

            <div className=" flex justify-center items-center mt-3">
              <StepWizardThree />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default UpdateEmployeePassword;
