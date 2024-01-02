import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBusinessEmployeeThunk } from "store/settings/team/team";
import { useGetYearlyStatistics } from "./useGetYearlyStatistics";
import { setLoader } from "store/global/globalReducer";

export const useGetSingleEmployee = () => {
  const dispatch = useDispatch();

  const { fetchYearlyStats } = useGetYearlyStatistics();
  const fetchEmployee = (id) => {
    dispatch(setLoader(true));
    dispatch(fetchBusinessEmployeeThunk({ employee_id: id }))
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchYearlyStats(id);
      });
  };
  return { fetchEmployee };
};
