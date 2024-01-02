import Cookies from "js-cookie";
import TaskCreated from "./tasks-cards/TaskCreated";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ALL_TASKS, BUSINESS_ID } from "utills/globalVars";
import { generateId } from "utills/uid";
import { getAllTasksThunk } from "store/workspace/workspaceTasks";
import { useEffect } from "react";

const AllTasks = ({ toggleAddTask, toggleTaskDetails, statuses }) => {
  const { data } = useSelector((state) => state.getAllTasks);

  // const [{ isDragging }, drag] = useDrag({
  //   type: "DIV",
  //   item: { id: "123" },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // const [{ isOver }, drop] = useDrop({
  //   accept: "DIV",
  //   drop: (item) => addItem("itemid"),

  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //   }),
  // });
  // const addItem = (str) => {
  //   console.log(str);
  // };

  return (
    <div
      style={{ overflowX: "auto" }}
      className="  md:mx-10 mx-5 mt-3 mb-5 all-tasks-container"
    >
      {data && data.map((status, index) => (
        <div className="task-number" key={generateId()}>
          <TaskCreated
            index={index}
            toggleAddTask={toggleAddTask}
            status={status}
            toggleTaskDetails={toggleTaskDetails}
          />
        </div>
      ))}
    </div>
  );
};
export default AllTasks;
