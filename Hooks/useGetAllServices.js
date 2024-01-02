import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllServicesThunk } from "store/auth/slices";

export const useGetAllServices = () => {
  const business_id = localStorage.getItem("business_id");
  const dispatch = useDispatch();
  const getServices = () => {
    dispatch(getAllServicesThunk({ business_id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return { getServices };
};
