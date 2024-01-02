import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "utills/globalVars";

export const OneTimeProtection = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const access_token = localStorage.getItem(ACCESS_TOKEN);
  useEffect(() => {
    if (!access_token) {
      navigate("/signup");
    }
  });
  return <div> {access_token && <Component />}</div>;
};
