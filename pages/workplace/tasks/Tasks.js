import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import TasksPage from "../../../components/workplace-content/tasks-pages/TasksPage";
import RecentActivity from "../../../components/workplace-content/tasks-pages/recent-activity/RecentActivity";
import TaskDetails from "../../../components/workplace-content/tasks-pages/task-details/TaskDetails";
import AddTask from "../../../components/workplace-content/tasks-pages/add-task/AddTask";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { TOAST_TYPE_ERROR } from "utills/globalVars";

const Tasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showRecentActivity, setShowRecentActivity] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [task, setTask] = useState(null);
  const [tasksUpdated, setTasksUpdated] = useState(false);
  const { allPermissions } = useSelector((state) => state.global);
  const { data: loginData } = useSelector((state) => state.login);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleActivity = () => {
    setShowRecentActivity(!showRecentActivity);
  };

  const toggleTaskDetails = () => {
    setShowTaskDetails(!showTaskDetails);
  };
  function pushTask(task) {
    setTask(task);
    console.log(task);
    setShowTaskDetails(!showTaskDetails);
  }

  const toggleAddTask = () => {
    if (allPermissions.Tasks?.write || !loginData?.is_employee) {
      setShowAddTask(!showAddTask);
    } else {
      toastHandler(
        "You dont have permission to access this page",
        TOAST_TYPE_ERROR
      );
    }
  };

  const handleTasksUpdate = () => {
    setTasksUpdated(!tasksUpdated);
  };
  return (
    <div className="app-dashboard">
      {showAddTask && (
        <AddTask
          toggleAddTask={toggleAddTask}
          handleTasksUpdate={handleTasksUpdate}
        />
      )}
      {showRecentActivity && <RecentActivity toggleActivity={toggleActivity} />}
      {showTaskDetails && (
        <TaskDetails
          toggleTaskDetails={toggleTaskDetails}
          handleTasksUpdate={handleTasksUpdate}
        />
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {allPermissions?.Tasks?.read || !loginData.is_employee ? (
        <div className={`content ${isOpen ? "squeeze" : ""}`}>
          <TasksPage
            toggleActivity={toggleActivity}
            toggleTaskDetails={toggleTaskDetails}
            toggleAddTask={toggleAddTask}
            tasksUpdated={tasksUpdated}
          />
        </div>
      ) : (
        <div className="w-full h-72 flex justify-center items-center font-poppins">
          You dont have permission to access this data
        </div>
      )}
    </div>
  );
};
export default Tasks;
