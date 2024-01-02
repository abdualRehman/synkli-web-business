const FinalizeSTPTable = ({ toggleYearToDateSummary }) => {
  return (
    <div className="mx-10 mt-3">
      <div className="add-ann-form ">
        <div className="mx-5 stp-heading">
          <label>Employee</label>
        </div>
        <div className="team-line mt-3"></div>
        <div className="mt-3 flex justify-between stp-body mx-5">
          <div> John Doe </div>
          <div>View & Adjust</div>
        </div>
        <div className="team-line mt-3"></div>
        <div className="mt-3 flex justify-end ">
          <div className="flex gap-2">
            <div className="stp-table-save-btn">Save</div>
            <div
              onClick={toggleYearToDateSummary}
              className="stp-table-finalize-stp-btn cursor-pointer"
            >
              Finalise STP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizeSTPTable;
