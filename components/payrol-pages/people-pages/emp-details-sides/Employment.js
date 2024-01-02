export const Employment = () => {
  return (
    <div className="mt-3 ">
      <div className="employment grid grid-cols-2 gap-5 add-ann-form">
        <div>
          <div>
            {" "}
            <label>Job Title *</label>{" "}
          </div>
          <div>
            {" "}
            <input type="text" placeholder="Job Title" />{" "}
          </div>
          <div className="mt-3">
            <label>Employment Type *</label>
          </div>
          <div>
            <select>
              <option value="" disabled selected>
                Employment Type
              </option>
            </select>
          </div>
          <div className="mt-3">
            <label>Leave Loading</label>
          </div>
          <div className="leave-loading-container">
            <input
              type="number"
              name=""
              id=""
              placeholder="Leave Loading"
              className="leave-loading-input"
            />
            <button className="leave-loading-btn">%</button>
          </div>

          <div className="mt-3">
            <label>Pay Rate *</label>
          </div>
          <div className="pay-rate-container">
            <input
              type="number"
              name=""
              id=""
              placeholder="Pay Rate"
              className="pay-rate-input"
            />
            <button className="pay-rate-btn">%</button>
          </div>
          <div className="mt-3">
            <label>Equivalent to $28.00 per hour</label>
          </div>
        </div>
        <div>
          <div>
            {" "}
            <label>Start Date *</label>{" "}
          </div>
          <div>
            <div className="invite-employee-dates flex gap-3 mt-1">
              <div className="invite-employee-employe employment-date">
                <input type="number" placeholder="Day" />
              </div>
              <div className="invite-employee-employe employment-date">
                <input type="number" placeholder="Month" />
              </div>
              <div className="invite-employee-employe employment-date">
                <input type="number" placeholder="YYYY" />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label>Weekly Work Hours *</label>
          </div>

          <div className="leave-loading-container">
            <input
              type="number"
              placeholder="Weekly Work Hours"
              className="leave-loading-input"
            />
            <button className="leave-loading-btn">hr</button>
          </div>

          <div className="mt-3">
            <label>Pay Period *</label>
          </div>
          <div>
            <select>
              <option value="" disabled selected>
                Pay Period
              </option>
            </select>
          </div>
          <div className="mt-3">
            <label>Pay Hour *</label>
          </div>
          <div>
            <select>
              <option value="" disabled selected>
                Pay Hour
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="emp-details-b-buttons absolute bottom-5 w-full flex items-center justify-center gap-3">
        <button className="emp-details-save-btn">Save</button>
        <button className="emp-details-close-btn">Close</button>
      </div>
    </div>
  );
};
