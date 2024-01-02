import React, { useEffect, useState } from "react";
import { TasksCompletedJumbo } from "./TasksCompletedJumbo";
import { TasksCompletedOperations } from "./TasksCompletedOperations";
import { TasksCompletedCards } from "./TasksCompletedCards";
import { ChartAndEmployees } from "./chart-and-employees/ChartAndEmployees";
import { TasksList } from "./tasks/TasksList";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { fetchRegisteredEmployeesThunk } from "store/settings/team/team";
import {
  getAllTaskStatusesThunk,
  getAllTaskTypeThunk,
  getAllTasksThunk,
} from "store/workspace/workspaceTasks";
import moment from "moment";
import { fetchBusinessCustomerAllThunk } from "store/client";
import {
  weeklyStatsEmployeeThunk,
  yearlyStatisticsThunk,
} from "store/workspace/workspaceEmployeeTasks";
import { weeklyStatsCompletedThunk } from "store/workspace/workspaceCompletedTasks";

export const TasksCompletedPage = ({ toggleTaskDetails }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.getAllTaskStatuses);
  const { data: tasks } = useSelector((state) => state.getAllTasks);

  const business_id = localStorage.getItem(BUSINESS_ID);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [filters, setFilters] = useState({
    search_term: "",
    employee_id: "",
    start_date: "",
    task_type_id: "",
    customer_id: "",
    sort_by: "",
    is_completed: "true",
    reference_number: "",
  });

  const fetchEmployees = () => {
    dispatch(fetchRegisteredEmployeesThunk())
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchYearlyStats();
      });
  };

  const getAllTypes = () => {
    dispatch(getAllTaskTypeThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchEmployees();
      });
  };

  const getAllTasks = (payload) => {
    setTasksLoading(true);
    dispatch(getAllTasksThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTasksLoading(false);
      });
  };

  const fetchCustomers = () => {
    const payload = {
      business_id,
      customer_type: false,
    };

    dispatch(fetchBusinessCustomerAllThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getAllTypes();
      });
  };

  const getTaskStatus = () => {
    dispatch(getAllTaskStatusesThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
      })
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchCustomers();
      });
  };

  const fetchYearlyStats = () => {
    dispatch(yearlyStatisticsThunk())
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchWeeklyStats();
      });
  };

  const fetchWeeklyStats = () => {
    dispatch(weeklyStatsCompletedThunk())
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getAllTasks({ business_id, filter: filters });
      });
  };
  useEffect(() => {
    getTaskStatus();
    // fetchCustomers();
    // getAllTypes();
    // fetchEmployees();
    // fetchYearlyStats();
    // fetchWeeklyStats();
    // getAllTasks({ business_id, filter: filters });
  }, [dispatch, filters]);

  const updateFilters = (newFilters) => {
    let filters = newFilters;
    if (newFilters.start_date) {
      filters = {
        ...filters,
        start_date: moment(newFilters.start_date).format("DD-MM-YYYY"),
      };
    }
    setFilters(filters);
  };

  return (
    <div>
      <TasksCompletedJumbo />
      <TasksCompletedOperations
        updateFilters={updateFilters}
        filters={filters}
      />
      <TasksCompletedCards />
      <TasksList tasks={tasks} toggleTaskDetails={toggleTaskDetails} />
    </div>
  );
};
