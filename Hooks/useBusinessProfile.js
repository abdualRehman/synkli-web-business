import React from "react";
import { useDispatch } from "react-redux";
import { getBusinessprofileThunk } from "store/auth/slices";

export const useBusinessProfile = () => {
  const dispatch = useDispatch();
  const fetchBusiness = () => {
    dispatch(getBusinessprofileThunk())
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return { fetchBusiness };
};
