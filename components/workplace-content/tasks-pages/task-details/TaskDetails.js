import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BluePencil } from "utills/svgs/BluePencil";
import { SideTimes } from "utills/svgs/SideTimes";

import ProgressBar from "@ramonak/react-progress-bar";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import { Biglink } from "utills/svgs/Biglink";
import { ChecklistIcon } from "utills/svgs/ChecklistIcon";
import { LeftIcon } from "utills/svgs/LeftIcon";
import { OrangeCalendar } from "utills/svgs/OrangeCalendar";
import { OrangeEmail } from "utills/svgs/OrangeEmail";
import { OrangeHash } from "utills/svgs/OrangeHash";
import { OrangeTel } from "utills/svgs/OrangeTel";
import { OrangeUserIcon } from "utills/svgs/OrangeUserIcon";
import { Plus } from "utills/svgs/Plus";
import { MoveCard } from "./MoveCard";
import "./css/taskDetail.css";

import { useDispatch, useSelector } from "react-redux";
import { generateUID } from "react-uid";
import { fetchRegisteredEmployeesThunk } from "store/settings/team/team";
import {
  archiveTaskChecklistItemThunk,
  archiveTaskChecklistTunk,
  archiveTaskFileThunk,
  createChecklistItemThunk,
  getActivityThunk,
  getAllTaskStatusesThunk,
  getSingleTaskThunk,
  markAsCompleteTaskThunk,
  shareTaskThunk,
  updateChecklistItemThunk,
  updateTaskThunk,
  uploadTaskFileThunk,
} from "store/workspace/workspaceTasks";
import {
  BUSINESS_ID,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  USER_TYPE,
} from "utills/globalVars";
import { formateDate, formateDateAndTime } from "utills/moment";
import { EmployeesModal } from "./EmployeesModal";

import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { toastHandler } from "responseHanlder";
import { setSideLoader } from "store/global/globalReducer";
import { dynamicWidthgenerator } from "utills/dynamicWidthGenerator";
import { DimmedDeleteIcon } from "utills/svgs/DimmedDeleteIcon";
import { WhiteBgTimes } from "utills/svgs/WhiteBgTimes";
import Activity from "./Activity";

import _ from "lodash";
import { RoundedTick } from "utills/svgs/RoundedTick";
import { TaskFileEditor } from "./TaskFileEditor";
import { TaskLogs } from "./TaskLogs";
import { useTaskBarColor } from "./hooks/useTaskBarColor";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";

