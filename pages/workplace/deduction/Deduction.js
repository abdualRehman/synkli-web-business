import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import DeductionPage from "../../../components/workplace-content/deduction/DeductionPage";
import AddDeduction from "../../../components/workplace-content/deduction/AddDeduction";
import { toastHandler } from "responseHanlder";
import { useSelector } from "react-redux";
import { PERMISSIONS_MESSAGE, TOAST_TYPE_ERROR } from "utills/globalVars";
const Deductioon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddDeduction, setShowAddDeduction] = useState(false);
  const [deductionUpdated, setDeductionUpdated] = useState(false);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  function toggleAddDeduction() {
    if (
      !loginData?.is_employee ||
      allPermissions?.Deductions?.admin ||
      allPermissions?.Deductions?.write
    ) {
      setShowAddDeduction(!showAddDeduction);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, TOAST_TYPE_ERROR);
    }

    // if (allPermissions.Deductions?.write || !loginData?.is_employee) {
    //   setShowAddDeduction(!showAddDeduction);
    // } else {
    //   toastHandler(
    //     "You dont have permission to access this page",
    //     TOAST_TYPE_ERROR
    //   );
    // }
  }

  const toggleDeduction = () => {
    setDeductionUpdated(!deductionUpdated);
  };

  return (
    <div className="app-dashboard">
      {showAddDeduction && (
        <AddDeduction
          toggleAddDeduction={toggleAddDeduction}
          toggleDeduction={toggleDeduction}
        />
      )}
      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {allPermissions?.Deductions?.read ||
      !loginData.is_employee ||
      allPermissions?.Deductions?.write ||
      allPermissions?.Deductions?.admin ? (
        <div className={`content ${isOpen ? "squeeze" : ""}`}>
          <DeductionPage
            toggleAddDeduction={toggleAddDeduction}
            deductionUpdated={deductionUpdated}
          />
        </div>
      ) : (
        <div className="w-full h-72 flex justify-center items-center font-poppins">
          You dont have permission to access this data
        </div>
      )}
    </div>
  );
};

export default Deductioon;
