import { SmallLoader } from "components/common/SmallLoader";
import AllTasks from "components/workplace-content/tasks-pages/AllTasks";
import TasksJumbo from "components/workplace-content/tasks-pages/TasksJumbo";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegisteredEmployeesThunk } from "store/settings/team/team";
import {
  getAllTaskStatusesThunk,
  getAllTaskTypeThunk,
  getAllTasksThunk,
} from "store/workspace/workspaceTasks";
import { BUSINESS_ID } from "utills/globalVars";
import { MultipleUsers } from "utills/svgs/MultipleUsers";
import arrowUp from "../../../files/arrowUp.gif";
import TaskOperationTraining from "./TaskOperationsTraining";

const TasksTrainingPage = ({
  toggleActivity,
  toggleTaskDetails,
  toggleAddTask,
  tasksUpdated,
}) => {
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
    task_status_id: "",
    is_completed: "false",
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
        setTasksLoading(false);
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
        const filter = filters;
        getAllTasks({ business_id, filter });
      });
  };

  useEffect(() => {
    getTaskStatus();
  }, [dispatch, tasksUpdated, filters]);

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
      <TasksJumbo toggleActivity={toggleActivity} />

      <div>
        <TaskOperationTraining
          getAllTasks={getAllTasks}
          updateFilters={updateFilters}
          toggleAddTask={toggleAddTask}
          hasStatuses={!data?.rows.length ? false : true}
          filters={filters}
        />
      </div>
      <div>
        {!data?.rows.length ? (
          <div className="w-full h-72 flex justify-center items-center flex-col gap-5">
            <img src={arrowUp} alt="gif" className="arrow-task" />
            <div className="add-ann-form">
              <label className="text-xl">
                Please complete Task Module Settings{" "}
              </label>
            </div>
          </div>
        ) : (
          <span>
            {" "}
            {!tasks?.length ? (
              <div className="w-full h-72 flex flex-col gap-5 no-team justify-center items-center">
                <div>
                  {" "}
                  <MultipleUsers />
                </div>
                <div> There is no team added yet </div>
              </div>
            ) : (
              <span>
                {tasksLoading ? (
                  <div className="w-full h-72 flex justify-center items-center">
                    <SmallLoader />
                  </div>
                ) : (
                  <AllTasks
                    statuses={data}
                    toggleTaskDetails={toggleTaskDetails}
                    toggleAddTask={toggleAddTask}
                  />
                )}
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default TasksTrainingPage;
