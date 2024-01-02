export const Tax = () => {
  return (
    <div className="mt-3">
      <div className="add-ann-form">
        <div>
          <label>Date Of Birth</label>
        </div>
        <div className="invite-employee-dates flex gap-3  mt-2">
          <div className="invite-employee-employe">
            <input type="number" placeholder="Day" />
          </div>
          <div className="invite-employee-employe">
            <input type="number" placeholder="Month" />
          </div>
          <div className="invite-employee-employe">
            <input type="number" placeholder="YYYY" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <div className="mt-3">
              {" "}
              <label>Status Of Residency</label>{" "}
            </div>
            <div>
              {" "}
              <select>
                <option value="" selected disabled>
                  Status Of Residency
                </option>
              </select>{" "}
            </div>
          </div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div>
            <div>
              <label>Income Type *</label>
            </div>
            <div>
              <select>
                <option value="" selected disabled>
                  Income Type
                </option>
              </select>
            </div>
          </div>
          <div>
            <div>
              {" "}
              <label>Tax File Number *</label>{" "}
            </div>
            <div>
              {" "}
              <input
                type="number"
                placeholder="Tax File Number"
                className="b-s-input"
              />{" "}
            </div>
            <div className="b-s-light-text mt-1">No Tax File Number?</div>
          </div>
        </div>

        <div className="mt-3">
          <div>
            <label>Additional Information</label>
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <div>
              {" "}
              <input type="checkbox" />{" "}
            </div>
            <div>
              {" "}
              <label>Claim tax free threshold</label>{" "}
            </div>
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <div>
              {" "}
              <input type="checkbox" />{" "}
            </div>
            <div>
              {" "}
              <label>Has Study and Training Loan</label>
            </div>
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <div>
              {" "}
              <input type="checkbox" />{" "}
            </div>
            <div>
              {" "}
              <label>Is Horticulturist</label>
            </div>
          </div>
          <div className="mt-2 flex gap-2 items-center">
            <div>
              {" "}
              <input type="checkbox" />{" "}
            </div>
            <div>
              {" "}
              <label>Has Child Support Obligations</label>
            </div>
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
