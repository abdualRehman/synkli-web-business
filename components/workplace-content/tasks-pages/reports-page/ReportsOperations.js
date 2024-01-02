const ReportsOperations = () => {
  return (
    <div>
      <div className="max-md:px-10 px-5">
        <div className="reports-op-container flex gap-5 flex-wrap items-center">
          <div>
            <select className="px-3">
              <option value="" selected disabled>
                Select Employee
              </option>
            </select>
          </div>
          <div>
            <select className="px-3">
              <option value="" selected disabled>
                Select Task Type
              </option>
            </select>
          </div>
          <div>
            <select className="px-3">
              <option value="" selected disabled>
                Select Status
              </option>
            </select>
          </div>
          <div>
            <div className="input-date-container">
              <input type="date" className="input-date pl-3 pr-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsOperations;
