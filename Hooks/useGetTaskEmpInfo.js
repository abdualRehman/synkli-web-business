import React from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { getTaskEmpInfoThunk } from "store/workspace/workspaceEmployeeTasks";

export const useGetTaskEmpInfo = () => {
  const dispatch = useDispatch();
  const fetchTaskEmpInfo = (id) => {
    dispatch(getTaskEmpInfoThunk({ employee_id: id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  return { fetchTaskEmpInfo };
};
