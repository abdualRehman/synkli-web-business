export const OrganizationDetails = () => {
  return (
    <div className="opening-balance mt-2 px-5">
      <div className="add-ann-form">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <div>
              {" "}
              <label>Business Name</label>{" "}
            </div>
            <div>
              {" "}
              <input type="text" placeholder="Business Name" />{" "}
            </div>
          </div>
          <div></div>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-5">
          <div>
            <div>
              {" "}
              <label>ABN</label>{" "}
            </div>
            <div>
              {" "}
              <select>
                <option value="" selected disabled ABN>
                  ABN
                </option>
              </select>{" "}
            </div>
            <div className="mt-1">
              <label>Address</label>
            </div>
            <div>
              <input type="text" placeholder="Address" />
            </div>
            <div className="mt-1">
              {" "}
              <label>Subrub *</label>{" "}
            </div>
            <div>
              {" "}
              <input type="text" placeholder="Suburb" />{" "}
            </div>
            <div className="mt-1">
              {" "}
              <label>State *</label>{" "}
            </div>
            <div>
              {" "}
              <input type="text" placeholder="State" />{" "}
            </div>
          </div>
          <div>
            <div>
              {" "}
              <label>Company Legal Name *</label>{" "}
            </div>
            <div>
              {" "}
              <input type="text" placeholder="Company Name" />{" "}
            </div>
            <div className="mt-1">
              <label>Address 2</label>
            </div>
            <div>
              <input type="text" placeholder="Address 2" />
            </div>
            <div className="mt-1">
              {" "}
              <label>Post Code *</label>{" "}
            </div>
            <div>
              {" "}
              <input type="text" placeholder="Post Code" />{" "}
            </div>
            <div className="mt-1">
              {" "}
              <label>Contact Number *</label>{" "}
            </div>
            <div>
              {" "}
              <input type="text" placeholder="Contact Number" />{" "}
            </div>
          </div>
        </div>
        <div className="mt-1">
          <label>Website</label>
        </div>
        <div>
          <input type="text" name="" id="" placeholder="Website" />
        </div>
        <div className="mt-2 o-d-weak-label">
          <div className="flex gap-2 items-center">
            <div>
              {" "}
              <input type="checkbox" />{" "}
            </div>
            <div> Registered for Working Holiday Makers </div>
          </div>
          <div className="flex gap-2 mt-1 items-center">
            <div>
              {" "}
              <input type="checkbox" />{" "}
            </div>
            <div> Show employment type on pay slip </div>
          </div>
        </div>
      </div>
      <div className=" my-5  flex justify-center items-center gap-5">
        <button className="emp-details-save-btn">Save</button>
        <button className="emp-details-close-btn">Close</button>
      </div>
    </div>
  );
};
