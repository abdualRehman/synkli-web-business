import React from "react";
import { useDispatch } from "react-redux";
import { getBusinessprofileThunk } from "store/auth/slices";

export const useGetBusinessProfile = () => {
  const dispatch = useDispatch();

  const fetchBusiness = () => {
    dispatch(getBusinessprofileThunk())
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { fetchBusiness };
};
