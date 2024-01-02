import React, { useState } from "react";
import "./css/taskDetail.css";
import { useDispatch } from "react-redux";
import { addEmployeeToTaskThunk } from "store/workspace/workspaceTasks";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { toastHandler } from "responseHanlder";
import { TOAST_TYPE_ERROR, TOAST_TYPE_SUCCESS } from "utills/globalVars";
import { BgTimes } from "utills/svgs/BgTimes";
export const EmployeesModal = ({
  employees,
  task_id,
  toggleShowAddEmp,
  getSingleTask,
  handleTasksUpdate,
}) => {
  const dispatch = useDispatch();
  const [user_id, setUserId] = useState("");
  const [empLoader, setEmpLoader] = useState(false);

  const addEmp = () => {
    if (!user_id) {
      toastHandler("Please select an employee first", TOAST_TYPE_ERROR);
      return;
    }
    const payload = {
      employee_id: user_id,
      task_id,
    };
    setEmpLoader(true);
    dispatch(addEmployeeToTaskThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleShowAddEmp();
          getSingleTask();
          handleTasksUpdate();
          toastHandler("Employee added", TOAST_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setEmpLoader(false);
      });
  };
  return (
    <div className="employees-modal p-5 mt-2 add-ann-form">
      <div className="flex justify-end items-enter mb-2">
        <span onClick={toggleShowAddEmp} className="cursor-pointer">
          {" "}
          <BgTimes />
        </span>
      </div>
      {/* <div className="detail-task-title">Add Employees </div> */}

      <label>Select Employees</label>
      <select onChange={(e) => setUserId(e.target.value)}>
        <option value="" disabled selected>
          select
        </option>
        {employees &&
          employees?.map((emp, index) => (
            <option value={emp.user_id} key={emp.user_id}>
              {emp.first_name}
            </option>
          ))}
      </select>
      <hr className="my-2"></hr>
      <div className="mt-2 flex items-center justify-between gap-3">
        <button
          onClick={toggleShowAddEmp}
          className="edit-cancel-btn px-3 py-2"
        >
          {" "}
          Cancel{" "}
        </button>{" "}
        <button
          onClick={addEmp}
          className="ann-btn px-3 py-2 rounded-lg mt-1 flex items-center gap-2"
        >
          Add {empLoader ? <SmallLoaderWhite /> : ""}{" "}
        </button>{" "}
      </div>
    </div>
  );
};
