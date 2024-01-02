const Personal = () => {
  return (
    <div className="emp-details-personal mt-3">
      <div className="add-ann-form grid grid-cols-2 gap-5">
        <div>
          <div>
            <label>First Name</label>
          </div>
          <div>
            {" "}
            <input type="text" placeholder="First Name" />{" "}
          </div>
          <div className="mt-2">
            <label>Gender</label>
          </div>
          <div>
            <select>
              <option value="" selected disabled>
                Gendar
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mt-2">
            <label>Mobile No</label>
          </div>
          <div>
            {" "}
            <input
              type="tel"
              placeholder="Mobile Number"
              className="personal-input"
            />{" "}
          </div>

          <div className="mt-2">
            <label>Address 2</label>
          </div>
          <div>
            {" "}
            <input type="text" placeholder="Address 2" />{" "}
          </div>

          <div className="mt-2">
            <label>Post Code</label>
          </div>
          <div>
            {" "}
            <input
              type="number"
              placeholder="Post Code"
              className="personal-input"
            />{" "}
          </div>
        </div>
        <div>
          <div>
            <label>Last Name</label>
          </div>
          <div>
            {" "}
            <input type="text" placeholder="Last Name" />{" "}
          </div>
          <div className="mt-2">
            <label>Email Address</label>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="personal-input"
            />
          </div>
          <div className="mt-2">
            <label>Address 1</label>
          </div>
          <div>
            {" "}
            <input
              type="text"
              maxLength="60"
              placeholder="Address 1"
              className="personal-input"
            />{" "}
          </div>

          <div className="mt-2">
            <label>Suburb</label>
          </div>
          <div>
            {" "}
            <input type="text" placeholder="Suburb" />{" "}
          </div>

          <div className="mt-2">
            <label>State</label>
          </div>
          <div>
            <select>
              <option value="" selected disabled>
                State
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

export default Personal;
