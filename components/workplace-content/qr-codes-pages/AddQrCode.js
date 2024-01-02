import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BUSINESS_ID,
  ERROR_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
} from "utills/globalVars";
import { setSideLoader } from "store/global/globalReducer";
import { createQrCodeThunk } from "store/workspace/workspaceQrCode";
import Cookies from "js-cookie";
import { toastHandler } from "responseHanlder";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { getBranchLocationsThunk } from "store/auth/slices";
import { SideTimes } from "utills/svgs/SideTimes";
import { validateWebLink } from "utills/FormValidation";

const AddQrCode = ({ toggleAddQrCode, toggleQrCode }) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);
  const { sideLoader } = useSelector((state) => state.global);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branches, setBranches] = useState([]);

  const addQrCode = () => {
    if (!title || !link || !selectedBranch) {
      toastHandler("Please fill in all required fields", ERROR_TYPE_ERROR);
      return;
    }
    const payload = {
      business_id,
      title,
      link,
      business_branch_id: selectedBranch,
    };
    dispatch(setSideLoader(true));
    dispatch(createQrCodeThunk(payload))
      .then((response) => {
        if (response.payload) {
          toggleQrCode();
          toggleAddQrCode();
          toastHandler("QR Code added", TOAST_TYPE_SUCCESS);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  useEffect(() => {
    dispatch(getBranchLocationsThunk({ business_id }))
      .then((response) => {
        if (response.payload) {
          setBranches(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="add-p-side grid grid-cols-6 ">
      <div className="md:col-span-4 hidden md:block left-side"></div>
      <div className="right-side col-span-6 md:col-span-2">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleAddQrCode}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Add QR Code</div>

              <div className="jumbo-dir mt-2">
                Workspace &gt; QR Codes{" "}
                <span className="special-jumbo-text"> &gt; Add QR Code</span>
              </div>
            </div>
          </div>

          <div className="add-ann-form px-5 mt-3 ">
            <div>
              <label>Title</label>
            </div>
            <div>
              <input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Title"
                maxLength={30}
              />
            </div>

            <div className="mt-3">
              <label>Paste QR Link</label>
            </div>
            <div>
              <input
                onChange={(e) => setLink(e.target.value)}
                type="text"
                placeholder="Link"
                maxLength={50}
              />
            </div>

            <div className=" mt-3">
              <label>Branch</label>
            </div>

            <div className="news-ann">
              <select onChange={(e) => setSelectedBranch(e.target.value)}>
                <optgroup>
                  <option
                    value=""
                    selected
                    disabled
                    className="select-news-ann"
                  >
                    Select Branch
                  </option>
                  {branches &&
                    branches?.map((branch, index) => (
                      <option value={branch.business_branch_id}>
                        {branch.title}
                      </option>
                    ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="add-service-bottom">
            <button
              onClick={addQrCode}
              className="add-btn text-white px-5 flex gap-2 md:px-10 py-2 cursor-pointer  rounded-lg"
            >
              {sideLoader ? <SmallLoaderWhite /> : "Create QR Code"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default AddQrCode;
