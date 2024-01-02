import { motion } from "framer-motion";
import "./css/sides.css";
import { SideTimes } from "utills/svgs/SideTimes";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { addBusinessThunk } from "store/auth/slices";
import { toastHandler } from "responseHanlder";
import { useState } from "react";
import Ripples from "react-ripples";
import { useGetBusinessProfile } from "components/workplace-content/tasks-pages/task-details/hooks/useGetBusinessProfile";
import { TOAST_TYPE_ERROR } from "utills/globalVars";
const AddBioSide = ({ toggleBio }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const [bio, setBio] = useState("");
  const { fetchBusiness } = useGetBusinessProfile();
  function hideSide() {
    toggleBio();
  }

  const handleSubmit = () => {
    if (!bio) {
      return toastHandler("Bio is required", TOAST_TYPE_ERROR);
    }
    const businessData = {
      description: bio,
    };

    dispatch(setLoader(true));
    dispatch(addBusinessThunk(businessData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          fetchBusiness();
          toastHandler("Business added successfully ", "success");
          hideSide();
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
    <div className="show-business-side grid grid-cols-5">
      <div className="col-span-3 "></div>
      <motion.div
        initial={{ x: 700 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
        className="col-span-2  inner-right relative"
      >
        <div
          onClick={hideSide}
          className="text-white  p-2 absolute right-1 top-1 cursor-pointer"
        >
          <SideTimes />
        </div>

        <div className="add-business-info p-5 pt-10">
          <div className="title">Add Bio</div>

          <div className="jumbo-dir mt-2">
            Workspace &gt; Bio{" "}
            <span className="special-jumbo-text"> &gt; Add Bio</span>
          </div>

          <div className="bio-description mt-5">
            <div>
              <label>Description</label>
            </div>
            <div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="bio-btn">
          <Ripples during={2000} color="#333333">
            <button
              onClick={handleSubmit}
              className="add-btn text-white px-20 py-2 rounded-lg"
            >
              Add
            </button>
          </Ripples>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBioSide;
