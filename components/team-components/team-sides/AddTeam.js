import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastHandler } from "responseHanlder";
import { setSideLoader } from "store/global/globalReducer";
import {
  fetchAllBusinessGroupsThunk,
  getAllBusinessModulesThunk,
  sendEmployeeInviteThunk,
} from "store/settings/team/team";
import { validateEmail } from "utills/FormValidation";
import { SideTimes } from "utills/svgs/SideTimes";
const AddTeam = ({ toggleAddTeam, toggleInviteSuccess }) => {
  const dispatch = useDispatch();
  const { sideLoader } = useSelector((state) => state.global);

  const [businessGroups, setBusinessGroups] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    business_group_id: "",
  });

  const [emailError, setEmailError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    // if (name === "phone_number") {
    //   if (!value?.length < 15) {
    //     console.log(value, "exceed");
    //     return;
    //   }
    // }

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const hideSide = () => {
    toggleAddTeam();
  };

  const handleSubmit = () => {
    const hasEmptyValue = Object.values(formData).some((value) => {
      return (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      );
    });
    if (hasEmptyValue) {
      return toastHandler("Please fill in all required fields.", "error");
    }

    const newFormData = {
      first_name: formData.first_name.trim(),
      last_name: formData.last_name.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
      business_group_id: formData.business_group_id.trim(),
    };

    dispatch(setSideLoader(true));
    dispatch(sendEmployeeInviteThunk(newFormData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleInviteSuccess();
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
    dispatch(setSideLoader(true));

    dispatch(fetchAllBusinessGroupsThunk())
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          setBusinessGroups(response.payload);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  }, [dispatch]);

  return (
    <div className="add-p-side grid grid-cols-6 text-black">
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
              onClick={hideSide}
              className="absolute   text-white p-2 right-1 top-1 cursor-pointer"
            >
              <SideTimes />
            </div>

            <div className="add-detail pt-10 px-5">
              <div className="title">Add Team</div>

              <div className="jumbo-dir mt-2">
                Setting &gt; Team
                <span className="special-jumbo-text"> &gt; Add Team</span>
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="add-service-form">
                <div className="service-form mt-3 pl-5">
                  <div>
                    <div>
                      <label>First Name</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        className="px-3 rounded-xl mt-1"
                        onChange={handleInputChange}
                        maxLength={30}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <div>
                      <label>Last Name</label>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="px-3 rounded-xl mt-1"
                        name="last_name"
                        onChange={handleInputChange}
                        maxLength={30}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
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
                        maxLength={50}
                      />
                      <div className="error-div mt-1">
                        {emailError && formData.email !== "" ? (
                          <span> Invalid Email </span>
                        ) : (
                          ""
                        )}
                      </div>
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
                        max={15}
                      />
                    </div>
                  </div>

                  <div className="mt-2">
                    <div>
                      <label>Business Groups</label>
                    </div>
                    <div>
                      <select
                        placeholder="Select"
                        className="rounded-xl  mt-2 px-3 font-bold"
                        name="business_group_id"
                        onChange={handleInputChange}
                      >
                        <option value="" selected disabled>
                          select
                        </option>
                        {businessGroups &&
                          businessGroups.map((permission) => (
                            <option
                              value={permission.business_group_id}
                              key={permission.business_group_id}
                            >
                              {permission.business_group_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-5 flex items-center justify-center">
              <button
                onClick={handleSubmit}
                disabled={emailError}
                className="add-btn px-20 py-2 cursor-pointer text-white rounded-lg flex items-center gap-2"
              >
                Invite {sideLoader && <SmallLoaderWhite />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddTeam;
