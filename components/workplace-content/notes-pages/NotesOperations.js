import { PickDate } from "utills/svgs/PickDate";
import { SearchIcon } from "../../../utills/svgs/SearchIcon";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DimArrowDown } from "utills/svgs/DimArrowDown";
import { BoardIcon } from "utills/svgs/BoardIcon";
import { useState } from "react";
import DatePickerComponent from "global-components/DatePicker";

const NotesOperations = ({
  searchByTitle,
  toggleAddNote,
  filterByDate,
  filteredNotes,
}) => {
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleDateChange = (date) => {
    setDate(date);
    filterByDate(date);
  };

  const handleClearFilter = () => {
    setDate("");
    filterByDate("");
  };
  return (
    <div className="flex justify-between flex-wrap md:px-10 px-5 gap-5">
      <div className="search-input-container d-search">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <input
          onChange={(e) => searchByTitle(e.target.value)}
          type="text"
          placeholder="Search"
          className="td-search-input"
        />
      </div>

      <div className="flex gap-5">
        <div>
          {" "}
          <div className="flex gap-2 items-center">
            {date && (
              <div
                onClick={handleClearFilter}
                className="td-generic flex justify-center items-center"
              >
                <button className="px-10 py-2 rounded-md">Clear</button>
              </div>
            )}

            <DatePickerComponent
              type="date"
              isOpen={isOpen}
              date={date}
              setVisible={(value) => setIsOpen(value)}
              onDateChange={(date) => {
                setIsOpen(false);
                handleDateChange(date);
                console.log(date, "consoleDate");
              }}
            />
          </div>
        </div>
        {/* <div className="task-sort-date-wrapper  px-2">
          <span className="pickDate">
            <PickDate />{" "}
          </span>
          <DatePicker
            name="start_date"
            placeholderText="dd-mm-yyyy"
            selected={date}
            onChange={(date) => handleDateChange(date)}
            dateFormat="dd-MM-yyyy"
            className="pl-2 datePicker w-20"
          />
          <span className="ml-3">
            <DimArrowDown />
          </span>
        </div> */}
        <button
          onClick={toggleAddNote}
          className="create-code-btn flex gap-2 items-center px-5 py-1 rounded-lg"
        >
          <span>
            <BoardIcon />
          </span>
          <span>Add Note</span>
        </button>
      </div>
    </div>
  );
};

export default NotesOperations;
