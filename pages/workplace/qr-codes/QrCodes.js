import { useState } from "react";
import AppSidebar from "../../../components/appSidebarComp/AppSidebar";
import "../../../components/appSidebarComp/appSidebar.css";
import QrCodesPage from "../../../components/workplace-content/qr-codes-pages/QrCodesPage";
import AddQrCode from "../../../components/workplace-content/qr-codes-pages/AddQrCode";
import { useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import {
  ERROR_TYPE_ERROR,
  PERMISSIONS_MESSAGE,
  TOAST_TYPE_ERROR,
} from "utills/globalVars";
import { SingleCode } from "components/workplace-content/qr-codes-pages/SingleCode";
const QrCodes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddQrCode, setShowAddQrCode] = useState(false);
  const [qrCodeUpdated, setQrCodeUpdated] = useState(false);
  const { data: loginData } = useSelector((state) => state.login);
  const allPermissions = JSON.parse(localStorage.getItem("allPermissions"));

  const [showSingleCode, setShowSingleCode] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddQrCode = () => {
    if (
      !loginData?.is_employee ||
      allPermissions?.Qr_Codes?.admin ||
      allPermissions?.Qr_Codes?.write
    ) {
      setShowAddQrCode(!showAddQrCode);
    } else {
      toastHandler(PERMISSIONS_MESSAGE, ERROR_TYPE_ERROR);
    }

    // if (allPermissions.QrCodes?.write || !loginData?.is_employee) {
    //   setShowAddQrCode(!showAddQrCode);
    // } else {
    //   toastHandler(
    //     "You dont have permission to access this page",
    //     TOAST_TYPE_ERROR
    //   );
    // }
  };

  const toggleQrCode = () => {
    setQrCodeUpdated(!qrCodeUpdated);
  };

  const toggleSingleCode = () => {
    setShowSingleCode(!showSingleCode);
  };
  return (
    <div className="app-dashboard">
      {showSingleCode && <SingleCode toggleSingleCode={toggleSingleCode} />}
      {showAddQrCode && (
        <AddQrCode
          toggleAddQrCode={toggleAddQrCode}
          toggleQrCode={toggleQrCode}
        />
      )}

      <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {allPermissions?.QrCodes?.read || !loginData.is_employee ? (
        <div className={`content ${isOpen ? "squeeze" : ""}`}>
          <QrCodesPage
            toggleSingleCode={toggleSingleCode}
            toggleAddQrCode={toggleAddQrCode}
            toggleQrCode={toggleQrCode}
            qrCodeUpdated={qrCodeUpdated}
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

export default QrCodes;
