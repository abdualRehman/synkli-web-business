import "./css/payrollReports.css";
import { PayrollReportsJumbo } from "./PayrollReportsJumbo";
import { PayrollReportsOperations } from "./PayrollReportsOperations";
import { PayrollReportsCards } from "./PayrollReportsCards";
import { PayrollReportsTable } from "./PayrollReportsTable";
export const PayrollReportsPage = () => {
  return (
    <div>
      <div>
        <PayrollReportsJumbo />
      </div>
      <div>
        <PayrollReportsOperations />
      </div>
      <div>
        <PayrollReportsCards />
      </div>
      <div>
        <PayrollReportsTable />
      </div>
    </div>
  );
};
