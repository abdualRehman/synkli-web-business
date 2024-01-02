import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRegisteredEmployeesThunk } from "store/settings/team/team";
import { generateId } from "utills/uid";

export const TaskEmployees = () => {
  const dispatch = useDispatch();
  const [employees, setbusinessEmployees] = useState([]);
  const fetchEmployees = () => {
    const payload = {
      task_stats: "true",
    };

    dispatch(fetchRegisteredEmployeesThunk(payload))
      .then((response) => {
        setbusinessEmployees(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const navigate = useNavigate();
  const handleNavigate = (business_employee_id) => {
    navigate(`/employee/tasks/${business_employee_id}`);
  };
  return (
    <div className=" p-3 all-emp-wrapper">
      <div className="employees-list-card">
        {employees &&
          employees?.map((emp, index) => (
            <div
              key={generateId()}
              className="emp-info-wrapper cursor-pointer"
              onClick={() => handleNavigate(emp?.user_id)}
            >
              <div
                className={`emp-info-container flex gap-2 items-center ${
                  index > 0 && "mt-3"
                }`}
              >
                <div>
                  <div className="emp-img-container">
                    <img
                      src={emp.name ?? "https://picsum.photos/200/300"}
                      alt="file"
                      className="emp-img"
                    />
                  </div>
                </div>
                <div>
                  <div className="emp-name">
                    {" "}
                    {emp?.first_name} {emp?.last_name}{" "}
                  </div>
                  <div className="emp-email">{emp?.email.slice(0, 15)}</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-5">
                <div>
                  {" "}
                  <div className="assigned-tasks">
                    <div>Assigned Task </div>
                    <div className="emp-task-count">
                      {" "}
                      {emp?.task_assign ? emp.task_assign : 0}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>
                <div className="completed-tasks">
                  {" "}
                  <div>Completed Task </div>{" "}
                  <div className="emp-task-count">
                    {" "}
                    {emp?.task_completed ? emp.task_completed : 0}{" "}
                  </div>
                </div>
                <div className="delayed-tasks">
                  {" "}
                  <div> Delayed Task </div>{" "}
                  <div className="emp-task-count">
                    {emp?.task_overdue ? emp.task_overdue : 0}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
