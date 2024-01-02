import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ACCESS_TOKEN } from "utills/globalVars";
export const Protected = (props) => {
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.viewOnBoardingDetails);
  const { data: loginData } = useSelector((state) => state.login);
  const { Component } = props;
  const access_token = localStorage.getItem(ACCESS_TOKEN);
  const onboarding = JSON.parse(localStorage.getItem("onboarding"));
  // const { data: loginData } = useSelector((state) => state.login);

  useEffect(() => {
    if (access_token) {
      console.log(onboarding, "onboarding");
      if (!onboarding) {
        navigate("/onboarding");
        return;
      }
    }

    console.log("protected rrr");
    if (!access_token) {
      navigate("/");
    }
  }, [access_token, navigate, onboarding]);
  return <div> {access_token && onboarding ? <Component /> : ""}</div>;
};
