export const LeaveSettings = () => {
  return (
    <div className="mt-5">
      <div className="add-ann-form">
        <div>
          {" "}
          <label>Leave Settings</label>{" "}
        </div>
        <div className="mt-1 flex gap-2 items-center">
          <div>
            {" "}
            <input type="checkbox" />{" "}
          </div>
          <div className="leave-settings-weak-text">
            {" "}
            Allow Long Service Leave{" "}
          </div>
        </div>

        <div className="mt-2">
          {" "}
          <label>Show in Payslip</label>{" "}
        </div>
        <div className="mt-1 flex gap-2 items-center">
          <div>
            {" "}
            <input type="checkbox" />{" "}
          </div>
          <div className="leave-settings-weak-text"> Annual Leave Balance </div>
        </div>
        <div className="mt-1 flex gap-2 items-center">
          <div>
            {" "}
            <input type="checkbox" />{" "}
          </div>
          <div className="leave-settings-weak-text">
            Personal/ Carer's leave (Sick leave) Balance{" "}
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
