import React from "react";
import { useDispatch } from "react-redux";
import { employeeEfficiencyThunk } from "store/workspace/workspaceEmployeeTasks";
import { useGetSingleEmpTasks } from "./useGetSingleEmpTasks";

export const useGetEmpEfficiency = () => {
  const dispatch = useDispatch();
  const { fetchEmpTasks } = useGetSingleEmpTasks();
  const fetchEfficiency = (id) => {
    dispatch(employeeEfficiencyThunk({ employee_id: id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchEmpTasks(id);
      });
  };
  return { fetchEfficiency };
};
