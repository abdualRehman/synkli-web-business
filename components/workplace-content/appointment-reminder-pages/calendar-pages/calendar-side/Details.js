import { useState } from "react";
import { MemoryCardIcon } from "../../../../../utills/svgs/MemoryCardIcon";
import { FontIcon } from "../../../../../utills/svgs/FontIcon";
import { DimmedDeleteIcon } from "../../../../../utills/svgs/DimmedDeleteIcon";
import { TimesIcon } from "../../../../../utills/svgs/TimesIcon";
const Details = () => {
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
  ];

  const [selectedColor, setSelectedColor] = useState(null);

  const handleBoxClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="px-5 py-3 edit-emp-details">
      <div className="calendar-form">
        <div>
          <label>Customer</label>
        </div>
        <div className="mt-1">
          <select>
            <option value="" disabled selected>
              Select
            </option>
          </select>
        </div>
        <div className="">
          <div className="flex gap-1 items-center">
            <div>
              {" "}
              <input type="checkbox" className="mt-2" />{" "}
            </div>
            <div>
              {" "}
              <label>isAllDay</label>{" "}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 ">
          <div>
            <div>
              <div>
                <label>Appointment Start Date</label>
              </div>
              <div className="mt-1">
                <input type="date" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <label>Appointment End Date</label>
              </div>
              <div className="mt-1">
                <input type="date" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mt-1">
            <label>Recurring</label>
          </div>
          <div>
            <div>
              <div className="upload-app-wrapper calendar-recurring add-ann-img mt-1 ">
                <label htmlFor="file-input-pdf" className="upload-app-label">
                  One Off Appointment
                </label>
              </div>
              <input
                id="file-input-pdf"
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div>
            <label>Script</label>
          </div>
          <div className="mt-1">
            <select>
              <option value="" disabled selected>
                Appointment Reminder Script
              </option>
            </select>
          </div>
        </div>

        <div className="mt-1">
          <div>
            <label>When to Send Reminder</label>
          </div>
          <div className="mt-1">
            <select>
              <option value="" disabled selected>
                Booking
              </option>
            </select>
          </div>
        </div>

        <div className="calender-checkboxes flex justify-between flex-wrap">
          <div className="flex gap-1 items-center ">
            <div>
              <input type="checkbox" className="mt-2" />
            </div>
            <div>
              {" "}
              <label>Send SMS</label>{" "}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div>
              <input type="checkbox" className="mt-2" />
            </div>
            <div>
              {" "}
              <label>Send Phone Call</label>{" "}
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div>
              <input type="checkbox" className="mt-2" />
            </div>
            <div>
              {" "}
              <label>Send Email</label>{" "}
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-8 gap-2">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`box ${selectedColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => handleBoxClick(color)}
              >
                {selectedColor === color && (
                  <span className="check">&#10003;</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1">
          <div>
            <label>Appointment Outcome</label>
          </div>
          <div className="mt-1">
            <select>
              <option value="" disabled selected>
                Select
              </option>
            </select>
          </div>
        </div>
        <div className="mt-3 flex gap-2 justify-center items-center ">
          <button className="s-btn flex gap-2">
            {" "}
            <span>
              {" "}
              <MemoryCardIcon />
            </span>{" "}
            <span>Save</span>{" "}
          </button>
          <button className="mt-btn flex gap-2">
            {" "}
            <span>
              <FontIcon />
            </span>{" "}
            <span>Manual Text</span>{" "}
          </button>{" "}
          <br />
        </div>

        <div className="mt-2 mb-5 flex gap-2 justify-center items-center">
          <button className="d-btn flex gap-2">
            {" "}
            <span>
              <DimmedDeleteIcon />
            </span>{" "}
            <span>Delete</span>{" "}
          </button>
          <button className="d-btn flex gap-2">
            {" "}
            <span>
              <TimesIcon />
            </span>{" "}
            <span>Cancel</span>{" "}
          </button>{" "}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Details;
