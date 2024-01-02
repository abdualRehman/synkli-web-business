import { motion } from "framer-motion";
import "../../css-steps/signup-css/stepThree.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "../common/Loader";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import Ripples from "react-ripples";
import { useSelector, useDispatch } from "react-redux";

import { SecurityInfo } from "./signup-utills/securityQuestions/SecurityInfo";
import securityQuestionsText from "./signup-utills/SignupText";

import { setLoader } from "../../store/global/globalReducer";
import {
  getSecurityQuestionsThunk,
  verifySecurityQuestionsThunk,
} from "../../store/auth/slices";
import {
  isAnyValueEmpty,
  isQuestionIdRepeated,
} from "../../utills/dataValidation";
import { toastHandler } from "../../responseHanlder";
import _ from "lodash";
const StepThree = (props) => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const securityQuestionsArr = localStorage.getItem("questions");
  const questions = securityQuestionsArr
    ? JSON.parse(securityQuestionsArr)
    : {};

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const [securityQuestions, setSecurityQuestions] = useState(null);
  const signupData = useSelector((state) => state.otpVerification);
  console.log(signupData);

  const [selectedOption, setSelectedOption] = useState({
    key: questions?.questions ? questions?.questions[0]?.question_id : "",
    value: "",
  });

  const [secondOption, setSecondOption] = useState({
    key: questions?.questions ? questions?.questions[1]?.question_id : "",
    value: "",
  });

  const [thirdOption, setThirdOption] = useState({
    key: questions?.questions ? questions?.questions[2]?.question_id : "",
    value: "",
  });
  console.log(questions, "questions");
  const [firstAnswer, setFirstAnswer] = useState(
    questions?.questions ? questions?.questions[0]?.value : ""
  );
  const [secondAnswer, setSecondAnswer] = useState(
    questions?.questions ? questions?.questions[1]?.value : ""
  );
  const [thirdAnswer, setThirdAnswer] = useState(
    questions?.questions ? questions?.questions[2]?.value : ""
  );

  const [questionsArr, setQuestionsArr] = useState([]);

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedKey = securityQuestions.find(
      (question) => question.question === selectedValue
    ).question_id;
    console.log(selectedKey);

    const op = { key: selectedKey, value: selectedValue };
    const newQuestions = _.cloneDeep(questionsArr);
    newQuestions.push(op);
    setQuestionsArr(newQuestions);
    setSelectedOption({ key: selectedKey, value: selectedValue });
  };

  const handleSecondSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedKey = securityQuestions.find(
      (option) => option.question === selectedValue
    ).question_id;
    const op = { key: selectedKey, value: selectedValue };
    const newQuestions = _.cloneDeep(questionsArr);
    newQuestions.push(op);
    setQuestionsArr(newQuestions);
    setSecondOption({ key: selectedKey, value: selectedValue });
  };

  const handleThirdSelect = (event) => {
    const selectedValue = event.target.value;
    const selectedKey = securityQuestions.find(
      (option) => option.question === selectedValue
    ).question_id;
    const op = { key: selectedKey, value: selectedValue };
    const newQuestions = _.cloneDeep(questionsArr);
    newQuestions.push(op);
    setQuestionsArr(newQuestions);

    setThirdOption({ key: selectedKey, value: selectedValue });
  };

  const showSteptwo = () => {
    navigate(`/signup/otp/verification`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionsData = {
      user_id: user_id,
      user_type: "employee",
      questions: [
        {
          question_id: selectedOption.key,
          value: firstAnswer,
        },
        {
          question_id: secondOption.key,
          value: secondAnswer,
        },
        {
          question_id: thirdOption.key,
          value: thirdAnswer,
        },
      ],
    };

    console.log(questionsData);
    if (
      questionsData.questions.some((question) => question.question_id === "")
    ) {
      toastHandler("Please select atleast three questions to proceed", "error");
      return;
    }

    if (isQuestionIdRepeated(questionsData.questions)) {
      toastHandler("You can't select same question twice", "error");
      return;
    }
    console.log(questionsData, "questionsData");

    localStorage.setItem("questions", JSON.stringify(questionsData));
    navigate(`/signup/setPassword/${user_id}`);
    // dispatch(verifySecurityQuestionsThunk(questionsData))
    //   .then((response) => {
    //     console.log(response.payload);
    //     dispatch(setLoader(false));
    //     if (response.payload) {
    //       navigate(`/signup/setPassword/${user_id}`);
    //     }
    //   })
    //   .catch((error) => {
    //     dispatch(setLoader(false));
    //     console.log(error);
    //   });
  };

  const user = useSelector((state) => state.otpVerification.data);

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getSecurityQuestionsThunk())
      .then((response) => {
        setSecurityQuestions(response.payload);
        dispatch(setLoader(false));
        console.log(response.payload);
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.log(error);
      });

    dispatch(setLoader(false));
  }, []);

  const handleAlready = (question) => {
    console.log(questionsArr, "questionsArr");

    const newQuestions = _.cloneDeep(questionsArr);

    const exist = newQuestions?.find((q) => q.key === question);
    console.log(question, "questionnnnn");
    if (exist) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="pb-5 ">
      <div>
        {" "}
        {isLoading && (
          <div className="loader-overlay">
            <Loader />
          </div>
        )}
        <div className="flex justify-center items-center min-h-screen ">
          <NotificationContainer />
          <motion.div
            initial={{ scale: 0.9, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "easeIn", duration: 0.4 }}
            className="security-questions"
          >
            <h1 className="text-center title pt-5">Security Questions</h1>

            <div className="security-body p-5 px-16 ">
              <SecurityInfo text={securityQuestionsText.textOne} />
              <SecurityInfo text={securityQuestionsText.textTwo} />
              <SecurityInfo text={securityQuestionsText.textThree} />
            </div>

            <form onSubmit={handleSubmit}>
              {" "}
              <div className="security-qa px-24 mt-5 ">
                <div className="q1 ">
                  <h1>Question 1</h1>

                  <select
                    className="q1-select pl-3"
                    name="securityQuestion1"
                    required
                    onChange={handleSelect}
                  >
                    <option value="" key="" disabled selected>
                      {" "}
                      Choose a question
                    </option>
                    {securityQuestions &&
                      securityQuestions?.map((question) => (
                        <option
                          value={question.question}
                          disabled={
                            handleAlready(question.question_id) ? true : false
                          }
                          key={question.question_id}
                          selected={
                            questions?.questions
                              ? questions?.questions[0]?.question_id ===
                                question?.question_id
                                ? true
                                : false
                              : false
                          }
                        >
                          {question.question}
                          {handleAlready(question.question_id)}
                        </option>
                      ))}
                  </select>

                  <div className="q1-input">
                    <input
                      type="text"
                      className="px-3"
                      name="securityAnswer1"
                      placeholder="Answer"
                      maxLength={30}
                      // value={userQuestionAnswer.securityAnswer1}
                      required
                      onChange={(e) => setFirstAnswer(e.target.value)}
                      value={firstAnswer}
                    />
                  </div>
                </div>

                <div className="q1 mt-4">
                  <h1>Question 2</h1>
                  <select
                    className="q1-select pl-3"
                    name="securityQuestion2"
                    required
                    // value={userQuestionAnswer.securityQuestion2}
                    onChange={handleSecondSelect}
                  >
                    <option value="" key="" disabled selected>
                      {" "}
                      Choose a question
                    </option>
                    {securityQuestions &&
                      securityQuestions?.map((question) => (
                        <option
                          value={question.question}
                          key={question.question_id}
                          disabled={
                            handleAlready(question.question_id) ? true : false
                          }
                          selected={
                            questions?.questions
                              ? questions?.questions[1]?.question_id ===
                                question?.question_id
                                ? true
                                : false
                              : false
                          }
                        >
                          {question.question}
                        </option>
                      ))}
                  </select>

                  <div className="q1-input">
                    <input
                      type="text"
                      className="px-3"
                      placeholder="Answer"
                      required
                      name="securityAnswer2"
                      maxLength={30}
                      // value={userQuestionAnswer.securityAnswer2}
                      onChange={(e) => setSecondAnswer(e.target.value)}
                      value={secondAnswer}
                    />
                  </div>
                </div>

                <div className="q1 mt-4">
                  <h1>Question 3</h1>
                  <select
                    className="q1-select pl-3"
                    name="securityQuestion3"
                    required
                    // value={userQuestionAnswer.securityQuestion3}
                    onChange={handleThirdSelect}
                  >
                    <option value="" key="" disabled selected>
                      {" "}
                      Choose a question
                    </option>
                    {securityQuestions &&
                      securityQuestions?.map((question) => (
                        <option
                          value={question.question}
                          key={question.question_id}
                          disabled={
                            handleAlready(question.question_id) ? true : false
                          }
                          selected={
                            questions?.questions
                              ? questions?.questions[2]?.question_id ===
                                question?.question_id
                                ? true
                                : false
                              : false
                          }
                        >
                          {question.question}
                        </option>
                      ))}
                  </select>

                  <div className="q1-input">
                    <input
                      type="text"
                      className="px-3"
                      name="securityAnswer3"
                      placeholder="Answer"
                      maxLength={30}
                      required
                      // value={userQuestionAnswer.securityAnswer3}
                      onChange={(e) => setThirdAnswer(e.target.value)}
                      value={thirdAnswer}
                    />
                  </div>
                </div>
              </div>
              <div className="sq-btns my-5 mx-24 ">
                <div className="flex justify-between items-center">
                  <div>
                    <button
                      type="button"
                      onClick={showSteptwo}
                      className="btn-1 px-10 py2"
                    >
                      Back
                    </button>
                  </div>

                  <div>
                    <Ripples during={2000} color="#979797">
                      <button type="submit" className="btn-2 px-10 py-2">
                        Next
                      </button>
                    </Ripples>
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        </div>{" "}
      </div>
    </div>
  );
};

export default StepThree;
