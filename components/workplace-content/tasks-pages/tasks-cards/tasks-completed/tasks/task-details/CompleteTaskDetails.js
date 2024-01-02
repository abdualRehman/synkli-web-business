import React, { useEffect, useState } from "react";
import "./css/completeTaskDetails.css";
import { SideTimes } from "utills/svgs/SideTimes";
import { motion } from "framer-motion";
import { OrangeUserIcon } from "utills/svgs/OrangeUserIcon";
import { formateDate, formateDateAndTime } from "utills/moment";
import Activity from "components/workplace-content/tasks-pages/task-details/Activity";
import { Biglink } from "utills/svgs/Biglink";
import { useDispatch, useSelector } from "react-redux";
import { generateId } from "utills/uid";
import { ChecklistIcon } from "utills/svgs/ChecklistIcon";
import { OrangeCalendar } from "utills/svgs/OrangeCalendar";
import { OrangeEmail } from "utills/svgs/OrangeEmail";
import { OrangeTel } from "utills/svgs/OrangeTel";
import { OrangeHash } from "utills/svgs/OrangeHash";
import { EyeIcon } from "utills/svgs/EyeIcon";
import ProgressBar from "@ramonak/react-progress-bar";
import { dynamicWidthgenerator } from "utills/dynamicWidthGenerator";
import { useTaskBarColor } from "components/workplace-content/tasks-pages/task-details/hooks/useTaskBarColor";
import { SimpleEye } from "utills/svgs/SimpleEye";
import {
  getActivityThunk,
  getSingleTaskThunk,
} from "store/workspace/workspaceTasks";
import { BUSINESS_ID } from "utills/globalVars";
import { setSideLoader } from "store/global/globalReducer";

