import React from "react";
import { useDispatch } from "react-redux";
import { fetchSubmissionFormDataThunk } from "store/form";
import { setLoader } from "store/global/globalReducer";

export const useGetFormSubmissions = () => {
  const dispatch = useDispatch();
  const fetchSubmissions = (payload) => {
    dispatch(setLoader(true));
    dispatch(fetchSubmissionFormDataThunk(payload))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  return { fetchSubmissions };
};
