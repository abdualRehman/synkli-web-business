/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "utills/svgs/SearchIcon";

import { generateId } from "utills/uid";
import { useEffect, useState } from "react";
import { SettingsIcon } from "utills/svgs/SettingsIcon";
import { ReportsIcon } from "utills/svgs/ReportsIcon";
import Cookies from "js-cookie";
import { BUSINESS_ID } from "utills/globalVars";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import { PickDate } from "utills/svgs/PickDate";
import { DimArrowDown } from "utills/svgs/DimArrowDown";

import { Plus } from "utills/svgs/Plus";
import { RoundedTick } from "utills/svgs/RoundedTick";
import { BgTimes } from "utills/svgs/BgTimes";
import DatePickerComponent from "global-components/DatePicker";
const TasksOperations = ({
  getAllTasks,
  updateFilters,
  toggleAddTask,
  hasStatuses,
  filters,
}) => {
  const navigate = useNavigate();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data: statuses } = useSelector((state) => state.getAllTaskStatuses);
  const { data: types } = useSelector((state) => state.getAllTaskType);
  const { data: employees } = useSelector(
    (state) => state.fetchRegisteredEmployees
  );

  const [isOpen, setIsOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [formData, setFormData] = useState({
    search_term: "",
    employee_id: "",
    start_date: "",
    task_type_id: "",
    task_status_id: "",
    is_completed: "false",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearFilter = () => {
    setFormData({
      search_term: "",
      employee_id: "",
      start_date: "",
      task_type_id: "",
      task_status_id: "",
      is_completed: "false",
    });
  };

  const handleDateChange = (date) => {
    console.log(date);
    setFormData({
      ...formData,
      start_date: date,
    });
  };

  const isAnyFieldFilled = Object.values(filters).some((value) => value !== "");

  useEffect(() => {
    // const filters = {
    //   search_term: formData.search_text,
    //   employee_id: formData.employee_id,
    //   start_date:
    //     formData.start_date !== ""
    //       ? moment(formData.start_date).format("DD-MM-YYYY")
    //       : "",
    //   task_type_id: formData.task_type_id,
    //   task_status_id: formData.task_status_id,
    // };

    updateFilters(formData);
  }, [formData]);
  return (
    <div>
      <div className="md:px-10 px-5">
        <div className="tasks-operations-container">
          <div className="flex items-center justify-between flex-wrap gap-5 mb-2">
            {hasStatuses ? (
              <div>
                <div className="oso-input-container">
                  <div className="oso-search-icon">
                    <SearchIcon />
                  </div>
                  <input
                    onChange={handleInputChange}
                    value={formData.search_term}
                    type="text"
                    name="search_term"
                    placeholder="Search"
                    className="oso-input pl-8 pr-5"
                  />
                </div>
              </div>
            ) : (
              <div> </div>
            )}
            <div className="flex items-center gap-2">
              {" "}
              {hasStatuses && (
                <div className="flex gap-2 items-center">
                  {" "}
                  <div
                    onClick={() => navigate("/completed/tasks")}
                    className=" gap-2 tasks-reports-btn cursor-pointer rounded-md px-3"
                  >
                    <div className="fill-white scale-75">
                      <RoundedTick />
                    </div>
                    <div>Completed Tasks</div>
                  </div>
                  <div
                    onClick={toggleAddTask}
                    className=" gap-2 tasks-reports-btn cursor-pointer rounded-md px-3"
                  >
                    <div className="fill-white scale-75">
                      <Plus />
                    </div>
                    <div>Add Task</div>
                  </div>{" "}
                </div>
              )}
              {hasStatuses && (
                <div className=" gap-2 tasks-reports-btn  rounded-md px-3">
                  <div className="fill-white scale-75">
                    <ReportsIcon />
                  </div>
                  <div>Reports</div>
                </div>
              )}
              <div className="gap-2  tasks-reports-btn mt-1 rounded-md px-2">
                <div className="fill-white">
                  <SettingsIcon />
                </div>
                <div
                  onClick={() => navigate("/organizational/settings")}
                  className="cursor-pointer"
                >
                  Task Module Settings
                </div>
              </div>
            </div>
          </div>
          {hasStatuses && (
            <div className="flex  gap-3 flex-wrap">
              <div>
                <select
                  className="px-2 "
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleInputChange}
                >
                  <option value="" selected>
                    Filter by Employee
                  </option>
                  {employees &&
                    employees?.map((emp, index) => (
                      <option value={emp?.user_id} key={generateId()}>
                        {emp?.first_name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <select
                  className="px-2"
                  name="task_type_id"
                  value={formData.task_type_id}
                  onChange={handleInputChange}
                >
                  <option value="" selected>
                    Filter by Task Type
                  </option>
                  {types &&
                    types?.rows?.map((type, index) => (
                      <option value={type?.task_type_id} key={generateId()}>
                        {type?.label}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <select
                  className="px-2 text-black"
                  name="task_status_id"
                  value={formData.task_status_id}
                  onChange={handleInputChange}
                >
                  <option value="" selected>
                    Filter by Status
                  </option>

                  {statuses &&
                    statuses?.rows?.map((status, index) => (
                      <option value={status?.task_status_id} key={generateId()}>
                        {status?.label}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div>
              <div className="task-sort-date-wrapper  px-2">
                <span className="pickDate">
                  <PickDate />{" "}
                </span>
                <DatePicker
                  name="start_date"
                  placeholderText="start date"
                  selected={formData.start_date}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="dd-MM-yyyy"
                  className="pl-2 datePicker w-20"
                />
                <span className="ml-3">
                  <DimArrowDown />
                </span>
              </div>
            </div> */}
              <div>
                <DatePickerComponent
                  type="date"
                  isOpen={isOpen}
                  date={newDate}
                  setVisible={(value) => setIsOpen(value)}
                  onDateChange={(date) => {
                    setIsOpen(false);
                    setNewDate(date);
                    setFormData({
                      ...formData,
                      start_date: date,
                    });
                    console.log(date, "consoleDate");
                  }}
                />
              </div>
              {formData.search_term ||
              formData?.start_date ||
              formData.task_status_id ||
              formData?.task_type_id ||
              formData.employee_id ? (
                <button
                  onClick={clearFilter}
                  className="clear-filter-btn flex items-center gap-2 rounded-xl px-2 py-1"
                >
                  <BgTimes /> Clear Filter
                </button>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksOperations;
