import React from "react";
import { useDispatch } from "react-redux";
import { weeklyStatsEmployeeThunk } from "store/workspace/workspaceEmployeeTasks";
import { useGetEmpEfficiency } from "./useGetEmpEfficiency";

export const useGetWeeklyStatsEmp = () => {
  const { fetchEfficiency } = useGetEmpEfficiency();
  const dispatch = useDispatch();
  const fetchWeeklyStats = (id) => {
    dispatch(weeklyStatsEmployeeThunk({ employee_id: id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchEfficiency(id);
      });
  };
  return { fetchWeeklyStats };
};
