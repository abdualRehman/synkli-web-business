import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchFormsThunk } from "store/form";
import { setLoader } from "store/global/globalReducer";

export const useGetForms = () => {
  const dispatch = useDispatch();

  const fetchForms = (form_status) => {
    dispatch(setLoader(true));
    const payload = {
      business_id: localStorage.getItem("business_id"),
      service_id: "",
      form_status: form_status,
    };
    dispatch(fetchFormsThunk(payload))
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  return { fetchForms };
};
