import { useState } from "react";
import { useMediaQuery } from "react-responsive";
const ReportsTable = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isTabletOrMobile = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "John",
      created: 2,
      accepted: 1,
      completed: 0,
      delayed: 0,
    },
    {
      id: 2,
      name: "Alice",
      created: 5,
      accepted: 3,
      completed: 2,
      delayed: 2,
    },
    {
      id: 3,
      name: "Bob",
      created: 1,
      accepted: 1,
      completed: 1,
      delayed: 0,
    },
    {
      id: 4,
      name: "Sarah",
      created: 3,
      accepted: 2,
      completed: 1,
      delayed: 0,
    },
    {
      id: 5,
      name: "Michael",
      created: 2,
      accepted: 0,
      completed: 0,
      delayed: 1,
    },
    {
      id: 6,
      name: "Emily",
      created: 4,
      accepted: 2,
      completed: 2,
      delayed: 0,
    },
  ]);

  return (
    <div className="mt-5">
      <div className="px-10 ">
        <div className="grid grid-cols-6 task-heading ">
          <div>Employee Name</div>
          <div>Task Created</div>
          <div>Task Accepted</div>
          <div>Task Completed</div>
          <div>Task Delayed</div>

          <div className="flex justify-center">Actions</div>
        </div>
        <div className="team-line mt-3"></div>
        {tasks.map((task) => (
          <div key={task.id}>
            <div className="grid grid-cols-6 task-table mt-3">
              <div>{task.name}</div>
              <div>{task.created}</div>
              <div>{task.accepted}</div>
              <div>{task.completed}</div>
              <div>{task.delayed}</div>
              <div className="flex justify-center">
                <svg
                  width="26"
                  height="20"
                  viewBox="0 0 36 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    opacity="0.05"
                    width="36"
                    height="30"
                    rx="15"
                    fill="url(#paint0_linear_1531_5633)"
                  />
                  <path
                    d="M18.5 12.2015C19.2595 12.2015 19.9879 12.4966 20.5249 13.0219C21.0619 13.5471 21.3636 14.2596 21.3636 15.0025C21.3636 15.7453 21.0619 16.4578 20.5249 16.983C19.9879 17.5083 19.2595 17.8034 18.5 17.8034C17.7405 17.8034 17.0121 17.5083 16.4751 16.983C15.9381 16.4578 15.6364 15.7453 15.6364 15.0025C15.6364 14.2596 15.9381 13.5471 16.4751 13.0219C17.0121 12.4966 17.7405 12.2015 18.5 12.2015ZM18.5 8C23.1391 8 27.3009 10.801 29 15.0025C26.7186 20.6791 20.1705 23.4614 14.3668 21.23C11.4555 20.1096 9.14545 17.8595 8 15.0025C9.69909 10.801 13.8609 8 18.5 8ZM10.0809 15.0025C12.3527 19.5494 17.975 21.4354 22.6236 19.2039C24.493 18.3092 26.0043 16.8309 26.9191 15.0025C24.6473 10.4555 19.025 8.56953 14.3764 10.801C12.507 11.6957 10.9957 13.174 10.0809 15.0025Z"
                    fill="url(#paint1_linear_1531_5633)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1531_5633"
                      x1="19.7664"
                      y1="0.37257"
                      x2="19.7476"
                      y2="30.0001"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="0.998509" stop-color="#0D1B37" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                    <linearGradient
                      id="paint1_linear_1531_5633"
                      x1="19.5304"
                      y1="8.17387"
                      x2="19.5234"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#101828" />
                      <stop offset="0.998509" stop-color="#0D1B37" />
                      <stop offset="1" stop-color="#0A1E46" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="team-line mt-3"></div>
          </div>
        ))}

        <div className=" mt-5 pagination ">
          <div className="recently-added">Showing 6 to 10 of 26 entries</div>
          <div className="pagination-btns">
            <button>Previous</button>
            <button className="btn-1-pag">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button className="next-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTable;
