import React from "react";
import { DimArrowDown } from "utills/svgs/DimArrowDown";
import { PickDate } from "utills/svgs/PickDate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SearchIcon } from "utills/svgs/SearchIcon";

export const TasksReportsOperations = () => {
  return (
    <div>
      {" "}
      <div>
        <div className="md:px-10 px-5">
          <div className="tasks-operations-container">
            <div className="flex items-center justify-between flex-wrap gap-5 mb-2">
              <div>
                <div className="oso-input-container">
                  <div className="oso-search-icon">
                    <SearchIcon />
                  </div>
                  <input
                    // onChange={handleInputChange}
                    type="text"
                    name="search_text"
                    placeholder="Search"
                    className="oso-input pl-8 pr-5"
                  />
                </div>
              </div>
            </div>
            <div className="flex  gap-3 flex-wrap">
              <div>
                <select
                  className="px-2 "
                  name="employee_id"
                  //   onChange={handleInputChange}
                >
                  <option value="Filter by Employee" selected>
                    Filter by Employee
                  </option>
                  {/* {employees &&
                employees?.map((emp, index) => (
                  <option value={emp?.user_id} key={generateId()}>
                    {emp?.first_name}
                  </option>
                ))} */}
                </select>
              </div>
              <div>
                <select
                  className="px-2"
                  name="task_type_id"
                  //   onChange={handleInputChange}
                >
                  <option value="Filter by Task Type" selected>
                    Filter by Task Type
                  </option>
                  {/* {types &&
                types?.rows?.map((type, index) => (
                  <option value={type?.task_type_id} key={generateId()}>
                    {type?.label}
                  </option>
                ))} */}
                </select>
              </div>
              <div>
                <select
                  className="px-2 text-black"
                  name="task_status_id"
                  //   onChange={handleInputChange}
                >
                  <option value="Filter by Status" selected disabled>
                    Filter by Status
                  </option>

                  {/* {statuses &&
                statuses?.rows?.map((status, index) => (
                  <option value={status?.task_status_id} key={generateId()}>
                    {status?.label}
                  </option>
                ))} */}
                </select>
              </div>
              <div>
                <div className="task-sort-date-wrapper  px-2">
                  <span className="pickDate">
                    <PickDate />{" "}
                  </span>
                  <DatePicker
                    name="start_date"
                    placeholderText="start date"
                    // selected={formData.start_date}
                    // onChange={(date) => handleDateChange(date)}
                    dateFormat="dd-MM-yyyy"
                    className="pl-2 datePicker w-20"
                  />
                  <span className="ml-3">
                    <DimArrowDown />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
