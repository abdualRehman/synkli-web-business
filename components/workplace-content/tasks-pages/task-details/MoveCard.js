import React from "react";
import "./css/taskDetail.css";
import { LeftIcon } from "utills/svgs/LeftIcon";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { BlackLeftIcon } from "utills/svgs/BlackLeftIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import { generateId } from "utills/uid";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";
import { useDispatch } from "react-redux";
import { updateTaskThunk } from "store/workspace/workspaceTasks";
export const MoveCard = ({
  toggleModal,
  data,
  handleTasksUpdate,
  task_id,
  toggleTaskDetails,
}) => {
  const business_id = localStorage.getItem(BUSINESS_ID);
  const dispatch = useDispatch();

  const handleUpdateTask = (task_status_id) => {
    const payload = {
      task_id,
      task_status_id,
      business_id,
    };

    dispatch(updateTaskThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleTaskDetails();
          handleTasksUpdate();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="moveModal add-ann-form p-3">
      <div className="flex justify-between items-center mb-5">
        <span className="move-to">Move To</span>
        <span onClick={toggleModal} className="cursor-pointer">
          <BgTimes />
        </span>
      </div>
      {data &&
        data.rows.map((status, index) => (
          <div
            onClick={() => handleUpdateTask(status?.task_status_id)}
            className="flex items-center justify-between gap-16 child mt-2 cursor-pointer"
            key={generateId()}
          >
            <span>
              {" "}
              <label>{status.label}</label>
            </span>
            <span>
              {" "}
              <BlackLeftIcon />
            </span>
          </div>
        ))}
    </div>
  );
};
