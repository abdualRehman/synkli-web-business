import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastHandler } from "../../responseHanlder";
export const SignupProtection = (props) => {
  const navigate = useNavigate();
  const { Component } = props;
  const { data } = useSelector((state) => state.signup);

  // useEffect(() => {
  //     if(!data) {
  //         toastHandler("Please complete signup steps", "error")
  //         navigate('/')
  //     }
  // })
  return (
    <div>
      <Component />
    </div>
  );
};
