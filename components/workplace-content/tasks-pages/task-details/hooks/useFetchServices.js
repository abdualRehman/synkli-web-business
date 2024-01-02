import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllServicesThunk } from "store/auth/slices";
import { setLoader } from "store/global/globalReducer";
import { BUSINESS_ID } from "utills/globalVars";

export const useFetchServices = () => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);

  const fetchServices = () => {
    console.log(business_id);
    dispatch(getAllServicesThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        dispatch(setLoader(false));
        // fetchBranches()
      });
  };
  return { fetchServices };
};
