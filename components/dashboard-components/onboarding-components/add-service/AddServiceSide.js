import { SecondSmallLoader } from "components/common/SecondSmallLoader";
import { SmallLoader } from "components/common/SmallLoader";
import { SmallLoaderWhite } from "components/common/SmallLoaderWhite";
import { motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Ripples from "react-ripples";

import "react-toastify/dist/ReactToastify.css";
import { toastHandler } from "responseHanlder";
import { addServiceThunk } from "store/auth/slices";
import {
  countWords,
  getFirst250Words,
  getFirstWords,
} from "utills/dataValidation";
import { TOAST_TYPE_ERROR } from "utills/globalVars";
import { SideTimes } from "utills/svgs/SideTimes";

const AddServiceSide = ({ toggleServiceSide }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [consultationCharges, setConsultationCharges] = useState("$");
  const [minTimeConsultation, setMinTimeConsultation] = useState("");
  const [description, setDescription] = useState("");
  const [serviceLoader, setServiceLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceObj = {
      title,
      consultationCharges,
      minTimeConsultation,
      description,
    };
    if (!title) {
      toastHandler("Title is required.", TOAST_TYPE_ERROR);
      return;
    }
    if (title.length > 60) {
      toastHandler(
        "Title length should be less than 60 character",
        TOAST_TYPE_ERROR
      );
      return;
    }
    if (!description) {
      toastHandler("description is required.", TOAST_TYPE_ERROR);
      return;
    }

    if (!consultationCharges) {
      toastHandler("Charges is required.", TOAST_TYPE_ERROR);
      return;
    }
    // if (!isNaN(consultationCharges)) {
    //   toastHandler("Charges should be Number.", TOAST_TYPE_ERROR);
    //   return;
    // }
    const hasEmptyValue = Object.values(serviceObj).some((value) => {
      return (
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    if (hasEmptyValue) {
      toastHandler("Please fill in all required fields.", TOAST_TYPE_ERROR);
      return;
    }

    const serviceData = {
      name: title,
      charges: consultationCharges,
      duration: minTimeConsultation,
      description,
    };

    setServiceLoader(true);
    dispatch(addServiceThunk(serviceData))
      .then((response) => {
        console.log(response.payload);
        if (response.payload) {
          toggleServiceSide();
          toastHandler("service added successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setServiceLoader(false);
      });
  };

  const [descLength, setDescLength] = useState(0);
  const handleDesc = (value) => {
    const wordsLength = countWords(value);

    if (wordsLength <= 250) {
      setDescLength(wordsLength);
      setDescription(value);

      // setDescLength(value.length);
    }
  };

  const handlePasteDesc = (e) => {
    const value = e.target.value;

    const countedInput = countWords(description);

    const availableSpace = 250 - countedInput;

    const first250Words = getFirst250Words(value);

    const availableWordsToPaste = getFirstWords(first250Words, availableSpace);

    const availableWordsToPasteLength = countWords(availableWordsToPaste);

    const newstr = description + availableWordsToPaste;
    setDescLength(countWords(newstr));
    setDescription(newstr);
    console.log(countedInput, availableWordsToPasteLength, "available");
  };

  const handleCharges = (value) => {};

  return (
    <div className="grid grid-cols-6 add-p-side">
      <div className="col-span-4  left-side"></div>
      <div className=" col-span-2 right-side">
        <motion.div
          initial={{ x: 700 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2, type: "tween", duration: 0.4 }}
          className="inner-right relative"
        >
          <div
            onClick={toggleServiceSide}
            className=" text-white p-2 absolute right-1 top-1 cursor-pointer"
          >
            <SideTimes />
          </div>
          <div
            className={`service-info pt-10 p-5 ${
              serviceLoader && "opacity-30"
            }`}
          >
            <div className="title">Add Service</div>

            <div className="add-ann-form mt-3">
              <div>
                <div>
                  <label>Title</label>
                </div>
                <div>
                  <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    maxLength={60}
                    placeholder="Title"
                    className="px-3 rounded-xl mt-1"
                  />
                </div>
              </div>

              <div className="mt-2">
                <div>
                  <label>Consultation Charges</label>
                </div>

                <div className="charges-input-container">
                  <input
                    type="number"
                    onChange={(e) => setConsultationCharges(e.target.value)}
                    className="charges-input"
                    value={consultationCharges}
                  />
                  <div className="doller-sign">$</div>
                </div>
                {/* <div>
                  <input
                    onChange={(e) => setConsultationCharges(e.target.value)}
                    type="number"
                    placeholder="$"
                    className="px-3 rounded-xl mt-1"
                  />
                </div> */}
              </div>

              <div className="mt-2">
                <div>
                  <label>Min-Time of Consultation:</label>
                </div>
                <div>
                  <select
                    onChange={(e) => setMinTimeConsultation(e.target.value)}
                    placeholder="Select"
                    className="rounded-xl  mt-2 px-3 font-bold"
                  >
                    <option value="" selected disabled>
                      select
                    </option>
                    <option value="30"> 30 Minutes</option>
                    <option value="45">45 Minutes </option>
                    <option value="60">1 Hour</option>
                    <option value="90"> 1.5 hours</option>
                    <option value="120">2 hours </option>
                    <option value="150">2.5 hours</option>
                  </select>
                </div>
              </div>

              <div className="mt-2">
                <div>
                  <label>Description</label>
                </div>
                <div>
                  <textarea
                    placeholder="description"
                    onChange={(e) => handleDesc(e.target.value)}
                    value={description}
                    onInput={handlePasteDesc}
                    className="rounded-xl mt-2 px-3 py-2"
                    cols="30"
                    rows="5"
                  ></textarea>
                </div>
                <div className="bio-length">{descLength} / 250</div>
              </div>
            </div>

            <div className="flex justify-center items-center mt-10">
              {" "}
              <button
                onClick={handleSubmit}
                className="px-20 py-2 rounded-md ann-btn flex gap-2 items-center text-white"
              >
                Add {serviceLoader && <SmallLoaderWhite />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddServiceSide;
