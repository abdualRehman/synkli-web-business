import React from "react";
import { TaskItem } from "./task-item/TaskItem";
export const TasksList = ({ toggleTaskDetails, tasks }) => {
  const formatTask = tasks?.flatMap((item) => item?.tasks);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:mx-10 mx-5 mt-2">
      {formatTask && formatTask?.map((task, index) => (
        <TaskItem
          task={task}
          index={index}
          toggleTaskDetails={toggleTaskDetails}
        />
      ))}
    </div>
  );
};