export const CompleteTaskDetails = ({ toggleTaskDetails }) => {
  const [taskDetail, setTaskDetail] = useState(null);

  function MyComponent({ htmlContent }) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: htmlContent.concat(htmlContent.length > 40 ? "..." : ""),
        }}
      />
    );
  }
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.global);
  console.log(task);
  const getSingleTask = () => {
    const payload = {
      task_id: task.task_id,
      business_id: task.business_id,
    };
    dispatch(getSingleTaskThunk(payload))
      .then((response) => {
        if (response.payload) {
          setTaskDetail(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchActivity();
      });
  };
  const fetchActivity = () => {
    dispatch(setSideLoader(true));
    dispatch(
      getActivityThunk({
        task_id: task?.task_id,
      })
    )
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  useEffect(() => {
    getSingleTask();
  }, []);

  const handleChecklistProgress = (task_checklist_id) => {
    if (taskDetail) {
      const checklist = taskDetail?.checklists?.find(
        (list) => list.task_checklist_id === task_checklist_id
      );
      const total = checklist.checkListItems.length;
      const completed = checklist.checkListItems.filter(
        (items) => items.is_completed === true
      ).length;
      const totalres = 100 / total;
      const result = completed * totalres;

      return Math.ceil(result);
    }
  };
  const { color } = useTaskBarColor(taskDetail ? taskDetail : {});

  return (
    <div>
      {" "}
      <div className="add-p-side grid grid-cols-10 ">
        <div className="col-span-2 left-side"></div>
        <div className="right-side col-span-8 ">
          <motion.div
            initial={{ x: 700 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
            className="inner-right relative w-full"
          >
            <div>
              <div
                onClick={toggleTaskDetails}
                className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
              >
                <SideTimes />
              </div>

              <div className="add-detail pt-5 px-5 text-black">
                <div className="title  text-black"> Task Details</div>

                <div className="jumbo-dir mt-2=1">
                  Workspace &gt; Tasks &gt Completed Tasks{" "}
                  <span className="special-jumbo-text"> &gt; Task Details</span>
                </div>
              </div>

              <div className="m-5 relative">
                <div className="flex justify-end items-center my-2 ">
                  <div className="flex gap-2 items-center task-details-logs-btn px-2 py-2 cursor-pointer">
                    {" "}
                    <SimpleEye />
                    <div> View Logs</div>
                  </div>
                </div>
                {taskDetail && (
                  <div className="grid md:grid-cols-3 gap-5">
                    <div className="col-span-2">
                      <div className="task-detail-main-card add-ann-form bg-white  rounded-md p-5 ">
                        <div className="flex gap-2 items-center">
                          {" "}
                          <div className="task-title detail-task-title">
                            {taskDetail?.title}
                          </div>{" "}
                        </div>

                        <div className="detail-description flex gap-2  relative mt-2">
                          <div>
                            {" "}
                            {
                              <MyComponent
                                htmlContent={taskDetail?.description}
                              />
                            }
                          </div>
                        </div>
                      </div>
                      {taskDetail?.checklists?.map((checklist, listIndex) => (
                        <div
                          className="task-detail-main-card text-black  mt-5 p-5 rounded-md"
                          key={generateId()}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <div>
                                {" "}
                                <ChecklistIcon />
                              </div>
                              <div>
                                <label>Checklist</label>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5">
                            <div>
                              <div className="my-2 mt-5 add-ann-form grid grid-cols-12 gap-2 place-content-center">
                                {" "}
                                <div className="col-span-11 pt-1">
                                  {" "}
                                  <ProgressBar
                                    completed={handleChecklistProgress(
                                      checklist.task_checklist_id
                                    )}
                                    bgColor="#b695f8"
                                    height="5px"
                                    width="100%"
                                    animateOnRender={true}
                                    isLabelVisible={false}
                                  />
                                </div>
                                <div className="assigned-people-detail">
                                  {" "}
                                  {handleChecklistProgress(
                                    checklist.task_checklist_id
                                  )}
                                  %
                                </div>
                              </div>

                              <div className="checklist-title">
                                {checklist?.title}{" "}
                              </div>

                              {checklist?.checkListItems?.map(
                                (check, index) => (
                                  <div
                                    // onMouseEnter={() =>
                                    //   handleShowDel(index, listIndex)
                                    // }
                                    // onMouseLeave={handleHideDelIcon}
                                    className="flex justify-between items-center"
                                  >
                                    <div className="flex gap-2  task-check items-center">
                                      <div>
                                        <input
                                          // disabled={checkLoading ? true : false}
                                          //   onChange={(e) =>
                                          //     updateItem(
                                          //       check.task_checklist_item_id,
                                          //       check.value,
                                          //       e,
                                          //       index
                                          //     )
                                          //   }
                                          type="checkbox"
                                          checked={
                                            check.is_completed ? true : false
                                          }
                                        />
                                      </div>
                                      <div className="detail-description cross-text">
                                        {" "}
                                        {check?.value}{" "}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="task-detail-main-card mt-5 text-black p-5 add-ann-form rounded-md">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2 items-center">
                            <div>
                              {" "}
                              <Biglink />
                            </div>
                            <div>
                              <label>Attachments</label>
                            </div>
                          </div>
                          <div> </div>
                        </div>

                        <div className="mt-3">
                          <div className="grid grid-cols-3 gap-3 ">
                            <div className="col-span-3 md:col-span-2 ">
                              {taskDetail?.attachments?.length > 0 &&
                                taskDetail?.attachments?.map((att, index) => (
                                  <div>
                                    <div
                                      className={`attachment-card grid grid-cols-3 gap-5 ${
                                        index > 0 && "mt-2"
                                      }`}
                                      key={index}
                                    >
                                      <div className="col-span-1 p-2">
                                        <div className="attachment-file-container">
                                          {att?.file_type ===
                                          "application/pdf" ? (
                                            <a
                                              href={att?.url}
                                              className="pdf-container"
                                            >
                                              <div className="pdf-file">
                                                {" "}
                                                PDF{" "}
                                              </div>
                                            </a>
                                          ) : (
                                            <img
                                              src={
                                                att?.url ??
                                                "https://picsum.photos/200/300"
                                              }
                                              alt="profile"
                                              className="attchement-file"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {taskDetail && (
                          <Activity
                            task={taskDetail}
                            fetchActivity={fetchActivity}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-span-1 ">
                      <div className="add-ann-form text-black task-detail-main-card p-5 w-72 md:w-full rounded-md relative">
                        <label>Assigned To</label>
                        <div className="mt-2 task-assigned-people ">
                          <div className="task-images-wrapper items-center relative">
                            <div class="task-images-stack  ">
                              <div className="assigned-images-wrapper">
                                {taskDetail?.employees?.length &&
                                  taskDetail?.employees?.map((emp, index) => (
                                    <img
                                      key={index}
                                      src="https://picsum.photos/200/300"
                                      alt="taskcommentpicture"
                                      className="taskImage"
                                    />
                                  ))}

                                <label> </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my-2 mt-5">
                          {" "}
                          <ProgressBar
                            completed={dynamicWidthgenerator(
                              taskDetail?.start_date,
                              taskDetail?.end_date
                            )}
                            bgColor={color}
                            height="5px"
                            width="100%"
                            animateOnRender={true}
                            isLabelVisible={false}
                          />
                        </div>
                        <div className="progress-date flex justify-between items-center ">
                          <div>{formateDate(taskDetail?.start_date)}</div>
                          <div>{formateDate(taskDetail?.end_date)}</div>
                        </div>

                        <div className="assigned-details-people mt-5 text-black">
                          <div className="flex gap-3 items-center">
                            <div>
                              <OrangeUserIcon />
                            </div>
                            <div>
                              <label>Created By</label>
                              <div className="assigned-people-detail">
                                {taskDetail?.created_by?.first_name}{" "}
                                {taskDetail?.created_by?.last_name}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-3 items-center">
                            <div>
                              <OrangeCalendar />
                            </div>
                            <div>
                              <label>Updated On</label>
                              <div className="assigned-people-detail">
                                {formateDateAndTime(taskDetail?.updated_at)}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-3 items-center">
                            <div>
                              <OrangeUserIcon />
                            </div>
                            <div>
                              <label>Client Name</label>
                              <div className="assigned-people-detail">
                                {taskDetail?.customer?.first_name}{" "}
                                {taskDetail?.customer?.last_name}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 mt-3 items-center">
                            <div>
                              <OrangeEmail />
                            </div>
                            <div>
                              <label>Client Email</label>
                              <div className="assigned-people-detail">
                                {taskDetail?.customer?.email}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-3 items-center">
                            <div>
                              <OrangeTel />
                            </div>
                            <div>
                              <label>Client Phone No</label>
                              <div className="assigned-people-detail">
                                {taskDetail?.customer?.phone_number}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-3 items-center">
                            <div>
                              <OrangeHash />
                            </div>
                            <div>
                              <label>Client Reference No</label>
                              <div className="assigned-people-detail">
                                {taskDetail?.reference_number}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
