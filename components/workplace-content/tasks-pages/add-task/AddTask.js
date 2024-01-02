/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import moment from "moment";
import "./addtask.css";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SideTimes } from "../../../../utills/svgs/SideTimes";
import { generateId } from "utills/uid";

import { DimmedDeleteIcon } from "utills/svgs/DimmedDeleteIcon";
import { ImageIcon } from "utills/svgs/ImageIcon";
import { BgTimes } from "utills/svgs/BgTimes";
import { LinkIcon } from "utills/svgs/LinkIcon";
import { useDispatch, useSelector } from "react-redux";
import pdfIcon from "../../../../files/pdfIcon.svg";
import {
  addTaskThunk,
  getAllTaskStatusesThunk,
  getAllTaskTypeThunk,
} from "store/workspace/workspaceTasks";
import Cookies from "js-cookie";
import {
  BUSINESS_ID,
  DATE_FORMAT,
  ERROR_TYPE_ERROR,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
  USER_TYPE,
} from "utills/globalVars";
import { DimmedPointDown } from "utills/svgs/DimmedPointDown";
import { setSideLoader } from "store/global/globalReducer";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { fetchRegisteredEmployeesThunk } from "store/settings/team/team";
import Select from "react-select";
import {
  fetchBusinessCustomerAllThunk,
  fetchBusinessCustomerThunk,
} from "store/client";
import { toastHandler } from "responseHanlder";
import { WhiteBgTimes } from "utills/svgs/WhiteBgTimes";
import { BgDeleteIcon } from "utills/svgs/BgDeleteIcon";
import DatePickerComponent from "global-components/DatePicker";
import { ZoomImage } from "global-components/ImageZoom/ImageZoomer";

