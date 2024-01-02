import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deactivateUserThunk } from "store/auth/slices";
import { setSideLoader } from "store/global/globalReducer";
import { ACCESS_TOKEN, BUSINESS_ID, REFRESH_TOKEN } from "utills/globalVars";
import { SideTimes } from "utills/svgs/SideTimes";
import { WarningSign } from "utills/svgs/WarningSign";
const DeactivateAccount = ({ toggleDeactivateAcc }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deactivate = () => {
    dispatch(setSideLoader(true));
    dispatch(deactivateUserThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          localStorage.setItem(ACCESS_TOKEN, "");
          localStorage.setItem(REFRESH_TOKEN, "");
          localStorage.setItem(BUSINESS_ID, "");
          navigate("/signup");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  return (
    <div className="add-p-side deactivate-acc flex justify-center items-center ">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="de-warning relative  px-16 py-7"
      >
        <div
          onClick={toggleDeactivateAcc}
          className="warning-toggle absolute cursor-pointer right-2 top-2"
        >
          <SideTimes />
        </div>
        <div className="warning svg flex justify-center items-center">
          <WarningSign />
        </div>
        <div className="warning-text flex justify-center items-center mt-1">
          Warning
        </div>

        <div className="warning-p mt-5">
          <p>If you deactivate this account your all </p>
          <p> data and credentials will be</p>

          <p>permanently deleted after 30 days.</p>

          <p className="mt-3">Do you really want to deactivate this </p>
          <p>account?</p>
        </div>

        <div className="warning-btns flex gap-2 justify-center mt-5 items-center">
          <button
            onClick={toggleDeactivateAcc}
            className="add-btn px-14 py-2 rounded-lg text-white"
          >
            No
          </button>
          <button className="cancel-btn px-14 py-2 rounded-lg ">Yes</button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeactivateAccount;
