import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { yearlyStatisticsThunk } from "store/workspace/workspaceEmployeeTasks";
import { useGetWeeklyStatsEmp } from "./useGetWeeklyStatsEmp";

export const useGetYearlyStatistics = () => {
  const dispatch = useDispatch();
  const { fetchWeeklyStats } = useGetWeeklyStatsEmp();
  const fetchYearlyStats = (id) => {
    dispatch(yearlyStatisticsThunk({ employee_id: id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchWeeklyStats(id);
      });
  };
  return { fetchYearlyStats };
};
