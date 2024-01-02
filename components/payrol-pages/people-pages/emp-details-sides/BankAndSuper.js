export const BankAndSuper = () => {
  return (
    <div className="bank-and-super mt-3">
      <div className="add-ann-form grid grid-cols-2 gap-5">
        <div>
          <div>
            {" "}
            <label>Payment Method</label>{" "}
          </div>
          <div>
            {" "}
            <select>
              <option value="Bank">Bank</option>
            </select>{" "}
          </div>
        </div>
        <div></div>
      </div>
      <div className="bank-and-super-inputs">
        <div className="add-ann-form">
          <div>
            <label>Account Name</label>
          </div>
          <div>
            <input type="text" placeholder="Account Name" />
          </div>
        </div>
        <div className="add-ann-form">
          <div>
            <label>BAB *</label>
          </div>
          <div>
            <input type="text" placeholder="BSB" />
          </div>
        </div>
        <div className="add-ann-form">
          <div>
            <label>Account Number *</label>
          </div>
          <div className="mt-1">
            <input
              type="number"
              placeholder="Account Number"
              className="b-s-input"
            />
          </div>
        </div>
      </div>
      <div className="b-s-title my-2">Super Fund</div>
      <div className="grid grid-cols-2 gap-5 mt-2 add-ann-form">
        <div>
          <div>
            <label>Type *</label>
          </div>
          <div>
            {" "}
            <select>
              {" "}
              <option value="" selected disabled>
                Type
              </option>{" "}
            </select>{" "}
          </div>
        </div>
        <div>
          <div>
            <label>Contribution Rate *</label>
          </div>
          <div>
            {" "}
            <input type="text" placeholder="Contribution Rate" />{" "}
          </div>
        </div>
      </div>

      <div className="b-s-text flex gap-2 my-1 items-center">
        <div>
          <input type="checkbox" />
        </div>
        <div className="b-s-light-text">
          {" "}
          Remove $450 monthly super guarantee threshold{" "}
        </div>
      </div>
      <div className="add-ann-form">
        <div>
          <label>Search Company By Name, USI or ABN</label>
        </div>
        <div className="flex gap-2">
          <div>
            <input type="text" className="w-72" />
          </div>
          <div>
            <button className="b-s-search-btn mt-1">Search</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 my-2 add-ann-form">
        <div>
          <div className="b-s-light-text">Super Fun Name</div>
          <div>
            {" "}
            <label>Australian Retirement Trust Super Savings</label>
          </div>
          <div className="b-s-light-text">USI: 737242387238782378</div>
        </div>
        <div>
          <div>
            {" "}
            <label>Number</label>{" "}
          </div>
          <div>
            {" "}
            <input
              type="number"
              placeholder="Number"
              className="b-s-input"
            />{" "}
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
