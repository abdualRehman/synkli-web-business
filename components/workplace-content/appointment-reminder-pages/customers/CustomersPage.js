import CustomersJumbo from "./CustomersJumbo";
import CustomersOperations from "./CustomersOperations";
import CustomersTable from "./CustomersTable";
import "./css/customers.css";
const CustomersPage = () => {
  return (
    <div>
      <CustomersJumbo />
      <div>
        <CustomersOperations />
      </div>
      <div>
        <CustomersTable />
      </div>
    </div>
  );
};

export default CustomersPage;
