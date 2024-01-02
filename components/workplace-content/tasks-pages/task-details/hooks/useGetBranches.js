import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranchLocationsThunk } from "store/auth/slices";
import { setLoader } from "store/global/globalReducer";

export const useGetBranches = () => {
  const dispatch = useDispatch();
  const { data: loginData } = useSelector((state) => state.login);

  const fetchBranches = () => {
    dispatch(getBranchLocationsThunk({ user_id: loginData?.user_id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  return { fetchBranches };
};
