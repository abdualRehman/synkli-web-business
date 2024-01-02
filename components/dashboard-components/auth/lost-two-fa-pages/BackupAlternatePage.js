import { useState } from "react";
import Header from "../../../Header";
import "./css/backupAlternate.css";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { verifyBackupCodeThunk } from "store/auth/slices";
import { Loader } from "components/common/Loader";
const BackupAlternatePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.global.isLoading);
  const { data } = useSelector((state) => state.login);

  const [code, setCode] = useState("");

  const verifyBackupData = {
    user_id: data?.user_id,
    code: code,
    user_type: "employee",
  };
  const handleBackupCode = (e) => {
    e.preventDefault();
    if (!code) {
      NotificationManager.error("Please enter backup code");
      return;
    }

    dispatch(setLoader(true));
    dispatch(verifyBackupCodeThunk(verifyBackupData))
      .then((response) => {
        if (response.payload) {
          navigate("/two/factor/auth");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };
  return (
    <div>
      {isLoading && <Loader />}
      <NotificationContainer />
      <Header />
      <div className="flex justify-center items-center">
        <div className="backup-alternate">
          <form>
            <div className="upper-layer-b">
              <div className="alternate-title pl-16 mt-10">
                <h1>Enter Backup Code</h1>
              </div>

              <div className="pl-20 a-use mt-10 pr-16">
                Use the backup code provided to get access to your account
              </div>

              <div className="pl-20 b-label mt-5 pr-16">
                Enter one of your 8-digit backup codes
              </div>

              <div className="b-input pl-20 pr-16 mt-2">
                <input
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  maxLength="60"
                  className="rounded-xl px-3"
                  min="100"
                  pattern="\d{8,}"
                />
              </div>
            </div>

            <div className="bottom-layer-b flex justify-center items-center">
              <button
                onClick={handleBackupCode}
                className="px-12 py-2 rounded-md"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BackupAlternatePage;
