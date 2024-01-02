import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastHandler } from "responseHanlder";
import { setSideLoader } from "store/global/globalReducer";
import { closeThreadThunk } from "store/workspace/workspaceThreads";
import { BUSINESS_ID, ERROR_TYPE_ERROR } from "utills/globalVars";
import { SideTimes } from "utills/svgs/SideTimes";
const StopThread = ({ toggleStopThread, threadId, toggleThreadUpdate }) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const [reason, setReason] = useState("");

  const stopThread = () => {
    if (!reason) {
      toastHandler(
        "Please enter reason to close this thread",
        ERROR_TYPE_ERROR
      );
      return;
    }
    const payload = {
      business_id,
      thread_id: threadId,
      reason_for_closing: reason,
    };
    dispatch(setSideLoader(true));
    dispatch(closeThreadThunk(payload))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleThreadUpdate();
          toggleStopThread();
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
    <div className="add-p-side grid grid-cols-5 ">
      <div className="md:col-span-3 hidden md:block left-side"></div>
      <div className="right-side col-span-5 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleStopThread}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Reason to Close</div>

              <div className="jumbo-dir mt-2">
                Workspace{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Reason to Close
                </span>
              </div>
            </div>
          </div>

          <div className="add-ann-form px-5 ">
            <div className="mt-1">
              <label>Write a reason for stopping this thread</label>
            </div>

            <div className=" ">
              <textarea
                className="description-area rounded-md"
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setReason(e.target.value)}
                placeholder="reason to close"
                maxLength={2000}
              ></textarea>
            </div>
          </div>

          <div className="add-service-bottom">
            <button
              onClick={stopThread}
              className="add-btn text-white px-5 md:px-12 py-2 cursor-pointer  rounded-lg"
            >
              Submit
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default StopThread;
