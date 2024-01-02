import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTaskStatusesThunk,
  getAllTasksThunk,
} from "store/workspace/workspaceTasks";
import { BUSINESS_ID } from "utills/globalVars";
import { TaskStatus } from "./TaskStatus";
import { generateId } from "utills/uid";

export const EmployeeTasksCards = ({ employeeTasks }) => {
  console.log(employeeTasks, "empppp");
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [statuses, setStatuses] = useState([]);
  const { data } = useSelector((state) => state.getAllTaskStatuses);
  const { data: tasks } = useSelector((state) => state.getAllTasks);

  const getAllTasks = (payload) => {
    dispatch(getAllTasksThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getAllTaskStatusesThunk({ business_id }))
      .then((response) => {
        if (response.payload) {
          setStatuses(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getAllTasks({ business_id, filter: {} });
      });
  }, []);
  return (
    <div className="mt-5">
      {" "}
      <div
        style={{ overflowX: "auto" }}
        className="  md:mx-10 mx-5 mt-3 mb-5 all-tasks-container"
      >
        {employeeTasks &&
          employeeTasks?.map((status, index) => (
            <div className="task-number" key={generateId()}>
              <TaskStatus index={index} status={status} />
            </div>
          ))}
      </div>
    </div>
  );
};
