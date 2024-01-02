import { motion } from "framer-motion";

import "react-toastify/dist/ReactToastify.css";

import {
  validateAustralianPhoneNumber,
  validateEmail,
} from "../../../../utills/FormValidation";
import { useState } from "react";
import { toastHandler } from "responseHanlder";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "store/global/globalReducer";
import { addBranchLocationThunk } from "store/auth/slices";
import { SideTimes } from "utills/svgs/SideTimes";
import Autocomplete from "react-google-autocomplete";

import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { PLACES_API_KEY, TOAST_TYPE_ERROR } from "utills/globalVars";
import { PickAddress } from "global-components/PickAddress";

const AddBranchSide = ({ toggleBranchSide }) => {
  const dispatch = useDispatch();
  const [branchTitle, setBranchTitle] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { isLoading } = useSelector((state) => state.global);

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim().length === 0) {
      setEmailError(false);
    } else if (!validateEmail(value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const handlePhoneNo = (e) => {
    const value = e.target.value;
    if (value.length >= 15) {
      return;
    }
    setPhoneNo(value);
    if (!validateAustralianPhoneNumber(value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const branchObj = {
      title: branchTitle,
      phone_number: phoneNo,
      email,
      address,
    };
    if (!branchTitle) {
      toastHandler("Title is required.", TOAST_TYPE_ERROR);
      return;
    }
    if (branchTitle.length > 30) {
      toastHandler("Title should be less than 30 character", TOAST_TYPE_ERROR);
      return;
    }
    if (!phoneNo) {
      toastHandler("Phone number is required.", TOAST_TYPE_ERROR);
      return;
    }

    if (!email) {
      toastHandler("Email is required.", TOAST_TYPE_ERROR);
      return;
    }
    if (email.length > 40) {
      toastHandler("Email should be less than 40 character", TOAST_TYPE_ERROR);
      return;
    }
    if (!address) {
      toastHandler("Adress is required.", TOAST_TYPE_ERROR);
      return;
    }
    if (address.length > 100) {
      toastHandler(
        "Adress should be less than 100 character",
        TOAST_TYPE_ERROR
      );
      return;
    }
    const hasEmptyValue = Object.values(branchObj).some((value) => {
      return (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    if (hasEmptyValue) {
      toastHandler("Please fill in all required fields.", "error");
      return;
    }

    dispatch(setLoader(true));
    dispatch(addBranchLocationThunk(branchObj))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleBranchSide();
          toastHandler("Branch location added successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setLoader(false));
      });
  };

  const crossBranch = () => {
    toggleBranchSide();
  };
  const onSelect = (place) => {
    console.log(place.formatted_address, "1212dd");
    setAddress(place.formatted_address);
  };
  return (
    <div className="add-branch-side grid grid-cols-6 add-p-side">
      <div className="col-span-4  left-side"></div>
      <div className="col-span-2  right-side">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div>
            <div
              onClick={crossBranch}
              className=" text-white p-2 absolute right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>
          </div>

          <div className="service-info pt-10 p-5">
            <div className="title">Add Branch Location</div>

            <div className="add-ann-form mt-3">
              <div>
                <div>
                  <label>Branch Title</label>
                </div>
                <div>
                  <input
                    onChange={(e) => setBranchTitle(e.target.value)}
                    type="text"
                    maxLength="60"
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
                    onChange={handlePhoneNo}
                    type="number"
                    value={phoneNo}
                    max={14}
                    placeholder="Phone Number"
                    className="px-3 rounded-xl mt-1"
                  />
                  {/* <div className="error-div mt-1">
                    {phoneError && phoneNo !== "" ? (
                      <span> Invalid australian phone number </span>
                    ) : (
                      ""
                    )}
                  </div> */}
                </div>
              </div>

              <div className="mt-2">
                <div>
                  <label>Email</label>
                </div>
                <div>
                  <input
                    onChange={(e) => handleEmail(e)}
                    type="email"
                    placeholder="Email"
                    className="px-3 rounded-xl mt-1"
                  />

                  <div className="error-div mt-1">
                    {emailError && <span> Invalid email format </span>}
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div>
                  <PickAddress
                    onSelect={onSelect}
                    address={address}
                    setAddress={setAddress}
                  />
                  {/* <input
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                      maxLength="60"
                    placeholder="Add Complete Adress"
                    className="px-3 rounded-xl mt-1"
                  /> */}
                  {/* <Autocomplete
                    apiKey={PLACES_API_KEY}
                    className="px-3 rounded-xl mt-1"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your business address"
                    onPlaceSelected={(place) =>
                      setAddress(place.formatted_address)
                    }
                  /> */}
                </div>
              </div>
            </div>

            <div className="service-btn-wrapper flex justify-center items-center mt-10 md:mt-16 lg:mt-20">
              <button
                onClick={handleSubmit}
                className="px-20 py-2 rounded-md text-white"
              >
                {isLoading ? <SmallLoaderWhite /> : "Add"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddBranchSide;
