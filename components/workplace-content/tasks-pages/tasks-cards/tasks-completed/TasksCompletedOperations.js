import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BgTimes } from "utills/svgs/BgTimes";
import { DimArrowDown } from "utills/svgs/DimArrowDown";
import { PickDate } from "utills/svgs/PickDate";
import { SearchIcon } from "utills/svgs/SearchIcon";
import "./css/tasksCompleted.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { BUSINESS_ID } from "utills/globalVars";
import { generateId } from "utills/uid";
export const TasksCompletedOperations = ({ updateFilters, filters }) => {
  const navigate = useNavigate();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { data: types } = useSelector((state) => state.getAllTaskType);
  const { data: customers } = useSelector(
    (state) => state.fetchBusinessAllCustomer
  );
  const { data: employees } = useSelector(
    (state) => state.fetchRegisteredEmployees
  );
  const [formData, setFormData] = useState({
    search_term: "",
    employee_id: "",
    start_date: "",
    task_type_id: "",
    customer_id: "",
    sort_by: "",
    reference_number: "",
    is_completed: "true",
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
      customer_id: "",
      sort_by: "",
      reference_number: "",
      is_completed: "true",
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      start_date: date,
    });
  };
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
            <div>
              <div className="oso-input-container">
                <div className="oso-search-icon">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  name="search_term"
                  onChange={handleInputChange}
                  value={formData.search_term}
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
                value={formData.employee_id}
                onChange={handleInputChange}
              >
                <option value="Filter by Employee" selected>
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
                <option value="Filter by Task Type" selected>
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
                name="customer_id"
                value={formData.customer_id}
                onChange={handleInputChange}
              >
                <option value="Filter by Status" selected>
                  Filter by Client
                </option>
                {customers &&
                  customers?.map((item, index) => (
                    <option value={item?.customer_id} key={generateId()}>
                      {`${item?.first_name} ${item?.last_name}`}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <select
                className="px-2 text-black"
                name="sort_by"
                value={formData.sort_by}
                onChange={handleInputChange}
              >
                <option value="Filter by Status" selected>
                  Sort By
                </option>
                <option value={"ASC"}>ASC</option>
                <option value={"DESC"}>DESC</option>
              </select>
            </div>
            <div>
              <div className="task-sort-date-wrapper  px-2">
                <span className="pickDate">
                  <PickDate />{" "}
                </span>
                <DatePicker
                  name="start_date"
                  placeholderText="select date"
                  selected={formData.start_date}
                  onChange={(date) => handleDateChange(date)}
                  dateFormat="dd-MM-yyyy"
                  className="pl-2 datePicker w-20"
                />
                <span className="ml-3">
                  <DimArrowDown />
                </span>
              </div>
            </div>
            <div>
              <input
                type="text"
                name="reference_number"
                onChange={handleInputChange}
                value={formData.reference_number}
                placeholder="reference no"
                className="ref-input  text-black px-3"
              />
            </div>

            <button
              onClick={clearFilter}
              className="clear-filter-btn flex items-center gap-2 rounded-xl px-2 py-1"
            >
              <BgTimes /> Clear Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
