import "./css/appointmentsReport.css";
import ReportJumbo from "./ReportJumbo";
import ReportOperations from "./ReportOperations";
import ReportChart from "./ReportChart";
import Highlights from "./Highlights";
import ReportsTable from "./ReportsTable";
const AppointmentsReportsPage = () => {
  return (
    <div>
      <ReportJumbo />
      <div>
        <ReportOperations />
      </div>
      <div className="appointment-reports">
        <div>
          <ReportChart />
        </div>
        <div>
          <Highlights />
        </div>
        <div>
          <ReportsTable />
        </div>
      </div>
    </div>
  );
};
export default AppointmentsReportsPage;
