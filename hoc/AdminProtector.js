import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AdminProtector = (props) => {
  const { Component } = props;
  const { data } = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    if (data?.is_employee) {
      return navigate("/signup");
    }
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
};
