import "../../css-steps/login-css/securityQuestions.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../common/Loader";
import { SecurityInfo } from "../signup-steps/signup-utills/securityQuestions/SecurityInfo";
import securityQuestionsText from "../signup-steps/signup-utills/SignupText";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../store/global/globalReducer";
import {
  loginGetSecurityQuestionsThunk,
  loginVerifyAnswersThunk,
} from "../../store/auth/slices";
import { toastHandler } from "../../responseHanlder";
import { TOAST_TYPE_ERROR } from "utills/globalVars";

const SecurityQuestions = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const forgotPassData = localStorage.getItem("forgotPassData");
  const parsedData = forgotPassData ? JSON.parse(forgotPassData) : {};

  const isLoading = useSelector((state) => state.global.isLoading);
  const [securityQuestions, setSecurityQuestions] = useState([]);

  const { email } = useParams();

  const [questionResponses, setQuestionResponses] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Find if the question response already exists in the state
    const existingResponseIndex = questionResponses.findIndex(
      (response) => response.question_id === name
    );

    if (value === "") {
      // If value is empty, remove the response from the state
      if (existingResponseIndex !== -1) {
        const updatedResponses = questionResponses.filter(
          (response) => response.question_id !== name
        );
        setQuestionResponses(updatedResponses);
      }
    } else {
      if (existingResponseIndex !== -1) {
        // If the response exists, update the value
        const updatedResponses = [...questionResponses];
        updatedResponses[existingResponseIndex] = {
          ...updatedResponses[existingResponseIndex],
          value,
        };
        setQuestionResponses(updatedResponses);
      } else {
        // If the response doesn't exist, add a new entry
        setQuestionResponses((prevResponses) => [
          ...prevResponses,
          { question_id: name, value },
        ]);
      }
    }
  };

  const answersToSubmit = {
    email: parsedData?.email,
    user_type: "employee",
    questions: [...questionResponses],
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!parsedData?.otp) {
      toastHandler(
        "You need to verify your email to proceed ",
        TOAST_TYPE_ERROR
      );
      return;
    }
    if (questionResponses.length < 3) {
      toastHandler("Please fill in answers", "error");
      return;
    }

    dispatch(setLoader(true));
    await dispatch(loginVerifyAnswersThunk(answersToSubmit))
      .then((response) => {
        dispatch(setLoader(false));
        if (response.payload) {
          console.log(response.payload);
          const forgotPassData = {
            email,
            otp: true,
            questions: true,
          };
          localStorage.setItem(
            "forgotPassData",
            JSON.stringify(forgotPassData)
          );
          navigate(`/new/password/${email}`);
        }
      })
      .catch((error) => {
        dispatch(setLoader(false));
        setQuestionResponses([]);
        console.log(error);
      });
    dispatch(setLoader(false));
  };

  useEffect(() => {
    dispatch(setLoader(true));
    setTimeout(() => {
      dispatch(
        loginGetSecurityQuestionsThunk({
          email: email.toLowerCase(),
          user_type: "employee",
        })
      )
        .then((response) => {
          setSecurityQuestions(response.payload);
          dispatch(setLoader(false));
          console.log(response.payload);
        })
        .catch((error) => {
          dispatch(setLoader(false));
          console.log(error);
        });
    }, 1000);
  }, [dispatch]);

  useEffect(() => {
    if (!parsedData?.otp) {
      toastHandler(
        "You need to verify your email to proceed ",
        TOAST_TYPE_ERROR
      );
    }
  }, []);
  return (
    <div className="login-security-questions relative pb-5 min-h-screen ">
      {isLoading && <Loader />}
      <motion.div
        initial={{ scale: 0.9, opacity: 0.2 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
        className="login-questions"
      >
        <h1 className="text-center title pt-5">Security Questions</h1>
        <div className=" p-5 px-16 ">
          <SecurityInfo text={securityQuestionsText.textOne} />

          <SecurityInfo text={securityQuestionsText.textTwo} />

          <SecurityInfo text={securityQuestionsText.textThree} />
        </div>

        <form onSubmit={handleSubmit}>
          {" "}
          <div className="security-qa px-24 mt-5 ">
            {securityQuestions &&
              securityQuestions?.map((question, index) => (
                <div className="q1 mt-2" key={question.question_id}>
                  <h1>Question {index + 1}</h1>

                  <div className="question-div px-3">{question.question}</div>

                  <div className="q1-input">
                    <input
                      type="text"
                      maxLength="60"
                      className="px-3"
                      name={question.question_id}
                      value={
                        questionResponses.map(
                          (res) => res.question_id === question.question_id
                        ).value
                      }
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className=" flex justify-center items-center mt-3">
            <button type="submit" className="px-12 ann-btn  rounded-md">
              Next
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SecurityQuestions;
