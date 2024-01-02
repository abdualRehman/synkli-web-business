import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { getAllTaskStatusesThunk } from "store/workspace/workspaceTasks";
import { BUSINESS_ID } from "utills/globalVars";

export const FetchStatuses = () => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const getStatuses = () => {
    dispatch(getAllTaskStatusesThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchEmployees();
      });
  };

  return <div>FetchStatuses</div>;
};
