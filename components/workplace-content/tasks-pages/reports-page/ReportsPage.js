import ReportsJumbo from "./ReportsJumbo";
import ReportsOperations from "./ReportsOperations";
import ReportsCards from "./ReportsCards";
import ReportsTable from "./ReportsTable";
import "./css/reports.css";
const ReportsPage = () => {
  return (
    <div>
      <ReportsJumbo />
      <div>
        <ReportsOperations />
      </div>
      <div>
        <ReportsCards />
      </div>
      <div>
        <ReportsTable />
      </div>
    </div>
  );
};
export default ReportsPage;
