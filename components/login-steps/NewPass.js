import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "../../css-steps/login-css/newPass.css";
import { useNavigate, useParams } from "react-router-dom";
import eye from "../../files/eye.png.svg";
import hideEye from "../../files/hideEye.png.svg";
import { Loader } from "../common/Loader";
import { StepWizardThree } from "../../utills/svgs/StepWizardThree";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordThunk } from "../../store/auth/slices";
import { setLoader } from "../../store/global/globalReducer";
import {
  getPasswordProficiency,
  hasLowercaseLetter,
  hasMinimumLength,
  hasNumber,
  hasSpecialCharacter,
  hasUppercaseLetter,
  validatePasswords,
} from "utills/FormValidation";
import { ValidatePass } from "components/common/ValidatePass";
import { ValidateLoader } from "components/common/ValidateLoader";
import { toastHandler } from "responseHanlder";
import { TOAST_TYPE_ERROR } from "utills/globalVars";
const NewPass = (props) => {
  const InitialValues = {
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  };

  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const forgotPassData = localStorage.getItem("forgotPassData");
  const parsedData = forgotPassData ? JSON.parse(forgotPassData) : {};

  // const InitialValues = {
  //   email,
  //   user_type: "employee",
  //   password: "",
  //   confirmPassword: "",
  // };

  const [userResetPassword, setUserResetPassword] = useState(InitialValues);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserResetPassword({
  //     ...userResetPassword,
  //     [name]: value,
  //   });
  // };

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

  const toggleConfirmEye = () => {
    if (userPassword.confirmPassword) {
      setConfirmEye(!confirmEye);
    }
  };
  const toggleSetEye = () => {
    if (userPassword?.password) {
      setSetEye(!setEye);
      setShowValidator(true);
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
    e.preventDefault();
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

  const handleBlur = () => {
    setShowValidator(false);
  };

  const resetPasswordData = {
    email: parsedData?.email,
    user_type: "employee",
    password: userPassword.password,
    confirm_password: userPassword.confirmPassword,
  };

  const userData = {
    user_id: "",
    password: userPassword.confirmPassword,
    agreed_to_term: userPassword.agreedToTerms,
    user_type: "employee",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!parsedData?.otp || !parsedData?.questions) {
      toastHandler(
        "Reset Password require's email verification and security answers",
        TOAST_TYPE_ERROR
      );
      return;
    }
    dispatch(setLoader(true));
    dispatch(resetPasswordThunk(resetPasswordData))
      .then((response) => {
        dispatch(setLoader(false));
        if (response.payload) {
          const forgotPassData = {};
          localStorage.setItem(
            "forgotPassData",
            JSON.stringify(forgotPassData)
          );
          navigate("/reset/password/success");
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.log(error);
      });
    dispatch(setLoader(false));
  };

  return (
    <div className="new-password ">
      {isLoading && <Loader />}
      <motion.div
        initial={{ scale: 0.9, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
        className="login-step-five shadow"
      >
        <h1 className="text-center fira-sans pt-3">New Password</h1>

        <div></div>
        <div className="new-password-body pt-5 pl-5 md:pl-10 pr-5 md:pr-12">
          <p className="set-text">Set new passowrd</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Password</label>

              <div className="password-wrapper">
                <div className="pass-eyes">
                  {" "}
                  <span onClick={toggleSetEye}>
                    {" "}
                    <img src={setEye ? eye : hideEye} alt="eye" />{" "}
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
                  maxLength={30}
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
                        {oneSmallLetter ? <ValidatePass /> : <ValidateLoader />}
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
                    <div className="pass-eyes">
                      {" "}
                      <span onClick={toggleConfirmEye}>
                        {" "}
                        <img src={confirmEye ? eye : hideEye} alt="eye" />{" "}
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
                      maxLength={30}
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

              <div
                className={`check mt-5 flex items-start gap-3 ${
                  showValidator ? "mx-2" : ""
                }`}
              ></div>
            </div>
            {/* <div className="user-sign-up-btns mt-12 flex justify-between items-center">
              <div>
                <button type="button" className="user-btn-1">
                  back
                </button>
              </div>

              <div>
                <button type="submit" className="user-btn-2">
                  Next
                </button>
              </div>
            </div> */}
          </form>

          <div className="confirm-btn mt-3">
            <button onClick={handleSubmit} className="px-10 py-2 rounded-md">
              Confirm
            </button>
          </div>

          <div className="svg-wrapper scale-50">
            <StepWizardThree />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewPass;
