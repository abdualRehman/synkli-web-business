import React from "react";
import { useDispatch } from "react-redux";
import { fetchRegisteredEmployeesThunk } from "store/settings/team/team";

export const FetchEmployees = () => {
  const dispatch = useDispatch();
  const fetchEmployees = () => {
    dispatch(fetchRegisteredEmployeesThunk())
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchActivity();
      });
  };
  return {};
};
