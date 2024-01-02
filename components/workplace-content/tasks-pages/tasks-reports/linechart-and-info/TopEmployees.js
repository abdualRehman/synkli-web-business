import ProgressBar from "@ramonak/react-progress-bar";
import React, { useState } from "react";

export const TopEmployees = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "James Johnson", email: "james@example.com" },
    { id: 4, name: "Emily Williams", email: "emily@example.com" },
    { id: 5, name: "Michael Brown", email: "michael@example.com" },
  ]);
  return (
    <div className="p-3">
      <div className="chart-title text-black">Top 5 Employees</div>
      {users.map((user, index) => (
        <div
          className="top-employee-card flex gap-3 items-center mt-2 w-full"
          key={index}
        >
          <div>
            <div className="top-employee-img-wrapper">
              <img
                src="https://picsum.photos/200/300"
                alt="profile"
                className="top-employee-img"
              />
            </div>
          </div>
          <div>
            <div className="top-employee-name">{user.name}</div>
            <div className="top-employee-email">{user.email}</div>
            <div className="grid-container-top-emp">
              <div>
                <ProgressBar
                  completed={50}
                  bgColor="#0D1B37"
                  height="5px"
                  width="100%"
                  animateOnRender={true}
                  isLabelVisible={false}
                />
              </div>
              <div className="top-emp-task-counter ">10/10</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
