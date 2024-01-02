import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { handleTaskDetails } from "store/global/globalReducer";
import { dynamicWidthgenerator } from "utills/dynamicWidthGenerator";
import { formateDate, getDueStatusWithTime } from "utills/moment";
import { AttachmentIcon } from "utills/svgs/AttachmentIcon";
import { LightOrangeUser } from "utills/svgs/LightOrangeUser";
import { OverDueIcon } from "utills/svgs/OverDueIcon";
import { RedUser } from "utills/svgs/RedUser";
import { ThreeDotHorizontal } from "utills/svgs/ThreeDotHorizontal";
import { generateId } from "utills/uid";
import TaskDetails from "../task-details/TaskDetails";

export const TaskItem = ({ task, toggleTaskDetails, status }) => {
  const [{ isDragging }, ref] = useDrag({
    type: "DIV",
    item: {
      id: task?.task_id,
      text: task?.title,
      status_id: status.task_status_id,
      status_label: status.label,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const rotationDegrees = isDragging ? 5 : 0; // Rotate when dragging, reset when not dragging

  const taskClasses = `task-created-card cursor-grab mt-3 shadow relative`;
  const dispatch = useDispatch();
  function ReturnDate(task) {
    const newDate = getDueStatusWithTime(
      task?.start_date,
      task?.start_time,
      task?.end_date,
      task?.end_time
    );

    if (newDate.includes("Due in")) {
      return <button className="bg-gray-300 due-btn">{newDate}</button>;
    } else if (newDate.includes("Overdue")) {
      return (
        <button className=" overdue-btn flex gap-1 items-center">
          <span>
            <OverDueIcon />
          </span>
          {newDate}
        </button>
      );
    } else {
      return <span>{formateDate(task?.end_date)}</span>;
    }
  }
  function MyComponent({ htmlContent }) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: htmlContent.concat(htmlContent.length > 40 ? "..." : ""),
        }}
      />
    );
  }
  const handleDetails = (task_id) => {
    const findTask = status?.tasks.find((task) => task.task_id === task_id);
    dispatch(handleTaskDetails(findTask));
    toggleTaskDetails();
  };

  const [color, setColor] = useState("");

  const handleWidth = dynamicWidthgenerator(task?.start_date, task?.end_date);

  useEffect(() => {
    const res = getDueStatusWithTime(
      task?.start_date,
      task?.start_time,
      task?.end_date,
      task?.end_time
    );
    if (res.includes("Overdue")) {
      setColor("#FD4A4A");
    } else if (res.includes("Due in")) {
      setColor("#101828");
    } else {
      setColor("#69E48E");
    }
  }, []);

  const customername = `${task?.customer?.first_name} ${task?.customer?.last_name}`;

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle mouse move events and update cursor position
  const handleMouseMove = (event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
    console.log("mouse over");
  };

  // Function to show/hide the modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <div
      ref={ref}
      key={generateId()}
      className={taskClasses}
      onClick={() => handleDetails(task.task_id)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsModalVisible(true)}
      onMouseLeave={() => setIsModalVisible(false)}
    >
      <div
        className="progress-line"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          backgroundColor: color,
          width: handleWidth + "%",
          height: "3px",
        }}
      >
        {" "}
      </div>
      <div className="task-card-inner bg-white mt-1 ">
        <div className="task-action absolute right-2 top-3">
          <ThreeDotHorizontal />
        </div>
        <div className="task-top px-2 pt-5 pb-2">
          {task?.attachments.length > 0 &&
          task?.attachments[0]?.file_type !== "application/pdf" ? (
            <div className="task-image-container ">
              <img
                src={
                  task?.attachments[0]?.url ??
                  "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                }
                alt="taskimg"
                className="task-image"
              />
            </div>
          ) : (
            ""
          )}
          <div className={`task-info px-2 mt-1${task?.src ? "mt-2" : ""}`}>
            <div className="task-title">
              {task.title.slice(0, 20)} {task?.title.length > 20 && "..."}
            </div>
            <div className="task-description mt-1">
              <MyComponent htmlContent={task?.description.slice(0, 40)} />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3">
              <div>
                {" "}
                <div className="task-client-assigned-by flex justify-start">
                  Client Name
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div>
                    <LightOrangeUser />
                  </div>
                  <div className="task-date ">{customername.slice(0, 15)}</div>{" "}
                </div>{" "}
              </div>
              <div>
                <div className="task-client-assigned-by flex justify-end">
                  Assigned By
                </div>
                <div className="flex items-center gap-1 mt-1  justify-end">
                  <div>
                    <RedUser />
                  </div>
                  <div className="task-date ">
                    {task?.created_by.first_name.slice(0, 15)}
                  </div>{" "}
                </div>
              </div>
            </div>

            <div className="start-end grid grid-cols-2 gap-3 mt-2 items-center ">
              {" "}
              <div className="tasks-date ">
                {" "}
                {formateDate(task?.start_date)}{" "}
              </div>{" "}
              <div className="tasks-date  flex justify-end">
                {" "}
                {ReturnDate(task)}{" "}
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr className="task-hr" />
        </div>
        <div className="grid grid-cols-2  px-2 py-1">
          <div>
            <div>
              <div>
                <div className="task-card-images-wrapper ">
                  {task?.employees?.map((emp, index) => (
                    <img
                      key={generateId()}
                      src={
                        emp.image ??
                        "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                      }
                      alt="taskcommentpicture"
                      className="task-card-image"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="flex gap-2 items-center task-file">
              <div>
                <AttachmentIcon />
              </div>
              <div className="task-date">{task?.attachments?.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
