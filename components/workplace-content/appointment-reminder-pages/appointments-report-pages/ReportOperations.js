const ReportOperations = () => {
  return (
    <div className="px-10 py-3">
      <div className="flex gap-5 flex-wrap report-operation">
        <div>
          <select>
            <option value="" selected disabled>
              Select Branch
            </option>
          </select>
        </div>
        <div>
          <select>
            <option value="" selected disabled>
              Select Employee
            </option>
          </select>
        </div>
        <div>
          <select>
            <option value="" selected disabled>
              Select Customer
            </option>
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label>Start Date</label>
          <input type="date" />
        </div>
        <div className="flex gap-2 items-center">
          <label>End Date</label>
          <input type="date" />
        </div>
      </div>
    </div>
  );
};

export default ReportOperations;
