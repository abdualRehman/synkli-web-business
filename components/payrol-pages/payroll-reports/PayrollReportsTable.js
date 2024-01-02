export const PayrollReportsTable = () => {
  return (
    <div className="mx-10 grid md:grid-cols-2">
      <div>
        <div className="payroll-table-head">Monthly Overview</div>
        <div className="report-right-title mt-2">
          Tip: The payment date determines which month a pay run is record in
        </div>
        <div className="mt-5 payroll-table-head grid grid-cols-5 gap-3">
          <div> Date </div>
          <div> Gross </div>
          <div> Tax </div>
          <div> Super </div>
          <div> Net Pay </div>
        </div>
        <div className="team-line mt-3"></div>
        <div className="mt-5 payroll-table-head grid grid-cols-5 gap-3">
          <div> 3 Jul 2022 </div>
          <div> $1,148.00 </div>
          <div> $104.00 </div>
          <div> $120.00 </div>
          <div> $1044.00 </div>
        </div>
        <div className="team-line mt-3"></div>
      </div>
      <div></div>
    </div>
  );
};
