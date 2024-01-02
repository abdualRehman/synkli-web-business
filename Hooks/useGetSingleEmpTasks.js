import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { singleEmployeeTaksThunk } from "store/workspace/workspaceEmployeeTasks";
import { BUSINESS_ID } from "utills/globalVars";
import { useGetTasksCountByType } from "./useGetTasksCountByType";

export const useGetSingleEmpTasks = () => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { fetchCountByType } = useGetTasksCountByType();
  const fetchEmpTasks = (id) => {
    dispatch(singleEmployeeTaksThunk({ employee_id: id, business_id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchCountByType(id);
      });
  };
  return { fetchEmpTasks };
};