const AddTask = ({ toggleAddTask, handleTasksUpdate }) => {
  const dispatch = useDispatch();
  const { data: customers } = useSelector(
    (state) => state.fetchBusinessAllCustomer
  );
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [editorContent, setEditorContent] = useState("");
  const [checklists, setChecklists] = useState([]);
  const [listname, setListName] = useState("");
  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [addItemIndex, setAddItemIndex] = useState(null);
  const [itemName, setItemName] = useState("");
  const [delIconIndex, setDelIconIndex] = useState(null);
  const [showDelIcon, setShowDelIcon] = useState(false);
  const [listIndex, setListIndex] = useState(null);
  const [showListDel, setShowListDel] = useState(false);

  const { sideLoader } = useSelector((state) => state.global);
  const { data: employees } = useSelector(
    (state) => state.fetchRegisteredEmployees
  );

  const { status } = useSelector((state) => state.global);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [currentDate, setCurrentDate] = useState(new Date());

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [reference_number, setReferenceNumber] = useState("");
  const [start_time, setStartTime] = useState(new Date());
  const [end_time, setEndTime] = useState(null);
  const [files, setFiles] = useState([]);
  const [pdf, setPdf] = useState(null);
  const { data: taskTypes } = useSelector((state) => state.getAllTaskType);
  const { data: taskStatuses } = useSelector(
    (state) => state.getAllTaskStatuses
  );

  const [taskType, setTaskType] = useState("");
  const [taskStatus, setTaskStatus] = useState("");

  const quillRef = useRef(null);

  const handleBulletPoints = () => {
    const quillEditor = quillRef.current.getEditor();
    const range = quillEditor.getSelection();
    if (range) {
      const format = quillEditor.getFormat(range);
      quillEditor.format("list", !format.list);
    }
  };

  const toggleAddChecklist = () => {
    const newArr = [...checklists];
    newArr.push({
      checklist_name: "",
      checks: [],
    });
    setChecklists(newArr);
  };
  const handleChecklistName = (index) => {
    const newArr = [...checklists];
    newArr[index].checklist_name = listname;
    setChecklists(newArr);
    setListName("");
  };

  const addItem = (index) => {
    setAddItemIndex(index);
    setShowAddItem(!showAddItem);
    const newArr = [...checklists];
  };

  const handleItemName = (index) => {
    const newArr = [...checklists];
    newArr[index].checks.push({
      item_id: generateId(),
      value: itemName,
      is_completed: false,
    });
    setChecklists(newArr);
    setShowAddItem(false);
  };

  const deleteItem = (index, checkIndex) => {
    const newArr = [...checklists];
    console.log(index, checkIndex);
    newArr[index].checks.splice(checkIndex, 1);
    setChecklists(newArr);
    // newArr[index]?.checks.spilce(checkIndex, 1);
    // setChecklists(newArr);
  };

  const handleDelIcon = (index, checkIndex) => {
    setListIndex(index);
    setDelIconIndex(checkIndex);
    setShowDelIcon(true);
  };
  const hideDelIcon = () => {
    setShowDelIcon(false);
  };

  const handleShowListDel = (index) => {
    setListIndex(index);
    setShowListDel(true);
  };

  const handleHideListDel = () => {
    setShowListDel(false);
  };

  const handleCheckChange = (e, index, checkIndex) => {
    const checked = e.target.checked;
    const newArr = [...checklists];
    if (newArr[index].checks[checkIndex]) {
      newArr[index].checks[checkIndex].is_completed = checked;
    }
    console.log(newArr);
    setChecklists(newArr);
  };

  const handleListDelete = (index) => {
    const newArr = [...checklists];
    newArr.splice(index, 1);
    setChecklists(newArr);
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileSelect = (e) => {
    const files = e.target.files;

    const newFiles = [...files, files];

    if (files.length > 0) {
      const files = e.target.files;

      const updatedImages = [...selectedImages];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();

        reader.onloadend = () => {
          // Add the selected image data URL to the array
          updatedImages.push(reader.result);

          // Set the array of selected images in the state
          setSelectedImages([...updatedImages]);
        };

        reader.readAsDataURL(file);
      }
    }

    setFiles(newFiles);
  };

  const handlePdfSelect = (e) => {
    const file = e.target.files[0];
    setPdf(file);
  };

  const fetchCustomers = () => {
    const payload = {
      business_id,
      customer_type: false,
    };

    dispatch(fetchBusinessCustomerAllThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
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
        fetchCustomers();
      });
  };

  const getStatuses = (payload) => {
    dispatch(getAllTaskStatusesThunk(payload))
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

  const getTypes = (payload) => {
    dispatch(getAllTaskTypeThunk(payload))
      .then((response) => {
        console.log(response.payload);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        getStatuses(payload);
      });
  };

  useEffect(() => {
    const business_id = localStorage.getItem(BUSINESS_ID);
    const payload = {
      business_id,
    };
    getTypes(payload);
  }, []);

  console.log(checklists);

  const handleSelectChange = (e) => {
    const newOptions = [...selectedOptions];
    const value = e.target.value;
    const employee = employees?.find((emp) => emp.user_id === value);
    const findDuplicate = selectedOptions?.find((emp) => emp.user_id === value);
    if (findDuplicate) {
      toastHandler(
        "You cannot select one option multiple times",
        ERROR_TYPE_ERROR
      );
      return;
    }
    newOptions.push({
      label: employee.first_name,
      value,
    });

    console.log(newOptions);
    setSelectedOptions(newOptions);
  };

  const options = [];
  employees?.map((emp) => {
    options.push({
      value: emp.user_id,
      label: emp.first_name,
    });
  });

  const removeOption = (user_id) => {
    const newArr = [...selectedOptions];
    const findOption = newArr.find((op) => op.user_id === user_id);
    const index = newArr.indexOf(findOption);
    newArr.splice(index, 1);
    setSelectedOptions(newArr);
  };

  const formatDate = (date) => {
    return moment(date, "DD-MM-YYYY", true).format("DD-MM-YYYY");
  };

  const validateDateTime = () => {
    const date = moment();
    const currentDate = moment(date).format("DD-MM-YYYY");

    if (startDate) {
      const fStartDate = formatDate(startDate);
      if (!moment(startDate, "DD-MM-YYYY", true).isValid()) {
        toastHandler("Start date is invalid", TOAST_TYPE_ERROR);
        return false;
      }
      if (moment(startDate, "DD-MM-YYYY", true).isBefore(currentDate)) {
        toastHandler(
          "Start date must be greater than or equal to current date",
          TOAST_TYPE_ERROR
        );
        return false;
      }
    } else {
      toastHandler("Start date is required", TOAST_TYPE_ERROR);
      return false;
    }
    if (endDate) {
      if (!moment(endDate, "DD-MM-YYYY", true).isValid()) {
        toastHandler("End date is invalid", TOAST_TYPE_ERROR);
        return false;
      }
    } else {
      toastHandler("End date is required", TOAST_TYPE_ERROR);
      return false;
    }
    if (startDate && endDate) {
      const fStartDate = formatDate(startDate);
      const fEndDate = formatDate(endDate);
      console.log(fStartDate, fEndDate);

      if (moment(endDate, "DD-MM-YYYY", true).isBefore(fStartDate)) {
        toastHandler(
          "End date must me greater than start date",
          TOAST_TYPE_ERROR
        );
        return false;
      }
    }
    if (!start_time) {
      toastHandler("Start time is required", TOAST_TYPE_ERROR);
      return false;
    }
    if (!end_time) {
      toastHandler("End time is required", TOAST_TYPE_ERROR);
      return false;
    }
    const fStartTime = moment(start_time).format("HH:mm:ss Z");
    const fEndTime = moment(end_time).format("HH:mm:ss Z");
    const fStartDate = formatDate(startDate);
    const fEndDate = formatDate(endDate);
    const startDT = moment(
      `${fStartDate} ${fStartTime}`,
      "DD-MM-YYYY HH:mm"
    ).format("DD-MM-YYYY HH:mm:ss");
    const endDT = moment(`${fEndDate} ${fEndTime}`, "DD-MM-YYYY HH:mm").format(
      "DD-MM-YYYY HH:mm:ss"
    );
    console.log(startDT, endDT);
    if (
      moment(`${fEndDate} ${fEndTime}`, "DD-MM-YYYY HH:mm").isBefore(startDT)
    ) {
      toastHandler(
        "End date time must be greater than start date time",
        TOAST_TYPE_ERROR
      );
      return false;
    } else {
      return true;
    }
  };

  const handleCustomer = (e) => {
    const { value } = e.target;
    const findcustomer = customers?.find(
      (customer) => customer.customer_id === value
    );
    console.log(findcustomer);
    setSelectedCustomer({
      label: findcustomer?.first_name,
      value,
    });
  };

  const defAddTask = () => {
    const valid = validateDateTime();
    if (!valid) {
      return;
    }
    const employees = [];
    selectedOptions.forEach((option) => {
      employees.push(option.value);
    });

    const newChecklist = [...checklists];

    const formData = new FormData();
    formData.append("business_id", business_id.trim());
    formData.append("task_type_id", taskType.trim());
    formData.append("task_status_id", taskStatus.trim());
    formData.append("title", title.trim());
    formData.append("description", editorContent.trim());

    const formatedStartDate = moment(startDate).format("DD-MM-YYYY"); // Note the format string
    const formatedEndDate = moment(endDate).format("DD-MM-YYYY"); // Note the format string

    formData.append("start_date", formatedStartDate.trim());
    formData.append("end_date", formatedEndDate.trim());
    const formatStartTime = moment(start_time).format("HH:mm:ss Z");
    const formatEndTime = moment(end_time).format("HH:mm:ss Z");
    formData.append("start_time", formatStartTime);
    formData.append("end_time", formatEndTime);
    formData.append("reference_number", reference_number.trim());
    formData.append("customer_id", selectedCustomer?.value.trim());
    formData.append("employees", JSON.stringify(employees));
    formData.append("checklists", JSON.stringify(checklists));

    formData.append("uploaded_by", USER_TYPE);

    if (files.length > 4) {
      toastHandler("You Cannot select more than 3 files", TOAST_TYPE_ERROR);
      return;
    }
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("task_files", files[i]);
      }
    }
    dispatch(setSideLoader(true));
    dispatch(addTaskThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          handleTasksUpdate();
          toggleAddTask();
          toastHandler("Task Added", TOAST_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  useEffect(() => {
    if (status) {
      setTaskStatus(status?.task_status_id);
    }
  }, []);

  const handleFileRemove = (index) => {
    const newArr = [...files];
    newArr.splice(index, 1);
    setFiles(newArr);
  };

  const items = [];
  if (files) {
    for (let i = 0; i < files.length - 1; i++) {
      items.push(
        <button className="flex items-center gap-1 selected-file ">
          <LinkIcon />
          <span>{files[i]?.name?.slice(0, 10)}</span>
          <span
            onClick={() => handleFileRemove(files[i])}
            className="cursor-pointer"
          >
            <BgTimes />
          </span>{" "}
        </button>
      );
    }
  }

  const [isOpen, setIsOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleFileRemoveImg = (index) => {
    const newArr = [...files];
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
    newArr.splice(index, 1);
    setFiles(newArr);
  };
  return (
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
              onClick={toggleAddTask}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-5 px-5 text-black">
              <div className="title  text-black">Add Task</div>

              <div className="jumbo-dir mt-2=1">
                Workspace &gt; Tasks{" "}
                <span className="special-jumbo-text"> &gt; Add Task</span>
              </div>
            </div>
          </div>

          <div className="add-task-container  px-5 mt-3 text-black">
            <div className=" add-ann-form">
              <div className="bg-white shadow-lg rounded-md p-5 ">
                <div className="mt-1">
                  <div className="grid grid-cols-4 gap-5">
                    <div>
                      <div>
                        <label>Start Date</label>
                      </div>

                      <div>
                        <div className="">
                          <DatePickerComponent
                            type="date"
                            sidebarDate={true}
                            isOpen={isOpen}
                            date={startDate}
                            setVisible={(value) => setIsOpen(value)}
                            onDateChange={(date) => {
                              setIsOpen(false);
                              setStartDate(date);
                            }}
                          />
                          {/* <DatePicker
                            placeholderText="select start date"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()} // Set the minimum date
                          /> */}
                        </div>
                        {/* <div>
                        <DatePickerComponent
            type="date"
            isOpen={isOpen}
            date={startDate}
            setVisible={(value) => setIsOpen(value)}
            onDateChange={(date) => {
              setIsOpen(false);
              setStartDate(date)
            console.log(date, "consoleDate")
            }}
          />
                        </div> */}
                      </div>
                    </div>
                    <div>
                      <div>
                        <label>End Date</label>
                      </div>
                      <div>
                        <div className="">
                          <DatePickerComponent
                            type="date"
                            sidebarDate={true}
                            minDate={new Date()} // Set the minimum date
                            isOpen={endOpen}
                            date={endDate}
                            setVisible={(value) => setEndOpen(value)}
                            onDateChange={(date) => {
                              setEndOpen(false);
                              setEndDate(date);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label>Start Time</label>
                      </div>
                      <div>
                        <div className="">
                          <DatePicker
                            selected={start_time}
                            onChange={(date) => setStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                          {/* <input
                            type="time"
                            onChange={(e) => setStartTime(e.target.value)}
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label>End Time</label>
                      </div>
                      <div>
                        <div className="">
                          <DatePicker
                            selected={end_time}
                            onChange={(date) => setEndTime(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                          />
                          {/* <input
                            type="time"
                            onChange={(e) => setEndTime(e.target.value)}
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Title</label>
                  </div>
                  <div>
                    <input
                      onChange={(e) => setTitle(e.target.value.trim())}
                      type="text"
                      placeholder="Title"
                      className="px-3"
                      maxLength={40}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label>Description</label>
                </div>

                <div>
                  <div className="add-task-edit relative">
                    <div className="editor-tollbar add-task-toolbar px-5 py-3 flex justify-end">
                      <button onClick={handleBulletPoints}>
                        <svg
                          width="19"
                          height="15"
                          viewBox="0 0 23 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.50781 1.42105C5.50781 1.16979 5.60439 0.928828 5.7763 0.751162C5.94821 0.573496 6.18137 0.473684 6.42448 0.473684H21.0911C21.3343 0.473684 21.5674 0.573496 21.7393 0.751162C21.9112 0.928828 22.0078 1.16979 22.0078 1.42105C22.0078 1.67231 21.9112 1.91328 21.7393 2.09094C21.5674 2.26861 21.3343 2.36842 21.0911 2.36842H6.42448C6.18137 2.36842 5.94821 2.26861 5.7763 2.09094C5.60439 1.91328 5.50781 1.67231 5.50781 1.42105ZM21.0911 8.05263H6.42448C6.18137 8.05263 5.94821 8.15244 5.7763 8.33011C5.60439 8.50778 5.50781 8.74874 5.50781 9C5.50781 9.25126 5.60439 9.49223 5.7763 9.66989C5.94821 9.84756 6.18137 9.94737 6.42448 9.94737H21.0911C21.3343 9.94737 21.5674 9.84756 21.7393 9.66989C21.9112 9.49223 22.0078 9.25126 22.0078 9C22.0078 8.74874 21.9112 8.50778 21.7393 8.33011C21.5674 8.15244 21.3343 8.05263 21.0911 8.05263ZM21.0911 15.6316H6.42448C6.18137 15.6316 5.94821 15.7314 5.7763 15.9091C5.60439 16.0867 5.50781 16.3277 5.50781 16.5789C5.50781 16.8302 5.60439 17.0712 5.7763 17.2488C5.94821 17.4265 6.18137 17.5263 6.42448 17.5263H21.0911C21.3343 17.5263 21.5674 17.4265 21.7393 17.2488C21.9112 17.0712 22.0078 16.8302 22.0078 16.5789C22.0078 16.3277 21.9112 16.0867 21.7393 15.9091C21.5674 15.7314 21.3343 15.6316 21.0911 15.6316ZM1.38281 0C1.11086 0 0.845022 0.0833434 0.618904 0.239491C0.392787 0.395638 0.216549 0.617576 0.112479 0.877239C0.00840827 1.1369 -0.0188213 1.42263 0.0342334 1.69829C0.087288 1.97394 0.218244 2.22715 0.410541 2.42589C0.602838 2.62463 0.84784 2.75997 1.11456 2.8148C1.38129 2.86963 1.65775 2.84149 1.909 2.73393C2.16025 2.62638 2.375 2.44424 2.52608 2.21055C2.67717 1.97686 2.75781 1.70211 2.75781 1.42105C2.75781 1.04417 2.61295 0.682716 2.35509 0.416217C2.09722 0.149717 1.74749 0 1.38281 0ZM1.38281 7.57895C1.11086 7.57895 0.845022 7.66229 0.618904 7.81844C0.392787 7.97459 0.216549 8.19652 0.112479 8.45619C0.00840827 8.71585 -0.0188213 9.00158 0.0342334 9.27723C0.087288 9.55289 0.218244 9.8061 0.410541 10.0048C0.602838 10.2036 0.84784 10.3389 1.11456 10.3937C1.38129 10.4486 1.65775 10.4204 1.909 10.3129C2.16025 10.2053 2.375 10.0232 2.52608 9.78949C2.67717 9.5558 2.75781 9.28106 2.75781 9C2.75781 8.62311 2.61295 8.26166 2.35509 7.99516C2.09722 7.72866 1.74749 7.57895 1.38281 7.57895ZM1.38281 15.1579C1.11086 15.1579 0.845022 15.2412 0.618904 15.3974C0.392787 15.5535 0.216549 15.7755 0.112479 16.0351C0.00840827 16.2948 -0.0188213 16.5805 0.0342334 16.8562C0.087288 17.1318 0.218244 17.385 0.410541 17.5838C0.602838 17.7825 0.84784 17.9179 1.11456 17.9727C1.38129 18.0275 1.65775 17.9994 1.909 17.8918C2.16025 17.7843 2.375 17.6021 2.52608 17.3684C2.67717 17.1348 2.75781 16.86 2.75781 16.5789C2.75781 16.2021 2.61295 15.8406 2.35509 15.5741C2.09722 15.3076 1.74749 15.1579 1.38281 15.1579Z"
                            fill="black"
                          />
                        </svg>
                      </button>
                    </div>
                    <ReactQuill
                      className="quill absolute top-10 left-0 right-0 bottom-0"
                      ref={quillRef}
                      value={editorContent}
                      onChange={setEditorContent}
                      modules={{
                        toolbar: false,
                      }}
                      placeholder="What is on your mind?"
                    />
                  </div>
                </div>
              </div>

              <div className="add-task-checklist mt-3 grid grid-cols-2  bg-white shadow-lg rounded-md p-5">
                <div>
                  <div className="bolder-label">Checklist</div>
                  <div>
                    {checklists &&
                      checklists?.map((list, index) => (
                        <div key={index} className={`${index > 0 && " mt-2"}`}>
                          {!list.checklist_name ? (
                            <div>
                              <label>Checklist Name</label>
                              <div className="flex gap-2 items-center">
                                {" "}
                                <input
                                  onChange={(e) => setListName(e.target.value)}
                                  value={listname}
                                  type="text"
                                />{" "}
                                <button
                                  onClick={() => handleChecklistName(index)}
                                  className="ann-btn px-3 py-2 rounded-md mt-2"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <label> Checklist Title</label>{" "}
                              <div
                                onMouseEnter={() => handleShowListDel(index)}
                                onMouseLeave={() => handleHideListDel()}
                                className="flex items-center gap-2 mt-1"
                              >
                                <div className="checklist-name-div">
                                  {list.checklist_name}{" "}
                                </div>
                                <div
                                  onClick={() => handleListDelete(index)}
                                  className="cursor-pointer"
                                >
                                  <BgDeleteIcon />
                                </div>
                              </div>
                            </div>
                          )}

                          <div>
                            <div>
                              {list?.checks?.length > 0 && (
                                <div>
                                  {list?.checks.map((check, checkIndex) => (
                                    <div
                                      key={checkIndex}
                                      className=" mt-1 p-0 h-7"
                                      onMouseEnter={() =>
                                        handleDelIcon(index, checkIndex)
                                      }
                                      onMouseLeave={hideDelIcon}
                                    >
                                      <div className="flex justify-between items-center">
                                        {" "}
                                        <div className=" flex items-center gap-2">
                                          <div>
                                            {" "}
                                            <input
                                              onChange={(e) =>
                                                handleCheckChange(
                                                  e,
                                                  index,
                                                  checkIndex
                                                )
                                              }
                                              type="checkbox"
                                            />{" "}
                                          </div>
                                          <div className="check-item-name">
                                            {check?.value}{" "}
                                          </div>
                                        </div>{" "}
                                        <div
                                          onClick={() =>
                                            deleteItem(index, checkIndex)
                                          }
                                          className="cursor-pointer"
                                        >
                                          {" "}
                                          {showDelIcon &&
                                          delIconIndex === checkIndex &&
                                          listIndex === index ? (
                                            <DimmedDeleteIcon />
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {showAddItem && addItemIndex === index ? (
                              <div className="mt-2 add-ann-form">
                                <div>
                                  {" "}
                                  <label>Add an Item</label>{" "}
                                </div>
                                <input
                                  type="text"
                                  onChange={(e) => setItemName(e.target.value)}
                                />
                                <div className="flex items-center gap-3 mt-3">
                                  <button
                                    onClick={() => handleItemName(index)}
                                    className="ann-btn px-3 py-2 rounded-md "
                                  >
                                    Add
                                  </button>
                                  <button
                                    className="checklist-cancel-btn px-5 py-2"
                                    onClick={() => addItem(index)}
                                  >
                                    Cancel
                                  </button>{" "}
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mt-5  items-center">
                            {showAddItem && addItemIndex === index ? (
                              ""
                            ) : (
                              <button
                                disabled={!list?.checklist_name ? true : false}
                                className="ann-btn rounded-md  px-5 py-2"
                                onClick={() => addItem(index)}
                              >
                                Add Item
                              </button>
                            )}
                          </div>

                          <hr className="mt-2"></hr>
                        </div>
                      ))}

                    <button
                      onClick={toggleAddChecklist}
                      className="ann-btn px-3 py-2 rounded-md mt-2"
                    >
                      + Add Checklist
                    </button>
                  </div>{" "}
                </div>
              </div>

              <div className="task-attachments add-task-checklist mt-3 grid grid-cols-2 gap-5 bg-white shadow-lg rounded-md p-5">
                <div>
                  <div className="bolder-label">Attachments</div>
                  {/* <div className="lighter-label">Upload Image</div> */}
                  <div className="mt-1">
                    <label>Upload Image</label>
                  </div>

                  <div>
                    <div>
                      <div className=" add-ann-img mt-2 ">
                        <label
                          htmlFor="file-input"
                          className="upload-app-label"
                        >
                          <div className="add-app-camera flex justify-center">
                            <ImageIcon />
                          </div>
                          <div className="add-app-camera-text mt-2">
                            Click to upload app image
                          </div>
                        </label>
                      </div>
                      <input
                        id="file-input"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 flex-wrap">
                    {items}
                  </div> */}

                  {selectedImages.length > 0 && (
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        {selectedImages.map((image, index) => (
                          <div className="my-3 thumbnail-wrapper relative ">
                            <div className="absolute right-1 top-1">
                              <div
                                onClick={() => handleFileRemoveImg(index)}
                                className="cursor-pointer"
                              >
                                {" "}
                                <BgTimes />{" "}
                              </div>
                            </div>
                            <div>
                              <img
                                src={image}
                                alt="alt"
                                className="thumbnail-image cursor-pointer"
                                onClick={() => {
                                  setShowModal(true);
                                }}
                              />
                              {showModal && (
                                <ZoomImage
                                  src={image}
                                  alt="snow"
                                  onClose={() => setShowModal(false)}
                                />
                              )}
                            </div>
                  <div className="add-ann-form text-white flex justify-center items-center"> <label>{files[index]?.name?.slice(0,7)}</label> </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="bolder-label invisible">Attachments</div>

                  <div className="mt-1">
                    <label>Upload Document</label>
                  </div>

                  <div>
                    <div>
                      <div className=" add-ann-img mt-2 ">
                        <label
                          htmlFor="file-input-pdf"
                          className="upload-app-label"
                        >
                          <div className="add-app-camera flex justify-center">
                            <ImageIcon />
                          </div>
                          <div className="add-app-camera-text mt-2">
                            Click to upload app Document
                          </div>
                        </label>
                      </div>

                      {/* <div> {selectedFile && <span>{selectedFile}</span>} </div> */}
                      <input
                        id="file-input-pdf"
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfSelect}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                  {/* {pdf && (
                    <button className="flex items-center gap-1 selected-file ">
                      <LinkIcon />
                      <span>{pdf?.name?.slice(0, 10)}</span>
                      <span
                        onClick={() => setPdf(null)}
                        className="cursor-pointer"
                      >
                        <BgTimes />
                      </span>{" "}
                    </button>
                  )} */}

                  <div className="grid grid-cols-3 gap-3">
                    {" "}
                    {pdf && (
                      <div className=" add-ann-pdf mt-2 relative mb-2  ">
                        <div className="absolute right-1 top-1">
                          <div
                            onClick={() => setPdf(null)}
                            className="cursor-pointer"
                          >
                            {" "}
                            <BgTimes />{" "}
                          </div>
                        </div>
                        <label className="upload-app-label">
                          <div className="add-app-camera flex justify-center">
                            <img
                              src={pdfIcon}
                              alt="alt"
                              style={{ height: 30, width: 30 }}
                            />
                          </div>
                          <div className="add-app-camera-text mt-2">
                            {pdf?.name?.slice(0, 8)}
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    {files &&
                      files.map((file, index) => {
                        <button
                          key={index}
                          className="flex items-center gap-2 files-list"
                        >
                          {console.log(file)}
                          <WhiteBgTimes />
                        </button>;
                      })}
                  </div>
                  <div></div>
                </div>
              </div>

              <div className="add-task-checklist mt-3 grid md:grid-cols-2 gap-5 bg-white shadow-lg rounded-md p-5">
                <div>
                  <div className="mt-2">
                    <label>Task Type</label>
                  </div>
                  <div className="mt-1">
                    <select onChange={(e) => setTaskType(e.target.value)}>
                      <option value="" selected disabled>
                        Select
                      </option>
                      {taskTypes &&
                        taskTypes?.rows.map((type, index) => (
                          <option
                            value={type.task_type_id}
                            key={type.task_type_id}
                          >
                            {type.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <div className="mt-2">
                      <label>Reference Number</label>
                    </div>
                    <div className="mt-1">
                      {" "}
                      <input
                        type="number"
                        className="px-2"
                        placeholder="Reference Number"
                        onChange={(e) => setReferenceNumber(e.target.value)}
                      />{" "}
                    </div>
                  </div>

                  <div className="mt-2">
                    <label>Assign to Employee</label>

                    <div className="select-employee-wrapper">
                      <select
                        onChange={handleSelectChange}
                        className="select-employee-select"
                      >
                        <option selected disabled>
                          Select
                        </option>
                        {employees &&
                          employees.map((emp, index) => (
                            <option value={emp.user_id} key={emp.user_id}>
                              {emp.first_name}
                            </option>
                          ))}
                      </select>
                      <div className="select-hider"></div>
                      <div className="selected-employees flex gap-2  items-center">
                        {selectedOptions
                          ?.reverse()
                          .slice(0, 2)
                          .map((op, index) => (
                            <div
                              className="flex add-task-file items-center px-2 py-1 gap-2"
                              key={generateId()}
                            >
                              <div>{op.label}</div>
                              <div
                                onClick={() => removeOption(op.value)}
                                className="cursor-pointer"
                              >
                                <BgTimes />
                              </div>
                            </div>
                          ))}
                        {selectedOptions?.length > 2 && (
                          <span className="option-more">
                            {selectedOptions.length - 2} More
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <label>Task Status</label>
                  </div>
                  <div className="mt-1">
                    <select onChange={(e) => setTaskStatus(e.target.value)}>
                      <option value={status?.task_status_id} selected>
                        {status?.label}
                      </option>
                      {taskStatuses &&
                        taskStatuses?.rows.map((type, index) => (
                          <option
                            value={type.task_status_id}
                            key={type.task_status_id}
                          >
                            {type.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mt-2">
                    <label>Add to client</label>

                    <div className="select-employee-wrapper">
                      <select
                        onChange={handleCustomer}
                        className="select-employee-select"
                      >
                        <option selected>Select</option>
                        {customers &&
                          customers?.map((emp, index) => (
                            <option
                              value={emp.customer_id}
                              key={emp.customer_id}
                            >
                              {emp.first_name}
                            </option>
                          ))}
                      </select>
                      <div className="select-hider"></div>
                      <div className="selected-employees flex gap-2  items-center">
                        {selectedCustomer && (
                          <div
                            className="flex add-task-file items-center px-2 py-1 gap-2"
                            key={generateId()}
                          >
                            <div>{selectedCustomer?.label}</div>
                            <div
                              onClick={() => setSelectedCustomer(null)}
                              className="cursor-pointer"
                            >
                              <BgTimes />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="task-add-btn-wrap">
                <button
                  onClick={defAddTask}
                  className="flex items-center gap-2"
                >
                  Add {sideLoader && <SmallLoaderWhite />}
                </button>
              </div>

              <div className="mb-5"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddTask;
