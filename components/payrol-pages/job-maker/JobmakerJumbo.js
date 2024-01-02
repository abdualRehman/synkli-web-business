import "./css/jobmaker.css";
const JobmakerJumbo = () => {
  return (
    <div className="profle-jumbo ann-jumbo relative app-jumbo  md:flex md:flex-row flex-col  px-10 py-5 md:justify-between ">
      <div className="profile-jumbo-flex">
        <div className="jumbo-flex-1 flex flex-col w-full relative">
          <div className="flex justify-between">
            <div className="jumbo-name items-center">
              <div>Run Payroll</div>
            </div>
          </div>
          <div className="jumbo-dir md:mt-2">
            Payroll <span className="special-jumbo-text">&gt; Job Maker</span>
          </div>

          <div className="jobmaker-middle border">
            <div className="flex">
              <button className={`px-5 py-1 active-payment-btn`}>
                Employees
              </button>
              <button className={`px-5 py-1  `}>Job Maker Submissions</button>
            </div>
          </div>

          <div className="jobmaker-right-btn absolute max-md:right-10 right-5 max-md:top-5 px-8 py-1 text-white">
            Add Employee
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobmakerJumbo;
