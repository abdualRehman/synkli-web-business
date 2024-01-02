import "./css/finilizeStp.css";
import FinilizeSTPJumbo from "./FinilizeSTOJumbo";
import FinalizeSTPOperations from "./FinalizedSTPOperations";
import FinalizeSTPTable from "./FinalizeSTPTable";

const FinilizeSTPPage = ({ toggleYearToDateSummary }) => {
  return (
    <div>
      <FinilizeSTPJumbo />
      <div>
        <FinalizeSTPOperations />
      </div>
      <div>
        <FinalizeSTPTable toggleYearToDateSummary={toggleYearToDateSummary} />
      </div>
    </div>
  );
};

export default FinilizeSTPPage;
