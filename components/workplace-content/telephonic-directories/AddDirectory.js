import { useGetBranch } from "Hooks/useGetBranch";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toastHandler } from "responseHanlder";

import { setSideLoader } from "store/global/globalReducer";
import { createTelephonicDirectoryThunk } from "store/workspace/workspaceTelephonicDirectories";
import { validateAustralianPhoneNumber } from "utills/FormValidation";
import {
  BUSINESS_ID,
  ERROR_TYPE_SUCCESS,
  TOAST_TYPE_ERROR,
} from "utills/globalVars";
import { SideTimes } from "utills/svgs/SideTimes";
const AddDirectory = ({ toggleAddDirectory, toggleDirectory }) => {
  const dispatch = useDispatch();
  const business_id = localStorage.getItem(BUSINESS_ID);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    desk_extension: "",
    designation: "",
    business_branch_id: "",
    business_id,
  });

  const handleName = (value) => {
    const hasDigit = /\d/.test(value);

    if (hasDigit) {
      return;
    } else {
      setFormData((prevData) => ({ ...prevData, first_name: value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.first_name) {
      toastHandler("First name is required", TOAST_TYPE_ERROR);
      return;
    }
    if (formData.first_name.length > 15) {
      toastHandler(
        "First name should be less than 15 character",
        TOAST_TYPE_ERROR
      );
      return;
    }
    if (!formData.last_name) {
      toastHandler("Last name is required", TOAST_TYPE_ERROR);
      return;
    }
    if (formData.last_name.length > 15) {
      toastHandler(
        "Last name should be less than 15 character",
        TOAST_TYPE_ERROR
      );
      return;
    }
    if (!formData.email) {
      toastHandler("Email is required", TOAST_TYPE_ERROR);
      return;
    }
    if (formData.email.length > 40) {
      toastHandler(
        "Last name should be less than 15 character",
        TOAST_TYPE_ERROR
      );
      return;
    }

    dispatch(setSideLoader(true));
    dispatch(createTelephonicDirectoryThunk(formData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toastHandler("Added successfully", ERROR_TYPE_SUCCESS);
          toggleDirectory();
          toggleAddDirectory();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  const { branches } = useGetBranch();
  return (
    <div className="add-p-side grid grid-cols-5 text-black">
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
              onClick={toggleAddDirectory}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5 text-black">
              <div className="title">Add Telephonic Directory</div>

              <div className="jumbo-dir mt-2">
                Workspace{" "}
                <span className="special-jumbo-text">
                  {" "}
                  &gt; Add Telephonic Directory
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="add-ann-form grid grid-cols-2 gap-5 mt-3 p-5">
              <div className=" ">
                <div>
                  <div>
                    <label>First Name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      maxLength="50"
                      placeholder="First Name"
                      name="first_name"
                      className="px-3 rounded-xl mt-1"
                      onChange={(e) => handleName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-2 add-ann-form">
                  <div>
                    <label>Email</label>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="px-3 rounded-xl mt-1"
                      name="email"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Branch Assign (optional)</label>
                  </div>
                  <div>
                    <select
                      placeholder="Select"
                      className="rounded-xl  mt-2 px-3 font-bold"
                      name="business_branch_id"
                      onChange={handleInputChange}
                    >
                      <option value="" selected disabled>
                        select
                      </option>
                      {branches &&
                        branches?.map((branch, index) => (
                          <option value={branch.business_branch_id}>
                            {branch.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Type (optional)</label>
                  </div>
                  <div>
                    <select
                      placeholder="Select"
                      className="rounded-xl  mt-2 px-3 font-bold"
                      name="designation"
                      onChange={handleInputChange}
                    >
                      <option value="select">select</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className=" ">
                <div>
                  <div>
                    <label>Last Name</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      maxLength="50"
                      placeholder="Last Name"
                      className="px-3 rounded-xl mt-1"
                      name="last_name"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Contact Number</label>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Contact Number"
                      className="px-3 rounded-xl mt-1"
                      name="phone_number"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Extension (optional) </label>
                  </div>
                  <div>
                    <select
                      placeholder="Select"
                      className="rounded-xl  mt-2 px-3 font-bold"
                      name="desk_extension"
                      onChange={handleInputChange}
                    >
                      <option value="select">select</option>
                      <option value="one">one</option>
                      <option value="two">two</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-5">
            <button
              onClick={handleSubmit}
              className="add-btn px-20 py-2 cursor-pointer text-white rounded-lg"
            >
              Add
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddDirectory;
