import { motion } from "framer-motion";
import "./css/sides.css";
import { SideTimes } from "../../../utills/svgs/SideTimes";
import { useState } from "react";

import Ripples from "react-ripples";
import { toastHandler } from "responseHanlder";
import { useDispatch, useSelector } from "react-redux";
import {
  editService,
  setLoader,
  setSideLoader,
} from "store/global/globalReducer";
import { addServiceThunk, serviceUpdate } from "store/auth/slices";

const AddServiceSide = ({ toggleServiceSide, toggleServiceUpdated }) => {
  const dispatch = useDispatch();
  const service = useSelector((state) => state.global.singleService);

  const [formData, setFormData] = useState({
    title: service?.name ?? "",
    consultationCharges: service?.charges ?? "",
    minTimeOfConsultation: service?.duration ?? "",
    description: service?.description ?? "",
    digitalRegistration: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      return toastHandler("Please fill in all required fields.", "error");
    }

    dispatch(setSideLoader(true));
    const serviceData = {
      name: formData.title,
      charges: formData.consultationCharges,
      duration: formData.minTimeOfConsultation,
      description: formData.description,
    };

    dispatch(addServiceThunk(serviceData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleServiceSide();
          toastHandler("service added successfully", "success");
          toggleServiceUpdated();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };
  const updateService = () => {
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
      return toastHandler("Please fill in all required fields.", "error");
    }

    dispatch(setSideLoader(true));
    const serviceData = {
      business_service_id: service.business_service_id,
      name: formData.title,
      charges: formData.consultationCharges,
      duration: formData.minTimeOfConsultation,
      description: formData.description,
    };

    dispatch(serviceUpdate(serviceData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          dispatch(editService(""));
          toggleServiceSide();
          toastHandler("service Updated successfully", "success");
          toggleServiceUpdated();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(setSideLoader(false));
      });
  };

  const hideSide = () => {
    dispatch(editService(""));
    toggleServiceSide();
  };
  return (
    <div className="add-p-side grid grid-cols-6 text-black ">
      <div className="col-span-4 left-side"></div>
      <div className="right-side col-span-2">
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
              <div className="title">{`${
                service ? "Edit" : "Add"
              } service`}</div>

              <div className="jumbo-dir mt-2">
                Services
                <span className="special-jumbo-text">
                  {" "}
                  &gt; {`${service ? "Edit" : "Add"} service`}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="add-service-form">
              <div className="service-form mt-3 pl-5">
                <div>
                  <div>
                    <label>Title</label>
                  </div>
                  <div>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      value={formData.title}
                      name="title"
                      maxLength={30}
                      placeholder="Title"
                      className="px-3 rounded-xl mt-1"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Consultation Charges</label>
                  </div>
                  <div>
                    <input
                      onChange={handleInputChange}
                      type="number"
                      value={formData.consultationCharges}
                      name="consultationCharges"
                      placeholder="charges"
                      className="px-3 rounded-xl mt-1"
                      maxLength="7"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Min-Time of Consultation:</label>
                  </div>
                  <div>
                    <select
                      onChange={handleInputChange}
                      name="minTimeOfConsultation"
                      placeholder="Select"
                      className="rounded-xl  mt-2 px-3 font-bold"
                    >
                      {/* <option value={"select"} selected>
                        {formData?.minTimeOfConsultation ?? "Select"}
                      </option> */}
                      <option value="" selected disabled>
                        {formData?.minTimeOfConsultation || "select"}
                      </option>
                      <option value="30">30 min</option>
                      <option value="45">45 min</option>
                      <option value="60">1 hour</option>
                    </select>
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Description</label>
                  </div>
                  <div>
                    <textarea
                      onChange={handleInputChange}
                      name="description"
                      value={formData.description}
                      maxLength={400}
                      placeholder="Description"
                      className="rounded-xl mt-2 px-3 py-2"
                      cols="30"
                      rows="5"
                    ></textarea>
                  </div>
                </div>

                <div className="mt-2">
                  <div>
                    <label>Digital Registration</label>
                  </div>
                  <div>
                    <select
                      onChange={handleInputChange}
                      name="digitalRegistration"
                      placeholder="Select"
                      className="rounded-xl  mt-2 px-3 font-bold"
                    >
                      <option value="select" selected disabled>
                        select
                      </option>
                      <option value="select">Yes</option>
                      <option value="select">No</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-5 mt-28 flex justify-center items-center">
            <Ripples during={2000} color="#333333">
              <button
                onClick={service ? updateService : handleSubmit}
                className="add-btn px-20 py-2 text-white rounded-lg"
              >
                {service ? "Update" : "Add"}
              </button>
            </Ripples>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddServiceSide;
