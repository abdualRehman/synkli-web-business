import RunPayrollJumbo from "./RunPayrollJumbo";
import RunPayrollTable from "./RunPayrollTable";
import "./css/runPayroll.css";
const RunPayrollPage = ({ togglePayDetails, togglePaymentSummary }) => {
  return (
    <div>
      <RunPayrollJumbo />
      <div>
        <RunPayrollTable
          togglePayDetails={togglePayDetails}
          togglePaymentSummary={togglePaymentSummary}
        />
      </div>
    </div>
  );
};
export default RunPayrollPage;
