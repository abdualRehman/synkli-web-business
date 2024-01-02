import { useState } from "react";
const TaskReviewed = () => {
  const [taskCreatedList, setTaskCreated] = useState([
    {
      id: 1,
      title: "Task 1",
      description: "Description for Task 1",
      date: "2023-05-09",
      comments: [
        {
          name: "John",
          text: "Comment 1 for Task 1",
          date: "2023-05-09",
          time: "10:00 AM",
          picture: "https://randomuser.me/api/portraits/men/1.jpg",
          isdownloadable: true,
        },
        {
          name: "Alice",
          text: "Comment 2 for Task 1",
          date: "2023-05-09",
          time: "11:00 AM",
          picture: "https://randomuser.me/api/portraits/women/2.jpg",
          isdownloadable: true,
        },
      ],
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description for Task 2",
      date: "2023-05-10",
      comments: [
        {
          name: "Bob",
          text: "Comment 1 for Task 2",
          date: "2023-05-10",
          time: "9:00 AM",
          picture: "https://randomuser.me/api/portraits/men/3.jpg",
          isdownloadable: true,
        },
        {
          name: "Eve",
          text: "Comment 2 for Task 2",
          date: "2023-05-10",
          time: "10:00 AM",
          picture: "https://randomuser.me/api/portraits/women/4.jpg",
          isdownloadable: true,
        },
      ],
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description for Task 3",
      date: "2023-05-11",
      comments: [
        {
          name: "Sarah",
          text: "Comment 1 for Task 3",
          date: "2023-05-11",
          time: "2:00 PM",
          picture: "https://randomuser.me/api/portraits/women/5.jpg",
          isdownloadable: true,
        },
        {
          name: "Michael",
          text: "Comment 2 for Task 3",
          date: "2023-05-11",
          time: "3:00 PM",
          picture: "https://randomuser.me/api/portraits/men/6.jpg",
          isdownloadable: true,
        },
      ],
      src: [
        "https://picsum.photos/800/600/?random",
        "https://picsum.photos/800/600/?random",
      ],
    },
  ]);

  return (
    <div className="task-created-container ">
      <div className="task-created-bar shadow px-3 flex justify-between">
        <div>Task Reviewed</div>
        <div>
          <div></div>
          <div>
            <svg
              width="22"
              height="22"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.1"
                width="30"
                height="30"
                rx="15"
                fill="url(#paint0_linear_1526_3881)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 8C14.3557 8 13.8333 8.52234 13.8333 9.16667V13.8333H9.16667C8.52233 13.8333 8 14.3557 8 15C8 15.6443 8.52234 16.1667 9.16667 16.1667H13.8333V20.8333C13.8333 21.4777 14.3557 22 15 22C15.6443 22 16.1667 21.4777 16.1667 20.8333V16.1667H20.8333C21.4777 16.1667 22 15.6443 22 15C22 14.3557 21.4777 13.8333 20.8333 13.8333H16.1667V9.16667C16.1667 8.52233 15.6443 8 15 8Z"
                fill="url(#paint1_linear_1526_3881)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1526_3881"
                  x1="16.472"
                  y1="0.37257"
                  x2="16.4495"
                  y2="30.0001"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#101828" />
                  <stop offset="0.998509" stop-color="#0D1B37" />
                  <stop offset="1" stop-color="#0A1E46" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1526_3881"
                  x1="15.6869"
                  y1="8.17387"
                  x2="15.6764"
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
      </div>

      <div className=" task-created-list">
        {taskCreatedList.map((task) => (
          <div key={task.id} className="task-created-card mt-3 shadow relative">
            <div className="task-action absolute right-2 top-2">
              <svg
                width="13"
                height="3"
                viewBox="0 0 19 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="2.5" cy="2.5" r="2.5" fill="black" />
                <circle cx="9.5" cy="2.5" r="2.5" fill="black" />
                <circle cx="16.5" cy="2.5" r="2.5" fill="black" />
              </svg>
            </div>
            <div className="task-top px-3 pt-5">
              {task.src ? (
                <div className="task-image-container">
                  <img src={task.src[0]} alt="taskimg" className="task-image" />
                </div>
              ) : (
                ""
              )}

              <div className={`task-info px-2 ${task.src ? "mt-2" : ""}`}>
                <div className="task-title">{task.title}</div>
                <div className="task-description mt-1">
                  {task.description.repeat(3)}
                </div>
                <div className="task-date mt-2 ">{task.date}</div>
              </div>
            </div>
            <hr className="mt-3" />

            <div className="task-bottom grid grid-cols-2 px-5 ">
              <div className="images-wrapper ">
                {task.comments.length ? (
                  <div class="image-stack   ">
                    <div className="first-image-wrapper">
                      <img
                        src={task.comments[0].picture}
                        alt="taskcommentpicture"
                        className="first-image"
                      />
                    </div>
                    <div className="second-image-wrapper">
                      <img
                        src={task.comments[1].picture}
                        alt="taskcommentpicture"
                        className="second-image"
                      />
                    </div>
                    <div className="third-image-wrapper">
                      <img
                        src={task.comments[0].picture}
                        alt="taskcommentpicture"
                        className="third-image"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center justify-end">
                <div className="flex gap-2 items-center  task-file">
                  <div>
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.2"
                        width="30"
                        height="30"
                        rx="15"
                        fill="#B695F8"
                      />
                      <path
                        d="M17.6714 7.77735C18.557 7.77728 19.4234 8.03569 20.1643 8.52087C20.9052 9.00606 21.4884 9.69692 21.8423 10.5087C22.1962 11.3205 22.3055 12.218 22.1567 13.091C22.0079 13.964 21.6076 14.7746 21.0048 15.4233L20.8607 15.5704L14.2432 22.1875L14.2031 22.2254L14.1606 22.2596C13.6215 22.7243 12.9268 22.9681 12.2155 22.9421C11.5042 22.9162 10.8291 22.6224 10.3253 22.1197C9.82148 21.617 9.52629 20.9425 9.49887 20.2313C9.47145 19.5202 9.71381 18.8249 10.1774 18.2849L10.2904 18.1606L10.3018 18.1522L15.8296 12.6141C15.9716 12.4717 16.1645 12.3916 16.3656 12.3914C16.5668 12.3912 16.7597 12.4709 16.9021 12.613C17.0445 12.755 17.1246 12.9479 17.1248 13.149C17.125 13.3501 17.0453 13.5431 16.9033 13.6855L11.3755 19.2236L11.3664 19.2297C11.1433 19.4679 11.0175 19.7811 11.014 20.1075C11.0105 20.4339 11.1294 20.7497 11.3473 20.9927C11.5652 21.2357 11.8662 21.3883 12.1911 21.4203C12.5159 21.4522 12.841 21.3613 13.1021 21.1654L13.1946 21.0896L13.1953 21.0904L19.7938 14.4938L19.9144 14.3687C20.4452 13.7852 20.7279 13.0178 20.7023 12.2294C20.6768 11.441 20.345 10.6935 19.7775 10.1456C19.2099 9.59773 18.4512 9.29251 17.6624 9.29472C16.8735 9.29692 16.1165 9.60638 15.552 10.1574L15.4345 10.2788L15.4208 10.2879L8.34921 17.3621C8.27876 17.4325 8.19513 17.4884 8.1031 17.5265C8.01107 17.5645 7.91244 17.5841 7.81284 17.5841C7.71325 17.584 7.61463 17.5644 7.52263 17.5263C7.43063 17.4881 7.34704 17.4322 7.27664 17.3618C7.20623 17.2913 7.1504 17.2077 7.11232 17.1157C7.07423 17.0236 7.05465 16.925 7.05469 16.8254C7.05476 16.6243 7.13473 16.4314 7.27701 16.2892L14.335 9.22784L14.3699 9.19524C14.7947 8.74662 15.3066 8.38946 15.8743 8.14565C16.442 7.90184 17.0535 7.77651 17.6714 7.77735Z"
                        fill="#B695F8"
                      />
                    </svg>
                  </div>
                  <div className="task-date">2</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskReviewed;
