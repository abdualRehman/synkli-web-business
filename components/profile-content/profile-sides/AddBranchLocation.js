import { motion } from "framer-motion";
import { SideTimes } from "../../../utills/svgs/SideTimes";

import { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import Ripples from "react-ripples";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastHandler } from "responseHanlder";
import { addBranchLocationThunk } from "store/auth/slices";
import { setSideLoader } from "store/global/globalReducer";
import { PLACES_API_KEY, TOAST_TYPE_ERROR } from "utills/globalVars";
import { validateEmail } from "../../../utills/FormValidation";
import { PickAddress } from "global-components/PickAddress";

const AddBranchLocation = ({
  toggleBranchLocation,
  toggleServiceUpdated,
  togglebranchesUpdated,
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.global);
  const [address, setAddress] = useState("");
  const [formData, setFormData] = useState({
    branchTitle: "",
    phoneNumber: "",
    email: "",
  });
  const [emailError, setEmailError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(value);
  };

  const handleSubmit = () => {
    console.log(formData);
    const hasEmptyValue = Object.values(formData).some((value) => {
      return (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      );
    });
    if (hasEmptyValue) {
      if (!address) {
        toastHandler("Please fill in all required fields.", TOAST_TYPE_ERROR);
        return;
      }
      return toastHandler(
        "Please fill in all required fields.",
        TOAST_TYPE_ERROR
      );
    }

    const branchObj = {
      title: formData.branchTitle,
      phone_number: formData.phoneNumber,
      email: formData.email.trim(),
      address: address,
    };

    dispatch(setSideLoader(true));
    dispatch(addBranchLocationThunk(branchObj))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          // fetchBranches();
          toggleServiceUpdated();
          toggleBranchLocation();
          togglebranchesUpdated();
          toastHandler("Branch location added successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  function toggleBranchSide() {
    toggleBranchLocation();
  }

  const onSelect = (place) => {
    console.log(place.formatted_address, "1212dd");
    setAddress(place.formatted_address);
  };

  return (
    <div className="add-branch-side grid grid-cols-6 add-p-side">
      <div className="md:col-span-4 hidden md:block left-side"></div>
      <div className="col-span-6 md:col-span-2 right-side">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={toggleBranchSide}
              className=" text-white p-2 absolute right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>
          </div>

          <div className="service-info pt-10 p-5">
            <div className="title">Add Branch Location</div>

            <div className="branch-navigate mt-1">
              Profile <span className="bn-black"> &gt; Branch Location</span>
            </div>

            <div className="add-ann-form mt-3">
              <div>
                <div>
                  <label>Branch Title</label>
                </div>
                <div>
                  <input
                    onChange={handleInputChange}
                    name="branchTitle"
                    type="text"
                    maxLength={50}
                    placeholder="Branch Title"
                    className="px-3 rounded-xl mt-1"
                  />
                </div>
              </div>

              <div className="mt-2">
                <div>
                  <label>Phone Number</label>
                </div>
                <div>
                  <input
                   
                    onChange={handleInputChange}
                    name="phoneNumber" max={15}
                    type="number"
                    placeholder="Phone Number"
                    className="px-3 rounded-xl mt-1"
                  
                  />
                </div>
              </div>

              <div className="mt-2">
                <div>
                  <label>Email</label>
                </div>
                <div>
                  <input
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="px-3 rounded-xl mt-1"
                  />

                  {formData.email !== "" ? (
                    <div className="error-div mt-1">
                      {emailError && <span> Invalid Email </span>}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mt-2">
              
                <div>
                  {/* <input
                    onChange={handleInputChange}
                    name="address"
                    type="text"
                      maxLength="60"
                    placeholder="Add Complete Adress"
                    className="px-3 rounded-xl mt-1"
                  /> */}
                       <PickAddress
                    onSelect={onSelect}
                    address={address}
                    setAddress={setAddress}
                  />

                  {/* <Autocomplete
                    apiKey={PLACES_API_KEY}
                    onChange={(e) => setAddress(e.target.value)}
                    className="px-3 rounded-xl mt-1"
                    placeholder="Enter your business address"
                    onPlaceSelected={(place) =>
                      setAddress(place.formatted_address)
                    }
                  /> */}
                </div>
              </div>
            </div>

            <div className="service-btn-wrapper flex justify-center items-center mt-20">
              <Ripples during={2000} color="#333333">
                <button
                  disabled={emailError}
                  onClick={handleSubmit}
                  className="px-20 py-2 rounded-md text-white"
                >
                  Add
                </button>
              </Ripples>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddBranchLocation;
