import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRegisteredEmployeesThunk } from "store/settings/team/team";

export const useGetEmployees = () => {
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    dispatch(fetchRegisteredEmployeesThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setEmployees(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  }, []);

  return { employees };
};
