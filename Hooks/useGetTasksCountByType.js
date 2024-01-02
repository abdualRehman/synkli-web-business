import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { taskCountByTypeThunk } from "store/workspace/workspaceEmployeeTasks";
import { BUSINESS_ID } from "utills/globalVars";
import { useGetTaskEmpInfo } from "./useGetTaskEmpInfo";

export const useGetTasksCountByType = () => {
  const { fetchTaskEmpInfo } = useGetTaskEmpInfo();
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const fetchCountByType = (id) => {
    dispatch(taskCountByTypeThunk({ employee_id: id, business_id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchTaskEmpInfo(id);
      });
  };
  return { fetchCountByType };
};