const TaskDetails = ({ toggleTaskDetails, handleTasksUpdate }) => {
  const [shareTask, setShareTask] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [showTaskLogs, setShowTaskLogs] = useState(false);
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [isZoomed, setIsZoomed] = useState(false);

  const { task: taskItem } = useSelector((state) => state.global);
  const [task, setTask] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState(50); // Initial value of the progress bar (0 to 100)
  const [slideDirection, setSlideDirection] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { data } = useSelector((state) => state.getAllTaskStatuses);
  const [taskChecklist, setTaskChecklist] = useState([]);
  const { data: employees } = useSelector(
    (state) => state.fetchRegisteredEmployees
  );

  const toggleTaskLogs = () => {
    setShowTaskLogs(!showTaskLogs);
  };

  const [showAddEmp, setShowAddEmp] = useState(false);
  const toggleShowAddEmp = () => {
    setShowAddEmp(!showAddEmp);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  function MyComponent({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
  }

  const fetchActivity = () => {
    dispatch(setSideLoader(true));
    dispatch(
      getActivityThunk({
        task_id: taskItem?.task_id,
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
  const fetchEmployees = () => {
    dispatch(fetchRegisteredEmployeesThunk())
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchActivity();
      });
  };

  const getStatuses = () => {
    dispatch(getAllTaskStatusesThunk({ business_id }))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        fetchEmployees();
      });
  };

  const [taskChecklists, setTaskChecklists] = useState([]);
  const getSingleTask = () => {
    const payload = {
      task_id: taskItem.task_id,
      business_id,
    };
    dispatch(getSingleTaskThunk(payload))
      .then((response) => {
        if (response.payload) {
          setTask(response.payload);
          setShareTask(response.payload.share ? response.payload.share : false);
          setTaskChecklists(_.cloneDeep(response.payload.checklists));
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getStatuses();
      });
  };
  useEffect(() => {
    getSingleTask();
  }, []);

  const [itemIndex, setItemIndex] = useState(null);
  const updateItem = (task_checklist_item_id, value, e, index) => {
    const checked = e.target.checked;
    const payload = {
      task_checklist_item_id,
      value,
      is_completed: checked,
    };
    console.log(index, "yyy");
    setItemIndex(index);
    setCheckLoading(true);
    dispatch(updateChecklistItemThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          getSingleTask();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCheckLoading(false);
      });
  };

  const handleChecklistProgress = (task_checklist_id) => {
    if (task) {
      const checklist = task?.checklists?.find(
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

  const [checklistIndex, setListIndex] = useState(null);
  const [showAddItem, setShowAddItem] = useState(false);

  const [itemName, setItemName] = useState("");
  const handleAddItem = (task_checklist_id, listIndex) => {
    setListIndex(listIndex);
    setShowAddItem(true);
  };

  const handleSubmitItem = (task_checklist_id) => {
    const payload = {
      task_checklist_id,
      value: itemName,
      is_completed: false,
    };

    dispatch(createChecklistItemThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setItemName("");
          setShowAddItem(false);
          getSingleTask();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const hideAddList = () => {
    setShowAddItem(false);
  };

  const [showTitleEditor, setShowTitleEditor] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const toggleTitleEditor = () => {
    setShowTitleEditor(!showTitleEditor);
  };

  const [showDescEditor, setShowDescEditor] = useState(false);
  const [editDesc, setEditDesc] = useState("");

  const toggleDescEditor = () => {
    setShowDescEditor(!showDescEditor);
  };

  const removeTags = (str) => {
    const textInsideTags = str.replace(/<[^>]*>/g, "");

    return textInsideTags;
  };

  const updateTaskDef = () => {
    const payload = {
      task_id: task?.task_id,
      title: editTitle,
      description: editDesc,
      business_id,
    };

    dispatch(updateTaskThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setShowTitleEditor(false);
          setShowDescEditor(false);
          getSingleTask();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setEditTitle(task?.title);
    setEditDesc(task?.description?.replace(/<[^>]*>/g, ""));
  }, [task]);

  const [itemDelIndex, setItemDelIndex] = useState(null);
  const [showDelIcon, setShowDelIcon] = useState(false);
  const [itemParentIndex, setItemParentIndex] = useState(null);
  const handleShowDel = (index, listIndex) => {
    setItemDelIndex(index);
    setItemParentIndex(listIndex);
    setShowDelIcon(true);
  };

  const handleHideDelIcon = () => {
    setShowDelIcon(false);
  };

  const handleDelItem = (task_checklist_item_id, task_checklist_id) => {
    const payload = {
      task_checklist_item_id,
      task_checklist_id,
    };
    dispatch(archiveTaskChecklistItemThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          getSingleTask();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelChecklist = (task_checklist_id) => {
    dispatch(archiveTaskChecklistTunk({ task_checklist_id }))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          getSingleTask();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [uploadFiles, setUploadFiles] = useState([]);
  const [filesloader, setFilesLoader] = useState(false);
  const handleFilesChange = (e) => {
    const files = e.target.files;
    if (files.length > 3) {
      toastHandler("You can not select more than 3 files", TOAST_TYPE_ERROR);
      return;
    }
    console.log(files);
    setUploadFiles([...uploadFiles, ...files]);
  };
  const removeFile = (index) => {
    const newArr = [...uploadFiles];
    const file = newArr[index];

    const newIndex = newArr.indexOf(file);
    console.log(newIndex);
    newArr.splice(newIndex, 1);
    setUploadFiles([...newArr]);
  };

  const uploadTaskFiles = () => {
    const formData = new FormData();
    formData.append("task_id", task?.task_id);
    formData.append("uploaded_by", USER_TYPE);

    if (uploadFiles) {
      uploadFiles.forEach((file, index) => {
        formData.append(`task_files`, file);
      });
    }
    setFilesLoader(true);
    dispatch(uploadTaskFileThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          handleTasksUpdate();

          getSingleTask();
          setUploadFiles([]);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFilesLoader(false);
      });
  };

  const removeTaskFile = (task_files_id) => {
    const payload = {
      task_id: task?.task_id,
      task_files_id,
    };

    dispatch(archiveTaskFileThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response?.payload) {
          handleTasksUpdate();

          getSingleTask();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const shareTaskApi = () => {
    const payload = {
      task_id: task?.task_id,
    };
    dispatch(shareTaskThunk(payload))
      .then((response) => {
        toastHandler("Update share successfully", TOAST_TYPE_SUCCESS);
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const markAsCompleted = () => {
    if (task?.completed_at) {
      return;
    }
    const payload = {
      task_id: task?.task_id,
    };
    dispatch(markAsCompleteTaskThunk(payload))
      .then((response) => {
        toastHandler("Mark as Completed successfully", TOAST_TYPE_SUCCESS);
        if (response.payload) {
          getSingleTask();
          handleTasksUpdate();
          toggleTaskDetails();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modalRefone = useRef(null);
  const modalReftwo = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRefone.current && !modalRefone.current.contains(event.target)) {
        console.log("click outside");
        updateTaskDef();
      } else {
        console.log("inside click");
      }
    }

    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRefone, editTitle, editDesc]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalReftwo.current && !modalReftwo.current.contains(event.target)) {
        console.log("click outside");
        updateTaskDef();
      } else {
        console.log("inside click");
      }
    }

    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalReftwo, editTitle, editDesc]);

  const { color } = useTaskBarColor(task ? task : {});

  const [showFileEditor, setShowFileEditor] = useState(false);
  const [fileEditorIndex, setFileEditorIndex] = useState(null);

  const handleFileEditor = (index) => {
    setShowFileEditor(!showFileEditor);
    setFileEditorIndex(index);
  };
  return (
    <div className="add-p-side grid grid-cols-10 reltaive">
      {showTaskLogs && (
        <TaskLogs toggleTaskLogs={toggleTaskLogs} task_id={task?.task_id} />
      )}

      <div className="md:col-span-1 hidden md:block left-side"> </div>
      <div className="right-side col-span-10 md:col-span-9">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleTaskDetails}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-5 px-5 ">
              <div className="title ">Task Details</div>

              <div className="jumbo-dir mt-2=1">
                Workspace &gt; Tasks{" "}
                <span className="special-jumbo-text"> &gt; Task Details</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mx-5 ">
            <button
              onClick={toggleTaskLogs}
              className="ann-btn px-5 py-2 rounded-md"
            >
              View Logs
            </button>
          </div>

          <div className="m-5 relative">
            <div className="grid md:grid-cols-3 gap-5">
              <div className="col-span-2">
                <div className="task-detail-main-card add-ann-form bg-white  rounded-md p-5 ">
                  {!showTitleEditor ? (
                    <div className="flex gap-2 items-center">
                      {" "}
                      <div className="task-title detail-task-title break-words">
                        {task?.title}
                      </div>{" "}
                      <span
                        onClick={toggleTitleEditor}
                        className="cursor-pointer"
                      >
                        {" "}
                        <BluePencil />{" "}
                      </span>
                    </div>
                  ) : (
                    <div ref={modalRefone} classNamessName=" add-ann-form">
                      <div>
                        {" "}
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          type="text"
                        />{" "}
                      </div>
                      <div></div>
                    </div>
                  )}
                  {!showDescEditor ? (
                    <div className="detail-description flex gap-2  relative mt-2">
                      <div>
                        {" "}
                        {<MyComponent htmlContent={task?.description} />}
                      </div>
                      <div
                        className=" cursor-pointer"
                        onClick={toggleDescEditor}
                      >
                        {" "}
                        <BluePencil />
                      </div>
                    </div>
                  ) : (
                    <div ref={modalReftwo}>
                      <div>
                        {" "}
                        <textarea
                          value={editDesc}
                          onChange={(e) => setEditDesc(e.target.value)}
                          className="add-item-area p-3"
                          placeholder="Description..."
                        ></textarea>{" "}
                      </div>
                      <div className="flex gap-2 justify-end items-center">
                        <div></div>
                      </div>
                    </div>
                  )}
                </div>
                {task?.checklists.map((checklist, listIndex) => (
                  <div
                    className="task-detail-main-card text-black  mt-5 p-5 rounded-md"
                    key={generateUID()}
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
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          handleDelChecklist(checklist.task_checklist_id)
                        }
                      >
                        {" "}
                        <BgDeleteIcon />
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

                        {checklist?.checkListItems.map((check, index) => (
                          <div
                            onMouseEnter={() => handleShowDel(index, listIndex)}
                            onMouseLeave={handleHideDelIcon}
                            className="flex justify-between items-center"
                          >
                            <div className="flex gap-2  task-check items-center">
                              <div>
                                <input
                                  // disabled={checkLoading ? true : false}
                                  onChange={(e) =>
                                    updateItem(
                                      check.task_checklist_item_id,
                                      check.value,
                                      e,
                                      index
                                    )
                                  }
                                  type="checkbox"
                                  checked={check.is_completed ? true : false}
                                />
                              </div>
                              <div className="detail-description ">
                                {" "}
                                {check?.value}{" "}
                              </div>
                            </div>
                            <div>
                              {showDelIcon &&
                              itemDelIndex === index &&
                              itemParentIndex === listIndex ? (
                                <span
                                  className="cursor-pointer"
                                  onClick={() =>
                                    handleDelItem(
                                      check?.task_checklist_item_id,
                                      checklist?.task_checklist_id
                                    )
                                  }
                                >
                                  {" "}
                                  <DimmedDeleteIcon />
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {showAddItem && checklistIndex === listIndex ? (
                        <div className="mt-2 add-ann-form">
                          <div>
                            {" "}
                            <input
                              onChange={(e) => setItemName(e.target.value)}
                              type="text"
                              placeholder="Item Name"
                            />{" "}
                          </div>
                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() =>
                                handleSubmitItem(checklist.task_checklist_id)
                              }
                              className="ann-btn px-3 py-2 rounded-md "
                            >
                              Add
                            </button>
                            <button
                              className="checklist-cancel-btn px-5 py-2"
                              onClick={() => hideAddList()}
                            >
                              Cancel
                            </button>{" "}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {!showAddItem && (
                        <button
                          onClick={() =>
                            handleAddItem(
                              checklist.task_checklist_id,
                              listIndex
                            )
                          }
                          className="ann-btn rounded-md px-5 py-2 mt-2"
                        >
                          Add an item
                        </button>
                      )}
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
                        {task?.attachments?.length > 0 &&
                          task?.attachments?.map((att, index) => (
                            <div>
                              <div
                                className={`attachment-card grid grid-cols-3 gap-5 ${
                                  index > 0 && "mt-2"
                                }`}
                                key={index}
                              >
                                <div className="col-span-1 p-2">
                                  <div className="attachment-file-container">
                                    {att?.file_type === "application/pdf" ? (
                                      <a
                                        href={att?.url}
                                        className="pdf-container"
                                      >
                                        <div className="pdf-file"> PDF </div>
                                      </a>
                                    ) : (
                                      <>
                                        <img
                                          src={
                                            att?.url ??
                                            "https://picsum.photos/200/300"
                                          }
                                          alt="profile"
                                          className="attchement-file"
                                          onClick={() => setIsZoomed(true)}
                                        />
                                        {isZoomed && (
                                          <ZoomImage
                                            src={
                                              att?.url ??
                                              "https://picsum.photos/200/300"
                                            }
                                            alt="Profile"
                                            onClose={() => setIsZoomed(false)}
                                          />
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="col-span-two flex items-center p-3 ">
                                  <div>
                                    <label>{att?.name.slice(0, 10)}</label>
                                    <div className="att-actions">
                                      Added just now
                                    </div>
                                    <div className="att-actions flex items-center gap-2">
                                      {/* <span
                                        className="cursor-pointer underline"
                                        onClick={() => handleFileEditor(index)}
                                      >
                                        Edit
                                      </span> */}
                                      <span
                                        className="cursor-pointer underline"
                                        onClick={() =>
                                          removeTaskFile(att?.task_files_id)
                                        }
                                      >
                                        Delete
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {showFileEditor && fileEditorIndex === index ? (
                                <TaskFileEditor file={att} />
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="flex gap-2 items-center flex-wrap mt-5">
                      <label htmlFor="files-input">
                        <div className="ann-btn rounded-md flex justify-center items-center px-5 py-2 ">
                          Add an attachment
                        </div>
                      </label>
                      <div className="flex items-center gap-2 flex-wrap">
                        {uploadFiles &&
                          uploadFiles.slice(0, 3)?.map((file, index) => (
                            <button
                              key={index}
                              className="files-btn flex gap-2 items-center "
                            >
                              {file.name.slice(0, 7)}
                              <span
                                className="scale-75 cursor-pointer"
                                onClick={() => removeFile(index)}
                              >
                                <WhiteBgTimes />
                              </span>
                            </button>
                          ))}
                      </div>
                      <div>
                        {uploadFiles?.length > 0 && (
                          <button
                            disabled={filesloader ? true : false}
                            onClick={uploadTaskFiles}
                            className="ann-btn rounded-md px-5 py-2 flex gap-2 items-center"
                          >
                            Upload {filesloader && <SmallLoaderWhite />}
                          </button>
                        )}
                      </div>
                      <input
                        id="files-input"
                        type="file"
                        accept="images/*"
                        multiple
                        onChange={(e) => handleFilesChange(e)}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Activity task={task} fetchActivity={fetchActivity} />
                </div>
              </div>
              <div className="col-span-1 ">
                <div className="add-ann-form text-black task-detail-main-card p-5 w-72 md:w-full rounded-md relative">
                  <label>Assigned To</label>
                  <div className="mt-2 task-assigned-people ">
                    <div className="task-images-wrapper items-center relative">
                      <div class="task-images-stack  ">
                        <div className="assigned-images-wrapper">
                          {task?.employees?.length &&
                            task?.employees?.map((emp, index) => (
                              <img
                                key={index}
                                src="https://picsum.photos/200/300"
                                alt="taskcommentpicture"
                                className="taskImage"
                              />
                            ))}

                          <label>
                            {" "}
                            <button
                              onClick={toggleShowAddEmp}
                              className="add-assigned-btn"
                            >
                              <Plus />
                            </button>
                          </label>
                        </div>
                        {showAddEmp && (
                          <EmployeesModal
                            handleTasksUpdate={handleTasksUpdate}
                            getSingleTask={getSingleTask}
                            toggleShowAddEmp={toggleShowAddEmp}
                            employees={employees}
                            task_id={task?.task_id}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="my-2 mt-5">
                    {" "}
                    {console.log(task?.start_date, "this")}
                    <ProgressBar
                      completed={dynamicWidthgenerator(
                        task?.start_date,
                        task?.end_date
                      )}
                      bgColor={color}
                      height="5px"
                      width="100%"
                      animateOnRender={true}
                      isLabelVisible={false}
                    />
                  </div>
                  <div className="progress-date flex justify-between items-center ">
                    <div>{formateDate(task?.start_date)}</div>
                    <div>{formateDate(task?.end_date)}</div>
                  </div>

                  <div className="assigned-details-people mt-5 text-black">
                    <div className="flex gap-3 items-center">
                      <div>
                        <OrangeUserIcon />
                      </div>
                      <div>
                        <label>Created By</label>
                        <div className="assigned-people-detail">
                          {task?.created_by?.first_name}{" "}
                          {task?.created_by?.last_name}
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
                          {formateDateAndTime(task?.updated_at)}
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
                          {task?.customer?.first_name}{" "}
                          {task?.customer?.last_name}
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
                          {task?.customer?.email}
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
                          {task?.customer?.phone_number}
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
                          {task?.reference_number}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10 mb-5 ">
                    {" "}
                    <div>
                      {" "}
                      <div className="add-ann-form flex gap-2 justify-between items-center">
                        <label>Share</label>
                        <div className="flex items-center">
                          <input
                            checked={shareTask ? true : false}
                            className="os-react-switch-checkbox"
                            id={`HandleToggle- react-switch-new`}
                            type="checkbox"
                            onChange={() => {
                              setShareTask(!shareTask);
                              shareTaskApi();
                            }}
                          />

                          <label
                            style={{
                              background: shareTask ? "#B695F8" : "",
                            }}
                            className="react-switch-label"
                            htmlFor={`react-switch-new`}
                            onClick={() => {
                              setShareTask(!shareTask);
                              shareTaskApi();
                            }}
                          >
                            <span className={`react-switch-button`} />
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={toggleModal}
                        className="ann-btn mt-5 rounded-md w-full justify-center py-2 flex gap-2 items-center "
                      >
                        <spam>
                          <LeftIcon />{" "}
                        </spam>{" "}
                        <span>Move</span>
                      </button>
                    </div>
                    {/* <button className="ann-btn mt-5 rounded-md px-5 w-full justify-center py-2 flex items-center gap-2">
                      <span>
                        <ShareIcon />
                      </span>{" "}
                      <span> Share</span>
                    </button> */}
                    <button
                      onClick={markAsCompleted}
                      className="ann-btn mt-5 w-full justify-center rounded-md px-5 py-2 flex items-center gap-2"
                    >
                      <span>
                        <RoundedTick />
                      </span>{" "}
                      {!task?.completed_at && <span> Mark as Completed</span>}
                      {task?.completed_at && <span>Completed</span>}
                    </button>
                  </div>
                  {showModal && (
                    <MoveCard
                      toggleModal={toggleModal}
                      data={data}
                      handleTasksUpdate={handleTasksUpdate}
                      task_id={task?.task_id}
                      toggleTaskDetails={toggleTaskDetails}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskDetails;

//"2023-10-01T19:00:00Z",
//  "2023-10-20T19:00:00Z"
