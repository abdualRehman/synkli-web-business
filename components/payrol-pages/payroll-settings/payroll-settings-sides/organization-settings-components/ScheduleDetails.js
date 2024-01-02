export const ScheduleDetails = () => {
  return (
    <div className="opening-balance">
      <div className="mt-5 add-ann-form">
        <div>
          {" "}
          <label>Payroll Details</label>{" "}
        </div>
        <div className="mt-2">
          <label>Work Hours</label>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div>
              {" "}
              <select>
                {" "}
                <option value="" selected disabled>
                  Work Hours
                </option>{" "}
              </select>{" "}
            </div>
          </div>
          <div></div>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-5">
          <div>
            <div>
              {" "}
              <label>Payroll Start Date</label>{" "}
            </div>
            <div>
              {" "}
              <input type="text" placeholder="Date" />{" "}
            </div>
          </div>
          <div>
            <div>
              {" "}
              <label>Pay Period</label>{" "}
            </div>
            <div>
              {" "}
              <select>
                <option value="" selected disabled>
                  Pay Period
                </option>
              </select>{" "}
            </div>
          </div>
        </div>
        <div className="mt-2">
          {" "}
          <label>Roster Details</label>{" "}
        </div>
        <div className="mt-2">
          {" "}
          <label>Start Date</label>{" "}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            {" "}
            <select>
              <option value="" selected disabled>
                Date
              </option>
            </select>{" "}
          </div>
          <div></div>
        </div>
      </div>
      <div className="emp-details-b-buttons absolute bottom-5 w-full flex items-center justify-center gap-3">
        <button className="emp-details-save-btn">Save</button>
        <button className="emp-details-close-btn">Close</button>
      </div>
    </div>
  );
};
