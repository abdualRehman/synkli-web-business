import "./App.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { MobileModal } from "./utills/base-components/MobileModal";
import { RoutesManager } from "routes/routes-manager/RoutesManager";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "utills/confirmationModal";
import { setIsConfirmationOpen } from "store/global/globalReducer";
import { useLogout } from "Hooks/useLogout";

function App() {
  const dispatch = useDispatch();
  const { isConfirmationOpen } = useSelector((state) => state.global);
  const { logout } = useLogout();
  const sidebarLog = true;
  return (
    <div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => dispatch(setIsConfirmationOpen(false))}
        onConfirm={() => logout(setIsConfirmationOpen, sidebarLog)}
        description="Are you sure you want to logout!"
        confirmbtnTxt="Logout"
        cancelBtnTxt="Cancel"
        title="Logout Confirmation"
        sidebarLog={true}
      />
      <RoutesManager />

      <MobileModal />
    </div>
  );
}

export default App;
