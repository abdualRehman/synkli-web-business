import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBranchLocationsThunk } from "store/auth/slices";
import { setSideLoader } from "store/global/globalReducer";
import { BUSINESS_ID } from "utills/globalVars";

export const useGetBranch = () => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    dispatch(getBranchLocationsThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setBranches(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);
  return { branches };
};
