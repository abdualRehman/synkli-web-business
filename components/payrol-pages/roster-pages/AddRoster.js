import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
export const AddRoster = ({ toggleAddRoster }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateClick = (date) => {
    if (!startDate) {
      setStartDate(date);
    } else if (!endDate) {
      setEndDate(date);
    } else {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    const currentDate = new Date();

    for (let i = 1; i <= 31; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isCurrentMonth = date.getMonth() === currentDate.getMonth();

      days.push({
        date,
        isCurrentMonth,
        isStartDate: startDate && date.getTime() === startDate.getTime(),
        isEndDate: endDate && date.getTime() === endDate.getTime(),
      });
    }

    return days;
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const days = generateCalendarDays();

    return days.map((day) => (
      <div
        key={day.date.getTime()}
        className={`roster-day ${
          day.isCurrentMonth ? "current-month" : "other-month"
        } ${day.isStartDate ? "start-date" : ""} ${
          day.isEndDate ? "end-date" : ""
        }`}
        onClick={() => handleDateClick(day.date)}
      >
        {day.date.getDate()}
      </div>
    ));
  };

  return (
    <div className="add-p-side grid grid-cols-7 ">
      <div className="md:col-span-3 hidden md:block left-side"></div>
      <div className="right-side col-span-7 md:col-span-4">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleAddRoster}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="13" cy="13" r="13" fill="#666666" />
                <path
                  d="M19 8L8 19"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M19 19L8 8"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="add-detail pt-10 px-5">
              <div className="title">Roster</div>

              <div className="jumbo-dir md:mt-2">
                Payroll <span className="special-jumbo-text">&gt; Roster</span>
              </div>
            </div>
          </div>
          <div className="px-5 year-summary-container mt-5 add-roster-container">
            <div className="add-roster-form-wrapper">
              <div className="add-ann-form">
                <select>
                  <option value="" selected disabled>
                    Search Employee
                  </option>
                </select>
                <div className="mt-1">
                  {" "}
                  <label>Date</label>{" "}
                </div>
                <div>
                  <input type="text" placeholder="Date" />
                </div>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <div>
                    <div>
                      {" "}
                      <label>Start Time</label>{" "}
                    </div>
                    <div>
                      {" "}
                      <input
                        type="time"
                        placeholder="Start Time"
                        className="time-input"
                      />{" "}
                    </div>
                  </div>
                  <div>
                    <div>
                      {" "}
                      <label>Date Time</label>{" "}
                    </div>
                    <div>
                      {" "}
                      <input
                        type="time"
                        placeholder="End Time"
                        className="time-input"
                      />{" "}
                    </div>
                  </div>
                  <div>
                    <div>
                      {" "}
                      <label>Meal Break</label>{" "}
                    </div>
                    <div>
                      {" "}
                      <input
                        type="text"
                        maxLength="60"
                        placeholder="Start Time"
                        className="time-input"
                      />{" "}
                    </div>
                  </div>
                  <div>
                    <div>
                      {" "}
                      <label>Rest Break</label>{" "}
                    </div>
                    <div>
                      {" "}
                      <input
                        type="text"
                        maxLength="60"
                        placeholder="End Time"
                        className="time-input"
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="bluetext mt-2">
                  These sections are for unpaid breaks and will be removed from
                  the employee’s payable hours
                </div>
                <div className="mt-1">
                  <label>Note</label>
                </div>
                <div className="note-area-wrapper roster-note-wrapper mt-1">
                  <textarea
                    id=""
                    cols="30"
                    rows="10"
                    className="note-text-area"
                  ></textarea>
                  <div className="note-area-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.2"
                        width="32"
                        height="32"
                        rx="16"
                        fill="#B695F8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.9442 8.17458C16.7136 7.42251 17.757 7 18.845 7C19.933 7 20.9764 7.42251 21.7457 8.17458C22.515 8.92665 22.9472 9.94668 22.9472 11.0103C22.9472 12.0739 22.515 13.0939 21.7457 13.846L14.6501 20.7825C14.431 20.9967 14.1709 21.1667 13.8847 21.2827C13.5984 21.3986 13.2916 21.4584 12.9817 21.4584C12.3559 21.4585 11.7556 21.2156 11.313 20.7831C10.8704 20.3506 10.6217 19.7639 10.6216 19.1521C10.6215 18.5403 10.87 17.9535 11.3124 17.5209L18.1961 10.7904L19.0687 11.6434L12.1838 18.3727C12.0792 18.475 11.9962 18.5964 11.9395 18.7301C11.8829 18.8638 11.8537 19.007 11.8537 19.1517C11.8537 19.2963 11.8829 19.4396 11.9395 19.5732C11.9962 19.7069 12.0792 19.8283 12.1838 19.9306C12.2884 20.0329 12.4127 20.1141 12.5494 20.1694C12.6861 20.2248 12.8326 20.2533 12.9806 20.2533C13.1286 20.2533 13.2752 20.2248 13.4119 20.1694C13.5486 20.1141 13.6728 20.0329 13.7775 19.9306L20.8731 12.9941C21.1396 12.7336 21.351 12.4243 21.4952 12.0839C21.6394 11.7435 21.7137 11.3787 21.7137 11.0103C21.7137 10.6418 21.6394 10.277 21.4952 9.93663C21.351 9.59624 21.1396 9.28696 20.8731 9.02643C20.6066 8.76591 20.2902 8.55926 19.942 8.41826C19.5938 8.27727 19.2206 8.2047 18.8437 8.2047C18.4669 8.2047 18.0937 8.27727 17.7455 8.41826C17.3973 8.55926 17.0809 8.76591 16.8144 9.02643L9.508 16.1702C8.66042 17.0194 8.18932 18.161 8.19679 19.3474C8.20427 20.5339 8.68971 21.6696 9.54792 22.5086C10.4061 23.3476 11.568 23.8221 12.7816 23.8294C13.9953 23.8367 15.163 23.3762 16.0317 22.5476L23.1274 15.6099L24 16.463L16.9031 23.3995C15.8002 24.4389 14.324 25.0135 12.7921 24.9998C11.2602 24.986 9.79508 24.3849 8.7119 23.3259C7.62873 22.2668 7.01409 20.8345 7.00024 19.3369C6.98639 17.8394 7.57443 16.3964 8.63784 15.3183L15.9442 8.17338V8.17458Z"
                        fill="#B695F8"
                      />
                    </svg>
                  </div>
                </div>
                <div className="mt-2">
                  <div>
                    {" "}
                    <label> Make this shift recur: </label>{" "}
                  </div>
                </div>
                <div className="mt-1">
                  <div className="flex gap-2 items-center">
                    <div>
                      {" "}
                      <input type="checkbox" />{" "}
                    </div>
                    <div>
                      {" "}
                      <label>Never</label>{" "}
                    </div>
                  </div>
                  <div className="flex gap-2  items-center">
                    <div>
                      {" "}
                      <input type="checkbox" />{" "}
                    </div>
                    <div>
                      {" "}
                      <label>Weekly</label>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="roster-calendar">
                  <div className="roster-weekdays grid grid-cols-7 gap-1 mb-2">
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                  </div>
                  <div className="roster-days-container grid grid-cols-7 gap-1">
                    {renderCalendarDays()}
                  </div>
                </div>
              </div>
            </div>

            <div className="my-5 flex justify-center items-center gap-3">
              <button className="roster-apply-btn">Apply</button>
              <button className="roster-cancel-btn">Cancel</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
