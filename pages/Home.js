import Header from "../components/Header";
import StepOne from "../components/signup-steps/StepOne";
import StepTwo from "../components/signup-steps/Steptwo";
import StepThree from "../components/signup-steps/StepThree";
import StepFour from "../components/signup-steps/StepFour";
import SignupSuccess from "../components/signup-steps/SignupSuccess";
import StepSix from "../components/signup-steps/StepSix";
import PrivacyPolicy from "../components/signup-steps/PrivacyPolicy";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [condition, setCondition] = useState(1);

  const navigate = useNavigate();
  const { data } = useSelector((state) => state.login);
  const handleNavigation = (payload) => {
    // if (!payload.user_security_question) {
    //   navigate(`/signup/security/questions/${payload.user_id}`);
    //   // toastHandler("Please complete signup steps", "error");
    //   return;
    // }
    // if (!payload.is_password_set) {
    //   navigate(`/signup/setPassword/${payload.user_id}`);
    //   // toastHandler("Please complete signup steps", "error");
    //   return;
    // }
  };

  // useEffect(() => {
  //   if (data) {
  //     console.log("working...", data);
  //     handleNavigation(data);
  //   } else {
  //     setCondition(1);
  //   }
  // }, [data]);
  const [email, setEmail] = useState("");

  const handleEmail = (email) => {
    setEmail(email);
  };
  const handleCondition = (condition) => {
    setCondition(condition);
  };
  function MyComponent() {
    return (
      <div>
        {condition === 1 && (
          <StepOne
            handleCondition={handleCondition}
            handleEmail={handleEmail}
          />
        )}
        {condition === 2 && (
          <StepTwo handleCondition={handleCondition} email={email} />
        )}
        {condition === 3 && (
          <StepThree handleCondition={handleCondition} email={email} />
        )}
        {condition === 4 && (
          <StepFour handleCondition={handleCondition} email={email} />
        )}
        {condition === 5 && (
          <SignupSuccess handleCondition={handleCondition} email={email} />
        )}
        {condition === 6 && (
          <StepSix handleCondition={handleCondition} email={email} />
        )}
        {condition === 7 && <PrivacyPolicy handleCondition={handleCondition} />}
      </div>
    );
  }
  return (
    <div className="user-login">
      <div>{MyComponent()}</div>
    </div>
  );
};

export default Home;
