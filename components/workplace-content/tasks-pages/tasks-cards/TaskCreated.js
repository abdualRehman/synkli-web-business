import { useDrag, useDrop } from "react-dnd";

import "./css/tasksCards.css";
import { useEffect, useRef, useState } from "react";
import { BigPlusIcon } from "utills/svgs/BigPlusIcon";

import { useDispatch, useSelector } from "react-redux";
import {
  handleTaskDetails,
  handleTaskStatus,
} from "store/global/globalReducer";
import Cookies from "js-cookie";
import { BUSINESS_ID, TOAST_TYPE_SUCCESS } from "utills/globalVars";
import { TaskItem } from "./TaskItem";
import { getAllTasks, updateTaskThunk } from "store/workspace/workspaceTasks";
import _ from "lodash";
import { toastHandler } from "responseHanlder";
import TaskDetails from "../task-details/TaskDetails";
const colors = ["#EDF6FF", "#D8F895", " #F0EBFF", "#EDF6FF", "#FFF4EB"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const TaskCreated = ({ status, toggleAddTask, toggleTaskDetails, index }) => {
  const { data: tasks } = useSelector((state) => state.getAllTasks);
  const [attInView, setAttInView] = useState(null);
  const business_id = localStorage.getItem(BUSINESS_ID);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(handleTaskStatus(status));
    toggleAddTask();
  };

  const moveTasks = (status_id, itemid) => {
    console.log(status_id, itemid, "item");
  };

  const handleUpdateTask = (task_status_id, itemid, statusLabel) => {
    const payload = {
      task_id: itemid,
      task_status_id,
      business_id,
    };

    dispatch(updateTaskThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toastHandler(
            `Task moved from ${statusLabel} to ${status.label}`,
            TOAST_TYPE_SUCCESS
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateStatus = (itemid, itemStatusId, statusLabel) => {
    const newTasks = _.cloneDeep(tasks);
    const findStatus = newTasks?.find(
      (status) => status.task_status_id === itemStatusId
    );

    const dropStatus = newTasks.find(
      (statusitem) => statusitem.task_status_id === status.task_status_id
    );

    const findTask = findStatus?.tasks?.find(
      (task) => task?.task_id === itemid
    );

    console.log(findTask);

    dropStatus?.tasks?.push(findTask);

    const removeTaskIndex = findStatus?.tasks.indexOf(findTask);

    findStatus?.tasks.splice(removeTaskIndex, 1);

    dispatch(getAllTasks.actions.handleUpdate(newTasks));

    handleUpdateTask(dropStatus.task_status_id, itemid, statusLabel);
  };
  const [, ref] = useDrop({
    accept: "DIV",
    drop: (droppedItem) => {
      updateStatus(
        droppedItem.id,
        droppedItem.status_id,
        droppedItem.status_label
      );
      console.log("Drop Target ID: " + status.task_status_id, status.label);

      console.log("Dropped Task ID: " + droppedItem.id);
      console.log("Dropped Task Text: " + droppedItem.text);
      console.log("Dropped Task status: " + droppedItem.status_id);
      console.log("Dropped Task status label: " + droppedItem.status_label);
    },
  });
  return (
    <div ref={ref}>
      <div className=" mb-5">
        <div className="bar-container text-black">
          <div
            style={{ backgroundColor: colors[index % colors.length] }}
            className="task-created-bar shadow flex justify-between mr-1"
          >
            <div>{status.label}</div>
            <div>
              <div></div>
              <div className="flex gap-2 items-center">
                <span className="task-length mr-2">
                  {status?.tasks?.length}
                </span>

                {/* <span onClick={handleAddTask} className="cursor-pointer ">
                  <BigPlusIcon />
                </span> */}
              </div>
            </div>
          </div>
        </div>

        <div className="  task-created-container">
          {status &&
            status?.tasks?.map((task) => (
              <TaskItem
                task={task}
                toggleTaskDetails={toggleTaskDetails}
                status={status}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCreated;
