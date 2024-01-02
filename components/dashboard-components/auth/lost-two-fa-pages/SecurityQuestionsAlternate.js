import { SecurityInfo } from "components/signup-steps/signup-utills/securityQuestions/SecurityInfo";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import securityQuestionsText from "components/signup-steps/signup-utills/SignupText";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components/common/Loader";
import { useNavigate } from "react-router-dom";
import { setLoader } from "store/global/globalReducer";
import {
  loginGetSecurityQuestionsThunk,
  loginVerifyAnswersThunk,
} from "store/auth/slices";
import { toastHandler } from "responseHanlder";

export const SecurityQuestionsAlternatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.global.isLoading);
  const [securityQuestions, setSecurityQuestions] = useState([]);

  const { data } = useSelector((state) => state.login);

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
    email: data?.email,
    user_type: "employee",
    questions: [...questionResponses],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questionResponses.length < 3) {
      toastHandler("Please fill in answers", "error");
      return;
    }

    dispatch(setLoader(true));
    await dispatch(loginVerifyAnswersThunk(answersToSubmit))
      .then((response) => {
        dispatch(setLoader(false));
        console.log(response.payload);
        if (response.payload) {
          navigate(`/two/factor/auth`);
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
          email: data?.email.toLowerCase(),
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

  return (
    <div>
      <div className="login-security-questions relative mb-5">
        {isLoading && <Loader />}
        <motion.div
          initial={{ scale: 0.9, opacity: 0.2 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
          className="login-questions"
        >
          <h1 className="text-center title pt-5">Security Questions</h1>

          <div className="security-body p-5 px-16 ">
            <SecurityInfo text={securityQuestionsText.textOne} />

            <SecurityInfo text={securityQuestionsText.textTwo} />

            <SecurityInfo text={securityQuestionsText.textThree} />
          </div>

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
                    />
                  </div>
                </div>
              ))}
          </div>

          <div className="next-btn flex justify-center items-center">
            <button
              onClick={(e) => handleSubmit(e)}
              className="px-12 py-3 rounded-md"
            >
              Next
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
